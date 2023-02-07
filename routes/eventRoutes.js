const express = require("express");
const { isAuthenticated } = require("../controllers/authController");
const { createEvent } = require("../controllers/eventController.js");
const router = express.Router({ mergeParams: true });

router.route("/").post(isAuthenticated, createEvent);

module.exports = router;
