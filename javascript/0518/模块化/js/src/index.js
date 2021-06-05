//接收统一导出的文件方式：
import {
    fn,
    obj
} from "./module";
console.log(fn,obj);

//接收分别导出的文件方式:
import {
    fn1,
    obj1
} from "./module1";
console.log(fn1,obj1);

//接收默认导出的文件方式
import niubi from "./module2";
console.log(niubi);