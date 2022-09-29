const conn = require('../conn');
const { Sequelize } = conn;

const Product = conn.define(
    'product',
    {
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
            defaultValue: '/https://www.holeandcorner.com/site/wp-content/uploads/2017/12/GoldenRecordImages7.jpg',
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
    },
    {
        hooks: {
            afterUpdate: async product => {
                const items = await product.getLineItems();
                await Promise.all(
                    items
                        .filter(item => item.qty > product.stock)
                        .map(item => {
                            item.update({ qty: product.stock });
                        })
                );
            },
        },
    }
);

module.exports = Product;
