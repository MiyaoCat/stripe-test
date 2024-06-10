// This is your test secret API key.
const stripe = require('stripe')('sk_test_51POXDuCYeKApvPddSAHznZfyVwYCnKHVxvivsWo1daQ80DBM1npelsQnGdX9YPqdlQDBCVqjopaZ7KXkdiTIIrGH00onkqzubE');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:2024';

app.get('/', (req, res) => {
    res.render('home'); // Render the 'home.ejs' template
});

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1POqO2CYeKApvPddvD0XBDdX',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    automatic_tax: {enabled: true},
  });

  res.redirect(303, session.url);
});


app.listen(2024, () => console.log('Running on port 2024'));
