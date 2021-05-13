//引入express模块
const express = require("express");
//创建路由器对象
const router = express.Router();

//引入增删改查文件,并且把里面的内容解构赋值
const {
    create
} = require("../CRUD/create.js");

//引用查找数据的文件,并且把find方法解构出来
const {
    find
} = require("../CRUD/find");

//添加注册路由
router.post("/registe", async (request, response) => {
    //把得到的用户内容进行解构赋值
    const {
        userName,
        passWord
    } = request.body;
    //解构完了之后就把内容添加到数据库中
    await create(userName, passWord);
    //当添加完成之后就发送信息给客户端响应
    response.send("注册成功,<a href='http://127.0.0.1:5000/login/index.html'>点击跳转登录</a>");
});

//添加登录路由
router.post("/login", async (request, response) => {
    //先获取到输入的用户名和密码
    const {
        userName,
        passWord
    } = request.body;
    //调用find方法返回的是找到的数据
    const re = await find(userName, passWord);
    //判断查询的是否有数据，如果没有那么re就为空
    if (re) {
        //如果有数据，说明验证成功,就给浏览器添加cookie数据
        response.cookie("userId",re._id,{maxAge:1000*60*60*24});

        //添加好了数据之后就进行重定向，url地址上加上查询字符串信息，用户的_id
        response.redirect("http://127.0.0.1:5000/home?_id="+re._id);
    } else {
        //如果没有数据，那么就响应登录失败，用户名或密码错误
        response.send("用户名或密码错误");
    }

});

//把router导出到别的引入的页面
module.exports = router;