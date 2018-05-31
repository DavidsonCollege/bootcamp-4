const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
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
            unique: true
        },
        password: {
            type: String,
            maxlength: 15
        },
        email: {
            type: String,
            maxlength: 100
        },
        key: {
            type: String,
            unique: true
        }
    }
);

mongoose.model("User", UserSchema);