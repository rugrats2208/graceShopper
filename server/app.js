const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { fulfillStripeOrder } = require('./fulfillStripeOrder');
require('dotenv').config();

const app = express();

//for STRIPE
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_TEST_SECRET_KEY);
// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');
const endpointSecret = process.env.STRIPE_WEBHOOK_KEY;

//This is an attempt to get the redirects to play nice with Stripe on Heroku. We will see...
let BASE_URL;
if (process.env.BASE_URL) {
  BASE_URL = process.env.BASE_URL;
} else {
  BASE_URL = 'https://rugrats-grace-shopper.herokuapp.com';
}

//MORGAN MIDDLEWARE
app.use(morgan('dev'));

//BODY PARSING MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

//STATIC MIDDLEWARE
app.use(express.static(path.join(__dirname, '..', 'public')));

//STRIPE ROUTES
//stripe route for order fulfillment
app.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  (request, response) => {
    const payload = request.body;
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.STRIPE_WEBHOOK_KEY
      );
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      //grab the line items!
      stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100, expand: ['data.price', 'data.price.product'] },
        function (err, lineItems) {
          // Fulfill the purchase...
          try {
            fulfillStripeOrder(session, lineItems);
          } catch (err) {
            return response
              .status(400)
              .send(`Fulfillment Error: ${err.message}`);
          }
        }
      );
    }

    response.status(200).send('success');
  }
);

//BODY PARSING MIDDLEWARE. Note that this middleware has to be implemented AFTER the stripe webhooks route!
app.use(express.json());

//Stripe checkout route
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: [
          'US',
          'AE',
          'AM',
          'AR',
          'AT',
          'AU',
          'BA',
          'BE',
          'BG',
          'BO',
          'CA',
          'CH',
          'CI',
          'CL',
          'CO',
          'CR',
          'CY',
          'CZ',
          'DE',
          'DK',
          'DO',
          'EE',
          'EG',
          'ES',
          'FI',
          'FR',
          'GB',
          'GM',
          'GR',
          'HK',
          'HR',
          'HU',
          'ID',
          'IE',
          'IL',
          'IS',
          'IT',
          'JP',
          'KE',
          'KR',
          'LI',
          'LT',
          'LU',
          'LV',
          'MA',
          'MT',
          'MU',
          'MX',
          'MY',
          'NA',
          'NL',
          'NO',
          'NZ',
          'PA',
          'PE',
          'PH',
          'PL',
          'PT',
          'PY',
          'RO',
          'RS',
          'SA',
          'SE',
          'SG',
          'SI',
          'SK',
          'SN',
          'SV',
          'TH',
          'TN',
          'TR',
          'TT',
          'UY',
          'ZA',
          'BD',
          'BJ',
          'JM',
          'MC',
          'NE',
          'AG',
          'BH',
          'GH',
          'GT',
          'GY',
          'KW',
          'LC',
          'SM',
          'OM',
          'AZ',
          'BN',
          'BT',
          'EC',
          'MD',
          'MK',
          'QA',
          'AL',
          'AO',
          'DZ',
          'JO',
          'KH',
          'MO',
          'TZ',
          'VN',
        ],
      },
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
      metadata: req.body.metadata,
      success_url: `${BASE_URL}/paymentSuccess`,
      cancel_url: `${BASE_URL}/checkout`,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//PROJECT ROUTES
app.use('/api', require('./api'));

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
