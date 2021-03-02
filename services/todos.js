// stateless - no memory
// statefull - memory - cash. next try bring from the memory 

// require('./file-db');
const { getData, setData } = require('../file-db');
const Todo = require('../models/todo');

const PATH = "todos.json";

function addTodo(todo) {
    // mongoose
    // const newTodo = new Todo(todo); // assign obj according to schema
    // return todo.save(); // save returns promise/async function. do insertOne

    // mongo directly 
    return Todo.insertOne(todo); // vallidation with schema
    // return Todo.collection.insertOne(todo); // no vallidation with schema
}

async function removeTodo(id) {
    const todos = await getData(PATH);
    await setData(PATH, todos.filter(todo => todo.id !== id));
}

async function updateTodo(id, changes = {}) {
    let todos = await getData(PATH);
    const todo = todos.find(todo => todo.id === id)

    Object.assign(todo, changes); // assign. change the object
    await setData(PATH, todos);
    return todo;
}

function getTodos(filters = {}) {
    const querry = {};
    if ('isDone' in filters) {
        querry.isDone = filters.isDone;
    }
    if ('content' in filters) {
        querry.content = new RegExp(filters.content, 'i');
    }
    if ('user' in filters) {
        querry.user = filters.user;
    }

    return Todo.find(querry);
}

// user need to use await to use this function
async function getTodo(id) {
    return Todo.findOne({_id = id }); // findOne returns promise
}



module.exports = {
    addTodo, removeTodo, updateTodo, getTodos, getTodo
}

