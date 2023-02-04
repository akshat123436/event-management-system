const express = require("express");
const dotenv = require("dotenv");

const app = express();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
