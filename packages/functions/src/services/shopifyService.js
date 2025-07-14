import {getShopByShopifyDomain, prepareShopData} from '@avada/core';
import shopifyConfig from '@functions/config/shopify';
import Shopify from 'shopify-api-node';
import {createDefaultSetting, getOrdersByLimit} from '@functions/services/afterInstall';
import {syncWebhooks} from '@functions/controllers/webHookController';

export const API_VERSION = '2024-04';

/**
 * Create Shopify instance with the latest API version and auto limit enabled
 *
 * @param {Shop} shopData
 * @param {string} apiVersion
 * @return {Shopify}
 */
export function initShopify(shopData, apiVersion = API_VERSION) {
  const shopParsedData = prepareShopData(shopData.id, shopData, shopifyConfig.accessTokenKey);
  const {shopifyDomain, accessToken} = shopParsedData;

  return new Shopify({
    shopName: shopifyDomain,
    accessToken,
    apiVersion,
    autoLimit: true
  });
}

/**
 * Handles logic after an app is installed.
 * It syncs webhooks, fetches initial orders, and creates default settings.
 *
 * @param {Object} ctx - The Koa context from the auth middleware.
 */
export async function handleAfterInstall(ctx) {
  const shopDomain = ctx.state.shopify.shop;
  const shopData = await getShopByShopifyDomain(shopDomain);
  try {
    await Promise.all([
      syncWebhooks(shopData),
      getOrdersByLimit(shopData),
      createDefaultSetting(shopDomain, shopData)
    ]);
  } catch (e) {
    console.error(`[handleAfterInstall] Error for shop ${shopDomain}:`, e);
  }
}

/**
 * Handles logic after a user logs in.
 * It syncs webhooks to ensure they are up-to-date.
 *
 * @param {Object} ctx - The Koa context from the auth middleware.
 */
export async function handleAfterLogin(ctx) {
  try {
    const shopDomain = ctx.state.shopify.shop;
    const shopData = await getShopByShopifyDomain(shopDomain);
    // Sync webhooks after Login
    await syncWebhooks(shopData);
    // await getOrdersByLimit(shopData);
  } catch (e) {
    console.error(`[handleAfterLogin] Error for shop ${shopDomain}:`, e);
  }
}
