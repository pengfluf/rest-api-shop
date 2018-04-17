const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product
    .find()
    .select('_id name price')
    // exec is needed for Promise
    .exec()
    .then(
      (products) => {
        const response = {
          productsAmount: products.length,
          products: products.map((product) => ({
            _id: product._id,
            name: product.name,
            price: product.price,
            request: {
              type: 'GET',
              url: `http://localhost:3002/products/${product._id}`,
            },
          })),
        };
        res
          .status(200)
          .json(response);
      },
      (err) => {
        res
          .status(500)
          .json({
            error: err,
          });
      }
    );
});

router.post('/', (req, res, next) => {
  const { name, price } = req.body;
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
  });
  product
    .save()
    .then(
      (result) => {
        res
          .status(201)
          .json({
            message: 'Product successfully created',
            product: {
              _id: result._id,
              name: result.name,
              price: result.price,
              request: {
                type: 'POST',
                url: `http://localhost:3002/products/${result._id}`,
              },
            },
          });
      },
      (err) => {
        res
          .status(500)
          .json({
            error: err,
          });
      }
    );
});

router.get('/:productID', (req, res, next) => {
  const { productID } = req.params;

  Product.findById(productID)
    .select('_id name price')
    // exec is needed for Promise
    .exec()
    .then(
      (product) => {
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
      },
      (err) => {
        res
          .status(500)
          .json({ error: err });
      }
    );
});

router.patch('/:productID', (req, res, next) => {
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
    .then(
      (info) => {
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
      },
      (err) => {
        res
          .status(500)
          .json({
            error: err,
          });
      }
    );
});

router.delete('/:productID', (req, res, next) => {
  const { productID } = req.params;

  Product.remove({
    _id: productID,
  })
    // exec is needed for Promise
    .exec()
    .then(
      (info) => {
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
      },
      (err) => {
        res
          .status(500)
          .json({
            error: err,
          });
      }
    );
});

module.exports = router;
