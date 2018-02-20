const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: './main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js'
	},
	devServer: {
		contentBase: path.resolve(__dirname, './src')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: {presets: ['es2015']}
				}]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.scss$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader"
				}, {
					loader: "postcss-loader"
				}, {
					loader: "sass-loader"
				}]
			},
			{
				test: /\.json$/,
				use: 'json-loader'
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: 'file-loader'
			},
			{
				test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
				use: 'file-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'V2',
			template: 'index.html',
			inject: 'head',
			chunks: ['main'],
			filename: 'index.html'
		}),
		new CopyWebpackPlugin([
			{from: 'assets', to: 'assets'}
		])
	],
	devServer: {
		port: 8040,
		host: '0.0.0.0',
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	}
};
