const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const winston = require('winston')
require('express-async-errors')
const app = express()
require("dotenv/config")

process.on('uncaughtException',  (ex) => {
    console.log("WE GOT AN UNCAUGHT EXCEPTION")
    logger.error(ex.message, {error: ex.stack, service: 'when start'})
    process.exit(1)
})

process.on('unhandledRejection',  (ex) => {
    console.log("WE GOT AN UNHANDLED REJECTION")
    logger.error(ex.message, {error: ex.stack, service: 'unhandled rejection'})
    process.exit(1)
})



const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        // - Write all logs with level `info` in console`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console()
    ],
});

const p = Promise.reject(new Error("Something Failed miserably!!"))
p.then(() => console.log("Done"));

// body-parser
app.use(bodyParser.json())

// import Posts Routes
const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute)

// Routes
app.get("/", (req, res) => {
    throw new Error("Could not get this route")
    // res.send("we are on home");
});

app.use(function (err,req, res, next) {
    logger.info(err.message);
    res.status(500).send(err.message);
})

app.use(function (req, res, next) {
    res.status(404).send("Invalid Route");
})



// Connect to db
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Established");
  });

// How to we start listening to the server
app.listen(4000);

