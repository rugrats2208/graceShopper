const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

//BODY PARSING MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//STATIC MIDDLEWARE
app.use(express.static(path.join(__dirname, '..', 'public')));

//PROJECT ROUTES
app.use('api', require('./api'));

//ANY UNDEFINED ROUTE GETS HANDLE WITH THIS
app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
})


module.exports = app;