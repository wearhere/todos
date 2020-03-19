const _ = require('underscore');
const messageBus = require('../messageBus');
const Todos = require('../collections/todos');

// TODO(jeff): Confirm that publication-server actually supports
// `async` publications--make sure that error handling works.
module.exports = async function() {
  const publication = this;

  function onAdded(todo) {
    publication.added('todos', todo._id, _.omit(todo, '_id'));
  }

  function onChanged(todo) {
    publication.changed('todos', todo._id, _.omit(todo, '_id'));
  }

  const userId = this.userId;

  const todos = await Todos.find(userId);

  // Publish the initial todos.
  todos.forEach((todo) => {
    // Convert ObjectIDs to strings for consistency with notifications over the
    // message bus.
    onAdded(_.extend({}, todo, { _id: todo._id.toString() }));
  });

  publication.ready();

  // Now publish changes to the todos.
  messageBus.on('todos:created', onAdded);
  messageBus.on('todos:updated', onChanged);

  publication.onStop(() => {
    messageBus.off('todos:created', onAdded);
    messageBus.off('todos:updated', onChanged);
  })
};
