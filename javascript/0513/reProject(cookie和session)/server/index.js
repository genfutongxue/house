(async function () {
    //引入express模块
    const express = require("express");
    const app = express();

    //引入cookie-parser模块
    const cookieParser = require("cookie-parser");
    //把它设置为中间件
    app.use(cookieParser());

    //引入express-session模块
    const session = require("express-session");
    //引入connect-mongo模块，并且将其设置成一个express-session的持久化仓库
    const mongoStore = require("connect-mongo")(session);
    //然后设置中间件
    app.use(session({
        name: 'id22', // 将sessionid存储到cookie中的键
        secret: 'atguigu', //参与加密的字符串（又称签名）
        saveUninitialized: false, //是否为每次请求都设置一个cookie用来存储session的id
        resave: true, //是否在每次请求时重新保存session
        store: new MongoStore({
            url: 'mongodb://localhost:27017/test-app',
            touchAfter: 24 * 3600, // 24小时之内只修改一次
        }),
        cookie: {
            httpOnly: true, // 开启后前端无法通过 JS 操作
            maxAge: 1000 * 60, // 这一条 是控制 sessionID 的过期时间的！！！
        },
    }));


    //引入路由器中间件
    const router = require("./roter/roters");
    const uiRouter = require("./roter/uiRouter");

    //连接数据库
    await require("./db");
    console.log("数据库连接成功");

    //给public静态资源文件服务
    app.use(express.static("../public"));
    //获取request.body中间件的方法,一定要这样写request.body才能使用
    app.use(express.urlencoded({
        extended: true
    }));

    //使用路由器中间件
    app.use(router);
    app.use(uiRouter);
    // 配置ejs模板
    // 告诉express,当前我们服务器中使用的是ejs这个模板引擎
    app.set('view engine', 'ejs');

    // 告诉express,我们定义的模板在哪个文件夹下面
    // 所有的.ejs文件就是所谓的模板
    app.set('views', '../views/home');

    app.listen("5000", error => {
        if (!error) {
            console.log("服务器开启成功");
        } else {
            console.log("失败");
        }
    });
})();