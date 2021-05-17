//这个文件用来开启服务器

(async function () {
    //引入express模块
    const express = require("express");
    //创建express对象取名为app
    const app = express();

    //引入数据库
    await require("./db/contentdb");
    //当数据库引入成功后才执行后面的操作
    console.log("数据库引入成功");

    //开启服务器
    app.listen("5000", (error) => {
        if (error) {
            console.log("服务器开启失败");
        } else {
            console.log("服务器开启成功");
        }
    });
})();