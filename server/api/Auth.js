const router = require('express').Router();
const { User } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        res.send([]);
    }
    catch (err) {

    }
});

router.post('/create', async (req, res, next) => {
    try { }
    catch (err) {

    }
});

router.post('/login', async (req, res, next) => {
    try { }
    catch (err) {

    }
});


module.exports = router;

