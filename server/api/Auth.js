// apiRoutes/users.js
const router = require('express').Router();
const { User, Order } = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

//dotenv holds our secret JWT key
require('dotenv').config();

// matches GET requests to /api/auth/ - MUST BE VALID USER AND MUST BE ADMIN
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'username',
        'password',
        'email',
        'fName',
        'lName',
        'isAdmin',
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// user login POST
router.post('/login', async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const userData = { username: username, password: password };
    res.send({ token: await User.authenticate(userData) });
  } catch (err) {
    next(err);
  }
});

//User signup POST
router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, email, fName, lName } = req.body; //to prevent malicious injection
    const user = await User.create({ username, password, email, fName, lName });
    await Order.create({ userId: user.id })
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

// matches GET requests to /api/auth/me - returns logged in user data
router.get('/me', requireToken, async (req, res, next) => {
  try {
    const { id, username, isAdmin, fName, lName, email } = req.user;
    const userData = { id, username, fName, lName, email, isAdmin };
    res.json(userData);
  } catch (err) {
    next(err);
  }
});

//grabs the info of user based on params, only if the user is logged in and is anAdmin route/
router.get('/userInfo/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//route for determining if username exists on registration. returns true if ok, false if it exists
router.get('/userExists/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    if (user) {
      res.send(false);
    } else {
      res.send(true);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//route for determining if email exists on registration. returns true if ok, false if it exists
router.get('/emailExists/:email', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.params.email },
    });
    if (user) {
      res.send(false);
    } else {
      res.send(true);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//user info page, gives a logged in user their profile information
router.get('/loggedInInfo', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const { id, username, email, fName, lName } = req.user;
    const userInfo = { id, username, email, fName, lName };
    res.send(userInfo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//allows a user to change their profile info (not all information) route: /api/auth/loggedInEdit
router.put('/loggedInEdit', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const { username, password, email, fName, lName, id } = req.body;
    await user.update({ username, password, email, fName, lName, id });
    res.send(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
