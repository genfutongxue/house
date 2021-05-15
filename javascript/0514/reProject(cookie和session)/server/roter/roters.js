//引入express模块
const express = require("express");
//创建路由器对象
const router = express.Router();

//引入md5的模块
const md5 = require("md5");

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
    let {
        userName,
        passWord
    } = request.body;
    //把密码加密
    passWord=md5(passWord);
    //解构完了之后就把内容添加到数据库中
    await create(userName, passWord);
    //当添加完成之后就发送信息给客户端响应
    response.send("注册成功,<a href='http://127.0.0.1:5000/login/index.html'>点击跳转登录</a>");
});

//添加登录路由
router.post("/login", async (request, response) => {
    //先获取到输入的用户名和密码
    let {
        userName,
        passWord
    } = request.body;
    //把密码加密
    passWord=md5(passWord);
    //调用find方法返回的是找到的数据
    const re = await find(userName, passWord);
    //判断查询的是否有数据，如果没有那么re就为空
    if (re) {
        //如果有数据，说明验证成功
        //就把_id的值给session存起来（存在服务器），响应一个sessionid给到浏览器,浏览器把sessionid保存到cookies中
        //保存方法：给请求对象的session对象加上一个属性，值为要保存的_id
        request.session.userId = re.id;

        //添加好了数据之后就进行重定向，url地址上加上查询字符串信息，用户的_id
        response.redirect("http://127.0.0.1:5000/home?_id=" + re.id);
    } else {
        //如果没有数据，那么就响应登录失败，用户名或密码错误
        response.send("用户名或密码错误");
    }

});

//把router导出到别的引入的页面
module.exports = router;