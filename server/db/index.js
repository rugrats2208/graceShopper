const conn = require('./conn');
const { Sequelize } = conn;

//MODELS
const User = require('./User');
const Order = require('./Order');
const Product = require('./Product');
const Tag = require('./Tag');
const LineItem = require('./LineItem'); //line item is the product and the amount of that product to buy


//ASSOCIATIONS
User.hasMany(Order);
Tag.hasMany(Product);
LineItem.belongsTo(Product);
Order.belongsTo(User);
Order.hasMany(LineItem);

//MODELS
//users
//products
//orders
//tag OR category OR brand

module.exports = {
  conn,
  User,
  Tag,
  Order,
  Product,
};
