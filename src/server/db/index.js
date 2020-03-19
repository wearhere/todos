const mongoist = require('mongoist');

// This port must match that used to start the server in the gulpfile.
// TODO(jeff): Production string.
const db = mongoist('mongodb://localhost:27017/app');

module.exports = db;
