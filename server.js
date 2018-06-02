const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const env = require('dotenv').config()
// Initialize express
const url = process.env.DB_DATABASE;
mongoose.connect(url);
require("./models/");
const app = express();
// Setup console logging
app.use(morgan("tiny"));

// TODO Initialize Mongoose.


// TODO Define a schema for Todo.

app.use(require("./routes"));
// TODO Write your routes here. Interact with database as necessary.

// Listen to port 8080
app.listen(process.env.SERVER_PORT);
