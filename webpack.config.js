const path = require('path');

module.exports = {
  entry: './server.cjs',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'trafficModuleServer.js'
  },
  module: {
    rules: [
      {
        test: /\.cjs$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
