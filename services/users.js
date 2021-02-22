const User = require('../models/user');

function getUsers(id) {
    return User.findById(id);
}

module.exports = {
    getUsers
}
