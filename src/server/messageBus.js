const EventEmitter = require('events');

// A simple message bus.
// TODO(jeff): Replace this with something like Redis once the app becomes
// distributed.
module.exports = new EventEmitter();
