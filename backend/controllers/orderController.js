const Order = require('../models/order');
const Product = require('../models/product');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');



// // NEW ORDER


exports.createNewOrder = catchAsyncErrors(async (req,res,next) => {

   const { shippingDetails, orderedItems, itemsPrice, shippingPrice, taxPrice, 
    totalPrice, itemsPaymentInfo } = req.body;

    const order = await Order.create({
        shippingDetails, orderedItems, itemsPrice, shippingPrice, taxPrice, 
        totalPrice, itemsPaymentInfo, user : req.user._id ,paidDate : Date.now()
    });

    res.status(200).json({
        sucess: true,
        message: "Order has placed",
        order
    });

});



////////////////////////////////////////////////////////////////////////////////////////////////////

// TO SEE THE SINGLE ORDER DETAILS


exports.getSingleOrder  = catchAsyncErrors(async (req,res,next) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(!order) {
        return next(new errorHandler('No orders found for this user', 404))
    };
    res.status(200).json({
        sucess: true,
        order
    });

});



// TO SEE OWN ORDERS


exports.myOrders  = catchAsyncErrors(async (req,res,next) => {

    const orders = await Order.find({ id: req.user.id })
    // const orders = await Order.find()

    res.status(200).json({
        success: true,
        orders
    });

});


// GET ALL ORDERS & TOTAL PRICE (BY ADMIN)


exports.allOrders = catchAsyncErrors(async (req,res,next) => {

    const allOrders = await Order.find();

    totalPrice = 0;

    allOrders.forEach(order => {
        totalPrice = totalPrice + order.totalPrice;
    });

    res.status(200).json({
        sucess: true,
        totalPrice,
        allOrders
    });

});


// DELETE ORDER (BY ADMIN)


exports.deleteOrder = catchAsyncErrors(async (req,res,next) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new errorHandler('There is No Order for this User', 404))
    };

    await order.remove();

    res.status(200).json({
        sucess : true,
        message : 'Order deleted successfully'
    });
});








