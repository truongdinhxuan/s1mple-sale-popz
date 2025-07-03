import Router from 'koa-router';
import * as clientAPIController from '@functions/controllers/clientAPIController';

export default function webbHookRouter() {
  const router = new Router({prefix: '/clientApi'});
  router.get('/notifications', clientAPIController.getNotificationsAndSettings);
  return router;
}
