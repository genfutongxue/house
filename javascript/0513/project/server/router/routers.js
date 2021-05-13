//这里写各种请求的代码
//先引入express库
const express = require("express");

//引入CRUD中create.js文件 (返回的是一个对象，对象上有一个方法，直接解构到这个方法，因为只需要这个方法)
const {
    myCreate:myCreate
} = require("../db/CRUD/create"); //其中{myCreate:myCreate}可以简写为{myCreate}

//引入查找数据库的方法
const {find}=require("../db/CRUD/find");

//创建路由器对象
const router = express.Router();

//使用路由器对象对post和get的各种请求进行设置
//设置注册post请求(第一个参数是路径，第二个参数是中间件)
router.post("/registe", async (request, response) => {

    //获取输入的用户名和密码
    const {
        userName,
        passWord
    } = request.body;

    //根据获取到的信息创建一条数据，把它添加到数据库中,把添加数据库的方法封装在一个函数中，放在专门放方法的文件夹中，所以这里引入这个方法就可以了
    await myCreate(userName, passWord);

    //如果数据创建成功了，就进行下一步操作,响应浏览器
    response.send("注册成功,<a href='http://127.0.0.1:8080/login'>点击立即登录</a>");

});

//设置登录post请求
router.post("/login",async (request,response)=>{
    //先获取到输入的用户名和密码
    const {userName,passWord}=request.body;

    //然后调用find方法去数据库中查找是否有对应的值,其中自定义的find方法设置了返回值为一个对象，有内容就为真，没有就为假
    const re = await find(userName,passWord);
    
    if(re){
        //登录成功就给cookie加上信息
        response.cookie("userId",re._id,{maxAge:1000*60});

        //存在就跳转到一个欢迎页面
        response.redirect("http://127.0.0.1:8080/home");
    }else{
        //没有就响应客户端错误
        response.send("用户名或密码输入错误");
    }
})

//把路由器对象导出去
module.exports = router;