import Router from 'koa-router';
import * as webHookController from '@functions/controllers/webHookController';

export default function webbHookRouter() {
  const router = new Router({prefix: '/webhook'});
  router.post('/orders/create', webHookController.listenNewOrder);
  return router;
}
