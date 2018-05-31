const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const env = require("dotenv").config();
const helmet = require("helmet");
const bodyParser = require("body-parser");

require("./models");

const Todo = mongoose.model("Todo");

const url = process.env.MONGO_URL;

const app = express();

app.use(morgan("tiny"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    Todo.find({}, (err, todos) => {
        res.render('pages/index', {todos: todos});
    });
});

mongoose.connect(url);

app.use(require("./routes"));

// Listen to port 8080
app.listen("8080");
