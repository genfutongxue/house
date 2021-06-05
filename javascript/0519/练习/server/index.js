const express=require("express");
const app=express();
app.use(express.urlencoded({extended:true}));
app.get("/get",(request,response)=>{
    console.log(request.query);
    response.send("get请求成功");
});
app.post("/post",(request,response)=>{
    console.log(request.body);
    response.send("post请求成功");
});
app.listen(5000,()=>console.log("成功"));

