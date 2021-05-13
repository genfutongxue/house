//先引入mongoose
const mongoose=require("mongoose");

//创建一个Schema对象
const Schema = mongoose.Schema;
//给model对象进行约束
const mySchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        unique: true,
        required: true
    },
    sex: {
        type: String,
        default: "你猜"
    },
    createTime: Date
},{
    collection:"user"
});

//再去生成一个model集合对象
const model=mongoose.model("user",mySchema);
//再把这个model集合对象导出去
module.exports=model;