import { serve } from '@hono/node-server'
import { Hono } from 'hono';
import bikes from './routes/bike';
import signup from './routes/signup';
import login from './routes/login';
import user from './routes/user';
import rando from './routes/rando';
import { cors } from 'hono/cors';
import order from './routes/order';

const app = new Hono<{ Variables: { session: string } }>().basePath('/api');

app.use('*', cors());

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/bike', bikes)
app.route('/signup', signup)
app.route('/login', login)
app.route('/user', user)
app.route('/rando', rando)
app.route('/order', order)


serve(app, (info) => {
  console.log(`Listening on http://localhost:${info.port}/api`) 
})