//引入内置path模块解构出来一个resolve,用来设置文件路径
const {
    resolve
} = require("path");

//配置好并且导出
module.exports = {
    //入口文件
    entry: "./src/index.js",
    //导出设置
    output: {
        //文件名
        filename: "./js/main.js",
        //文件路径
        path: resolve(__dirname, "build"),
    },
    //loader,加载器,处理非js/json文件,把它们进行转换
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            enfore: "pre",
            use: {
                loader: "eslint-loader",
            },
        }, {
            test:/\.js$/,
            enclude:/node_modules/,
            use:{
                loader:"babel-loader",
                options:{
                    presets:["@babel/presets-env"],
                },
            },
        }],
    },
    //模式：开发模式(development),生产模式(production)
    mode: "development",
}