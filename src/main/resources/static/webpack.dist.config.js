const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: false,
  context: path.join(__dirname, 'src'),
  metadata: {
    ENV: 'build'
  },
  entry: {
    main: [
      // './styles/index.less',
      './index'
    ],
  },
  output: {
    path: path.join(__dirname, 'build/static'),
    filename: '[name].bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    // new LodashModuleReplacementPlugin(),
    // new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      ENV: '"dist"',
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new CopyWebpackPlugin([
      {
        from: './data',
        to: '../data'
      },
      {
        from: './assets',
        to: '../assets'
      },
      {
        from: './sw.js',
        to: '../'
      },
      {
        from: './servicewworker-cache-polyfill.js',
        to: '../'
      }

    ]),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunksSortMode: 'dependency'
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
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
      }
    ]
  }
};

