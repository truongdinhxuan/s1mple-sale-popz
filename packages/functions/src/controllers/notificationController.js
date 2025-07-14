import {
  getNotifications,
  createNotification
} from '@functions/repositories/notificationsRepository';

export async function getNotificationsList(ctx) {
  try {
    // console.log('Request: ', ctx.req.query);
    // console.log('Res: ', ctx.res);
    const {shopId, sortBy} = ctx.query;
    // console.log(ctx.query);
    const data = await getNotifications({shopId, sortBy});

    return (ctx.body = {
      data: data,
      success: true
    });
  } catch (e) {
    console.error(e);
    ctx.body = {
      data: {},
      success: false,
      error: e.message
    };
  }
}

module.exports = {getNotificationsList, createNotification};
