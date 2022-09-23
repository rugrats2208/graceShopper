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
        notNull: true,
    },
    explicit: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Track;
