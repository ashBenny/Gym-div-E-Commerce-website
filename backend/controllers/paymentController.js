const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const stripe = require('stripe')('sk_test_51J55icSGTHHNDTdvr5lf46i3z6HRneuTdSZhFSmCAIF5YcsUEFuiHHj4DsjlDgS0SDOT1GzYapdqGvuAIYmKJKSQ00sJDJwIht')

// PROCESS STRIPE PAYMENTS

exports.processPayment = catchAsyncErrors(async (req,res,next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency:'inr',
        metadata: {integration_check:'accept_a_payment'}
    });
    res.status(200).json({
        success:true,
        client_secret:paymentIntent.client_secret
    });
});


// SENDING API KEY TO THE FRIENDEND

exports.sendStripeApi = catchAsyncErrors(async (req,res,next) => {

    res.status(200).json({
        stripeApiKey : 'pk_test_51J55icSGTHHNDTdvCGmBQdO577TYMaS7sXntFxxfT4MqtDgrCpsMLIFepWyUSVUHQIoqiL1tMqsAHmkt4iWSVbjT00s1chs6hl'
    });
});