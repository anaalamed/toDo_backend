require('./file-db');
const { getData, setData } = require('./file-db')

const PATH = "todos.json";

getData('todos.json').then(data => console.log(data));

// ---- promise ----
// function addTodo(todo) {
//     return getData(PATH)      // arr of todos
//         .then(todos => {
//             todos.push(todo);
//             return todos;
//         })
//         .then(todos => setData(PATH, todos));
// }


// ---- async - await. like promise ----
async function addTodo(todo) {
    const todos = await getData(PATH);
    todos.push(todo);
    await setData(PATH, todos);
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
    console.log('before: ', todos);
    let [todo] = todos.filter(todo => todo.id === id); // destructiring cause todos is array
    console.log('todo is: ', todo);

    if (changes.isDone) {
        todo.isDone = changes.isDone;
    }
    if (changes.content) {
        todo.content = changes.content;
    }

    await setData(PATH, todos);

    getData('todos.json').then(data => console.log('after: ', data));

}

async function getTodos(filters = {}) {
    let todos = await getData(PATH);
    console.log('before: ', todos);
    let new_todos;

    if (filters.id) {
        new_todos = todos.filter(todo => todo.id === filters.id); // destructiring cause todos is array
    }
    if (filters.content) {
        new_todos = todos.filter(todo => todo.content === filters.content); // destructiring cause todos is array
    }
    if (filters.isDone) {
        new_todos = todos.filter(todo => todo.isDone === filters.isDone); // destructiring cause todos is array
    }

    await setData(PATH, new_todos);
    getData('todos.json').then(data => console.log('after: ', data));
}

module.exports = {
    addTodo, removeTodo, updateTodo, getTodos
}


// [
//     {
//         "id": 1,
//         "content": "aaa",
//         "isDone": "false"
//     },
//     {
//         "id": 2,
//         "content": "aaa",
//         "isDone": "false"
//     },
//     {
//         "id": 3,
//         "content": "aaa",
//         "isDone": "false"
//     }
// ]
