const router = require("express").Router();
const Todo = require("mongoose").model("Todo");

// Get all todos
router.get("/", (req, res) => {
    Todo.find({}, (err, todos) => {
        res.send(todos);
    });
});

// Get all completed todos
router.get("/completed", (req, res) => {
    Todo.find({completedOn: {$ne: null}}, (err, todos) => {
        res.send(todos);
    });
});

// Get all uncompleted todos
router.get("/uncompleted", (req, res) => {
    Todo.find({completedOn: null}, (err, todos) => {
        res.send(todos);
    });
});

router.post("/", (req, res) => {
    const newTodo = new Todo({
        description: req.body.description,
        completedOn: null,
        createdOn: Date.now()
    });
    newTodo.save().then(() => {
        Todo.find({}, (err, todos) => {
            res.render('pages/index', {todos: todos});
        });
    })
});

// Get todo by ID
router.get("/:id", (req, res) => {
    const id = req.params.id;
    Todo.findById(id, (err, todo) => {
        res.send(todo);
    })
});

// Add a new todo
router.post("/:description", (req, res) => {
    const newTodo = new Todo({
        description: req.params.description,
        completedOn: null,
        createdOn: Date.now()
    });
    newTodo.save().then(() => {
        res.send({status: "success"})
    })
});

router.delete("/", (req, res) => {
    const id = req.body.id;
    Todo.findByIdAndDelete(id, (err, todo) => {
        Todo.find({}, (err, todos) => {
            res.render('pages/index', {todos: todos});
        });
    })
});

// Delete a todo by id
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndDelete(id, (err, todo) => {
        Todo.find({}, (err, todos) => {
            res.render('pages/index', {todos: todos});
        });
    })
});

// Mark todo as completed
router.put("/:id/completed", (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndUpdate(id, {$set: {completedOn: Date.now()}}, (err, todo) => {
        res.send({status: "success"});
    })
});

// Update text by id
router.put("/:id/description/:d", (req, res) => {
    const id = req.params.id;
    const d = req.params.d;
    Todo.findByIdAndUpdate(id, {$set: {description: d}}, (err, todo) => {
        res.send({status: "success"});
    })
});

module.exports = router;