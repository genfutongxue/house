//引入express模块
const express = require("express");

//引入通过_id查找内容的方法
const {
    findById
} = require("../CRUD/find");

//创建一个路由器对象
const uiRouter = express.Router();

//在这里面设置请求，如果请求了这里的路径那么就让它跳转到指定的地方去
uiRouter.get("/home", async (request, response) => {
    //浏览器在进行请求的时候是会带着cookies一起去的，当cookies里面有一个sessionid的时候，在服务器那里就会拿着这个sessionid去进行匹配，在服务器里面匹配到了内容的话就证明以前登录过
    if (request.session.userId) {
        //调用findById方法查找用户内容
        const user = await findById(request.query._id);

        //将ejs里面的代码拼接然后响应给浏览器
        response.render("index", {
            userName: user.userName
        });
    }else{
        //没有对应的钥匙就要跳转到登录页面去
        response.redirect("http://127.0.0.1:5000/login");
    }

});

//在这里设置get请求，如果请求的是detail这个路径，那么就跳转到指定的地方
uiRouter.get("/detail", (request, response) => {
    //浏览器在进行请求的时候是会带着cookies一起去的，当cookies里面有一个sessionid的时候，在服务器那里就会拿着这个sessionid去进行匹配，在服务器里面匹配到了内容的话就证明以前登录过
    if (request.session.userId) {
        //核对成功，把页面响应回去
        response.render("detail", {});
    } else {
        //核对失败,跳转到登录页面
        response.redirect("http://127.0.0.1:5000/login");
    }

})

//导出路由器对象供其他引入的文件使用
module.exports = uiRouter;