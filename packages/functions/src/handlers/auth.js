import App from 'koa';
import 'isomorphic-fetch';
import {contentSecurityPolicy, getShopByShopifyDomain, shopifyAuth} from '@avada/core';
import shopifyConfig from '@functions/config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import appConfig from '@functions/config/app';
import shopifyOptionalScopes from '@functions/config/shopifyOptionalScopes';
import {createDefaultSetting, getOrdersByLimit} from '@functions/services/afterInstall';
import {syncWebhooks} from '@functions/controllers/webHookController';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());
app.use(contentSecurityPolicy(true));

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    accessTokenKey: shopifyConfig.accessTokenKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/embed',
    afterInstall: async ctx => {
      const shopDomain = ctx.state.shopify.shop;
      const shopData = await getShopByShopifyDomain(shopDomain);
      try {
        await Promise.all([
          syncWebhooks(shopData),
          getOrdersByLimit(shopData),
          createDefaultSetting(shopDomain, shopData)
        ]);
      } catch (e) {
        console.error(e);
      }
    },
    afterLogin: async ctx => {
      try {
        const shopDomain = ctx.state.shopify.shop;
        const shopData = await getShopByShopifyDomain(shopDomain);
        // Sync webhooks after Login
        await syncWebhooks(shopData);
      } catch (e) {
        console.error(e);
      }
    },

    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    },
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    },
    optionalScopes: shopifyOptionalScopes
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
