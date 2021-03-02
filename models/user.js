const mongoose = require('mongoose');
// const { Schema, model } = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String, 
        required: true,
        unique: true,  // uniq email for each user
        validate: [
            (email = '') => {
                return email.includes('@');
            },
            'email is not a valid email adress'
        ]
    },
    password: String, // never do it 
    firstName: String,
    lastName: String,
    bio: String,
    created: Date
});

const User = mongoose.model('User', UserSchema);

module.exports = User;