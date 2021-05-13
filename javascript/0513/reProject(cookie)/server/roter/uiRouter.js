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
    //这里要进行cookie判断，如果没有带着相关的钥匙，那么就不让进入该页面
    if (request.cookies.userId) {
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
    //浏览器登录后会生成cookie，这个cookie存在浏览器中，所以在进行下一步请求的时候就会带着cookie一起去请求，请求头里面就会有cookie相关的信息了
    //所以这个时候获取请求头的cookie去进行核对
    //要想请求这个网页，那么必须是带着钥匙来的，就是带着对应的cookie,所以这里进行判断
    if (request.cookies.userId) {
        //核对成功，把页面响应回去
        response.render("detail", {});
    } else {
        //核对失败,跳转到登录页面
        response.redirect("http://127.0.0.1:5000/login");
    }

})

//导出路由器对象供其他引入的文件使用
module.exports = uiRouter;