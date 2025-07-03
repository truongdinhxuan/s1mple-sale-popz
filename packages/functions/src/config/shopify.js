import * as functions from 'firebase-functions';

const {shopify} = functions.config();

export default {
  secret: shopify.secret,
  apiKey: shopify.api_key,
  firebaseApiKey: shopify.firebase_api_key,
  // scopes: shopify.scopes?.split(',') || ['read_themes'],
  accessTokenKey: shopify.access_token_key || 'avada-apps-access-token',
  scopes: [
    'read_themes',
    'write_themes',
    'read_products',
    'read_orders',
    'read_script_tags',
    'read_customers',
    'write_script_tags',
    'read_script_tags'
  ]
};
