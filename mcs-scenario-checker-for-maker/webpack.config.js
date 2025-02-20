const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      dns: false,
      net: false,
      tls: false,
      url: require.resolve('url/'),
      assert: require.resolve('assert/'),
      buffer: require.resolve('buffer/'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};