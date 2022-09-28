const conn = require('./conn');

//MODELS
const User = require('./models/User');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Track = require('./models/Track');
const Artist = require('./models/Artist');
const Tag = require('./models/Tag');
const LineItem = require('./models/LineItem');

//ASSOCIATIONS
User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(LineItem);
LineItem.belongsTo(Order);

Product.hasMany(LineItem, { onDelete: 'CASCADE' });
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
    LineItem,
};
