const express = require("express");
const app = express();
//给public静态资源文件服务
app.use(express.static("../public"));
app.listen("5000", error => {
    if(!error){
        console.log("服务器开启成功");
    }
});