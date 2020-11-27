const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const app = express()
require("dotenv/config")

// body-parser
app.use(bodyParser.json())

// import Posts Routes
const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute)

// Routes
app.get("/", (req, res) => {
  res.send("we are on home");
});



// Connect to db
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Established");
  });

// How to we start listening to the server
app.listen(3000);
