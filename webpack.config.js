var path = require('path');
var webpack = require('webpack');
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
        host: '0.0.0.0',
        port: 8080
    }
}
