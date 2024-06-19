// This is your test secret API key.
const dotenv = require('dotenv');
dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// console.log(`Stripe Secret Key: ${stripeSecretKey}`); 
const stripe = require('stripe')(stripeSecretKey);
const path = require('path');
const express = require('express');
const app = express();
// const __dirname = new URL('.', import.meta.url).pathname;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.use(express.static('public'));

//live site https://stripe-test-hazel.vercel.app/
const YOUR_DOMAIN = 'http://localhost:4242';

app.get('/', (req, res) => {
    res.render('home'); 
});

app.get('/checkout', (req, res) => {
    res.render('checkout'); // 
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1POqO2CYeKApvPddvD0XBDdX',
          quantity: 1,
        },
        {
          price: 'price_1POwS4CYeKApvPddTuD12dF7',
          quantity: 1,
        }
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
      automatic_tax: {enabled: true},
    });

  res.redirect(303, session.url);
  }catch (error) {
    console.error(`Error creating checkout session: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/cancel', (req, res) => {
    res.render('cancel'); // 
});

app.get('/success', (req, res) => {
    res.render('success'); // 
});


app.listen(4242, () => console.log('Running on port 4242'));
