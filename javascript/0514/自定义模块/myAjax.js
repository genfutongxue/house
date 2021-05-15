function myAjax(options) {
    //先判断是否传入了参数
    if (!options) return;

    //传入了参数那么就把参数进行解构
    let {
        url,
        type = "get",
        data,
        success,
        error,
        complete,
        beforeSend
    } = options;

    //先判断url地址是否有值，如果没有值就不用进行后面的操作了
    if (!url) return;

    //先创建xhr对象
    const xhr = new XMLHttpRequest();

    //调用open方法:分两种情况(get,post)

    //不管是哪种请求，都要用到data数据，那么就要把data数据进行拼接成地址栏的状态
    let paramStr = obj2str(data);

    if (type === "get") {

        //如果是get请求,就在这里执行拼接
        url += "?" + paramStr;
        //拼接完了之后把paramStr的值设置为null，再发送过去
        paramStr = null;
    }

    //
    xhr.open(type, url);

    if (type === "post") {


        //设置请求头
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");


    }

    //在发送之前看看有没有beforeSend，有的话调用
    const isSend = beforeSend && beforeSend();
    //如果该函数的返回值是false，那么就是不用执行后面的代码
    if (isSend === false) return;

    xhr.send(paramStr);

    //监听事件完成情况
    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            complete && complete();

            if (xhr.status === 200) {
                success && success(xhr.responseText);
            } else {
                error && error(xhr);
            }
        }

    }
}



//封装一个函数，把传进来的data数据进行调整成可以在地址栏使用的样式
function obj2str(obj) {
    //如果传进来的不是一个对象的话那么就直接返回出去不用进行转换了
    if (!obj || typeof obj !== "object") return obj;

    //调用对象的for in方法把对象转换出来
    const arr = [];
    for (let key in obj) {
        arr.push(key + "=" + obj[key]);
    }
    //然后再把数组变成字符串
    const str = arr.join("&");
    return str;
}