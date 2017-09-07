const path = require('path')
const webpack = require('webpack')
const PRODUCTION = process.env.NODE_ENV === 'production'
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	entry: [
		'./main.js',
		'./scss/bundle.scss'
	],
	output: {
		path: path.resolve(__dirname, 'ecma'),
		publicPath: 'ecma',
		filename: 'bundle.min.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					limit: 5000,
					name: '../[path][name].[ext]?[hash:12]'
				}
			},
			{
				test: /\.(ttf|otf|woff|woff2|eot|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 1000,
					name: '../[path][name].[ext]?[hash:12]'
				}
			},
			{
				test: /\.css$/,
				loaders: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: PRODUCTION ? ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: [
						'css-loader',
						'sass-loader'
					],
					publicPath: ''
				}) : ['style-loader', 'css-loader', 'sass-loader?outputStyle=compressed']
			}
		]
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		port: 7777
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map',
	plugins: [
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			proxy: 'http://localhost:7777',
			files: ['**/*.html']
		}, {
			reload: false
		})
	]
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new ExtractTextPlugin({
			filename: 'bundle.css',
			disable: false,
			allChunks: true
		})
	])
}