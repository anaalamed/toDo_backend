const mongoose = require('mongoose');
// const { Schema, model } = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const TodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: () => false
    },
    user: {
        type: ObjectId,
        ref: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;