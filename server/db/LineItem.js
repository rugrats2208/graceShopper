const conn = require('./conn');
const { Sequelize } = conn;

const LineItem = conn.define('lineItem', {
  qty: {
    type: Sequelize.INTEGER,
  },
});

module.exports = LineItem;
