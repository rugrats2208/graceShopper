const conn = require('../conn');
const { Sequelize } = conn;

const Product = conn.define('product', {
    name: {
        type: Sequelize.STRING,
        notNull: true,
    },
    // price: {}, //base on popularity
    // qty: {},
    // img: {},
    // descr: {},
});

module.exports = Product;
