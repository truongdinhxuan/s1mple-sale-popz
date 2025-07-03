export function simplyOrderResponse(orders) {
  return orders.map(order => ({
    name: order.name,
    createdAt: order.created_at,
    shippingAddress: {
      name: order.shipping_address?.name || '',
      address1: order.shipping_address?.address1 || '',
      city: order.shipping_address?.city || '',
      country: order.shipping_address?.country || ''
    },
    lineItems: order.line_items.map(item => ({
      productName: item.name,
      quantity: item.quantity
    }))
  }));
}
