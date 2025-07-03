import App from 'koa';
import webHookRouter from '@functions/routes/webhook';

const api = new App();
api.proxy = true;
const router = webHookRouter();

api.use(router.allowedMethods());
api.use(router.routes());

// api.on('error', errorService.handleError);

export default api;
