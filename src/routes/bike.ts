import { Hono } from "hono"
import prisma from "../lib/prismaClient"

const bikes = new Hono()

bikes.get("/all", async (c) => {
    try {
        const bikeData = await prisma.bike.findMany({
            select: {
              id: true,
              name: true,
              discount: true,
              originalPrice: true,
              price: true,
              url: true,
              rating: true,
              image: true,
              category: true,
            },
          })
        return c.json(bikeData)
    } catch (err) {
        return c.json({ error: "Failed to fetch bikes", err }, 500)
    }
})

bikes.get("/:url", async (c) => {
    const { url } = c.req.param()
    try {
        const bikeData = await prisma.bike.findFirst({
            where: {
                url,
            },
        })
        return c.json(bikeData)
    } catch (err) {
        return c.json({ error: "Failed to fetch bike", err }, 500)
    }
})

export default bikes
