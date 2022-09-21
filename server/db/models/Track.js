const conn = require('../conn');
const { Sequelize } = conn;

const Track = conn.define('track', {
    name: {
        type: Sequelize.STRING,
        notNull: true,
    },
    spotifyId: {
        type: Sequelize.STRING,
        notNull: true,
    },
    length: {
        type: Sequelize.INTEGER,
    },
    explicit: {
        type: Sequelize.BOOLEAN,
    },
});

module.exports = Track;
