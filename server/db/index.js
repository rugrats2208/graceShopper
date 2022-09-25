const conn = require('./conn');

//MODELS
const User = require('./models/User');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Track = require('./models/Track');
const Artist = require('./models/Artist');
const Tag = require('./models/Tag'); //TODO: seed and implement tags...genres?
const LineItem = require('./models/LineItem'); //line item is the product and the amount of that product to buy

//ASSOCIATIONS
User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Order, { through: 'orderProduct' });
Order.belongsToMany(Product, { through: 'orderProduct' });

LineItem.belongsTo(Order);
Order.hasMany(LineItem);

Product.hasMany(LineItem);
LineItem.belongsTo(Product);

Tag.belongsToMany(Product, { through: 'productTag' });
Product.belongsToMany(Tag, { through: 'productTag' });

Product.hasMany(Track);
Track.belongsTo(Product);

Artist.hasMany(Product);
Product.belongsTo(Artist);

module.exports = {
    conn,
    User,
    Tag,
    Order,
    Product,
    Track,
    Artist,
};
