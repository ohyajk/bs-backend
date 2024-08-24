import { Hono } from 'hono'
import prisma from '../lib/prismaClient';

const  bikes = new Hono()

bikes.get('/all', async (c) => {
  try {
    const bikeData = await prisma.bikes.findMany();
    return c.json(bikeData);
  } catch (err) {
    return c.json({ error: 'Failed to fetch bikes' }, 500);
  }
});

bikes.get('/:url', async (c) => {
  const {url}  = c.req.param()
  try {
    const bikeData = await prisma.bikes.findFirst({
      where: {
        url
      },
    });
    return c.json(bikeData);
  } catch (err) {
    return c.json({ error: 'Failed to fetch bike' }, 500);
  }
});

export default bikes;
