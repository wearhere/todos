const express = require('express');
const path = require('path');

const app = express();

// This lets webpages source assets relative to this directory.
// Example: `src="bundle.js"` => `public/bundle.js`.
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

module.exports = app;
