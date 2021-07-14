const mongoose = require('mongoose');

const connectMongoose = () => {
    mongoose.connect("mongodb://localhost:27017/ecommerce?readPreference=primary&appname=MongoDB%20Compass&ssl=false", {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true
    }).then(res => {
        console.log('Connected to MongoDB Database');
    })
};

module.exports = connectMongoose;