// @ts-check

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const mode = process.env.NODE_ENV || 'development';
const isProd = mode === 'production';

module.exports = {
  mode,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
  },
  devServer: {
    port: 8090,
    host: '0.0.0.0',
    historyApiFallback: true,
    devMiddleware: {
      publicPath: '/assets/',
    },
  },
  devtool: isProd ? false : 'source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
