const router = require('express').Router();
const { Product, Track, Artist, Order, User, LineItem } = require('../db');
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

//keeping this route here for the time being to reference
router.get('/pastOrders', requireToken, async (req, res, next) => {
    try {
        //getting user with their past orders
        const userWithPastOrders = await User.findByPk(req.user.id, {
            include: {
                model: Order,
            },
        });
        //extracting array of user's past orders
        const pastOrders = userWithPastOrders.orders;
        const ordersWithProducts = [];
        //looping through the array of orders
        for (let i = 0; i < pastOrders.length; i++) {
            //using id of current order in array to query db to include all the products in the order
            const singleOrderWithProducts = await Order.findByPk(
                pastOrders[i].id,
                {
                    include: {
                        model: Product,
                    },
                }
            );
            ordersWithProducts.push(singleOrderWithProducts);
        }
        //sends an array of all the users past orders with the products eager loaded for each order
        res.send(ordersWithProducts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// CART PATHS
// GET api/shop/orders/:userId
router.get('/orders/:userId', async (req, res, next) => {
    try {
        const data = await Order.findAll({
            where: { userId: req.params.userId },
            attributes: ['id', 'complete'],
            include: {
                model: LineItem,
                attributes: ['id', 'qty'],
                include: {
                    model: Product,
                    attributes: ['id', 'name', 'stock', 'price'],
                    include: {
                        model: Artist,
                        attributes: ['id', 'name'],
                    },
                },
            },
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// POST api/shop/orders/:userId
router.post('/orders/', requireToken, async (req, res, next) => {
    try {
        await Order.create({ userId: req.user.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// PUT api/shop/order
router.put('/orders/:prodId', requireToken, async (req, res, next) => {
    try {
        const order = await Order.findOne({
            where: {
                complete: false,
                userId: req.user.id,
            },
        });
        const product = await Product.findByPk(req.params.prodId);
        await product.createLineItem({ orderId: order.id });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//DELETE api/shop/orders/:lineId
router.delete('/orders/:lineId', requireToken, async (req, res, next) => {
    try {
        await LineItem.destroy({ where: { id: req.params.lineId } });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//ADMIN PATHS
router.post('/albums', requireToken, isAdmin, async (req, res, next) => {
    try {
        const { name, price, stock, releaseDate, label } = req.body;
        const artistId = Math.floor(Math.random() * (100 - 1) + 1);
        const product = await Product.create({
            name,
            price,
            stock,
            releaseDate,
            label,
            totalTrack: 0,
            artistId,
        });
        res.send(product);
    } catch (error) {
        next(error);
    }
});

// PUT api/shop/order

//DELETE api/shop/order

//ADMIN PATHS
router.post('/albums', requireToken, isAdmin, async (req, res, next) => {
    try {
        const { name, price, stock, releaseDate, label } = req.body;
        const artistId = Math.floor(Math.random() * (100 - 1) + 1);
        const product = await Product.create({
            name,
            price,
            stock,
            releaseDate,
            label,
            totalTrack: 0,
            artistId,
        });
        res.send(product);
    } catch (error) {
        next(error);
    }
});

//TODO: GET PRODUCT FROM DB AND UPDATE WITH NEW INFORMATION
router.put('/albums/:id', requireToken, isAdmin, async (req, res, next) => {
    try {
        const { name, price, stock, releaseDate, label } = req.body;
        const album = await Product.findByPk(req.params.id);
        res.send(
            await album.update({ name, price, stock, releaseDate, label })
        );
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
