import React from 'react';
import PropTypes from 'prop-types';
import TodoCollection from '../models/TodoCollection';
import TodoListItem from './TodoListItem';
import { useCollection } from '../helpers/useBackbone';

function TodoList({ todos }) {
  // Re-render when the collection's members, or their properties, change.
  useCollection(todos);

  return (
    <ol>
      {todos
        .filter((todo) => !todo.get('completedAt'))
        .map((todo) => {
          return <TodoListItem key={todo.id || todo.cid} todo={todo}/>;
        })}
    </ol>
  );
}

TodoList.propTypes = {
  todos: PropTypes.instanceOf(TodoCollection).isRequired
}

export default TodoList;
