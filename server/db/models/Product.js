const conn = require('../conn');
const { Sequelize } = conn;

const Product = conn.define('product', {
    name: {
        type: Sequelize.STRING,
        notNull: true,
    },
    price: {
        type: Sequelize.INTEGER,
        notNull: true,
    },
    stock: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
    },
    popularity: {
        type: Sequelize.INTEGER,
        defaultValue: 50,
    },
    img: {
        type: Sequelize.STRING,
        defaultValue: '/music-note.jpg',
    },
    spotifyId: {
        type: Sequelize.STRING,
    },
    totalTrack: {
        type: Sequelize.INTEGER,
    },
    releaseDate: {
        type: Sequelize.STRING,
        notNull: true,
    },
    label: {
        type: Sequelize.STRING,
    },
});

module.exports = Product;
