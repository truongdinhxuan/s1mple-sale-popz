import App from 'koa';
import clientApiRoutes from '../routes/clientApiRoutes';
import cors from '@koa/cors';

const app = new App();
app.proxy = true;

app.use(
  cors({
    origin: '*'
  })
);

const router = clientApiRoutes();

app.use(router.routes());
app.use(router.allowedMethods());
export default app;
