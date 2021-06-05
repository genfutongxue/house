//快排
const arr = [3, 6, 2, 7, 4, 3, 5, 9, 7, 1, 2, 4, 7, 4];

function speed(arr) {
    if(arr.length<=1) return arr;
    const a = arr.pop();
    let left = [];
    let right = [];
    arr.forEach((item) => {
        if (a > item) left.push(item);
        else right.push(item);
    });
    return speed(left).concat(a,speed(right));
}
console.log(speed(arr));