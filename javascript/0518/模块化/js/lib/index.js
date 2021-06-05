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