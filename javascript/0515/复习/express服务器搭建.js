const express=require("express");
const app=express();
app.disable("x-powered-by");
app.get("/",(request,response)=>{
    console.log(request.query);
    response.send("<h1>hello</h1>");
});
app.post("/",(request,response)=>{
    console.log(request.query);
    response.send("hw");
});
app.listen(5000,()=>console.log("成功"));