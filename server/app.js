const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

//BODY PARSING MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//STATIC MIDDLEWARE
app.use(express.static(path.join(__dirname, '..', 'public')));

//PROJECT ROUTES
app.use('/api', require('./api'));

//ANY UNDEFINED ROUTE GETS HANDLE WITH THIS
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ERROR HANDLING FOR SERVER SIDE ISSUES
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
