const {getTodo} = require('../services/todos');

// if user have permission to make changes on todo
const CheckTodoPermission = async (req,res,next) => {
    const todo = await getTodo(Number(req.params.id));
    if(todo && todo.user.equals(req.user._id)) { // obj equal obj
        req.todo = todo;
        next();
    }else {
        req.status(403).json({message: "You do not have permissions to this operation"})
    }
}


module.exports = {
    CheckTodoPermission
}