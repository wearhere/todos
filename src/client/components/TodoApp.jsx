import React, { Fragment, useRef } from 'react';

import TodoCollection from '../models/TodoCollection';
import TodoModel from '../models/TodoModel';

import TodoEditor from './TodoEditor';
import TodoList from './TodoList';

import { useCollection } from '../helpers/useBackbone';

// For testing purposes.
const todos = new TodoCollection([{
  _id: 'abc',
  title: 'thing one'
}, {
  _id: 'def',
  title: 'thing two'
}]);

function TodoApp() {
  // Re-render when the collection's members, or their properties, change.
  // Necessary to refresh the todo editor (see `todos.get` below).
  useCollection(todos);

  const todoBeingEdited = useRef(null);

  // Create a new task if this is our first time rendering or if the task has been saved to our
  // collection.
  if (!todoBeingEdited.current || todos.get(todoBeingEdited.current)) {
    todoBeingEdited.current = (function() {
      const todo = new TodoModel();

      // When the user begins to save the todo, optimistically add it to the collection.
      // TODO(jeff): Consider how to key the tasks without IDs… also how to deduplicate with reactive
      // updates then.
      todo.on('request', (...args) => {
        // TODO(jeff): Only do on initial save.
        console.log(args);
        todos.add(todo);
      });

      // If the save fails, remove it from the collection and show an alert.
      // TODO(jeff): Test this.
      todo.on('error', (...args) => {
        todos.remove(todo);
        alert(`Could not create todo "${todo.get('title')}". Please try again.`);
      })

      return todo;
    })();
  }

  return (
    <Fragment>
      <TodoList todos={todos}/>
      <TodoEditor todo={todoBeingEdited.current}/>
    </Fragment>
  );
}

export default TodoApp;
