const User = require("../models/userModel");
const catchAsyncFunction = require("../utils/catchAsyncFunction");
const ErrorHandler = require("../utils/ErrorHandlerClass");
const sendToken = require("../utils/sendToken");

module.exports.register = catchAsyncFunction(async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  await newUser.save();
  res.status(200).json({
    success: true,
    message: "User Registered Successfully",
    details: { name, email },
  });
});

// Login User
exports.login = catchAsyncFunction(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  console.log(user);

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});
