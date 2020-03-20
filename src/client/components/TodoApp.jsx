import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';

import TodoCollection from '../models/TodoCollection';
import TodoModel from '../models/TodoModel';

import TodoEditor from './TodoEditor';
import TodoList from './TodoList';

import { useModel, useCollection } from '../helpers/useBackbone';

function TodoApp({ todos }) {
  // Re-render when the collection's members, or their properties, change.
  // Necessary to refresh the todo editor (see `todos.get` below).
  useCollection(todos);

  const todoBeingEdited = useRef(null);

  // Create a new task if this is our first time rendering or if the task has been saved to our
  // collection.
  if (!todoBeingEdited.current || todoBeingEdited.current.id) {
    todoBeingEdited.current = (function() {
      const todo = new TodoModel();

      // When the user begins to save the todo, optimistically add it to the collection.
      // HACK(jeff): Disable optimistic addition to the list but instead rely on the publication
      // to add the todo. This prevents duplication, and should be fast enough locally.
      // TODO(jeff): In production, pass the CID through the server and dedupe on that.
      // todo.on('request', () => {
      //   const isInitialSave = !todo.id;
      //   if (isInitialSave) todos.add(todo);
      // });

      // If the save fails, remove it from the collection and show an alert.
      // todo.on('error', (...args) => {
      //   todos.remove(todo);
      //   alert(`Could not create todo "${todo.get('title')}". Please try again.`);
      // })

      return todo;
    })();
  }

  // Bind to the todo being edited so we'll re-render when it's saved.
  useModel(todoBeingEdited.current);

  return (
    <Fragment>
      <TodoList todos={todos} />
      <TodoEditor todo={todoBeingEdited.current} />
    </Fragment>
  );
}

TodoApp.propTypes = {
  todos: PropTypes.instanceOf(TodoCollection).isRequired,
};

export default TodoApp;
