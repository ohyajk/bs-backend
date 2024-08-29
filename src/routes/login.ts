import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { sign } from 'hono/jwt';
import { setCookie } from 'hono/cookie';
  
const login = new Hono();
const prisma = new PrismaClient();

login.post('/', async (c) => {
  const { email, otp } = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return c.json({ error: 'User not found!' }, 404);
    }

    if (user.otp != otp) {
      return c.json({ error: 'Invalid OTP!' }, 400);
    }

    // await prisma.users.update({
    //     where: { email },
    //     data: { otp: "null" },
    //   });

    const token = await sign({ email }, 'secret');
    setCookie(c, 'session', token, { httpOnly: true, maxAge: 60 });
  
    return c.json({ message: 'Login successful!', token });
  } catch (error) {
    return c.json({ error: 'Login failed!', err: error }, 500);
  }
});

export default login;
