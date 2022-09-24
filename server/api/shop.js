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
//TODO: write backend routes
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
    const { name, price, qty, releaseDate, label } = req.body;
    const artistId = Math.floor(Math.random() * (100 - 1) + 1);
    const product = await Product.create({ name, price, qty, releaseDate, label, totalTrack: 0, artistId });
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//TODO: GET PRODUCT FROM DB AND UPDATE WITH NEW INFORMATION
router.put('/albums/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const { name, price, qty, releaseDate, label } = req.body
    const album = await Product.findByPk(req.params.id)
    res.send(await album.update({ name, price, qty, releaseDate, label }));
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
