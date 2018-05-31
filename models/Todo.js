const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            maxlength: 100
        },
        completedOn: {
            type: Date
        },
        createdOn: {
            type: Date
        },
        userID: {
            type: String
        }
    }
);

mongoose.model("Todo", TodoSchema);