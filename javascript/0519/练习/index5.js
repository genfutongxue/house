//去重

const arr = [3, 6, 2, 7, 4, 3, 5, 9, 7, 1, 2, 4, 7, 4];
function fn(arr){
    let obj={};
    let arr1=[];
    arr.forEach((item)=>{
        if(!obj[item]) arr1.push(item);
        obj[item]=true;
    });
    return arr1;
}
console.log(fn(arr));