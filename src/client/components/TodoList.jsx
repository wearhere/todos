import PropTypes from 'prop-types';
import TodoCollection from '../models/TodoCollection';
import TodoListItem from './TodoListItem';

function TodoList({ todos }) {
  return (
    <ol>
      {todos.map((todo) => <TodoListItem key={todo.id} todo={todo}/>)}
    </ol>
  );
}

TodoList.propTypes = {
  todos: PropTypes.instanceOf(TodoCollection)
}

export default TodoList;
