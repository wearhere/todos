import Backbone from 'backbone';

const TodoModel = Backbone.Model.extend({
  idAttribute: '_id',

  urlRoot: '/api/todos',

  defaults: {
    _id: null,
    title: null,
    completedAt: null
  },

  complete() {
    // TODO(jeff): Error handling.
    this.save('completedAt', new Date(), { patch: true });
  }
});

export default TodoModel;
