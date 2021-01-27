require('./file-db');
const { getData, setData } = require('./file-db')

const PATH = "todos.json";


// ---------------- promise ----------------------
// function addTodo(todo) {
//     return getData(PATH)      // arr of todos
//         .then(todos => {
//             todos.push(todo);
//             return todos;
//         })
//         .then(todos => setData(PATH, todos));
// }


// ---- async - await. like promise ---------------
async function addTodo(todo) {
    const todos = await getData(PATH);
    const newId = todos[todos.length-1].id + 1;

    const newTodo = {...todo, id: newId};
    todos.push(newTodo);
    await setData(PATH, todos);

    return newTodo;
}


async function removeTodo(id) {
    const todos = await getData(PATH);
    // console.log('before: ', todos);

    await setData(PATH, todos.filter(todo => todo.id !== id));

    // getData('todos.json').then(data => console.log('after: ', data));
}

/**
 * 
 * @param {int} id 
 * @param {obj} changes 
 */
async function updateTodo(id, changes = {}) {
    let todos = await getData(PATH);

    let [todo] = todos.filter(todo => todo.id === id); // destructiring cause todos is array

    // if (changes.isDone) {
    //     todo.isDone = changes.isDone;
    // }
    // if (changes.content) {
    //     todo.content = changes.content;
    // }
    // await setData(PATH, todos);
    // return todo;

    Object.assign(todo, changes); // assign. change the object
    await setData(PATH, todos);
    return todo;
}

async function getTodos(filters = {}) {
    let todos = await getData(PATH);
    // console.log('before: ', todos);

    // let new_todos;

    // if (filters.id) {
    //     new_todos = todos.filter(todo => todo.id === filters.id);
    // }
    // if (filters.content) {
    //     new_todos = todos.filter(todo => todo.content === filters.content);
    // }
    // if (filters.isDone) {
    //     new_todos = todos.filter(todo => todo.isDone == filters.isDone);
    // }
    // // await setData(PATH, new_todos);
    // return new_todos;

    return todos.filter(todo => {
        let result = true;
        if ('isDone' in filters) {
            result = result && (todo.isDone === filters.isDone);
        }
        if ('content' in filters) {
            // result= result && todo.content.toLowerCase().include(filters.content.toLowerCase());
            result = result && new RegExp(filters.content, 'i').test(todo.content);
        }
        if ('id' in filters) {
            result = result && (todo.id === filters.id);
        }

        return result;
    })

}

module.exports = {
    addTodo, removeTodo, updateTodo, getTodos
}


// [
//     {
//         "id": 1,
//         "content": "aaa",
//         "isDone": false
//     },
//     {
//         "id": 2,
//         "content": "aaa",
//         "isDone": false
//     },
//     {
//         "id": 3,
//         "content": "aaa",
//         "isDone": false
//     }
// ]
