const { dest, parallel, series, watch } = require('gulp');
const livereloadServer = require('gulp-livereload');
const nodemon = require('gulp-nodemon');
const rollup = require('@rollup/stream');
const rollupConfig = require('./rollup.config.js');
const source = require('vinyl-source-stream');

function build() {
  return rollup(rollupConfig)
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
