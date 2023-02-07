const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandlerClass");

module.exports = async (req, res, next) => {
  // console.log(req.cookies);
  const { token } = req.cookies;
  // console.log(token);
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decodedData);
  req.user = await User.findById(decodedData.id);

  next();
};
