(async function () {
    //先引入db里的js代码
    const db = require("../db");

    //当db的状态为成功的时候就会执行下面的代码
    await db;
    console.log("连接成功了");
    //连接成功了那就把model对象引入进来
    const model = require("../model");
    //引入了之后就生成对象的内容
    /* await model.create({
        name: "小明",
        age: 50,
        sex: "男",
        createTime: Date.now()
    }, {
        name: "小红",
        age: 20,
        sex: "女",
        createTime: Date.now()
    }, {
        name: "小蓝",
        age: 30,
        sex: "男",
        createTime: Date.now()
    }); */
    //如果要进行删改查的等操作的话一定是要再生成内容之后，所以就要等内容生成之后才执行下面的操作
    //所以给生成内容前面加await
    const data = await model.findOne({
        age: 20
    }, {
        name: 1,
        _id: 0
    });
    //在查询功能执行了之后就会返回一个promise对象，所以前面加await就可以去让它执行了之后再去执行后面的操作
    //如果find执行成功了，那么返回值就是找到的值，如果失败了，返回值就是错误的问题
    console.log(data);
})();