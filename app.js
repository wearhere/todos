const bootstrapDB = require('./src/server/collections/bootstrap');
const http = require('http');

const PORT = process.env.PORT || '3000';

// Create the web server.
// Need to wrap the Express server in a real HTTP server for the benefit of the publication server.
const webServer = http.createServer(require('./src/server'));

// Create the publication server and mount it on the web server.
require('./src/server/publicationServer')(webServer);

// Bootstrap data before starting the app.
// TODO(jeff): Move this to an install script so it doesn't slow load.
bootstrapDB()
  .catch((err) => console.log('Could not bootstrap DB:', err))
  .finally(() => {
    webServer.listen(PORT, () => console.log(`Web server listening on port ${PORT}`));
  });
