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
                isOnboardingComplete: true,
                createdAt: true,
                updatedAt: true,
            },
        })
        return c.json(userData)
    } catch (err) {
        console.log(err)
        return c.json({ error: "Failed to fetch user", err }, 500)
    }
})

export default user
