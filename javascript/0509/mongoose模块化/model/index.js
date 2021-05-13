//这个js文件就是用来创建Schema对象和model对象
//因为要用mongoose来创建Schema对象，所以要先引入mongooes
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Schema对象就是用来约束生成的对象的，指定了一些规则，Schema要通过new来生成一个规则对象去使用
const mySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
            required: true
    },
    add: {
        type: String
    },
    age: {
        type: Number,
        required: true
    }
}, {
    collection: "newKu"
});

//创建集合对象并且把这个集合对象到处去，在别的文件需要使用
module.exports = mongoose.model("newKu", mySchema);