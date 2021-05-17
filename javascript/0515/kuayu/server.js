const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));
app.get("/hello", (request, response) => {
    //获取到请求的信息，就是url里的查询字符串的信息
    const callback=request.query.callback;
    let arr=["s","d","f"];
    const str=JSON.stringify(arr);
    response.send(callback+"("+str+")");
    // response.send(`${callback}(${str})`)
});

app.post("hello", (request, response) => {
    response.send("post请求")
});
app.listen(5000, () => console.log("成功"));