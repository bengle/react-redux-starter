var webpack = require('webpack');
var config = require('./webpack.base.config.js');

config.plugins.push(
	new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(true)
    }),
	new webpack.optimize.UglifyJsPlugin({minimize: true})
);

module.exports = config;
