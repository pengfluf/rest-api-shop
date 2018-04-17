const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product
    .find()
    // exec is needed for Promise
    .exec()
    .then(
      (result) => {
        console.log(result);
        res
          .status(200)
          .json(result);
      },
      (err) => {
        console.error(err);
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
        console.log(result);
        res
          .status(201)
          .json({
            message: 'It came from POST /products',
            product,
          });
      },
      (err) => {
        console.error(err);
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
    // exec is needed for Promise
    .exec()
    .then(
      (result) => {
        console.log(result);
        if (result) {
          res
            .status(200)
            .json(result);
        } else {
          console.log('There\'s no such product.');
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
        console.error(err);
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
  console.log(updateOps);

  Product
    .update(
      { _id: productID },
      { $set: updateOps }
    )
    .exec()
    .then(
      (result) => {
        console.log(result);
        res
          .status(200)
          .json(result);
      },
      (err) => {
        console.error(err);
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
      (result) => {
        console.log(result);
        res
          .status(200)
          .json(result);
      },
      (err) => {
        console.error(err);
        res
          .status(500)
          .json({
            error: err,
          });
      }
    );
});

module.exports = router;
