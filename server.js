const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const env = require("dotenv").config();
const helmet = require("helmet");

require("./models");

const url = process.env.MONGO_URL;

const app = express();

app.use(morgan("tiny"));
app.use(helmet());

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(url);

app.use(require("./routes"));

// Listen to port 8080
app.listen("8080");
