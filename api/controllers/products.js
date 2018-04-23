const mongoose = require('mongoose');
const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
  Product
    .find()
    .select('_id name price productImage')
    // exec is needed for Promise
    .exec()
    .then((products) => {
      res
        .status(200)
        .json({
          productsAmount: products.length,
          products: products.map((product) => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            productImage: product.productImage,
            request: {
              type: 'GET',
              url: `http://localhost:3002/products/${product._id}`,
            },
          })),
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          error: err,
        });
    });
};

exports.getProduct = (req, res, next) => {
  const { productID } = req.params;

  Product.findById(productID)
    .select('_id name price productImage')
    // exec is needed for Promise
    .exec()
    .then((product) => {
      if (product) {
        res
          .status(200)
          .json({
            _id: product._id,
            name: product.name,
            price: product.price,
            request: {
              type: 'GET',
              url: `http://localhost:3002/products/${product._id}`,
            },
          });
      } else {
        res
          .status(404)
          .json({
            error: {
              message: 'There\'s no such product.',
            },
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err });
    });
};

exports.createProduct = (req, res, next) => {
  const { name, price } = req.body;
  const productImage = req.file ? req.file.path : '';
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
    productImage,
  });
  product
    .save()
    .then((result) => {
      res
        .status(201)
        .json({
          message: 'Product successfully created',
          product: {
            _id: result._id,
            name: result.name,
            price: result.price,
            productImage: result.productImage,
            request: {
              type: 'POST',
              url: `http://localhost:3002/products/${result._id}`,
            },
          },
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          error: err,
        });
    });
};

exports.updateProduct = (req, res, next) => {
  const { productID } = req.params;
  const updateOps = {};

  Object.entries(req.body)
    .forEach((operation) => {
      // operation[0] is the key
      // operation[1] is the value
      // just don't want to declare
      // a new variable for each iteration
      updateOps[operation[0]] = operation[1];
    });

  Product
    .update(
      { _id: productID },
      { $set: updateOps }
    )
    // exec is needed for Promise
    .exec()
    .then((info) => {
      res
        .status(200)
        .json({
          ok: info.ok,
          message: 'Product successfully updated',
          _id: productID,
          request: {
            type: 'PATCH',
            url: `http://localhost:3002/products/${productID}`,
          },
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          error: err,
        });
    });
};

exports.deleteProduct = (req, res, next) => {
  const { productID } = req.params;

  Product.remove({
    _id: productID,
  })
    // exec is needed for Promise
    .exec()
    .then((info) => {
      res
        .status(200)
        .json({
          ok: info.ok,
          message: 'Product successfully deleted',
          _id: productID,
          request: {
            type: 'DELETE',
            url: `http://localhost:3002/products/${productID}`,
          },
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          error: err,
        });
    });
};
