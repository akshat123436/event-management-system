const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
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
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
