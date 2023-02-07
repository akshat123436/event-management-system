const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  register,
  login,
  logout,
  updatePassword,
  isAuthenticated,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/password").put(isAuthenticated, updatePassword);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
module.exports = router;
