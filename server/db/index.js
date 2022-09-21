const conn = require('./conn');
const { Sequelize } = conn;

//GET DATA FROM SPOTIFY API
const albums = require('./grabAlbums');
console.log(albums);

//DUMMY DATA
const { users } = require('../db/dummyData/users.json');

//MODELS
const User = require('./models/User');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Tag = require('./models/Tag');
const LineItem = require('./models/LineItem'); //line item is the product and the amount of that product to buy

const syncAndSeed = async () => {
    try {
        //WITH FORCE TRUE ENABLED, THE DATABASE WILL DROP THE TABLE BEFORE CREATING A NEW ONE
        console.log('Started Seeding...');
        await conn.sync({ force: true });
        await Promise.all(users.map(user => User.create(user)));
        console.log('Seeding successful!');
    } catch (err) {
        console.log(err);
    }
};

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
    syncAndSeed,
};
