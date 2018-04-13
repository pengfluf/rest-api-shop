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
    .status(200)
    .json({
      message: 'It came from POST /products',
    });
});

module.exports = router;
