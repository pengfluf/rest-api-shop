const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  User.find({
    email,
  })
    .exec()
    // Check if this email is already taken
    .then((user) => {
      if (user.length >= 1) {
        return res
          .status(409)
          .json({
            message: 'This email address is already taken.',
          });
      }
      // If the email isn't taken, just sign up
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res
            .status(500)
            .json({
              error: err,
            });
        }
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          email,
          password: hash,
        });
        newUser
          .save()
          .then((result) => {
            res
              .status(201)
              .json({
                message: 'Signed up successfully.',
                _id: result._id,
                email: result.email,
              });
          })
          .catch((error) => res
            .status(500)
            .json({
              message: 'Signing up failed.',
              error,
            }));
      });
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    email,
  })
    .exec()
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({
            message: 'Unauthorized.',
          });
      }
      bcrypt.compare(
        password,
        user.password,
        (err, result) => {
          if (err) {
            return res
              .status(401)
              .json({
                message: 'Unauthorized.',
              });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userID: user._id,
              },
              process.env.JWT_KEY,
              {
                expiresIn: '1h',
              },
            );
            return res
              .status(200)
              .json({
                message: 'Authorized successfully.',
                token,
              });
          }
          return res
            .status(401)
            .json({
              message: 'Unauthorized.',
            });
        }
      );
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          error: err,
        });
    });
};

exports.getAccountInfo = (req, res, next) => {
  const { userID } = req.params;

  User.findById(userID)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({
            _id: user._id,
            email: user.email,
          });
      }
      return res
        .status(401)
        .json({
          error: {
            message: 'Unauthorized.',
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
};

exports.deleteAccount = (req, res, next) => {
  const { userID } = req.params;

  User.findById(userID)
    .then((user) => {
      if (user) {
        return User
          .remove({
            _id: userID,
          })
          .exec()
          .then((info) => {
            res
              .status(200)
              .json({
                ok: info.ok,
                message: 'Account successfully deleted.',
              });
          });
      }
      return res
        .status(401)
        .json({
          error: {
            message: 'Unauthorized.',
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
};
