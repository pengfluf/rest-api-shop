const express = require('express');
const router = express.Router();

const checkItsMyAccount = require('../middleware/checkItsMyAccount');

const {
  signup,
  login,
  getAccountInfo,
  deleteAccount,
} = require('../controllers/user');

router.post('/signup', signup);

router.post('/login', login);

router.get('/:userID', checkItsMyAccount, getAccountInfo);

router.delete('/:userID', checkItsMyAccount, deleteAccount);

module.exports = router;
