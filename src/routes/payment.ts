import { Hono } from "hono"
import Stripe from "stripe"


const payment = new Hono()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {})

// Add Payment Intent
payment.post("/", async (c) => {
    const { amount } = await c.req.json()

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
        })
        return c.json(paymentIntent)
    } catch (err) {
        return c.json({ error: "Failed to create payment intent" }, 500)
    }
})