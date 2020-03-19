import Backbone from 'backbone';

const TodoModel = Backbone.Model.extend({
  idAttribute: '_id',

  defaults: {
    _id: null,
    title: null,
    completedAt: null
  },

  // Temporary override of save before the backend is in place.
  // TODO(jeff): Remove this.
  save() {
    this.trigger('request');
  },

  complete() {
    // TODO(jeff): This should save instead.
    this.set('completedAt', new Date());
  }
});

export default TodoModel;
