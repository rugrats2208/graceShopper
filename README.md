<h1>Team Rugrats' Grace Shopper App</h1>

Welcome to Grace Shopper Records!

Please enjoy your stay.

<hr>
<h2>Key Features<h2>
<hr>

- E-Commerce Website with user and admin experiences.
- Responsive Design
- Administators have a unique dashboard to view all products/subscribers to the site.
  - Protected routes to add, edit and delete inventory/users.
  - Notified if changes to database were successful or if an error has occured.
    > Admin Credentials: <br>
    > Username: 'admin'<br>
    > Password: 'password'<br>
- Users can sign up to the site with a unique username and email.

  - or login to their profile if already subsribed.
  - Guest/Subscribers are able browse inventory, add items to their cart, and checkout their selected goods.
    > User Credentials: <br>
    > Username: 'atuny0'<br>
    > Password: 'password'<br>

Add as many records as you'd like to your cart (up to the maximum we have in our warehouse).

  <h2>Testing Stripe Checkout</h2>
To test Stripe Checkout locally, install stripe-cli
<br>

`$ npm i stripe-cli`

Then type
`$ stripe login`
and follow the login prompt. A password will be required.

After login, run `stripe listen --forward-to localhost:3000/webhook`
While that is running, open a new terminal window and run
`stripe trigger payment_intent.succeeded`
To see if there's a successful webhook action!

The `stripe listen` redirect needs to be running while testing is happening.

When you're ready to check out, use the following dummy credit card info for Stripe:<br><br>
**Card Number:** `4242 4242 4242 4242`<br>
**Expiration Date:** `01/23`<br>
**CVV:** `123`<br>
