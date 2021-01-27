// know to read arguments from terminal and decide what func start
// const { addTodo, removeTodo, updateTodo, getTodos } = require('./todo-model');

const model  = require('./todo-model');


module.exports = async function runCommand([_, __, action, data = '', extraData]) {

    console.log(action, data, extraData);

    switch (action) {
        case 'get': print(data); break;
        case 'delete': remove(data); break;
        case 'add': add(data, extraData); break;
        case 'done': setDone(data, true); break;
        case 'undone': setDone(data, false); break;
    }
}

async function print(filterStr) {
    const filters = {};
    if (filterStr.includes('done')) {
        filters.isDone = true;
    }
    if (filterStr.includes('open')) {
        filters.isDone = false;
    }

    if (!'isDone' in filters && filterStr) {
        filters.content = filterStr;
    }

    const todos = await  model.getTodos(filters);
    console.table(todos);
}

async function remove(id) {
    await model.removeTodo(Number(id));
    console.log('item deleted successfuly');
}

async function add(content, extraData) {
    const todo = await model.addTodo({content, isDone: extraData === 'done'});
    console.log(todo);
}

async function setDone(id, value) {
    await model.updateTodo(Number(id), {isDone: value});
    console.log(id, 'done');
}

