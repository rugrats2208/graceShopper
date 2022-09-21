const conn = require('../conn');
const { Sequelize } = conn;

const Artist = conn.define('artist', {
    name: {
        type: Sequelize.STRING,
        notNull: true,
    },
    spotifyId: {
        type: Sequelize.STRING,
        notNull: true,
    },
});

module.exports = Artist;
