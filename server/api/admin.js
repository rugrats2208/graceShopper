const router = require('express').Router();
const { Product, User } = require('../db');
const { requireToken, isAdmin } = require('./gatekeepingMiddleware');

router.post('/albums', requireToken, isAdmin, async (req, res, next) => {
    try {
        const { name, price, qty, releaseDate, label } = req.body;
        const artistId = Math.floor(Math.random() * (100 - 1) + 1);
        const product = await Product.create({
            name,
            price,
            qty,
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

router.put('/albums/:id', requireToken, isAdmin, async (req, res, next) => {
    try {
        const { name, price, qty, releaseDate, label } = req.body;
        const album = await Product.findByPk(req.params.id);
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

router.post('/users', requireToken, isAdmin, async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
});

router.put('/users/:id', requireToken, isAdmin, async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
});

router.delete('/users/:id', requireToken, isAdmin, async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
});

module.exports = router;
