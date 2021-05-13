const express=require("express");
const app=express();
app.use(express.static("../public"));
app.listen("5000",(error)=>{
    if(!error) console.log("服务器开启成功");
    else console.log("服务器开启失败");
});