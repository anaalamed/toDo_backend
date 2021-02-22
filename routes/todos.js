const {Router} = require('express');
const service = require('../services/todos');
const bodyParser = require('body-parser');
const { checkTodoPermissions } = require('../middlewares/todos');

const jsonParser = bodyParser.json();  // access to body and JSON it 
const router = Router;

//_________________________________________________________
// ----------------------- todos methods ------------------
//_________________________________________________________

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
    await service.removeTodo(req.todo.id);
    res.json({ message: 'todo removed successfuly' });
});

// add todo.       
router.post('/api/todos', jsonParser, async (req, res) => {
    const todo = await service.addTodo({ ...req.body, isDone: false, userId: req.user.id });
    res.json(todo);
});

// update todo
router.put('/api/todos/:id', CheckTodoPermission, jsonParser, async (req, res) => {
    const todo = await service.updateTodo(req.todo.id, req.body); // Number(req.params.id)
    res.json(todo);
});

module.exports = router;