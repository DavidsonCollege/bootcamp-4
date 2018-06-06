const router = require("express").Router();
const User = require("mongoose").model("User");
const UUID = require("uuid");

//register a user
router.post("/username/:username/password/:password/email/:email", (req, res) => {
  let myUsername = req.params.username;
  let myPassword = req.params.password;
  let myEmail = req.params.email;
  const myuuid = UUID();
  
  let myUser = User({
    userName: myUsername,
    password: myPassword,
    email: myEmail,
    uuid: myuuid
  });
  myUser.save().then(() => {
  res.send(myuuid);
  });
});


module.exports = router;
