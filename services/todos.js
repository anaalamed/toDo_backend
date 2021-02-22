require('./file-db');
const { getData, setData } = require('../file-db');
const Todo = require('../models/todo');

const PATH = "todos.json";

function addTodo(todo) {
    const todo = new Todo(todo);
    return todo.save();
}

async function removeTodo(id) {
    const todos = await getData(PATH);
    await setData(PATH, todos.filter(todo => todo.id !== id));
}

/**
 * 
 * @param {int} id 
 * @param {obj} changes 
 */
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


async function getTodo(id) {
    const todos = await getData(PATH);
    return todos.filter(todo => todo.id === id);
}



module.exports = {
    addTodo, removeTodo, updateTodo, getTodos, getTodo
}

