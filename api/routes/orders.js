const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

const {
  getAllOrders,
  getOrder,
  createOrder,
  deleteOrder,
} = require('../controllers/orders');

router.get('/', checkAuth, getAllOrders);

router.get('/:orderID', checkAuth, getOrder);

router.post('/', checkAuth, createOrder);

router.delete('/:orderID', checkAuth, deleteOrder);

module.exports = router;
