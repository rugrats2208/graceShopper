const fulfillStripeOrder = (session, lineItems) => {
  // TODO: fill me in

  const { data: items } = lineItems;
  const { GSR_order_id: order_id } = session.metadata;

  for (let i = 0; i < items.length; i++) {
    console.log(
      'product: ',
      session.metadata[i],
      ' remove qty: ',
      items[i].quantity
    );
  }

  console.log('set order id: ', order_id, 'to fulfilled');
};
module.exports = {
  fulfillStripeOrder,
};
