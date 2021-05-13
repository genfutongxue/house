(async function () {
    //这个文件就是进行一些增删改查的事情
    //那么首先要把导入数据库的js文件引入过来并且执行
    const db = require("../db");
    //因为在db下面的index.js文件里面导出了是否连接成功的promise对象，那么这里用db接收的返回值就是那个文件导出的值
    //所以判定db的状态就可以了，这里就可以用await了，所以要在外面用async包裹起来
    await db
    //当db的状态是成功的情况下才会执行下面的代码
    console.log("连接成功了");
    //那么数据库连接成功了就可以把model对象引入进来了
    const model = require("../model");
    //同样的道理这里接收到的值就是model里面的index.js文件的返回值，它返回了一个集合对象，并且约束了一些规则
    //那么就可以用model去生成一些数据了,生成了数据之后就去执行查找功能，但是一定得等数据生成以后，所以加个await
    await model.create({
        name: "猪小明",
        class: "前端",
        add: "深圳",
        age: "15"
    }, {
        name: "王炸",
        class: "前端",
        add: "深圳",
        age: "18"
    }, {
        name: "茅台",
        class: "前端",
        add: "深圳",
        age: "25"
    }, {
        name: "球球",
        class: "前端",
        add: "深圳",
        age: "20"
    });
    //如果数据生成了就会执行下面的代码
    console.log("数据生成了");
    model.find({name:"球球"},(error,data)=>{
        console.log(data);
    })
})();