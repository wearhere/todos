const _ = require('underscore');
const db = require('../db');

async function find(userId) {
  return db.todos.find({
    userId
  });
}

async function create(userId, todo) {
  return db.todos.insert(_.extend({}, todo, { userId }));
}

async function update(userId, todo) {
  const { nModified } = await db.todos.update({
    _id: todo._id,
    userId
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
