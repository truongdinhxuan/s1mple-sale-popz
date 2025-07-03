import {getSettings, updateSettings} from '@functions/repositories/settingsRepository';
import {getCurrentUserInstance} from '../helpers/auth';

/*
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function getAllSettings(ctx) {
  try {
    const {shopID} = getCurrentUserInstance(ctx);
    console.log(shopID);
    const data = await getSettings(shopID);
    console.log(data);
    return (ctx.body = {
      data: data,
      success: true
    });
  } catch (e) {
    console.error(e);
    ctx.status = 500;
    ctx.body = {
      error: e.message
    };
  }
}

/*
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function updateStoreSetting(ctx) {
  try {
    const {shopID} = getCurrentUserInstance(ctx);
    const data = ctx.req.body;
    await updateSettings(shopID, data);
    ctx.status = 200;
    ctx.body = {
      success: true
    };
  } catch (e) {
    console.error(e);
    ctx.status = 500;
    ctx.body = {
      error: e.message
    };
  }
}

module.exports = {getAllSettings, updateStoreSetting};
