const db = require('../data/dbConfig.js');

module.exports = {
    add,
    findBy,
    findById
};

async function add(user) {
    const [id] = await db('users').insert(user, 'id');
    const newUser = await findById(id);
    console.log("Newly added user:", newUser);
    return newUser;
}

function findBy(filter) {
    return db('users').where(filter).first(); // .first() ensures only one user is returned, not an array
}

function findById(id) {
    return db('users').where({ id }).first();
}
