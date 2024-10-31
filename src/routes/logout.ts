import { Hono } from "hono"
import prisma from "../lib/prismaClient"
import authorize, { CustomContext } from "../lib/authorize"
import { deleteCookie } from "hono/cookie"

const logout = new Hono()

logout.post("/", authorize, async (c: CustomContext) => {
    try {
        deleteCookie(c, "session")
        return c.json({ message: "Logged out successfully" }, 200)
    } catch (err) {
        return c.json({ error: "Failed to logout", err }, 500)
    }
})

export default logout