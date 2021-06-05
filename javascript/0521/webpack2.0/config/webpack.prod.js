const {
    resolve
} = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//导出一个配置好的对象
module.exports = {
    entry: "./src/index.js",
    output: {
        path: resolve(__dirname, "../build"),
        filename: "js/main.[hash:10].js",
        assetModuleFilename: "img/[contenthash:10][ext][query]",
        clean: true,
        publicPath: "/",
    },
    mode: "production",
    plugins: [new HtmlWebpackPlugin({
        template: "./public/index.html",
    }), new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[id].[contenthash:8].css",
    }), new OptimizeCssAssetsPlugin({}), ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            enforce: "pre",
            /* use: {
                loader: "eslint-loader",
            }, */
            loader: "eslint-loader", //如果只有一个，可以直接这样写，如果有多个就要写use
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
            //使用是从下往上使用的，先使用less-loader,然后用css-loader,然后用style-loader
            use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
        }, {
            // test: /\.(png|jpe?g|gif|svg)$/,
            test: [/\.jpe?g/i, /gif/i, /png/i],
            type: "asset",
            parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于8kb以下的图片会被打包成base64格式
                },
            },
        }, {
            test: /\.css$/,
            //使用是从下往上使用的，先使用less-loader,然后用css-loader,然后用style-loader
            use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", ],
        }, {
            type: 'asset/resource',
            test: [/\.ttf$/, /\.woff$/, /\.woff2$/],
            generator: {
                filename: "media/[hash][ext]",
            },
        }, ],
    },
    target: "browserslist",
};