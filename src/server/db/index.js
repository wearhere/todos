const mongoist = require('mongoist');

// This port must match that used to start the server in the gulpfile.
// TODO(jeff): Production string.
const db = mongoist('mongodb://localhost:27017/app');

(async function createIndexes() {
  return Promise.all([
    db.todos.createIndex({ userId: 1 })
  ]);
})().catch((err) => {
  console.error('Could not create indexes:', err);
});

module.exports = db;
