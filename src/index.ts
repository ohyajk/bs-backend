import { serve } from "@hono/node-server"
import { Hono } from "hono"
import bikes from "./routes/bike"
import signup from "./routes/signup"
import login from "./routes/login"
import user from "./routes/user"
import rando from "./routes/rando"
import { cors } from "hono/cors"
import order from "./routes/order"
import { access } from "fs"
import logout from "./routes/logout"
require('dotenv').config();

const app = new Hono().basePath("/api")

app.get("/", (c) => {
    return c.text("Hello Hono!")
})

app.use(
    "*",
    cors({
        origin: ["https://bs-frontend-9v51.onrender.com", "https://bs.jkweb.in", "http://localhost:9000"],  // Set to frontend origin
        allowMethods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
        allowHeaders: ["Content-Type", "Authorization"],  // Allowed headers in requests
        credentials: true,  // Allow credentials (cookies, auth headers)
    })
)

app.route("/bike", bikes)
app.route("/signup", signup)
app.route("/login", login)
app.route("/logout", logout)
app.route("/user", user)
app.route("/rando", rando)
app.route("/order", order)

const port: number = parseInt(process.env.PORT as string, 10) || 9001
console.log(`Server is running on port- ${port}`)

serve({
    fetch: app.fetch,
    port,
})
