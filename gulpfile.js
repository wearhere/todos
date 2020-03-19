const { dest, parallel, series, watch } = require('gulp');
const livereloadServer = require('gulp-livereload');
const { mkdir } = require('fs').promises;
const nodemon = require('gulp-nodemon');
const rollup = require('@rollup/stream');
const rollupConfig = require('./rollupConfig');
const source = require('vinyl-source-stream');
const { spawn } = require('child_process');

const MONGO_DB_DIR = 'data';
// This must match the port used by the client in `src/server/db/index.js`.
const MONGO_PORT = 27017;
// This must match the port used by the client as set up `src/server/index.js`.
const LIVERELOAD_PORT = 35729;

// Declare the cache variable outside of task scopes.
// TODO(jeff): Determine whether this should be bundle-specific, if/when this project generates
// multiple bundles.
let cache;

function build() {
  return rollup(rollupConfig({ cache }))
    .on('bundle', (bundle) => {
      // Update the cache after every new bundle is created
      cache = bundle;
    })
    .pipe(source('bundle.js'))
    .pipe(dest('./public'))
    // TODO(jeff): Use `livereloadServer#changed` for more fine-grained reloading once we generate
    // multiple bundles. See the comment in `src/server/index.js` too.
    .pipe(livereloadServer());
}

function serveWeb(done) {
  nodemon({
    watch: 'src/server',
    ext: 'js json html',
    done
  })
  .on('restart', () => {
    // When the server restarts, reload the client, for safety.
    // HACK(jeff): Use a short delay to make sure that the server is listening.
    setTimeout(() => livereloadServer.reload(), 100);;
  });
}

async function serveDB() {
  // The recursive option suppresses errors if the directory already exists.
  await mkdir(MONGO_DB_DIR, { recursive: true });

  const mongo = spawn('mongod', [
    `--port=${MONGO_PORT}`,
    `--dbpath=${MONGO_DB_DIR}`
  ]);

  // Suppress stdout since it's noisy and probably not all that helpful.
  // TODO(jeff): Run Mongo under a process manager so that the developer can easily and separately
  // view its logs if it's desired.
  mongo.stderr.on('data', (data) => {
    console.error('Mongo error:', data.toString());
  });
  mongo.on('close', (code) => {
    console.log('Mongo exited with code', code);
  });

  // HACK(jeff): Not a technically accurate log since Mongo might still be starting up,
  // but close enough for now. Will be fixed by the process manager todo above.
  console.log('Database listening on port', MONGO_PORT);
}

function livereload(done) {
  watch('src/client', build);

  livereloadServer.listen({
    port: LIVERELOAD_PORT
  });

  done();
}

module.exports = {
  default: series(
    build,
    parallel(serveWeb, serveDB, livereload)
  )
};
