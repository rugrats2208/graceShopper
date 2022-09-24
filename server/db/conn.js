const Sequelize = require('sequelize');

const config = {
  "logging": false
};
//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

//TEMPORARILY ASSIGNED DATABASE NAME TO "grace-shopper"
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/grace-shopper', config);

module.exports = conn;
