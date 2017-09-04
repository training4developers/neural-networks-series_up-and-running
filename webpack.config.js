const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcFolder = 'src';
const destFolder = 'dist';
const srcFolderPath = path.join(__dirname, srcFolder);
const jsFolderPath = path.join(srcFolderPath, 'js');

module.exports = {
  context: jsFolderPath,
  entry: { app: path.join(jsFolderPath, 'app.js') },
  resolve: {
    extensions: [ '.js', '.json' ],
    modules: [ jsFolderPath, path.join(__dirname, 'node_modules') ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [ 'env', {
                  modules: false,
                  targets: {
                    browsers: 'last 1 versions',
                  }
                } ],
              ],
              plugins: [
                'transform-decorators-legacy',
                'transform-class-properties',
                'transform-do-expressions',
                'transform-object-rest-spread',
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcFolderPath, 'index.html')
    }),
  ],
  output: {
    path: path.join(__dirname, destFolder),
    publicPath: '/',
    filename: '[name].js'
  },  
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    port: 3000,
  },
  devtool: 'source-map', 
};