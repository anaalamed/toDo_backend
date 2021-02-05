const express = require('express'); // from node_modules
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();  // access to body and JSON it 

const modelTodo = require('./models/todos');
// const modelUsers = require('./models/users');
const {checkUsersHeaders, checkExistingUser} = require('./middlewares/auth');
const {CheckTodoPermission} = require('./middlewares/todos');


const app = express();  // create server


//_________________________________________________________
// ----------------------- middlewares --------------------
//_________________________________________________________

app.use(checkUsersHeaders); // if there is userId in headers
app.use(checkExistingUser); // if there is user in db


//_________________________________________________________
// ----------------------- todos methods ------------------
//_________________________________________________________

// print
app.get('/api/todos', async (req, res) => {
    const filters = {
        userId: req.user.id
    };

    if (req.query.isDone) {
        filters.isDone = req.query.isDone === 'true';
    }
    if (req.query.content) {
        filters.content = req.query.content;
    }

    const todos = await modelTodo.getTodos(filters);
    // const todos = await modelTodo.getTodos();

    res.json(todos);
});

// before delete and put: middleware check if user have permission
app.delete('/api/todos/:id', CheckTodoPermission, async (req, res) => {
    // await modelTodo.removeTodo(Number(req.params.id));
    await modelTodo.removeTodo(req.todo.id);

    res.json({ message: 'item deleted successfuly' });
});

// add todo.       
app.post('/api/todos', jsonParser, async (req, res) => {
    const todo = await modelTodo.addTodo({...req.body, isDone:false, userId: req.user.id});
    res.json(todo);
});

// update todo
app.put('/api/todos/:id', CheckTodoPermission, jsonParser, async (req, res) => {
    const todo = await modelTodo.updateTodo(req.todo.id, req.body); // Number(req.params.id)
    res.json(todo);
});


app.listen(3000, () => console.log('listening on http://localHost:3000'));













//_______________________________________________________________
// -------------------------- examples --------------------------
//_______________________________________________________________

// ---------------------------- res.json ------------------------
app.get('/hello', (req, res) => {
    res.json({
        a: 5,
        b: 7,
        hello: 'world'
    })
});

// ---------------------------- req.querry -----------------------
app.get('/world', (req, res) => {
    console.log(req.query); // q=....   on link
    // res.send('world!');
    res.json(req.query);
});

// ---------------------------- req.params -----------------------
app.get('/api/shop/:category/:product', (req, res) => {
    const { category, product } = req.params;
    res.json(req.params);
});
 // ________________________________________________________________


