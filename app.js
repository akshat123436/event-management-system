const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const ErrorHandler = require("./utils/ErrorHandlerClass");
const app = express();
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./.env" });
}

mongoose
  .connect(process.env.DB_URI || "mongodb://localhost:27017/EventManagement")
  .then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  })
  .catch((e) => {
    console.log(e);
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Unknown Error";

  //for mongo db cast error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)} Already exists`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
