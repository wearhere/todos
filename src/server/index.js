const livereload = require('connect-livereload');
const express = require('express');
const nocache = require('nocache');
const path = require('path');

const app = express();

// TODO(jeff): Only run this in development.
// TODO(jeff): If/when this app starts to generate multiple client-side bundles, make sure that
// they don't livereload each other (https://github.com/mixmaxhq/livereload-require-js-includes,
// supposedly obsoleted https://github.com/livereload/livereload-js/issues/59#event-2910930520).
app.use(livereload({
  // This must match the port used by the server as set up in the gulpfile.
  port: 35729
}));

// TODO(jeff): Permit caching in production.
app.use(nocache());

// This lets webpages source assets relative to this directory.
// Example: `src="bundle.js"` => `public/bundle.js`.
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

module.exports = app;
