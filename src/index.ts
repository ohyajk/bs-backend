import { serve } from "@hono/node-server"
import { Hono } from "hono"
import bikes from "./routes/bike"
import signup from "./routes/signup"
import login from "./routes/login"
import user from "./routes/user"
import rando from "./routes/rando"
import { cors } from "hono/cors"
import order from "./routes/order"
require('dotenv').config();

const app = new Hono().basePath("/api")

app.get("/", (c) => {
    return c.text("Hello Hono!")
})

app.use(
    "*",
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        headers: ["Content-Type", "Authorization"],
        credentials: true,
    } as any)
)

app.route("/bike", bikes)
app.route("/signup", signup)
app.route("/login", login)
app.route("/user", user)
app.route("/rando", rando)
app.route("/order", order)

const port: number = parseInt(process.env.PORT as string, 10) || 9001
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port,
})
