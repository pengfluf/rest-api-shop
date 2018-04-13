const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
  res
    .status(200)
    .json({
      message: 'It came from GET /products',
    });
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
      (result) => console.log(result),
      (err) => console.error(err)
    );
  res
    .status(201)
    .json({
      message: 'It came from POST /products',
      product,
    });
});

router.get('/:productID', (req, res, next) => {
  const { productID } = req.params;

  Product.findById(productID)
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
          .json({ error: err });
      }
    );
});

router.patch('/:productID', (req, res, next) => {
  const { productID } = req.params;
  // Using testing ID
  if (productID === 'correct') {
    res
      .status(200)
      .json({
        message: 'It came from PATCH /products/:productID and ID is correct',
        productID,
      });
  } else {
    res
      .status(200)
      .json({
        message: 'It came from PATCH /products/:productID and ID IS NOT correct',
      });
  }
});

router.delete('/:productID', (req, res, next) => {
  const { productID } = req.params;
  // Using testing ID
  if (productID === 'correct') {
    res
      .status(200)
      .json({
        message: 'It came from DELETE /products/:productID',
        productID,
      });
  } else {
    res
      .status(200)
      .json({
        message: 'It came from DELETE /products/:productID and ID IS NOT correct',
      });
  }
});

module.exports = router;
