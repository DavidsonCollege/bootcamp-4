const router = require("express").Router();
const Todo = require("mongoose").model("Todo");
//get all todos
router.get("/", (req, res) => {
  Todo.find((error, todo) => {
    res.send({ message: "I'm alive!" });
  });
});
//get all completed todos
router.get("/completed", (req, res) => {
  Todo.find({completedOn:{$ne:null}}, (error, todo) => {
    res.send(todo);
  });
});
//get all uncompleted todos
router.get("/uncompleted", (req, res) => {
  Todo.find({completedOn:null}, (error, todo) => {
    res.send(todo);
  });
});
//get a single todo by an id.
router.get("/:id", (req, res) => {
  let myid = req.params.id;
  Todo.findById(myid, (error, todo)=>{
    res.send(todo);
  });
});
//add a new todo.
router.post("/:description", (req, res) => {
  let mydesc = req.params.description;
  let todo = Todo({
    description: mydesc,
    completedOn: null,
    createdOn: Date.now()
  });
  todo.save().then(() => {
    res.send({message: "TODO ITEM ADDED!"});
  });
});
//delete a todo by id
router.delete("/:id", (req, res) => {
  let myid = req.params.id;
  Todo.findByIdAndDelete(myid, (error, todo) => {
    res.send({ message: "TODO WAS REMOVED!" });
  });
});
//mark a todo as complete by id
router.put("/:id/completed", (req, res) => {
  let myid = req.params.id;
  Todo.findByIdAndUpdate(myid, {completedOn:Date.now()}, (error, todo) => {
      res.send({ message: "TODO UPDATED!" });
  });
  // Todo.update({id: myid}, {completedOn: Date.now()});
});
//update the text of a todo by id.
router.put("/:id/description/:description", (req, res) => {
  let myid = req.params.id;
  let mydesc = req.params.description;
  Todo.findByIdAndUpdate(myid, {description:mydesc}, (error, todo) => {
      res.send({ message: "TODO DESCRIPTION UPDATED!" });
  });
});

module.exports = router;
