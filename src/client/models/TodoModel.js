import Backbone from 'backbone';

const TodoModel = Backbone.Model.extend({
  idAttribute: '_id',

  defaults: {
    _id: null,
    title: null
  }
});

export default TodoModel;
