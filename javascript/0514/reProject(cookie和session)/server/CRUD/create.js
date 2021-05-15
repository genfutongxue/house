const model=require("../model");
function create(userName,passWord){
    return model.create({userName,passWord});
}
//把这个函数返回出去
module.exports.create=create;