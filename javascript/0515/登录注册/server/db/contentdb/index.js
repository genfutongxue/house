//这个文件专门用来连接数据库

//引入mongoose模块
const mongoose = require("mongoose");

//连接数据库,并把这个数据库导出去
module.exports = mongoose.connect("mongodb://127.0.0.1:27017/lianxi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});