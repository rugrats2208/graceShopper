const conn = require('./conn');

//MODELS
const User = require('./models/User');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Track = require('./models/Track');
const Artist = require('./models/Artist');
const Tag = require('./models/Tag');
const LineItem = require('./models/LineItem'); //line item is the product and the amount of that product to buy

//ASSOCIATIONS
User.hasMany(Order);
Tag.hasMany(Product);
LineItem.belongsTo(Product);
Order.belongsTo(User);
Order.hasMany(LineItem);
Product.hasMany(Track);
Track.belongsTo(Product);
Product.belongsTo(Artist);
Artist.hasMany(Product);

module.exports = {
    conn,
    User,
    Tag,
    Order,
    Product,
    Track,
    Artist,
};
