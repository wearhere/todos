import React from 'react';
import ReactDOM from 'react-dom';

import TodoCollection from './models/TodoCollection';
import TodoList from './components/TodoList';

// For testing purposes.
const todos = new TodoCollection([{
  _id: 'abc',
  title: 'thing one'
}, {
  _id: 'def',
  title: 'thing two'
}]);

ReactDOM.render(<TodoList todos={todos}/>, document.querySelector('#app'));
