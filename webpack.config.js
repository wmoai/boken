var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'ts-loader' },
        ]
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      actions: path.resolve('src/actions'),
      components: path.resolve('src/components'),
      containers: path.resolve('src/containers'),
      reducers: path.resolve('src/reducers'),
    },
  },
};
