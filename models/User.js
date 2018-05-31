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
            maxlength: 100
        },
        email: {
            type: String,
            maxlength: 100
        }
    }
);

mongoose.model("User", UserSchema);