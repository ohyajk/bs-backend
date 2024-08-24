import { Hono } from 'hono';
import bikes from './routes/bike';
import signup from './routes/signup';
import login from './routes/login';
import { bearerAuth } from 'hono/bearer-auth';
import { getCookie } from 'hono/cookie';
import user from './routes/user';
import rando from './routes/rando';
import { cors } from 'hono/cors';

const app = new Hono<{ Variables: { session: string } }>().basePath('/api');

app.use('*', cors());
app.use(
  '/user/*',
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === getCookie(c, 'session');
    },
  })
)

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/bike', bikes)
app.route('/signup', signup)
app.route('/login', login)
app.route('/user', user)
app.route('/rando', rando)

export default app;
