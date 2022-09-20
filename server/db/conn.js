const Sequelize = require('sequelize');

const config = {};

if (process.env.QUIET) {
  config.logging = false;
}

//TEMPORARILY ASSIGNED DATABASE NAME TO "grace-shopper"
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/grace-shopper', config);

module.exports = conn;
