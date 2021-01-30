const express = require('express'); // from node_modules
const app = express();  // create server

const model  = require('./todo-model');

app.get('/api/todos', async (req, res) => {
    const filters = {};
    if (req.query.isDone) {
        filters.isDone = req.query.isDone === 'true';
    }
    if (req.query.content) {
        filters.content = req.query.content;
    }

    const todos = await  model.getTodos(filters);
    res.json( todos);
});

app.delete('/api/todos/:id', async (req, res) => {
    await model.removeTodo(Number(req.params.id));
    res.json({message: 'item deleted successfuly'});
});

// add todo.       /api/todos?cont=a&extraData=done
app.post('/api/todos', async (req, res) => {
    let content = req.query.cont;
    let isDone = req.query.extraData === 'done';

    const todo = await model.addTodo({content, isDone});
    res.json({message: 'item added successfuly'});

});

// update todo
app.put('/api/todos/:id', async (req, res) => {
    let id = Number(req.params.id);

    const changes = {};
    if (req.query.isDone) {
        changes.isDone = req.query.isDone === 'done';
    }
    if (req.query.content) {
        changes.content = req.query.content;
    }

    const todo = await model.updateTodo(id, changes);
    res.json({message: 'item updated successfuly'});
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


