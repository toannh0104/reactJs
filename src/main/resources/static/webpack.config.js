var path = require('path');

var node_dir = __dirname + '/node_modules';
var CommonsChunkPlugin = require(node_dir + "/webpack/lib/optimize/CommonsChunkPlugin");
var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var bootstrapPath = node_dir + '/bootstrap/dist/css';
// var bootstrapSocialPath = node_dir + '/bootstrap-social';
// var fontAwesomePath = node_dir + '/font-awesome/css';
module.exports = {
  entry: {
    login: './js/login.js',
    backend: './js/backend.js'
  },
  // entry:  [
  //     "webpack-dev-server/client?http://localhost:9090",
  //     "webpack/hot/only-dev-server",
  //     "./js/app"
  // ],

  devtool: "eval",
  resolve: {
    alias: {
      'stompjs': node_dir + '/stompjs/lib/stomp.js',
    }
    // extensions: ['', '.js', '.jsx', '.css'],
    // modulesDirectories: ['node_modules', bootstrapPath, bootstrapSocialPath, fontAwesomePath]
  },

  // output: {
  //     path: __dirname + "/built/",
  //     filename: "app.js",
  //     publicPath: "http://localhost:9090/built/"
  // },

  output: {
    path: path.join(__dirname, "js"),
    filename: "../built/[name].bundle.js",
    chunkFilename: "../built/[id].chunk.js"
  },
  plugins: [
    new CommonsChunkPlugin({
      filename: "../built/commons.js",
      name: "commons"
    })
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
    // new ExtractTextPlugin('style.css', {allChunks: true})
  ],

  module: {
    loaders: [
      { test: path.join(__dirname, '.'), exclude: /(node_modules)/, loader: 'babel-loader'},
      // {test: /\.jsx?$/, exclude: /node_modules/, loaders: ["babel-loader?stage=0"]},
      // {test: /\.css$/, loader: "style-loader!css-loader"},
      // {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      // {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
      // {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'},
      // {test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loaders: ["file-loader"]}
    ]
  },

  // Additional plugins for CSS post processing using postcss-loader
  // postcss: [
  //   require('autoprefixer'), // Automatically include vendor prefixes
  //   require('postcss-nested') // Enable nested rules, like in Sass
  // ],

  // devServer: {
  //   historyApiFallback: {
  //     index: 'default.html',
  //     rewrites: [
  //       {from: /\/users/, to: '/users.html'}
  //     ]
  //   }
  // }
};