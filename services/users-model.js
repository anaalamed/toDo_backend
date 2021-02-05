const { getData, setData } = require('../file-db')

const PATH = "users.json";

async function addUser(user) {
    const users = await getData(PATH);
    const newId = users[users.length-1].id + 1;

    const newUser = {...user, id: newId};
    users.push(newUser);
    await setData(PATH, users);

    return newUser;
}

async function removeUser(id) {
    const users = await getData(PATH);
    await setData(PATH, users.filter(user =>  user.id !== id));
}
/**
 * 
 * @param {int} id 
 * @param {obj} changes 
 */
async function updateUser(id, changes = {}) {
    let users = await getData(PATH);
    const user = users.find(user => user.id === id)

    Object.assign(user, changes); // assign. change the object
    await setData(PATH, users);
    return user;
}

async function getUsers(id) {
    let users = await getData(PATH);

    return users.find(user => user.id === id);
}

module.exports = {
    addUser, removeUser, updateUser, getUsers
}
