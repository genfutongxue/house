import a, {
    b,
    fn
} from "./js/module1";
console.log(a, b);
fn();

import {
    a as a1,
    b as b1,
    c
} from "./js/module2";
console.log(a1,b1);
c();

import {fn2,fn3} from "./js/module3";
console.log(fn2(3,3,4));
fn3();

import "./less/index.less";