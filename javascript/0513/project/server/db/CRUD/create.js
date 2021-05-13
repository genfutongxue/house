//这里写的是生成数据库内容的方法

//先引入数据库
const model = require("../model");

//封装一个函数给别人的文件使用这个方法
function myCreate(userName, passWord) {
    //由于调用这个方法返回的结果是要给数据库生成传入进来的内容，并且把是否成功的结果返回出去，model.create()这是一个promise对象
    return model.create({
        userName,
        passWord
    });
}

//直接给导出去的对象添加上这个方法
module.exports.myCreate = myCreate;