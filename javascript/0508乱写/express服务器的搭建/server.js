//引入express这个包
const express=require("express");
//使用express创建一个应用对象
const app=express();
//处理请求
//get方法：
app.get("/",(request,response)=>{
    //request是请求对象，包含了所有的请求数据
    console.log(request.query);
    //response是响应对象，可以用来响应客户端
    response.send("服务器响应了")
});
app.get("/name",(request,response)=>{
    console.log(request.query);
    response.send("服务器响应了");
});
//post方法:
app.post("/add",(request,response)=>{
    console.log(request.query);
    response.send("服务器响应了");
})

//启动服务器
app.listen(5000,(error)=>{
    if(!error) console.log("服务器启动成功");
    else console.log("服务器启动失败");
})