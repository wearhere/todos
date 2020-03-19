const babel = require('rollup-plugin-babel');
const replace = require('@rollup/plugin-replace');
const resolve = require('@rollup/plugin-node-resolve');

module.exports = {
  input: 'src/client/main.js',
  output: {
    format: 'iife',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  },
  external: ['react', 'react-dom'],
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
    replace({
      // For the benefit of React.
      // TODO(jeff): Conditionalize this for production as appropriate.
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
