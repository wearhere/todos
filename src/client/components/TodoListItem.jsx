import React from 'react';
import PropTypes from 'prop-types';
import TodoModel from '../models/TodoModel';

function TodoListItem({ todo }) {
  return (
    <li>
      {todo.get('title')}
      <button onClick={() => todo.complete()}>Done</button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.instanceOf(TodoModel)
};

export default TodoListItem;
