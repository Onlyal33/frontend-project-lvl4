const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8090,
    host: '0.0.0.0',
    headers: {
      'Cross-Origin-Resource-Policy': 'cross-origin',
    },
    historyApiFallback: true,
    devMiddleware: {
      publicPath: '/assets/',
    },
  },
});
