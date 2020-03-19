import PublicationClient from 'publication-client';
import React from 'react';
import ReactDOM from 'react-dom';

import TodoCollection from './models/TodoCollection';

import TodoApp from './components/TodoApp';

// Open the websocket.
let Publications = new PublicationClient('/', {});

// Bootstrap our todo collection with data from the server.
const todos = new TodoCollection(window['initialPayload']['todos'] || [], {
  reactiveQuery: Publications.getCollection('todos').find()
});

// Start listening for changes to todos.
Publications.subscribe('todos');

ReactDOM.render(<TodoApp todos={todos}/>, document.querySelector('#app'));
