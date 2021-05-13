console.log("b");
function fn(){
    console.log("函数");
}

const a=1,b=2,c={name:"小明"};
// module.exports={
//     a,b,c,fn
// }
// module.exports.a=a;
// module.exports.b=b;
exports={a,b,c,fn};
console.log(exports.a);