(async function () {
    //引入mongoose
    const mongoose = require("mongoose");
    try {
        //连接mongodb数据库
        await mongoose.connect("mongodb://127.0.0.1:27017/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        //下面是连接以后触发的事情
        console.log("连接成功了");
        //创建核心对象
        const oSchema = new mongoose.Schema({
            //约定创建对象的规则
            class: {
                //类型是字符串
                type: Number,
                    //必填字段
                    required: true
            },
            name: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
            from: {
                type: String,
            },
            createTime:Date
        });

        //创建Model对象(模型对象)
        const model = mongoose.model("test", oSchema);

        //添加document对象到集合中
        model.create({
            class: 210223,
            name: "猪小明",
            age: 20,
            from: "深圳",
            createTime:Date.now()
        }, {
            class: 210223,
            name: "王炸",
            age: 22,
            from: "南昌",
            createTime:Date.now()
        }, {
            class: 210223,
            name: "茅台",
            age: 30,
            from: "北京",
            createTime:Date.now()
        }, {
            class: 210223,
            name: "球球",
            age: 18,
            createTime:Date.now()
        });
        console.log("创建成功了");
    } catch (error) {
        console.log("失败了,不想知道原因");
    }
})();