const db = require('../data/dbConfig.js');

module.exports = {
    add,
    findBy,
    findById
};

async function add(user) {
    const [id] = await db('users').insert(user, 'id'); // The 'id' here is to make it compatible with PostgreSQL which might be used with knex.
    return findById(id);
}

function findBy(filter) {
    return db('users').where(filter).first(); // .first() ensures only one user is returned, not an array
}

function findById(id) {
    return db('users').where({ id }).first();
}
