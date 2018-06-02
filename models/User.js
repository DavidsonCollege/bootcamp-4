const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 100
    },
    lastName: {
      type: String,
      maxlength: 100
    },
    userName: {
      type: String,
      maxlength: 100,
      unique:true
    },
    password: {
      type: String,
      minlength: 10,
      unique: true
    },
    email: {
      type: String,
      maxlength: 100,
      unique: true
    },
    uuid: {
      type: String,
      unique: true
    }
  }
);
mongoose.model('User', UserSchema);
