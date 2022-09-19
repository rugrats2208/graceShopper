const conn = require('./conn');
const { Sequelize } = conn;
//jwt token imported here

const User = conn.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  fName: {
    type: Sequelize.STRING,
  },
  lName: {
    type: Sequelize.STRING,
  },
});

//create authentication

User.prototype.getCart = async function () {};

User.prototype.addToCart = async function () {
  //grab the order associated with the user
  //orders are your cart
};

User.prototype.removeFromToCart = async function () {};

//convert order model from cart to actual placed order
User.prototype.createOrder = async function () {};

module.exports = User;
