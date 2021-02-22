const mongoose = require('mongoose');
// const { Schema, model } = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String, // never do it 
    firstName: String,
    lastName: String,
    bio: String,
    created: Date
});

const User = mongoose.model('User', UserSchema);

module.exports = User;