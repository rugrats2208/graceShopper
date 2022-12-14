const conn = require('../conn');
const { Sequelize } = conn;

const Order = conn.define('order', {
    complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Order;
