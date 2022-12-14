const axios = require('axios');
//dotenv holds our secret JWT key
require('dotenv').config();

axios.defaults.baseURL = process.env.BASE_URL;

const fulfillStripeOrder = async (session, lineItems) => {
  // TODO: fill me in

  const { data: items } = lineItems;
  const { GSR_order_id: order_id } = session.metadata;

  let qtyObj = {};

  for (let i = 0; i < items.length; i++) {
    let productIdHolder = session.metadata[i];
    qtyObj = { ...qtyObj, [productIdHolder]: items[i].quantity };
  }
  const { data } = await axios.put('/api/shop/orders/stock', {
    orderId: order_id,
    qtyContainer: qtyObj,
    secret: process.env.JWT,
  });
};
module.exports = {
  fulfillStripeOrder,
};
