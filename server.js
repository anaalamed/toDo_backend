const express = require('express'); // from node_modules
const model = require('./services/users-model');
const bodyParser = require('body-parser');

const app = express();  // create server
// app.use(jsonParser = bodyParser.json());
const jsonParser = bodyParser.json();

// middleware example
app.use((req, res, next) => {
    if(req.headers.userId) {
        req.userId = Number(req.headers.userId); // go to the next
        next();
    } else {
        res.status(401).json({'please provide user header'});
    }
});

app.use((req, res, next) => {
    // 
    req.user = await model.getUsers(req.userId);
    if(req.user) {
        next();
    } else {
        res.status(401).json({'User is not recognized'});
    }
});











//_________________________________________________________
// -----------------------todos methods -------------------
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

    const todos = await model.getTodos(filters);
    res.json(todos);
});

app.delete('/api/todos/:id', async (req, res) => {
    await model.removeTodo(Number(req.params.id));
    res.json({ message: 'item deleted successfuly' });
});

// add todo.       /api/todos?cont=a&extraData=done
app.post('/api/todos', jsonParser, async (req, res) => {


    let content = req.query.cont;
    let isDone = req.query.extraData === 'done';

    const todo = await model.addTodo({ content, isDone });
    // res.json({message: 'item added successfuly'});
    res.json(todo);
});

// update todo
app.put('/api/todos/:id', jsonParser, async (req, res) => {
    let id = Number(req.params.id);

    const changes = {};
    if (req.query.isDone) {
        changes.isDone = req.query.isDone === 'done';
    }
    if (req.query.cont) {
        changes.content = req.query.cont;
    }

    const todo = await model.updateTodo(id, changes);
    // res.json({message: 'item updated successfuly'});
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


