const _ = require('underscore');
const db = require('../db');
const messageBus = require('../messageBus');

async function find(userId) {
  return db.todos.find({
    userId
  });
}

async function create(userId, todo) {
  const newTodo = await db.todos.insert(_.extend({}, todo, { userId }));

  // Convert IDs to strings for publishing over the message bus as way of future-proofing for e.g.
  // transition to Redis.
  messageBus.emit('todos:created', _.extend({}, newTodo, { _id: newTodo._id.toString() }));

  return newTodo;
}

async function update(userId, todo) {
  const { nModified } = await db.todos.update({
    _id: todo._id,
    userId
  }, {
    $set: todo
  });

  if (!nModified) throw new Error(`Todo with ID ${todo._id} not found`);

  // Convert IDs to strings for publishing over the message bus as way of future-proofing for e.g.
  // transition to Redis.
  messageBus.emit('todos:updated', _.extend({}, todo, { _id: todo._id.toString() }));
}

module.exports = {
  find,
  create,
  update
};
