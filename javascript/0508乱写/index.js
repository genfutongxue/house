(async function () {
    const mon = require("mongoose");
    try {
        await mon.connect("mongodb://127.0.0.1:27017/mongo_test", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("成功了");
        const Schema = mon.Schema;
        const mySchema = new Schema({
            name: {
                type: String,
                unique: true,
                required: true
            },
            age: {
                type: Number,
                unique: true,
                required: true
            },
            sex: {
                type: String,
                default: "你猜"
            },
            createTime: Date
        }, {
            collection: "hello"
        });
        const model = mon.model("hello", mySchema);
        /* model.create({
            name: "小明",
            age: 20,
            sex: "男",
            createTime: Date.now()
        },{
            name: "小米",
            age: 9,
            sex: "男",
            createTime: Date.now()
        },{
            name: "锤子",
            age: 2,
            sex: "男",
            createTime: Date.now()
        }); */
        const a=model.find({sex:"女"},{})
        
    } catch (error) {
        console.log("失败了");
        console.log(error);
    }
})()