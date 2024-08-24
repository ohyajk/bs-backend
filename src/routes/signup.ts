import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import * as OTPAuth from "otpauth";
import { sendMail } from '../lib/mailSender';

const signup = new Hono();
const prisma = new PrismaClient();

let totp = new OTPAuth.TOTP({
  issuer: "ACME",
  label: "AzureDiamond",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: "NB2W45DFOIZA", 
});

signup.post('/', async (c) => {
  const { email } = await c.req.json();
  console.log(email);
  let token = totp.generate();


  try {
     await prisma.users.create({
      data: {
        email,
        otp: token
      },
    });

    sendMail(email, token);

    return c.json({ message: 'Signup successful! OTP sent to email.' }, 201);
  } catch (error) {
    return c.json({ error: 'Signup failed!', err:error }, 500);
  }
});

export default signup;