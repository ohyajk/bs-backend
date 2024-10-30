import { Hono } from "hono"
import prisma from "../lib/prismaClient"
import authorize, { CustomContext } from "../lib/authorize"

const order = new Hono()
// Add Order
order.post("/", authorize, async (c: CustomContext) => {
    const { bikeIds } = await c.req.json()
    const decodEmail = c.get("decodEmail")

    const userData = await prisma.user.findFirst({
        where: { email: decodEmail.payload?.email as string },
    })

    if (!userData) {
        return c.json({ error: "User not found" }, 404)
    }

    try {
        const bikes = await prisma.bike.findMany({
            where: { id: { in: bikeIds } }
        })
        const bikesTotal = bikes.reduce((acc, bike) => acc + bike.price, 0)
        const totalWithTax = bikesTotal + (bikesTotal * 8 / 100) + 15
        const saveOrder = await prisma.order.create({
            data: {
                userId: userData.id,
                bikeIds,
                total: totalWithTax,
                deliveryStatus: "YET_TO_SHIP",
                paymentStatus: "PENDING",
            },
        })
        return c.json(saveOrder, 201)
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
            orderBy: { createdAt: "desc" },

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
            where: { id, userId: userData.id }
        })
        return c.json(order)
    } catch (err) {
        return c.json({ error: "Failed to fetch order" }, 500)
    }
})

export default order
