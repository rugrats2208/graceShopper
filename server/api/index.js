const router = require('express').Router();

//POINT TO CUSTOM ROUTES
router.use('/auth', require('./Auth'));

router.use('/shop', require('./shop'));

// 404 ERROR HANDLING
router.use(function (req, res, next) {
    const err = new Error('Not found.');
    err.status = 404;
    next(err);
});

module.exports = router;
