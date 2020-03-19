// TODO(jeff): Access control throughout all of this.
const _ = require('underscore');
const db = require('../db');

async function find(userId) {
  return db.todos.find();
}

async function create(userId, todo) {
  return db.todos.insert(todo);
}

async function update(userId, todo) {
  const { nModified } = await db.todos.update({
    _id: todo._id
  }, {
    $set: todo
  });

  if (!nModified) throw new Error(`Todo with ID ${id} not found`);
}

module.exports = {
  find,
  create,
  update
};
