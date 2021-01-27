// know to read arguments from terminal and decide what func start
const { addTodo, removeTodo, updateTodo, getTodos } = require('./todo-model');



module.exports = async function runCommand([a, b, action, data]) {

    console.log(action, data);

    if (action === 'remove') {
        removeTodo(JSON.parse(data));
    }


// ------------------ doesn't work -----------------------------
// --------------- change data to obj -------------------------

    if (action === 'add') {
        addTodo( data);            // add like str
        // addTodo( JSON.parse(data));  // error     
    }

    if (action === 'update') {
        // get 2 parametrs. 
        updateTodo();
    }

    if (action === 'get') {
        getTodos(JSON.parse(data)); // error
    }

}
