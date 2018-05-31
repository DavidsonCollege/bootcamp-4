const router = require("express").Router();
const User = require("mongoose").model("User");
const uuid = require('uuid/v1');

router.post("/firstname/:fn/lastname/:ln/username/:un/password/:pw/email/:em", (req, res) => {
    const key = uuid();
    const newUser = new User({
        firstName: req.params.fn,
        lastName: req.params.ln,
        userName: req.params.un,
        password: req.params.pw,
        email: req.params.em,
        key: key
    });
    newUser.save().then(() => {
        res.send({status: "success",
        key: key})
    });
});

module.exports = router;