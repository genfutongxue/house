(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _module = require("./module");

var _module2 = require("./module1");

var _module3 = require("./module2");

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_module.fn, _module.obj);

//接收分别导出的文件方式:
//接收统一导出的文件方式：

console.log(_module2.fn1, _module2.obj1);

//接收默认导出的文件方式

console.log(_module4.default);
},{"./module":2,"./module1":3,"./module2":4}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fn1 = fn1;
//分别导出
function fn1() {
    console.log("这是分别导出去的");
}
var obj1 = exports.obj1 = { name: "小蓝" };
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//默认导出
var a = "你真帅！";
exports.default = a;
},{}]},{},[1]);
