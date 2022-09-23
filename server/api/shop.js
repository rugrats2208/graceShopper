const router = require('express').Router();
const { Product, Track, Artist, Order } = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

// GET api/shop
router.get('/', async (req, res, next) => {
    try {
        const data = await Product.findAll({
            include: Artist,
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// GET api/album/:id
router.get('/album/:id', async (req, res, next) => {
    try {
        const data = await Product.findByPk(req.params.id, {
            include: [Track, Artist],
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// GET api/artist/:id
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

// CART PATHS
// GET api/order/:id
router.get('/order/:id', async (req, res, next) => {
    try {
        res.send('hi');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//ADMIN PATHS
router.post('/albums', requireToken, isAdmin, async (req, res, next) => {
    try {
        const { name, price, qty } = req.body;
        const product = await Product.create({ name, price, qty });
        res.send(product);
    } catch (error) {
        next(error);
    }
});

router.delete('/albums/:id', requireToken, isAdmin, async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        await product.destroy();
        res.send(product);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
