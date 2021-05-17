//这个文件专门用来写创建数据对象

//先引入mongoose
const mongoose = require("mongoose");

//创建Schema对象
const Schema = mongoose.Schema;
const mySchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    passWord: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now(),
    },
});

//创建model对象
const model = mongoose.model("items", mySchema);

//把model对象导出
module.exports = model;