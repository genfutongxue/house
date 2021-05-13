//先引入mongoose
const mongoose=require("mongoose");

//然后连接数据库，把连接的数据库的promise对象导出
module.exports=mongoose.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});