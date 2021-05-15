//建服务器
const express = require("express");
const app = express();

//设置静态资源
app.use(express.static("public"));

//为了让post请求获取到request.body设置的中间件
app.use(express.urlencoded({
    extended: true
}));

//post请求
app.post("/hehe", (request, response) => {
    console.log(request.body, "post");
    response.send("post响应");
});

//get请求
app.get("/hehe", (request, response) => {
    setTimeout(() => {
        console.log(request.query, "get");
        response.send({
            "name":"xiaoming",
            "add":"shenzhen",
        });
    }, 0);
});

//开启服务器
app.listen("5000", () => console.log("成功"));