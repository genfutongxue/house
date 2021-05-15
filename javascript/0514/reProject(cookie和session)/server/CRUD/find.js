//去数据库里查找用户名和密码的方法
//先引入数据库
const model=require("../model");
function find(userName,passWord){
    return model.findOne({userName,passWord});
}

//添加一个通过_id查找内容的方法
function findById(_id){
    return model.findOne({_id});
}
//把这个函数导出去到别的地方直接引用
module.exports.find=find;
module.exports.findById=findById;