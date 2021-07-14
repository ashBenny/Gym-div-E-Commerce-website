const cloudinary = require("cloudinary");

const Product = require("../models/product");
const errorHandler = require("../utils/errorHandler");
const apiFeatures = require("../utils/apiFeatures");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//CREATING NEW PRODUCT

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  let images = []
  if (typeof req.body.images === 'string') {                  // for a single image upload
      images.push(req.body.images)
  } else {
      images = req.body.images                                // for multiple image upload
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: 'products'
      });

      imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url
      })
  }

  req.body.images = imagesLinks
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
      success: true,
      product
  })
});

// GETTING ALL PRODUCTS

exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const productsPerPage = 4;

  const productsCount = await Product.countDocuments();

  const features = new apiFeatures(Product.find(), req.query)
    .search() // for keyword search
    .filter() // filter by category/price/ratings etc..
    .pagination(productsPerPage); // to decide howmany products need to dsipaly & skip

  const products = await features.query;

  res.status(200).json({
    sucess: true,
    productsCount,
    count: products.length,
    products,
    productsPerPage
  });
});

// GETTING ALL PRODUCTS BY ADMIN

exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    sucess: true,
    products,
  });
});

// GETTING A SINGLE PRODUCT

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }
  res.status(200).json({
    sucess: true,
    product,
  });
});

// UPDATING A PRODUCT

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }

  let images = [];
  if (typeof req.body.images === "string") images.push(req.body.images);    //if upload only one image
  else images = req.body.images;                                            // if upload multiple images

  if (images !== undefined) {

    // delete the old image
    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    // store product images in cloudinary
    let imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({ public_id: result.public_id, url: result.url });
    }
    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  
  res.status(200).json({
    success: true,
    product,
  });
});

// DELETING A PRODUCT

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }

  //DELETE IMAGES FROM DB
  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Deleted Sucessfully",
  });
});


