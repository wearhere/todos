// TODO(jeff): Make sure this can't be called in production.
const db = require('../db');

module.exports = async function bootstrapDB() {
  const todosExist = !!(await db.todos.count());
  if (todosExist) return;

  await db.todos.insert([{
    _id: 'abc',
    title: 'thing one'
  }, {
    _id: 'def',
    title: 'thing two'
  }]);
};
