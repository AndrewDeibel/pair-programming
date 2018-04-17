var path = require('path');

module.exports = {
  mode: 'development',
  entry: './pair-programming.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pair-programming.bundle.js'
  }
};