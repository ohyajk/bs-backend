import { Hono } from 'hono';
import prisma from '../lib/prismaClient';
import {  decode } from 'hono/jwt';
import {getCookie } from 'hono/cookie'

const order = new Hono();

order.post('/', async (c) => {
    const { bikesId } = await c.req.json();
    const token = getCookie(c, 'session');
  if (!token) {
    return c.json({ error: 'Authorization token missing' }, 401);
  }

  const decodEmail = decode(token);
    if (!decodEmail) {
        return c.json({ error: 'Invalid token' }, 401);
    }
    const userData = await prisma.user.findFirst({
        where: { email: decodEmail.payload?.email as string },
    });

    if (!userData) {
        return c.json({ error: 'User not found' }, 404);
    }

  try {

    const saveOrder = await prisma.order.create({
        data:{
            userId: userData.id,
            bikesId,
            quantity: 1,
            total: 1,
            status: 'pending'
        }
    })
    return c.json(saveOrder);
  } catch (err) {
    return c.json({ error: 'Failed to fetch user' }, 500);
  }
});

export default order;
