"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function fn() {
    console.log("hello");
}
var obj = { name: "小明" };
//把这个函数导出去(统一导出)

exports.fn = fn;
exports.obj = obj;