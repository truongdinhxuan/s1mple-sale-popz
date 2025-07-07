import {
  getNotifications,
  createNotification,
  getNotificationsSortedByDate
} from '@functions/repositories/notificationsRepository';

async function getNotificationsList(ctx) {
  const data = await getNotifications();
  return (ctx.body = {
    data: data,
    success: true
  });
}

async function getNotificationOrderBy(ctx) {
  const data = await getNotificationsSortedByDate();
  return (ctx.body = {
    data: data
  });
}

module.exports = {getNotificationsList, createNotification, getNotificationOrderBy};
