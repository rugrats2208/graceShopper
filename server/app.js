const express = require('express');
const path = require('path');
const morgan = require('morgan');

//cors is for Stripe
const cors = require('cors');
require('dotenv').config();

const app = express();

//for STRIPE
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_TEST_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');

//This is an attempt to get the redirects to play nice with Stripe on Heroku. We will see...
let BASE_URL;
if (process.env.BASE_URL) {
  BASE_URL = process.env.BASE_URL;
} else {
  BASE_URL = 'https://rugrats-grace-shopper.herokuapp.com';
}
console.log(BASE_URL);

//MORGAN MIDDLEWARE
app.use(morgan('dev'));

//BODY PARSING MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//STATIC MIDDLEWARE
app.use(express.static(path.join(__dirname, '..', 'public')));

//PROJECT ROUTES
app.use('/api', require('./api'));

//STRIPE ROUTES
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free shipping',
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
      line_items: req.body.items,
      customer_email: req.body.email,
      mode: 'payment',
      success_url: `${BASE_URL}/paymentSuccess`,
      cancel_url: `${BASE_URL}/paymentCancel`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//ANY UNDEFINED ROUTE GETS HANDLE WITH THIS
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

//ERROR HANDLING FOR SERVER SIDE ISSUES
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
