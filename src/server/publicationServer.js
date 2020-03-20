const PublicationServer = require('publication-server');
const testUserId = require('./db/testUserId');

const todos = require('./publications/todos');

let publicationServer = null;
module.exports = function(server) {
  if (publicationServer) throw new Error('Publication server has already been initialized!');

  publicationServer = new PublicationServer({
    authFn(req, done) {
      // TODO(jeff): Real authentication e.g. using cookies.
      process.nextTick(done, null, testUserId);
    },
    mountPath: '/ws',
    server,
    // TODO(jeff): Switch back to the default `uws`, for performance, if can figure out why
    // compilation fails on Node 12, this sort of error
    // https://github.com/SocketCluster/socketcluster/issues/246. Maybe try upgrading (despite
    // https://github.com/mixmaxhq/publication-server/pull/48) and/or ask how Mixmax is handling
    // this.
    //
    // Also note that we're using the latest ws@2.x rather than 3.x because we can't upgrade Primus
    // to fix https://github.com/primus/primus/issues/597 without forking publication-server.
    transformer: 'websockets',
    errHandler(err) {
      // eslint-disable-next-line no-console
      console.error(`Publication server error: ${err}`);
    },
  });

  publicationServer.publish('todos', todos);
};
