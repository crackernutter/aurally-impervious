import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

export default {
    entry: {
        index: './src/index.js',
        controls: './src/assets/controls.js'
    },
    output: {
        filename: '[name].[chunkhash].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=100000' },
            { test: /\.(ttf|eot|svg|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Code Splitting',
            template: './src/index.html',
            useGzip: true,
            inject: true
        }),
        new CompressionPlugin(
            {
                test: /\.js/,
                cache: false,
                algorithm: 'gzip'
            })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /node_modules/,
                    name: "common",
                    chunks: "initial",
                    minSize: 1
                }
            }
        }
    }
};