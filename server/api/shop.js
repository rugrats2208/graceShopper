const router = require('express').Router();
const { Product, Track, Artist, Order, User, LineItem } = require('../db');
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

//PUT api/shop/orders/qty
router.put('/orders/qty', requireToken, async (req, res, next) => {
  try {
    await LineItem.update(
      { qty: req.body.num },
      {
        where: { id: req.body.itemId },
        individualHooks: true,
      }
    );
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//PUT api/shop/orders/stock  ----  STRIPE ONLY!  ------ No token or admin routes, but does require secret key matching
router.put('/orders/stock', async (req, res, next) => {
  try {
    //requires secret key to be sent
    if (req.body.secret !== process.env.JWT) {
      throw new Error('secret required');
    }
    console.log('we are at least here!');

    //mark order as complete
    if (req.body.orderId) {
      const grabOrder = await Order.findByPk(req.body.orderId);
      Order.create({ userId: grabOrder.userId });
      await Order.update(
        { complete: true },
        {
          where: { id: req.body.orderId },
        }
      );
    }

    //reduce inventory by the qty sold
    for (const [key, value] of Object.entries(req.body.qtyContainer)) {
      const product = await Product.findByPk(Number(key));
      const newStock = product.stock - value;
      await Product.update({ stock: newStock }, { where: { id: Number(key) } });
    }

    res.sendStatus(200);
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
    const lineItem = await LineItem.create({
      orderId: order.id,
      productId: req.params.prodId,
    });
    const newItem = await LineItem.findByPk(lineItem.id, {
      attributes: ['id', 'qty'],
      include: {
        model: Product,
        attributes: ['id', 'name', 'stock', 'price', 'img'],
        include: {
          model: Artist,
          attributes: ['id', 'name'],
        },
      },
    });
    res.send(newItem);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//DELETE api/shop/orders/:lineId
router.delete('/orders/:lineId', requireToken, async (req, res, next) => {
  try {
    await LineItem.destroy({ where: { id: req.params.lineId } });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PUT api/shop/order

module.exports = router;
