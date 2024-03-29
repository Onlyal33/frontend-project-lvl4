const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common.cjs');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  devtool: 'source-map',
});
