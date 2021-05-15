//创建服务器
const express=require("express");
const app=express();

//设置中间件，来获取request.body的内容
app.use(express.urlencoded({
    extended:true,
}));

//设置静态资源
app.use(express.static("hello"));

//设置post请求
app.post("/haha",(request,response)=>{
    console.log(request.body,"post");
    response.send([{name:"xiaoming"},{add:"shenzhen"}]);
});

//设置get请求
app.get("/haha",(request,response)=>{
    console.log(request.query);
    response.send("这是get请求111");
});

//开启服务器
app.listen("5000",()=> console.log("服务器开启成功"));