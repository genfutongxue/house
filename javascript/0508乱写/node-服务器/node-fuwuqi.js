//引入http
const http=require("http");
const queryString=require("querystring");
//创建服务器
const server=http.createServer((request,response)=>{
    let str=request.url;
    let arr=str.split("?");
    const re=queryString.parse(arr[1]);
    console.log(re);
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end('服务器响应回来的数据');
});
server.listen(5000,(error)=>{
    if(!error){
        console.log("服务器启动成功");
    }else{
        console.log("服务器启动失败");
    }
});