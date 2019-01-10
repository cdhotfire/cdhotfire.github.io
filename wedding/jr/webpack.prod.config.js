const path = require("path");
const glob = require('glob');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('./utilities/shell.js');
//const WorkboxPlugin = require('workbox-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {
	VueLoaderPlugin
} = require('vue-loader');
const WebpackCdnPlugin = require('webpack-cdn-plugin');


var deletefiles = (folders, files, folderfiles) => {
	var result = [];
	for (var file in files)
		result.push('del /Q "' + files[file] + '" > nul 2>&1');

	for (var folderfile in folderfiles)
		result.push('del /Q /S "' + folderfiles[folderfile] + '" > nul 2>&1');

	for (var folder in folders)
		result.push('rmdir /Q /S "' + folders[folder] + '" > nul 2>&1');

	return result;
};

module.exports = {
	entry: {
		index: "./index.js",
		vendor: [
			"bootstrap",
			"bootstrap-vue",
			"less",
			"localStorage",
			"popper.js",
			"quill",
			"sweetalert2",
			"v-tooltip",
			"vee-validate",
			"vue",
			"vue-axios",
			"vue-moment",
			"vue-router",
			"vue-swatches",
			"vuex",
			"vuex-router-sync",
			"vue-full-calendar",
			"vue-flatpickr-component",
			"moment",
			"jquery",
			"tinycolor2",
			"vue-avatar",
			"vue-recaptcha"
		]
	},
	mode: 'production',
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "dist/",
		filename: "[name].[chunkhash].js"
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: "file-loader?name=/public/icons/[name].[ext]"
			},
			{
				test: /bootstrap\/dist\/js\/umd\//,
				use: "imports-loader?jQuery=jquery"
			},
			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							minimize: {
								safe: true
							}
						}
					},
					{
						loader: "postcss-loader",
						options: {
							ident: 'postcss',
							plugins: [
								require('postcss-normalize')(),
								require('postcss-preset-env')(),
								require('autoprefixer')(),
							]
						},
					},
					{
						loader: "sass-loader",
						options: {}
					}
				]
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				use: "file-loader"
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader?node_modules/.cache/babel-loader',
					options: {
						compact: false
					}
				}
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all",
					enforce: true
				}
			}
		},
	},
	plugins: [
		new webpack.ProvidePlugin({
			Vue: ['vue/dist/vue.esm.js', 'default'],
			$: 'jquery',
			jQuery: 'jquery',
			less: 'less',
			swal: 'sweetalert2'
		}),
		new VueLoaderPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new CopyWebpackPlugin([{
			from: 'assets/themes/default.less',
			to: 'default.less'
		}]),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new HtmlWebpackPlugin({
			filename: "./../index.html",
			template: "./in.html",
			inject: true,
			favicon: './favicon.ico',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			chunksSortMode: "dependency"
		}),
		new MiniCssExtractPlugin({
			filename: "[contenthash].css",
			chunkFilename: "[contenthash].css"
		}),
		new OptimizeCSSAssetsPlugin({
			assetNameRegExp: /\.optimize\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		}),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
			threshold: 10240,
			minRatio: 0.8
		}),
		new WebpackShellPlugin({
			safe: true,
			dev: false,
			onBuildStart: {
				blocking: true,
				scripts: deletefiles([], ['index.html', 'sw.js'], ['dist'])
			},
			onBuildExit: {
				blocking: true,
				scripts: deletefiles(
					[
						"assets",
						"components",
						"services",
						"utilities",
						"connections",
						"__test__",
						"patches"
					], [
						"in.html",
						"index.js",
						"package.json",
						"package-lock.json",
						"webpack.prod.config.js",
						"webpack.dev.config.js",
						"webpack.build.config.js",
						".babelrc",
						".eslintrc.js",
						"BuildReadme.txt"
					], [])
			}
		}),
		//new WorkboxPlugin.GenerateSW({
		//globDirectory: './',
		//globPatterns: ['index.html', 'dist/**/*.{js,css,less,svg,ico,ttf}'],
		//swDest: '../sw.js',
		//clientsClaim: true,
		//skipWaiting: true
		//})
	],
	node: {
		setImmediate: false,
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	},
	resolve: {
		alias: {
			vue$: "./node_modules/vue/dist/vue.min.js"
		},
		extensions: [".js", ".vue", ".json"],
		modules: [
			path.resolve('./'),
			path.resolve('./node_modules')
		]
	}
};