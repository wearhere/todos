import Backbone from 'backbone';
import TodoModel from './TodoModel';

const TodoCollection = Backbone.Collection.extend({
  model: TodoModel
});

export default TodoCollection;
