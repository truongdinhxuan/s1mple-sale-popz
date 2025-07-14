import makeRequest from '../helpers/api/makeRequest';

const BASE_URL = process.env.BASE_URL;
console.log(BASE_URL);
export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };
  getApiData = async () => {
    // const productId = window.ShopifyAnalytics.meta.product.id;
    // console.log('productId: ', productId);
    const data = fetch('https://ip-api.com/json')
      .then(res => res.json())
      .then(data => {
        console.log(data.country_name); // Vietnam
        console.log(data.city); // Ho Chi Minh City
      });
    const shopifyDomain = window.Shopify.shop;
    const {notifications, settings} = await makeRequest(
      `https://${BASE_URL}/clientApi/notifications?shopDomain=${shopifyDomain}`,
      'get'
    );
    // console.log(notifications, settings);
    return {notifications, settings};
  };
}
