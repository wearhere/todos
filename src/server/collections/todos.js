// TODO(jeff): Access control throughout all of this.
const _ = require('underscore');

// For testing purposes.
const todos = [{
  _id: 'abc',
  title: 'thing one'
}, {
  _id: 'def',
  title: 'thing two'
}];

async function find(userId) {
  return todos;
}

async function create(userId, todo) {
  // TODO(jeff): Replace this with actual document returned by database.
  const newTodo = _.clone(todo);
  newTodo._id = new Date().toString();
  todos.push(newTodo);
  return newTodo;
}

async function update(userId, todo) {
  const existingTodo = _.findWhere(todos, { _id: todo._id });
  if (!existingTodo) throw new Error(`Todo with ID ${id} not found`);

  _.extend(existingTodo, todo);
}

module.exports = {
  find,
  create,
  update
};
