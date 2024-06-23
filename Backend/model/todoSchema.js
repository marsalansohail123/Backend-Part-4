const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    todo: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

const TodoModel = mongoose.model("Todo", todoSchema);
module.exports = TodoModel;