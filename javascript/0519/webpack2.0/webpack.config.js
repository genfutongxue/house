const {
    resolve
} = require("path");


//导出一个配置好的对象
module.exports = {
    entry: "./src/index.js",
    output: {
        path: resolve(__dirname, "build"),
        filename: "./js/main.js",
    },
    mode: "development",
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
        },{
            test:/\.less$/,
            use:["style-loader", "css-loader", "less-loader"],
        }],
    },
};