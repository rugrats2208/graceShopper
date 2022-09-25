// apiRoutes/users.js
const router = require('express').Router();
const { User } = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

//dotenv holds our secret JWT key
require('dotenv').config();

// matches GET requests to /api/auth/ - MUST BE VALID USER AND MUST BE ADMIN
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // where: {
      //   isAdmin: false
      // },
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
    const { id, username, isAdmin } = req.user;
    const userData = { id, username, isAdmin };
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

//user info page, gives a logged in user their profile information, route: /api/auth/loggedInInfo
router.get('/loggedInInfo', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const { username, email, fName, lName } = req.user;
    const userInfo = { username, email, fName, lName };
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
    const { username, password, email, fName, lName } = req.body;
    await user.update({ username, password, email, fName, lName });
    res.send(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// matches POST requests to /api/auth/
router.post('/', function (req, res, next) {
  /* etc */
});
// matches PUT requests to /api/auth/:userId
router.put('/:userId', function (req, res, next) {
  /* etc */
});
// matches DELETE requests to /api/auth/:userId
router.delete('/:userId', function (req, res, next) {
  /* etc */
});

module.exports = router;
