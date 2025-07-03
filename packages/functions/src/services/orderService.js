export async function getNotification(shop, orderId, orderData) {
  const query = `query {
    order(id: "${orderId}") {
      createdAt
      shippingAddress {
        city
        country
        firstName
      }
      lineItems(first: 1) {
        edges {
          node {
            product {
            id
            title
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
  }`;

  const response = await shop.graphql(query);
  const order = response?.order;
  const product = order?.lineItems?.edges?.[0]?.node?.product;

  return {
    firstName: order?.shippingAddress?.firstName || '',
    city: order?.shippingAddress?.city || '',
    country: order?.shippingAddress?.country || '',
    productId: product?.id || '',
    productName: product?.title || '',
    productImage: product?.images?.edges?.[0]?.node?.url || '',
    timestamp: new Date(order?.createdAt || Date.now())
  };
}
