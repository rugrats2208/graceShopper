const router = require('express').Router();

//POINT TO CUSTOM ROUTES
router.use('/auth', require('./Auth'));



module.exports = router;