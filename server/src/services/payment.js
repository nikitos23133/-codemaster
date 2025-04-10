const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.createPaymentIntent = async (amount) => {
  return await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    payment_method_types: ['card']
  });
};
