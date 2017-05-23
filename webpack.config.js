var path = require('path');
var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index.ts'
        ],
    output: {
        path: path.resolve(__dirname, 'build'),
        // publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.ts$/,
                include: path.resolve(__dirname, "src"),
                loader: 'ts-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new CopyWebpackPlugin([{
            from: 'assets/',
            to: 'assets/'
        }]),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        inline: true,
        stats: 'errors-only',
        port: 8080
    }
}
