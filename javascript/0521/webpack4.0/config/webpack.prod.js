const {
    resolve
} = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    //五大护法
    entry: "./src/index.js",
    output: {
        // filename:"./js/main[contenthash:6].js",
        filename: "js/[name].[contenthash:6].js",
        path: resolve(__dirname, "../build"),
        clean: true,
        assetModuleFilename: "img/[hash:8][ext][query]",
        publicPath: "/",
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: "pre",
                use: {
                    loader: "eslint-loader",
                },
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            }, {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "less-loader"],
            }, {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于8kb以下的图片会被打包成base64格式
                    },
                },
            }, {
                type: 'asset/resource',
                include: [/\.ttf$/, /\.woff$/, /\.woff2$/],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[id].[contenthash:8].css",
        }),
        new OptimizeCssAssetsPlugin({}),
    ],
    target: 'browserslist',
    mode: "production",
}