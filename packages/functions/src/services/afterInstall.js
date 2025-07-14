import {initShopify} from '@functions/services/shopifyService';
import {getShopById, getShopByShopifyDomain} from '@avada/core';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {createNotification} from '@functions/repositories/notificationsRepository';
import {DEFAULT_SETTING} from '@functions/const/setting';
import {createSettings} from '@functions/repositories/settingsRepository';
import {extractNumericId} from '@functions/helpers/order/order';

/**
 * Get limit 30 orders from Shopify
 * @param shopData
 */
export async function getOrdersByLimit(shopData) {
  try {
    const shopify = await initShopify(shopData);
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
          productId: extractNumericId(product?.id) || '',
          productImage: product?.images?.nodes[0]?.originalSrc || '',
          timestamp: new Date(order.createdAt),
          shopId: shopData.id,
          shopDomain: shopData.shopifyDomain
        });
      })
    );
    console.log('✅ 30 Orders created');
    // console.dir(shopGraphql.orders.nodes, {depth: null});
    return shopGraphql.orders.nodes;
  } catch (e) {
    console.error(e);
  }
}

/*
 *
 * @param shopDomain
 * @param shopData
 */
export async function createDefaultSetting(shopDomain, shopData) {
  try {
    // const shopDomain = ctx.state.shopify.shop;
    // const shop = await getShopByShopifyDomain(shopDomain);
    await createSettings(shopData.id, {
      shopDomain: shopDomain,
      ...DEFAULT_SETTING
    });
    console.log('✅ Default setting created successfully');
  } catch (e) {
    console.error(e);
  }
}
