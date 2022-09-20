const conn = require('./conn');
const { Sequelize } = conn;

//MODELS
const User = require('./models/User');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Tag = require('./models/Tag');
const LineItem = require('./models/LineItem'); //line item is the product and the amount of that product to buy


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
