import Backbone from 'backbone';

const TodoModel = Backbone.Model.extend({
  idAttribute: '_id',

  defaults: {
    _id: null,
    title: null
  },

  // Temporary override of save before the backend is in place.
  // TODO(jeff): Remove this.
  save() {
    this.trigger('request');
  }
});

export default TodoModel;
