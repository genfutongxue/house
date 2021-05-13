//1.先引入express模块
const express=require("express");

//2.用express创建对象
const object=express();

//3.1.用这个对象去监听get请求:第一个参数是请求的路径(没有要请求的路径那么就写/)，第二个参数是回调函数
object.get("/",(request,response)=>{
    //回调函数里的两个参数，第一个为请求返回的信息，第二个为服务器响应数据
    console.log(request.query);
    //调用send方法可以给浏览器发送信息,并且打印在浏览器页面中
    response.send("服务器收到了，这条信息是服务器响应给浏览器的信息");
});

//3.2.用这个对象去监听get请求：在第一个参数里添加路径
object.get("/obj/text",(request,response)=>{
    console.log(request.query);
    response.send("服务器收到了，这条信息是服务器响应给浏览器的信息")
});

//3.3.用这个对象去监听post请求：
object.post("/",(request,response)=>{
    console.log("post请求成功了");
    response.send("post请求成功了");
});

//4.开启服务器
//调用express对象的listen方法，第一个参数为开启服务器的端口号,也就是说服务器监听着指定的端口号
//第二个参数为回调函数,服务器开启不管成功或失败都会执行这个回调函数
object.listen("5005",(error)=>{
    if(error){
        //如果参数error里面有内容，那么就说明开启失败了
        console.log(error);
        console.log("服务器开启失败");
    }else{
        //否则就是开启成功了
        console.log("服务器开启成功");
    }
});