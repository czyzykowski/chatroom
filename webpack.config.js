var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    // 'webpack-dev-server/client?http://localhost:8080',
    // 'webpack/hot/only-dev-server',
    './app/frontend/javascripts/index.js'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
  ],
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'application.js',
    publicPath: '/assets/'
  },
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    hot: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|lib)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    modulesDirectories: ['./lib', './src', 'node_modules'],
    alias: {
      faye: path.join(__dirname, 'node_modules', 'faye', 'browser', 'faye-browser.js')
    }
  }
};
