import { Hono } from 'hono';
import Stripe from 'stripe';
import prisma from '../lib/prismaClient';

const payment = new Hono();
const stripe = new Stripe(process.env.STRIPE_SEC_KEY as string);

payment.post('/', async (c) => {
    const { ref } = await c.req.json();

    // Fetch the order and related user
    const order = await prisma.order.findFirst({
        where: { ref },
        include: { user: true }, // Assuming 'user' is a relation in your Prisma schema
    });

    if (!order) {
        return c.json({ error: 'Order not found' }, 404);
    }

    if (!order.user || !order.user.email) {
        return c.json({ error: 'User not found or email missing' }, 404);
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: 'Order Payment' }, 
                        unit_amount: order.total * 100, 
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            metadata: { ref },
            customer_email: order.user.email,
            billing_address_collection: 'auto',
            automatic_tax: { enabled: false }, 
        });

        return c.json({ url: session.url });
    } catch (err) {
        console.error(err);
        return c.json({ error: 'Failed to create checkout session' }, 500);
    }
});

payment.post('/confirmHook', async (c) => {
    const sig = c.req.header('stripe-signature');
    const body = await c.req.text();

    if (!sig) {
        console.error('Missing Stripe signature');
        return c.json({ error: 'Missing Stripe signature' }, 400);
    }

    let event;

    try {
        // Verify Stripe webhook signature
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_HOOK_SEC as string);
    } catch (err : any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return c.json({ error: 'Webhook signature verification failed' }, 400);
    }

    // Handle specific event types
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Get the order reference from metadata
        if (!session.metadata) {
            console.error('Missing metadata in session');
            return c.json({ error: 'Missing metadata in session' }, 400);
        }
        const orderRef = session.metadata.ref;

        try {
            // Update the payment status of the order in your database
            await prisma.order.update({
                where: { id: orderRef },
                data: { paymentStatus: 'PAID' },
            });
            console.log(`Order ${orderRef} payment status updated to "paid"`);
        } catch (err : any) {
            console.error(`Failed to update order status: ${err.message}`);
            return c.json({ error: 'Failed to update order status' }, 500);
        }
    }

    // Return a 200 response to Stripe to acknowledge receipt of the event
    return c.json({ received: true }, 200);
});

export default payment;
