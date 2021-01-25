const { promisify } = require('util');
const fs = require('fs');

// functions work with promises
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// need to convert the data that fs.readFile return buffer
function getData(path) {
    return readFile(path)           // buffer: (7b 89 8a 6e...)
        .then(data => data.toString())     // buffer => string. string that we can read but not obj 
        .then(json => JSON.parse(json));    // str => object
}

function setData(path, data) {    // data is object
    return writeFile(path, JSON.stringify(data));  // obj => str
}


module.exports = {
    getData,
    setData
}


// --------------------------------------------------------//
// to print to terminal 
// getData('todos.json').then(data => console.log(data));

// in terminal
// let todos =[];
// getData('todos.json').then(list => todos = list);
// todos.push({id: 2, content: 'my third'});
// setData('todos.json', todos);
// getData('todos.json').then(data => console.log(data));




