const path = require('path')
const webpack = require('webpack')




module.exports = {
  devtool: 'inline-source-map',

  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  module: {
    rules: [
      { test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/ },
      { test: /\.scss?$/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/ },
      { test: /\.png$/,
        loader: 'file-loader' ,
        exclude: /node_modules/ },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        exclude: /node_modules/ },
    ]
  }
}
