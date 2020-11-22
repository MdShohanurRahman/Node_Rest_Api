const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");

// middleware
app.use("/posts", () => {
  console.log("This is a middleware running");
});

// Routes
app.get("/", (req, res) => {
  res.send("we are on home");
});

app.get("/posts", (req, res) => {
  res.send("we are on home");
});

// Connect to db
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect");
  });

// How to we start listening to the server
app.listen(3000);

// DB_CONNECTION=mongodb+srv://shohan:lXyAyEXDx6kSx3ZR@cluster0.zklf7.mongodb.net/<dbname>?retryWrites=true&w=majority/node_rest_api
