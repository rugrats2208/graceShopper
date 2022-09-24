const router = require('express').Router();
const { Product, Track, Artist, Order } = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

// GET api/shop
//TODO: change price and track length to human readable here
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

// GET api/shop/album/:id
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

// GET api/shop/artist/:id
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
// GET api/shop/order/:userId
router.get('/order/:userId', async (req, res, next) => {
    try {
        const data = await Order.findAll({
            where: { userId: req.params.userId },
            include: {
                model: Product,
                include: Artist,
            },
        });
        res.send(data);
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

//TODO: GET PRODUCT FROM DB AND UPDATE WITH NEW INFORMATION
router.put('/albums/:id', requireToken, isAdmin, async (req, res, next) => {
    try {
        console.log('in the put route');
        res.send('something');
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
