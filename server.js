const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const env = require('dotenv').config()
const bodyParser = require('body-parser')
// Initialize express
const url = process.env.DB_DATABASE;
mongoose.connect(url);
require("./models/");
const Todo = require("mongoose").model("Todo");
const app = express();

// Setup console logging
app.use(morgan("tiny"));

// TODO Initialize Mongoose.


// TODO Define a schema for Todo.

app.use(require("./routes"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Todo.find({}, (error, todo) => {
  res.render('todolist', {todo: todo});
  });
});

app.post("/new", (req, res) => {
  let todo = Todo({
    description: req.body.description,
    completedOn: null,
    createdOn: Date.now()
  });
  todo.save().then(() => {
    Todo.find({}, (error, todo) => {
    res.render('todolist', {todo: todo});
    });
  });
});
app.delete("/new", (req,res) => {
  let toBeRemoved = req.body.description;
  Todo.findByIdAndDelete(toBeRemoved, (error, todo) => {
    Todo.find({}, (error, todo) => {
      res.render('todolist', {todo: todo});
    });
  });
});
// TODO Write your routes here. Interact with database as necessary.
// app.use((req,res,next)=>{
//   let guid = req.headers.key;
// Listen to port 8080
app.listen(process.env.SERVER_PORT);
