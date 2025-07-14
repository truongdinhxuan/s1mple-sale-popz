import {getShopByShopifyDomain} from '@avada/core';
import shopify from '../config/shopify';
import {getNotification} from '../services/orderService';
import {createNotification} from '@functions/repositories/notificationsRepository';
import appConfig from '@functions/config/app';
import {initShopify} from '@functions/services/shopifyService';
import Shopify from 'shopify-api-node';

const API_VERSION = '2025-04';
const WEBHOOK_TOPICS = ['orders/create'];

/**
 * Sync webhooks with Shopify
 * @param {Shop} shopData
 * @return {Promise<void>}
 */
export async function syncWebhooks(shopData) {
  try {
    // const webhookId = ctx.request.headers['x-shopify-webhook-id'];
    // console.log('Received webhook', webhookId);
    const client = initShopify(shopData);
    const existingWebhooks = await client.webhook.list();

    for (const topic of WEBHOOK_TOPICS) {
      const existing = existingWebhooks.find(w => w.topic === topic);
      const expectedAddress = `https://${appConfig.baseUrl}/webhook/${topic}`;

      if (!existing) {
        await client.webhook.create({
          topic,
          address: expectedAddress,
          format: 'json'
        });
        console.log('Created webhook', topic);
      } else if (existing.address !== expectedAddress) {
        await client.webhook.delete(existing.id);
        console.log('Deleted old webhook with address:', existing.address);

        await client.webhook.create({
          topic,
          address: expectedAddress,
          format: 'json'
        });
        console.log('Re-created webhook with correct address', topic);
      } else {
        console.log('Webhook already correct for topic:', topic);
      }
    }
  } catch (e) {
    console.error('Error syncing webhooks:', e);
    ctx.body = {success: false};
  }
}

/**
 * Listen to new order (when User create new order, this will listen new order)
 *
 * @param {Object} ctx
 * @return {Promise<void>}
 */
export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const orderId = ctx.req.body.admin_graphql_api_id;
    const shopData = await getShopByShopifyDomain(shopifyDomain, shopify.accessTokenKey);
    const shop = initShopify(shopData);

    const notification = await getNotification(shop, orderId, orderData);
    await createNotification({...notification, shopDomain: shopifyDomain, shopId: shopData.id});
    ctx.body = {success: true};
  } catch (e) {
    console.error('Error in listenNewOrder:', e);
    ctx.body = {success: false};
  }
}

module.exports = {listenNewOrder, syncWebhooks};
