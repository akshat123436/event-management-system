const User = require("../models/userModel");
const catchAsyncFunction = require("../utils/catchAsyncFunction");
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
