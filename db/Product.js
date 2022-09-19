const conn = require('./conn');
const { Sequelize } = conn;

const Product = conn.define('product', {
  name: {},
  price: {},
  qty: {},
  img: {},
  descr: {},
});

module.exports = Product;
