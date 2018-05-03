const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].[hash].css');
const pkg = require('../package.json');
module.exports = {
	entry:{
		app:['babel-polyfill',path.resolve(__dirname,'../src/app.js')],
		//vender:Object.keys(pkg.dependencies)
		vender:['react', 'react-dom', 'react-router','lodash']
	},
	module:{
		rules: [
			{
				test:/\.js$/,
				exclude: /node_modules/,
				use:'babel-loader?cacheDirectory=true&compact=false'
			},
			{
				test:/\.css$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: [
						{
							loader:'css-loader',
							options:{
								sourceMap: true,
								minimize:true
							}
						}
					]
				})
			},
			{
				test: /\.less$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use:[
						{
							loader:'css-loader',
							options:{
								sourceMap: true,
								minimize:true
							}
						},
						{
							loader:'less-loader',
							options:{
								"modifyVars":{
									"primary-color": "#1DA57A",
									// "icon-url":path.resolve(__dirname,'../src/assets/fonts/antd')
									"icon-url":"\'../../../../../src/assets/fonts/antd/iconfont\'"
								}
							}
						}
					]
				})
			},
			{
				test:/\.scss$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: [
						{
							loader:'css-loader',
							options:{
								sourceMap: true,
								minimize:true
							}
						},
						{
							loader:'sass-loader'
						}
					]
				})
			},
			{
				test:/\.(jpg|png|gif|jpeg)$/,
				use:'file-loader'
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 100000
					}
				}
			}
		]
	},
	plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
		  filename:'index.html',
		  template:'src/index.html',
		  inject:'body',
		  chunks:['app','vender']
      }),
	  new webpack.NoEmitOnErrorsPlugin(),
	  new webpack.optimize.OccurrenceOrderPlugin(),
	  new CopyWebpackPlugin([{
        from: path.resolve(__dirname,'../src/assets')
      },{
        from: path.resolve(__dirname,'../src/config')
      }]),
	  new webpack.optimize.CommonsChunkPlugin({
        name: "vender",
		chunks:['app'],
        filename: 'vender.js',
        minChunks: Infinity
      }),
	  extractCSS
    ],
	output:{
		filename:'[name].[hash].js',
		path:path.resolve(__dirname,'../dist'),
		chunkFilename:'[name].[hash].js',
		sourceMapFilename:'[name].map'
	}
}
