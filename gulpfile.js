const { dest, parallel, series, watch } = require('gulp');
const livereloadServer = require('gulp-livereload');
const nodemon = require('gulp-nodemon');
const rollup = require('@rollup/stream');
const rollupConfig = require('./rollupConfig');
const source = require('vinyl-source-stream');

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

function serve(done) {
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

function livereload(done) {
  watch('src/client', build);

  livereloadServer.listen({
    // This must match the port used by the client as set up `src/server/index.js`.
    port: 35729
  });

  done();
}

module.exports = {
  default: series(
    build,
    parallel(serve, livereload)
  )
};
