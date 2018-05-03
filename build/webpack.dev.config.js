var webpack = require('webpack');
var config = require('./webpack.base.config.js');

config.plugins.push(
	new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(false)
    }),
	new webpack.HotModuleReplacementPlugin()
);

config.devServer = {
	contentBase:'../src',
	host:'0.0.0.0',
	hot:true,
	port:8080,
	disableHostCheck:true,
// 	historyApiFallback:{
// 		index:'dist/index.html'
// 	},
	proxy:[{
		path:'/uic/api/v2/**',
		target:'http://dtuic.dev.dtstack.net:85',
		secure:false
	}]
}

module.exports = config;
