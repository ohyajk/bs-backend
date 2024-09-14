import { decode } from "hono/jwt"
import { getCookie } from "hono/cookie"
import { Context, Next } from "hono"

export interface CustomContext extends Context {
    set: (key: "decodEmail", value: any) => void
    get: (key: "decodEmail") => any
}
const authorize = async (c: CustomContext, next: Next) => {
    const token = getCookie(c, "session")
    if (!token) {
        return c.json({ error: "Authorization token missing" }, 401)
    }

    const decodEmail = decode(token)
    if (!decodEmail) {
        return c.json({ error: "Invalid token" }, 401)
    }

    c.set("decodEmail", decodEmail)
    await next()
}

export default authorize
