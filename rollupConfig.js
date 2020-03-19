const babel = require('rollup-plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const resolve = require('@rollup/plugin-node-resolve');

const globals = {
  backbone: 'Backbone',
  react: 'React',
  'react-dom': 'ReactDOM'
};

module.exports = function({ cache }) {
  return {
    input: 'src/client/main.jsx',
    cache,
    output: {
      format: 'iife',
      globals
    },
    external: Object.keys(globals),
    plugins: [
      resolve({
        // Add support for importing JSX files without specifying their extension.
        // Example: `import TodoList from './components/TodoList';`
        extensions: ['.js', '.jsx']
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react']
      }),
      commonjs(),
      replace({
        // For the benefit of React.
        // TODO(jeff): Conditionalize this for production as appropriate.
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  };
}
