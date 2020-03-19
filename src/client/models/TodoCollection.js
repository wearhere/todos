import { PublicationCollection } from 'backbone-publication';
import TodoModel from './TodoModel';

const TodoCollection = PublicationCollection.extend({
  model: TodoModel,
});

export default TodoCollection;
