const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({
      message: 'It came from GET /orders',
    });
});

router.get('/:orderID', (req, res) => {
  const { orderID } = req.params;
  res
    .status(200)
    .json({
      message: 'It came from GET /orders/:orderID',
      orderID,
    });
});

router.post('/', (req, res) => {
  res
    .status(201)
    .json({
      message: 'It came from POST /orders/:orderID',
    });
});

router.delete('/:orderID', (req, res) => {
  const { orderID } = req.params;
  res
    .status(200)
    .json({
      message: 'It came from DELETE /orders/:orderID',
      orderID,
    });
});

module.exports = router;
