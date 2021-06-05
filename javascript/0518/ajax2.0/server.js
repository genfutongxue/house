const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.post("/hello",(request,response)=>{
    console.log(request.files);
    response.send("呕吼");
    response.send(console.log())
});
app.listen(5000,()=>console.log("成功"));