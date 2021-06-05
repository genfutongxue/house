//输出一个对象，对象这里面设置要检查js语法的一些规则
module.exports = {
    parserOptions: {
        //es10以内的版本
        ecmaVersion: 8,
        //ECMAScript模块
        sourceType: "module",
    },
    rules: {
        // error 和 2 代表错误
        // warn 和 1 代表警告
        // off 和 0 代表关闭
        semi:0,//semi分号的意思
        eqeqeq:0,
    },
}