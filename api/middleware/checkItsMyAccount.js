const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const { userID } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    if (decoded.userID === userID) {
      next();
    } else {
      return res
        .status(401)
        .json({
          message: 'Unauthorized.',
        });
    }
  } catch (error) {
    return res
      .status(404)
      .json({
        message: 'Authorization failed.',
      });
  }
};
