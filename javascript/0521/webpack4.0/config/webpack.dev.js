const {
    resolve
} = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //五大护法
    entry: "./src/index.js",
    output: {
        // filename:"./js/main[contenthash:6].js",
        filename: "./js/main.js",
        path: resolve(__dirname, "../build"),
        clean: true,
        assetModuleFilename: "img/[hash:8][ext][query]",
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
                use: ["style-loader", "css-loader", "less-loader"]
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
                use: ['style-loader', 'css-loader']
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./public/index.html",
    }), ],
    devServer: {
        contentBase: './build', // 打包根路径
        port: 5000, // 端口号
        open: true, // 自动打开浏览器
        progress: true, // 进度条
    },
    target: 'web',
    mode: "development",
}