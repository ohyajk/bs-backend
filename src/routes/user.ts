import { Hono } from 'hono';
import prisma from '../lib/prismaClient';
import {  decode } from 'hono/jwt';
import {getCookie } from 'hono/cookie'
  
const user = new Hono();

user.get('/', async (c) => {
    const token = getCookie(c, 'session');
  if (!token) {
    return c.json({ error: 'Authorization token missing' }, 401);
  }

  const decodEmail = decode(token);
    if (!decodEmail) {
        return c.json({ error: 'Invalid token' }, 401);
    }

  try {
    const userData = await prisma.users.findFirst({
        where: { email: decodEmail.payload?.email as string },
        select:{
            email:true,
            otp:false,
            id: true,
            name: true,
            phone: true,
            city: true,
            state: true,
            zip: true,
            address: true,
        }
    });
    return c.json(userData);
  } catch (err) {
    return c.json({ error: 'Failed to fetch user' }, 500);
  }
});

export default user;
