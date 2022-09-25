const { User } = require('../db/');
//store all of our functions that will act as middleware between our req and res

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403).send('you do not have correct privileges'); //non-admins cannot get the list of users
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
