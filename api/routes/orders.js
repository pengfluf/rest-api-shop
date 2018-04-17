const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Order
    .find()
    .select('_id productID quantity')
    .exec()
    .then((orders) => {
      res
        .status(200)
        .json({
          ordersAmount: orders.length,
          orders: orders.map((order) => ({
            _id: order._id,
            productID: order.productID,
            quantity: order.quantity,
            request: {
              type: 'GET',
              url: `http://localhost:3002/products/${order._id}`,
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
});

router.get('/:orderID', (req, res, next) => {
  const { orderID } = req.params;

  Order.findById(orderID)
    .select('_id productID quantity')
    .exec()
    .then((order) => {
      if (order) {
        res
          .status(200)
          .json({
            _id: order._id,
            productID: order.productID,
            quantity: order.quantity,
            request: {
              type: 'GET',
              url: `http://localhost:3002/products/${order._id}`,
            },
          });
      } else {
        res
          .status(404)
          .json({
            error: {
              message: 'Order with this ID doesn\'t exist.',
            },
          });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          error: err,
        });
    });
});

router.post('/', (req, res, next) => {
  const { productID, quantity } = req.body;
  Product.findById(productID)
    .then((product) => {
      if (!product) {
        return res
          .status(404)
          .json({
            error: {
              message: 'Product with this ID doesn\'t exist.',
            },
          });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        productID,
        quantity,
      });
      // save() gives us Promise
      // by default
      // so we don't need exec()
      return order.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({
          message: 'Order successfully created',
          product: {
            _id: result._id,
            productID: result.productID,
            quantity: result.quantity,
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
});

router.delete('/:orderID', (req, res, next) => {
  const { orderID } = req.params;

  Order.findById(orderID)
    .then((order) => {
      if (order) {
        return Order
          .remove({
            _id: orderID,
          })
          .exec();
      }
      return res
        .status(404)
        .json({
          error: 'Order with this ID doesn\'t exist.',
        });
    })
    .then((info) => {
      res
        .status(200)
        .json({
          ok: info.ok,
          message: 'Order successfully deleted',
          _id: orderID,
          request: {
            type: 'DELETE',
            url: `http://localhost:3002/orders/${orderID}`,
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
});

module.exports = router;
