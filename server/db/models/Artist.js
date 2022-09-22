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
    img: {
        type: Sequelize.STRING,
        defaultValue: '../../../public/music-note.jpg',
    },
    genre: {
        type: Sequelize.STRING,
    },
    popularity: {
        type: Sequelize.INTEGER,
    },
});

module.exports = Artist;
