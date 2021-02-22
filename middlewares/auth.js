const modelUsers = require('../services/users');

// if there is userId
const checkUsersHeaders = (req, res, next) => {
    if(req.headers.userid) {
        // req.userId = Number(req.headers.userid); // go to the next function. server use lower case always
        req.userId = req.headers.userid; // go to the next function. server use lower case always
        
        next();
    } else {
        res.status(401).json({message: 'please provide user header'});
    }
};

// if there is user 
const checkExistingUser = (async (req, res, next) => {
    req.user = await modelUsers.getUsers(req.userId);
    if(req.user) {
        next();
    } else {
        res.status(401).json({message: 'User is not recognized'});
    }
});


module.exports = {
    checkUsersHeaders,
    checkExistingUser
}