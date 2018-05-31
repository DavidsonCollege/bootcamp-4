const router = require("express").Router();
const User = require("mongoose").model("User");

router.use("/login", require("./login"));

router.use((req, res, next) => {
    const key = req.headers.key;
    if (key === undefined) {
        res.status(403).end();
    }
    else {
        User.find({key: key}, (err, result) => {
            if(result.length === 0) {
                res.status(403).end();
            }
            else {
                next();
            }
        })
    }
});


router.use("/todo", require("./todo"));

module.exports = router;
