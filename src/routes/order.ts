import { Hono } from "hono"
import prisma from "../lib/prismaClient"
import authorize, { CustomContext } from "../lib/authorize"

const order = new Hono()
// Add Order
order.post("/", authorize, async (c: CustomContext) => {
    const { bikeId } = await c.req.json()
    const decodEmail = c.get("decodEmail")

    const userData = await prisma.user.findFirst({
        where: { email: decodEmail.payload?.email as string },
    })

    if (!userData) {
        return c.json({ error: "User not found" }, 404)
    }

    try {
        const saveOrder = await prisma.order.create({
            data: {
                userId: userData.id,
                bikeId,
                deliveryStatus: "YET_TO_SHIP",
                paymentStatus: "PENDING",
            },
        })
        return c.json(saveOrder)
    } catch (err) {
        return c.json({ error: "Failed to add order" }, 500)
    }
})

// Get all
order.get("/all", authorize, async (c: CustomContext) => {
    const decodEmail = c.get("decodEmail")

    const userData = await prisma.user.findFirst({
        where: { email: decodEmail.payload?.email as string },
    })

    if (!userData) {
        return c.json({ error: "User not found" }, 404)
    }

    try {
        const orders = await prisma.order.findMany({
            where: { userId: userData.id },
            include: {
                bike: true,
            },
        })
        return c.json(orders)
    } catch (err) {
        return c.json({ error: "Failed to fetch orders" }, 500)
    }
})

// Get by id
order.get("/:id", authorize, async (c: CustomContext) => {
    const { id } = c.req.param()
    const decodEmail = c.get("decodEmail")

    const userData = await prisma.user.findFirst({
        where: { email: decodEmail.payload?.email as string },
    })

    if (!userData) {
        return c.json({ error: "User not found" }, 404)
    }

    try {
        const order = await prisma.order.findFirst({
            where: { id, userId: userData.id },
            include: {
                bike: true,
            },
        })
        return c.json(order)
    } catch (err) {
        return c.json({ error: "Failed to fetch order" }, 500)
    }
})

export default order
