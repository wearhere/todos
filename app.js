const bootstrapDB = require('./src/server/collections/bootstrap');
const server = require('./src/server');

const PORT = process.env.PORT || '3000';

// Bootstrap data before starting the app.
// TODO(jeff): Move this to an install script so it doesn't slow load.
bootstrapDB()
  .catch((err) => console.log('Could not bootstrap DB:', err))
  .finally(() => {
    server.listen(PORT, () => console.log(`Web server listening on port ${PORT}`));
  });
