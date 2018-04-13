const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

const app = express();

// Connecting to MongoDB
mongoose.connect(`mongodb://new-user_31:${process.env.MONGO_ATLAS_PASSWORD}@cluster0-shard-00-00-28wqd.mongodb.net:27017,cluster0-shard-00-01-28wqd.mongodb.net:27017,cluster0-shard-00-02-28wqd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);

// Console Logging
app.use(morgan('dev'));

// Request Body Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Headers for CORS Handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res
      .header(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE'
      );
    return res
      .status(200)
      .json({});
  }
  next();
});

// Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error Handling
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
