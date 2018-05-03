var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require("./webpack.dev.config.js");
var port = 8080;

config.entry.app.unshift("webpack-dev-server/client?http://localhost:"+port+"/", "webpack/hot/only-dev-server");

var compiler = webpack(config);
var server = new webpackDevServer(compiler, config.devServer);

server.listen(port);
console.log('open project at http://127.0.0.1:'+port);
