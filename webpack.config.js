var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/withTimer/index.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  }
}