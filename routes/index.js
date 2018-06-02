const router = require("express").Router();
const User = require("mongoose").model("User");


router.use("/register", require("./register"));

// AUTHORIZATION
router.use((req, res, next) => {
  const key = req.headers.key;
  if(key === undefined){
    res.sendStatus(403).end();
  }else{
    User.find(({uuid:key}), (error, result) => {
     if (result.length === 0){
       res.sendStatus(403).end();
     }else{
       next();
     }
    });
  }
});

router.use("/todo", require("./todo"));

module.exports = router;
