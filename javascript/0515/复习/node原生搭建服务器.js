//先引入http模块
const http = require("http");
const queryString = require("querystring");
//创建服务器对象
const server = http.createServer((request, response) => {
    console.log(request.url);
    let url=request.url;
    const arr=url.split("?");
    const obj = queryString.parse(arr[1]);
    console.log(obj);
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end("<h1>哈哈</h1>");
});
server.listen(5000, (error) => {
    console.log("成功")
});