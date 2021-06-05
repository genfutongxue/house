//向外导出一个对象
module.exports = {
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        semi: "error", //2
        eqeqeq: "warn", //1
        "no-var": "error", //2
    },
}