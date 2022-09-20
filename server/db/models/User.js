const conn = require('../conn');
const { Sequelize } = conn;
const jwt = require('jsonwebtoken');

const User = conn.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  fName: {
    type: Sequelize.STRING,
  },
  lName: {
    type: Sequelize.STRING,
  },
});

//create authentication
User.prototype.generateToken = async function () {
  try { }
  catch (err) {

  }
}

User.findByToken = async function (token) {
  try { }
  catch (err) {

  }
}

User.authenticate = async function (user) {
  try { }
  catch (err) {

  }
}



User.prototype.getCart = async function () { };

User.prototype.addToCart = async function () {
  //grab the order associated with the user
  //orders are your cart
};

User.prototype.removeFromToCart = async function () { };

//convert order model from cart to actual placed order
User.prototype.createOrder = async function () { };

module.exports = User;
