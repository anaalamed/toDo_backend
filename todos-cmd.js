require('./todo-model')
// know to read arguments from terminal and decide what func start

module.exports = function runCommand([a,b,action, data]) {

    console.log(action, data);
}
