import React from 'react';
import PropTypes from 'prop-types';
import TodoModel from '../models/TodoModel';

import { useModel } from '../helpers/useBackbone';

function TodoListEditor({ todo }) {
  function onTitleChange(e) {
    todo.set('title', e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    // Errors are handled by the parent.
    todo.save();
  }

  const { title } = useModel(todo);

  return (
    <form onSubmit={onSubmit}>
      <input type='text' value={title || ''} onChange={onTitleChange} />
      <input type='submit' value='Add' />
    </form>
  );
}

TodoListEditor.propTypes = {
  todo: PropTypes.instanceOf(TodoModel).isRequired,
};

export default TodoListEditor;
