const conn = require('../conn');
const { Sequelize } = conn;

const Product = conn.define('product', {
    name: {
        type: Sequelize.STRING,
        notNull: true,
    },
    price: {
        type: Sequelize.INTEGER,
    }, //base on popularity
    qty: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
    },
    img: {
        type: Sequelize.STRING,
        defaultValue: '../../../public/music-note.jpg',
    },
    spotifyId: {
        type: Sequelize.STRING,
        notNull: true,
    },
    totalTrack: {
        type: Sequelize.INTEGER,
        notNull: true,
    },
    releaseDate: {
        type: Sequelize.STRING,
    },
    label: {
        type: Sequelize.STRING,
    },
});

module.exports = Product;
