const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

const {
  signup,
  login,
  deleteUser,
} = require('../controllers/user');

router.post('/signup', signup);

router.post('/login', login);

// Just for development
router.delete('/:userID', checkAuth, deleteUser);

module.exports = router;
