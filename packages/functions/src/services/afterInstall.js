import {initShopify} from '@functions/services/shopifyService';
import {getShopById, getShopByShopifyDomain} from '@avada/core';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {createNotification} from '@functions/repositories/notificationsRepository';
import {DEFAULT_SETTING} from '@functions/const/setting';
import {createSettings} from '@functions/repositories/settingsRepository';

/**
 * Get orders from Shopify
 * @param {import('koa').Context} ctx
 */
export async function getOrdersByLimit(ctx) {
  try {
    const shopDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopDomain);
    const shopify = await initShopify(shop);
    const shopQuery = loadGraphQL('/order.graphql');
    const shopGraphql = await shopify.graphql(shopQuery);
    await Promise.all(
      shopGraphql.orders.nodes.map(async order => {
        const product = order.lineItems.nodes[0]?.product;
        await createNotification({
          firstName: order.shippingAddress?.firstName || '',
          city: order.shippingAddress?.city || '',
          country: order.shippingAddress?.country || '',
          productName: product?.title || '',
          productId: product?.id || '',
          productImage: product?.images?.nodes[0]?.originalSrc || '',
          timestamp: order.createdAt,
          shopId: shop.id,
          shopDomain: shop.shopifyDomain
        });
      })
    );
    // console.dir(shopGraphql.orders.nodes, {depth: null});
    return shopGraphql.orders.nodes;
  } catch (e) {
    console.error(e);
  }
}

export async function createDefaultSetting(ctx) {
  try {
    const shopDomain = ctx.state.shopify.shop;
    const shop = await getShopByShopifyDomain(shopDomain);
    await createSettings(shop.id, {
      shopDomain: shopDomain,
      ...DEFAULT_SETTING
    });
  } catch (e) {
    console.error(e);
  }
}
