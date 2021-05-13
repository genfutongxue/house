//引入express库
const express=require("express");
//引入path内置库
const path=require("path");
//创建express对象
const app=express();
//设置路由
app.get("/a/:page/:pages",(request,response)=>{
    // console.log(request.params);
    console.log(request.get("host"));
    // response.send("服务器响应给客户端");
    
    // response.sendFile(path.resolve(__dirname,"./a.gif") );
    
});
app.get("/haha/:hello?/:world?",(request,response)=>{
    // console.log(request.params);
    response.send("服务器响应了");
});
//设置路由
app.post("/post/:hello?/:world?",(request,response)=>{
    // console.log(request.params);
    response.send("post请求成功了");
});
//开启服务器
app.listen("5000",(error)=>{
    if(!error){
        console.log("服务器开启成功");
    }else{
        console.log("服务器开启失败");
    }
});