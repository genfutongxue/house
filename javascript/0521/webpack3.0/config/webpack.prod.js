//引入path模块，因为下面要用到dirname这个功能
const {
    resolve
} = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//暴露一个对象，这个对象就是设置好了如何打包的一些内容
module.exports = {
    //入口文件
    entry: "./src/index.js",
    //输出到哪里,输出的一些设置
    output: {
        //文件名，可以写一点路径
        filename: "js/[name].[contenthash:6].js",
        //路径
        path: resolve(__dirname, "../build"),
        publicPath: "/",
        //打包的时候删除要打包到那里的文件夹里的文件，就是将那个文件夹原来的内容删除掉
        clean: true,
        //让图片输出到指定位置
        assetModuleFilename: "img/[hash:8][ext][query]",
    },
    //处理哪些非js、json格式的文件
    module: {
        rules: [{
            //检测的文件以.js结尾
            test: /\.js$/,
            //排除打包的文件夹
            exclude: /node_modules/,
            //提前加载这个文件，入口的主文件要先加载，所以给它设置
            enforce: "pre",
            use: {
                //使用什么工具来解析
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
            use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "less-loader"]
        }, {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: "asset",
            parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于8kb以下的图片会被打包成base64格式
                },
            },
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', ]
        }, {
            type: 'asset/resource',
            test: [/\.ttf$/, /\.woff$/, /\.woff2$/],
            generator: {
                filename: "media/[hash][ext][query]",
            },
        }, ],
    },
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        // 提取js中css成单独文件
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:10].css",
        }),
        new OptimizeCssAssetsPlugin({}),
    ],
    //模式
    mode: "production",
    target: "browserslist",
}