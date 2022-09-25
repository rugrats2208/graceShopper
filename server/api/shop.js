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
      const singleOrderWithProducts = await Order.findByPk(pastOrders[i].id, {
        include: {
          model: Product,
        },
      });
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
router.get('/orders/:userId', requireToken, async (req, res, next) => {
  try {
    const data = await Order.findAll({
      where: { userId: req.params.userId },
      attributes: ['id', 'complete'],
      include: {
        model: LineItem,
        attributes: ['id', 'qty'],
        include: {
          model: Product,
          attributes: ['id', 'name', 'stock', 'price', 'img'],
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
// router.post('/orders/', requireToken, async (req, res, next) => {
//     try {
//         await Order.create({ userId: req.user.id });
//     } catch (error) {
//         console.error(error);
//         next(error);
//     }
// });

// PUT api/shop/orders
router.put('/orders', requireToken, async (req, res, next) => {
  try {
    await Order.update(
      { complete: true },
      {
        where: {
          complete: false,
          userId: req.user.id,
        },
      }
    );
    await Order.create({ userId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PUT api/shop/orders/:prodId
router.put('/orders/:prodId', requireToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        complete: false,
        userId: req.user.id,
      },
    });
    const product = await Product.findByPk(req.params.prodId);
    res.send(await product.createLineItem({ orderId: order.id }));
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

// PUT api/shop/order

module.exports = router;
