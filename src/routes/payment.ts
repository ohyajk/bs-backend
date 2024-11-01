import { Hono } from 'hono';
import Stripe from 'stripe';
import prisma from '../lib/prismaClient';

const payment = new Hono();
const stripe = new Stripe(process.env.STRIPE_SEC_KEY as string);

payment.post('/', async (c) => {
    const { ref } = await c.req.json();

    const order = await prisma.order.findFirst({
        where: { ref },
    });

    if (!order) {
        return c.json({ error: 'Order not found' }, 404);
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
        });

        return c.json({ url: session.url });
    } catch (err) {
        console.error(err);
        return c.json({ error: 'Failed to create checkout session' }, 500);
    }
});

export default payment;
