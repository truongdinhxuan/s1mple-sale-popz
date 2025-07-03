import {
  getNotifications,
  createNotification
} from '@functions/repositories/notificationsRepository';

async function getNotificationsList(ctx) {
  const data = await getNotifications();
  return (ctx.body = {
    data: data,
    success: true
  });
}
module.exports = {getNotificationsList, createNotification};
