const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    shippingDetails: [{
        address : { type : String, required : true},
        city : { type : String, required : true},
        phoneNo : { type : String, required : true},
        postalCode : { type : String, required : true},
        country : { type : String, required : true},
    }],
    orderedItems: [{
        name : { type : String, required : true},
        quantity : { type : Number, required : true},
        price : { type : Number, required : true},
        image : { type : String, required : true},
        product: {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'Product'
        }
    }],

    itemsPrice: { 
        type : Number,
        required : true,
        default : 0.0
    },
    shippingPrice: { 
        type : Number,
        required : true,
        default : 0.0
    },
    taxPrice: { 
        type : Number,
        required : true,
        default : 0.0
    },
    totalPrice: { 
        type : Number,
        required : true,
        default : 0.0
    },
    itemsPaymentInfo: {
        id : { type : String },
        status : { type : String }
    },
    paidDate: { type:Date },
    orderStatus : {
        type : String,
        required : true,
        default : 'processing'
    },
    createdAt: { type:Date, default:Date.now },
    deliveredAt: { type:Date }
    
});


module.exports = mongoose.model('Order', orderSchema)