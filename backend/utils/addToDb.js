
const Product = require('../models/product');
const connectDatabase = require('../config/database');
const products = require('../data/products2');

connectDatabase();

const seedProducts  = async () => {
    try {

        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products)
        console.log('All Products are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts ()