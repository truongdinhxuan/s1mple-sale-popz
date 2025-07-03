import {getNotificationsByShopDomain} from '@functions/repositories/notificationsRepository';
import {getSettingsByShopDomain} from '@functions/repositories/settingsRepository';
import moment from 'moment';

export async function getNotificationsAndSettings(ctx) {
  try {
    const {shopDomain} = ctx.query;
    console.log(shopDomain);
    const [notifications, settings] = await Promise.all([
      getNotificationsByShopDomain(shopDomain),
      getSettingsByShopDomain(shopDomain)
    ]);
    return (ctx.body = {
      notifications,
      settings
    });
    // return (ctx.body = {
    //   message: 'ok'
    // });
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = {
      message: err.message
    });
  }
}

// module.exports = {getNotificationsAndSettings};
