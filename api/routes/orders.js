const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/product');

router.get('/', (req, res, next) => {
  res
    .status(200)
    .json({
      message: 'It came from GET /orders',
    });
});

router.get('/:orderID', (req, res, next) => {
  const { orderID } = req.params;
  res
    .status(200)
    .json({
      message: 'It came from GET /orders/:orderID',
      orderID,
    });
});

router.post('/', (req, res, next) => {
  const { productID, quantity } = req.body;
  const order = {
    productID,
    quantity,
  };
  res
    .status(201)
    .json({
      message: 'It came from POST /orders',
      order,
    });
});

router.delete('/:orderID', (req, res, next) => {
  const { orderID } = req.params;
  res
    .status(200)
    .json({
      message: 'It came from DELETE /orders/:orderID',
      orderID,
    });
});

module.exports = router;
