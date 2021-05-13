//这里设置ejs路由器

//先引入express模块
const express=require("express");

//创建一个路由器对象
const ejsRouter=express.Router();

//设置get请求，当请求到这里的时候就跳转到指定的ejs文件去
ejsRouter.get("/home",(request,response)=>{
    if(request.session.userId){
        //如果存在这个内容就去跳转到详情页
        response.render("index",{userName:"kangkang"});
    }else{
        response.redirect("http://127.0.0.1:8080/login");
    }
    
});

//详情页的get请求
ejsRouter.get("/detail",(request,response)=>{
    if(request.session.userId){
        response.render("detail",{});
    }else{
        response.redirect("http://127.0.0.1:8080/login");
    }
})

//然后把这个路由器对象导出去
module.exports=ejsRouter;