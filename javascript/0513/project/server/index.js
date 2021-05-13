(async function () {
    //先引入express模块
    const express = require("express");
    const app = express();

    //引入路由器文件
    const router = require("./router/routers");
    const ejsRouter = require("./router/ejsRouter");

    //引入cookie
    const cookieParser = require("cookie-parser");

    //引入express-session模块
    const session = require("express-session");
    //引入connect-mongo模块
    const MongoStore = require("connect-mongo")(session);

    //先引入连接数据库的文件,当数据库引入完成之后才进行后面的操作
    await require("./db/contentdb");
    console.log("数据库连接成功了");

    //给public静态资源文件服务
    app.use(express.static("../public"));

    //编写全局配置对象
    app.use(session({
        name: 'userid', //设置cookie的name，默认值是：connect.sid
        secret: 'atguigu', //参与加密的字符串（又称签名）
        saveUninitialized: false, //是否在存储内容之前创建会话
        resave: true, //是否在每次请求时，强制重新保存session，即使他们没有变化
        store: new MongoStore({
            url: 'mongodb://localhost:27017/sessions_container',
            touchAfter: 24 * 3600 //修改频率（例：//在24小时之内只更新一次）
        }),
        cookie: {
            httpOnly: true, // 开启后前端无法通过 JS 操作cookie
            maxAge: 1000 * 30 // 设置cookie的过期时间
        },
    }));

    //为了能使用request.body，所以进行下面一行代码的操作
    app.use(express.urlencoded({
        extended: true
    }));

    //使用cookie中间件
    app.use(cookieParser());

    //这里写处理post请求的代码，但是因为请求代码可能会有很多，所以把代码写在路由器对象上，先在最上面引入那个文件，这里使用就行了
    app.use(router);
    app.use(ejsRouter);

    // 配置ejs模板
    // 告诉express,当前我们服务器中使用的是ejs这个模板引擎
    app.set('view engine', 'ejs');

    // 告诉express,我们定义的模板在哪个文件夹下面
    // 所有的.ejs文件就是所谓的模板
    app.set('views', '../views/home');



    //开启服务器
    app.listen("8080", error => {
        if (!error) {
            console.log("服务器开启成功");
        } else {
            console.log("服务器开启失败");
        }
    });
})();