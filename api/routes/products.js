const express = require('express');
const router = express.Router();

const uploadImage = require('../middleware/uploadImage');
const checkAuth = require('../middleware/checkAuth');

const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

router.get('/', getAllProducts);

router.get('/:productID', getProduct);

router.post('/', checkAuth, uploadImage.single('productImage'), createProduct);

router.patch('/:productID', checkAuth, updateProduct);

router.delete('/:productID', checkAuth, deleteProduct);

module.exports = router;
