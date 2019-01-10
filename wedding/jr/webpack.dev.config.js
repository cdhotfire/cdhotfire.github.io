const path = require("path");
const glob = require('glob');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: "./index.js",
    output: {
	   path: path.resolve(__dirname, "dist"),
	   publicPath: "dist/",
	   filename: "build.js"
    },
    mode: 'development',
    module: {
	   rules: [
		  //{
		  //test: /\.(js|vue)$/,
		  //loader: 'eslint-loader',
		  //exclude: /node_modules/,
		  //enforce: 'pre',
		  //options: {
		  //formatter: require('eslint-friendly-formatter'),
		  //}
		  //},
		  {
			 test: /\.vue$/,
			 loader: "vue-loader",
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
			 use: ["vue-style-loader",
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
				}]
		  },
		  {
			 test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
			 use: "file-loader"
		  },
		  {
			 test: /\.js$/,
			 loader: 'babel-loader'
		  }
	   ]
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
	   new CleanWebpackPlugin('dist'),
	   new webpack.NamedModulesPlugin(),
	   new webpack.optimize.LimitChunkCountPlugin({
		  maxChunks: 1,
	   }),
	   new CopyWebpackPlugin([
		  {
			 from: 'assets/themes/default.less',
			 to: '[name].[ext]'
		  }
	   ], { copyUnmodified: true }),
	   new HtmlWebpackPlugin({
		  filename: "./../index.html",
		  template: "./in.html",
		  inject: true
	   })
    ],
    resolve: {
	   alias: {
		  vue$: "./node_modules/vue/dist/vue.esm.js",
	   },
	   extensions: [".js", ".vue", ".json"],
	   modules: [
		  path.resolve('./'),
		  path.resolve('./node_modules')
	   ]
    },
    node: {
	   setImmediate: false,
	   dgram: 'empty',
	   fs: 'empty',
	   net: 'empty',
	   tls: 'empty',
	   child_process: 'empty'
    }
};