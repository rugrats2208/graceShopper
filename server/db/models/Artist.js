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
    defaultValue: '/artist-default.jpg',
  },
  genre: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
});

module.exports = Artist;
