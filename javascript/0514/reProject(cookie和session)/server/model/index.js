const mongoose = require("mongoose");
//创建约束对象
const mySchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    passWord: {
        type: String,
        required: true
    },
    createDate: {
        type:Date,
        default: Date.now()
    }
}, {
    collection: "users"
});
//创建model对象
module.exports = mongoose.model("users", mySchema);