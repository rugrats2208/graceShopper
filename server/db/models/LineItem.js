const conn = require('../conn');
const { Sequelize } = conn;

const LineItem = conn.define(
  'lineItem',
  {
    qty: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  {
    hooks: {
      beforeCreate: async (lineItem) => {
        const currentItems = await LineItem.findAll({
          where: { orderId: lineItem.orderId },
        });
        console.log('new item id: ', lineItem.productId);
        currentItems.forEach((item) =>
          console.log('product ids: ', item.productId)
        );
        if (currentItems.some((item) => item.productId === lineItem.productId))
          throw new Error('Item already exists in order');
      },
    },
  }
);

module.exports = LineItem;
