//引入统一导出的文件
import {
    fn,
    obj
} from "./js/module1";
fn();
console.log(obj);

//引入分别导出的文件
import {
    fn as fn1,
    arr,
    a
} from "./js/module2";
console.log(arr, a);
fn1();

//引入默认导出的文件
import fn2 from "./js/module3";
fn2();

//引入默认导出和统一导出的文件
import b, * as obj1 from "./js/module4";
console.log(b);
console.log(obj1.obj);
console.log(obj1.arr);


//单纯引入文件
// import "./css/index.css";