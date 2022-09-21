const router = require('express').Router();
const { Product, Track, Artist } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const data = await Product.findAll();
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/album/:id', async (req, res, next) => {
    try {
        const data = await Product.findByPk(req.params.id, {
            include: Track,
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/artist/:id', async (req, res, next) => {
    try {
        const data = await Artist.findByPk(req.params.id, {
            include: Product,
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;