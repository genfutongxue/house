//1.先引入node.js中的内置模块http
const http=require("http");

//2.然后用http创建服务器对象
const server=http.createServer((request,response)=>{
    //这个回调函数在客户端给服务器发请求的时候执行
    //request是请求对象，记录了请求的所有信息
    console.log(request.url);
    response.end("hello");
});

//3.开启服务器
server.listen("5010",(error)=>{
    if(!error){
        console.log("服务器开启成功");
    }else{
        console.log("服务器开始失败");
        console.log(error);
    }
});