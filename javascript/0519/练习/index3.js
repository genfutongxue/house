//new 做了哪些事情：
//1.改变了函数的this
//2.返回了一个实例化对象
//3.让实例化对象的隐式原型指向了函数的显示原型
function myNew(fn){
    //1.创建一个对象
    const obj={};
    //2.让对象的隐式原型指向fn的显示原型
    obj.__proto__=fn.prototype;
    //3.获取到传入的参数，第二个开始就给fn函数的实参
    const arr=Array.from(arguments).slice(1);
    //4.改变函数的this指向该对象
    const re=fn.apply(obj,arr);
    //5.判断函数的返回值是什么，如果是对象或者函数，就返回该函数的返回值，如果不是就返回一个对象
    if(re!==null&&typeof re==="object"||typeof re==="function") return re;
    return obj;
}