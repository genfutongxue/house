const express = require("express");
const app = express();
app.get("/hehe", (request, response) => {
    const {
        callback
    } = request.query;
    //这个send发送的目标是谁请求的就发给谁，这里的目标是一个script标签发出的get请求，所以响应回去也是响应给script标签
    response.send(`${callback}(1)`);
});
app.listen(5000, () => console.log("成功"));