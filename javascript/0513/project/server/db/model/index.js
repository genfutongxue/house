//引入mongoose模块
const mongoose = require("mongoose");

//创建Schema模块
const Schema = mongoose.Schema;
//把Schema模块实例化一个对象，里面放入约束生成数据对象的规则
const mySchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    passWord: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});

//生成一个已经受约束的数据对象
const model = mongoose.model("items", mySchema);
//把创建好的model的对象导出去
module.exports = model;