const path = require('path');
const webpack = require('webpack');

// Webpak Dashboard
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

module.exports = {
  devtool: 'eval',
  metadata: {
    ENV: 'dev'
  },
  cache: true,
  context: path.join(__dirname, 'src'),
  entry: {
    // dynamically add by server.js
  },
  output: {
    path: path.join(__dirname, 'build/static'),
    filename: '[name].bundle.js',
    publicPath: '/static'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      ENV: '"dev"',
    }),
    new DashboardPlugin(dashboard.setData)
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|build/,
        loader: 'react-hot-loader!babel-loader?cacheDirectory=true'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },{
       test: /\.less$/,
       loader: 'style-loader!css-loader!less-loader'
       }/*, {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      }*/
    ]
  }
};
