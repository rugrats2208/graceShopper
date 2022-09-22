const conn = require('../conn');
const { Sequelize } = conn;

const Artist = conn.define('artist', {
    name: {
        type: Sequelize.STRING,
        notNull: true,
    },
    spotifyId: {
        type: Sequelize.STRING,
    },
    img: {
        type: Sequelize.STRING,
        defaultValue: '../../../public/artist-default.jpg',
    },
    genre: {
        type: Sequelize.STRING,
    },
    popularity: {
        type: Sequelize.INTEGER,
    },
});

module.exports = Artist;
