//这里放的是查找数据库里的内容的文件
//要先引入数据库
const model=require("../model");

//建立一个函数
function find(userName,passWord){
    return model.findOne({userName,passWord})
}

//给导出对象添加一个find属性，值就是这个函数
module.exports.find=find;