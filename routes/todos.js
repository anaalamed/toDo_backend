// where may address         lifnot 
const {Router} = require('express');
const service = require('../services/todos');
const bodyParser = require('body-parser');
const { CheckTodoPermission } = require('../middlewares/todos');
const Todo = require('../models/todo');

const jsonParser = bodyParser.json();  // access to body and JSON it 
const router = Router();

//_________________________________________________________
// ----------------------- todos methods ------------------
//_________________________________________________________
// ROUTES: 'aa/aaa/aaa' 
// CONTROLLERS: functions 

// print
router.get('/api/todos', async (req, res) => {
    const filters = {
        user: req.user._id
    };
    if (req.query.isDone) {
        filters.isDone = req.query.isDone === 'true';
    }
    if (req.query.content) {
        filters.content = req.query.content;
    }

    const todos = await service.getTodos(filters);
    res.json(todos);
});

// before delete and put: middleware check if user have permission
router.delete('/api/todos/:id', CheckTodoPermission, async (req, res) => {
    await req.todo.remove(); // deleteOne. req.todo from middleware
    // await Todo.deleteOne({_id: req.params.id});
    res.json({ message: 'todo removed successfuly' });
});

// add todo.       
router.post('/api/todos', jsonParser, async (req, res) => {
    const todo = await service.addTodo({ ...req.body, isDone: false, userId: req.user.id });
    res.json(todo);
});

// update todo
router.put('/api/todos/:id', CheckTodoPermission, jsonParser, async (req, res) => {
    Object.assign(req.todo, req.body); // not safe. need to make manual checks  
    
    const todo = req.todo;
    const {content, isDone} = req.body; // only this fields could be updated
    
    if( typeof(isDone) === 'boolean') {
        todo.isDone = isDone
    }
    if(content) {
        todo.content= content;
    }
    
    todo.updated = new Date();
    await todo.save(); // mongoose know which fields changed and assign it to the object. ($set {...}}  
    res.json(todo);
});



// add register and sign up 

module.exports = router;