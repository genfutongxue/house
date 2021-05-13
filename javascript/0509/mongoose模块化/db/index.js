//这个js文件就是用来连接数据库
//先引入数据库
const mongoose = require("mongoose");
//然后再去连接数据库,这个连接返回一个promise对象，如果连接成功了，就是成功的promise对象，所以把这个promise对象导出去，在别的地方需要使用这个对象的状态去做一些事情
mongoose.connect("mongodb://127.0.0.1:27017/new", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})