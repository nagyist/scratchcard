var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        './src/index.ts'
        ],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders:[
            {
                test: /\.ts$/,
                include: path.resolve(__dirname, "src"),
                loader: 'ts-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                include: path.resolve(__dirname, "assets"),
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        inline: true,
        stats: 'errors-only',
        port: 8080
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        })
    ]
}
