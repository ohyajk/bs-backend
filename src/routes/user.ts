import { Hono } from "hono"
import prisma from "../lib/prismaClient"
import authorize, { CustomContext } from "../lib/authorize"

const user = new Hono()

user.get("/", authorize, async (c: CustomContext) => {
    const decodEmail = c.get("decodEmail")

    try {
        const userData = await prisma.user.findFirst({
            where: { email: decodEmail.payload?.email as string },
            select: {
                otp: false,
                email: true,
                id: true,
                name: true,
                phone: true,
                city: true,
                country: true,
                zip: true,
                state: true,
                locality: true,
                isOnboardingComplete: true,
                createdAt: true,
                updatedAt: true,
            },
        })
        return c.json(userData, 200)
    } catch (err) {
        console.log(err)
        return c.json({ error: "Failed to fetch user", err }, 500)
    }
})

user.put("/update", authorize, async (c: CustomContext) => {
    const decodEmail = c.get("decodEmail")
    const { name, phone, city, country, zip, state, locality, isOnboardingComplete } =
        await c.req.json()

    try {
        const updatedUser = await prisma.user.update({
            where: { email: decodEmail.payload?.email as string },
            data: {
                name,
                phone,
                city,
                country,
                zip,
                state,
                locality,
                isOnboardingComplete
            },
            select: {
                otp: false,
                email: true,
                id: true,
                name: true,
                phone: true,
                city: true,
                country: true,
                zip: true,
                state: true,
                locality: true,
                isOnboardingComplete: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return c.json(updatedUser)
    } catch (err) {
        console.log(err)
        return c.json({ error: "Failed to update user", err }, 500)
    }
})

export default user
