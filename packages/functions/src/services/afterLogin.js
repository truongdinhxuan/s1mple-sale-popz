import {createScripttag, syncWebhooks} from '@functions/controllers/webHookController';
import {getCurrentUser} from '@avada/core/build/authentication';
import {getCurrentShopData} from '@functions/helpers/auth';
import {getShopByShopifyDomain} from '@avada/core';

export async function afterLogin(ctx) {
  try {
    const shopData = await getShopByShopifyDomain(ctx.state.shopify.shop);
    // await Promise.all([syncWebhooks(shopData)]);
    await syncWebhooks(shopData);
  } catch (e) {
    console.error(e);
  }
}
