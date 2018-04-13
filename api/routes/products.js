const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res
    .status(200)
    .json({
      message: 'It came from GET /products',
    });
});

router.post('/', (req, res, next) => {
  const { name, price } = req.body;
  const product = {
    name,
    price,
  };
  res
    .status(201)
    .json({
      message: 'It came from POST /products',
      product,
    });
});

router.get('/:productID', (req, res, next) => {
  const { productID } = req.params;
  // Using testing ID
  if (productID === 'correct') {
    res
      .status(200)
      .json({
        message: 'It came from GET /products/:productID and ID is correct',
        productID,
      });
  } else {
    res
      .status(200)
      .json({
        message: 'It came from GET /products/:productID and ID IS NOT correct',
      });
  }
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
