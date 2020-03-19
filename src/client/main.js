import React from 'react';
import ReactDOM from 'react-dom';

import TodoCollection from './models/TodoCollection';

import TodoApp from './components/TodoApp';

const todos = new TodoCollection(window['initialPayload']['todos'] || []);

ReactDOM.render(<TodoApp todos={todos}/>, document.querySelector('#app'));
