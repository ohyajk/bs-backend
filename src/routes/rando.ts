import { Hono } from 'hono';
import prisma from '../lib/prismaClient';

const rando = new Hono();

async function updateRandomizer() {
  const randomNum = Math.floor(Math.random() * 1000); 

  await prisma.rando.create({ data: { randomNum } }); 

  console.log('Randomizer updated:', randomNum);
}

setInterval(updateRandomizer, 3600000);

rando.get('/', (c) => c.text('Prisma randomizer running...'));

export default rando;