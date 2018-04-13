const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({
      message: 'It came from GET /products',
    });
});

router.post('/', (req, res) => {
  res
    .status(201)
    .json({
      message: 'It came from POST /products',
    });
});

router.get('/:productID', (req, res) => {
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

router.patch('/:productID', (req, res) => {
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

router.delete('/:productID', (req, res) => {
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
