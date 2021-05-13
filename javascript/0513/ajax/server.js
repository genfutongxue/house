//搭建服务器
//引入express模块
const express=require("express");
//生成express对象取名app
const app=express();

//添加静态资源(把public文件夹设置为一个可以静态访问的文件夹)，这样就可以在浏览器直接输入地址去进行访问这里面的内容
app.use(express.static("public"));
//下面的代码就是为了处理post请求上传上来的数据
app.use(express.urlencoded({extended:true}));

//开启服务器
app.listen("5000",(error)=>{
    if(!error){
        console.log("服务器开启成功了");
    }else{
        console.log("服务器开启失败了")
    }
});
