const str = '张三：1000，李四：5000，王五：8000。';
const newStr = str.match(/\d+/g);
// console.log(newStr);
const str1 = "123123@xx.com,fangfang@valuedopinions.cn 286669312@qq.com 2、emailenglish@emailenglish.englishtown.com 286669312@qq.com...";
const newStr1 = str1.match(/\w+@\w+\.(com|cn)/g);
// console.log(newStr1);
const str2 = "2015-5-10";
// const newStr2=str2.match(/\d{4}/g);
// console.log(newStr2);
const RegExp1 = /(\d{4})-(\d{1,2})-(\d{1,2})/;
RegExp1.test(str2);
// console.log(RegExp.$1);
// console.log(RegExp.$2);
// console.log(RegExp.$3);

//替换
const str3 = "   123AD  asadf   asadfasf  adf ";
const newStr3 = str3.replace(/\s/g, "" );
console.log(newStr3);