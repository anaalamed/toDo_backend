const runCommand = require('./todos-cmd');
console.log('todos app is ready!');

// const [a, b, action, data] = process.argv;

runCommand(process.argv);