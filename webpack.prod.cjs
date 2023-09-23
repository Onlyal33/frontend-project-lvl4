const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common.cjs');

module.exports = merge(common, {
  mode: 'production',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    rollbar: 'Rollbar',
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
});
