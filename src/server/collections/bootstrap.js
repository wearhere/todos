// TODO(jeff): Make sure this can't be called in production.
const db = require('../db');
const testUserId = require('../db/testUserId');

module.exports = async function bootstrapDB() {
  const todosExist = !!(await db.todos.count());
  if (todosExist) return;

  await db.todos.insert([
    {
      userId: testUserId,
      title: 'thing one',
    },
    {
      userId: testUserId,
      title: 'thing two',
    },
  ]);
};
