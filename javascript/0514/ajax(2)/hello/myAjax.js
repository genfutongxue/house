//这个函数是模拟jQuery里的ajax请求的功能
function myAjax(obj) {

    //首先判断是否传入参数，如果没有传入参数，就直接返回出去
    if (!obj) return;

    //然后把传入的对象的内容进行解构出来
    const {
        url,
        data,
        type="get",
        timeout,
        dataType="json",
        success,
        error,
        complete,
        beforeSend
    } = obj;

    //然后先判定url是否有值，如果没有值直接返回
    if (!url) return;

    //创建xhr对象
    const xhr = new XMLHttpRequest();

    //设置超时的时间
    xhr.timeout = timeout;

    //调用处理data数据的方法，把它转换成字符串
    let str = obj2str(data);

    //如果是get请求，那么要把传入的数据拼接到url地址中
    if (type.toLowerCase() === "get") {
        url += "?" + str;
        str = null;
    }

    //调用open方法去设置请求首行的内容
    xhr.open(type, url);

    //如果是post请求，就要设置请求头的内容
    if (type.toLowerCase() === "post") xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    //在发送之前先执行beforeSend函数
    beforeSend && beforeSend();

    //然后调用send方法设置并发送请求信息
    xhr.send(str);

    //然后就监听请求状态
    xhr.onreadystatechange = function () {

        //状态是4的时候才是完成了
        if (xhr.readyState === 4) {

            //完成了就调用complete函数
            complete && complete();

            //
            if (xhr.status === 200) {

                let value = null;
                //如果传入的dataType是json，那么就要转成js对象，如果是text，那么就不用转换直接返回出去
                if (dataType.toLowerCase() === "json") {
                    value = JSON.parse(xhr.responseText);
                } else if (dataType.toLowerCase() === "text") {
                    value = xhr.responseText;
                }
                //成功了就调用success函数
                success && success(value);
            } else {
                //失败了就调用error函数
                error && error(xhr);
            }
        }
    }
}

//配置data转换字符串的方法
function obj2str(obj) {

    //如果obj不是对象的话就直接返回出去了不用转换了
    if (!obj || typeof obj !== "object") return obj;

    //遍历对象把对象转换成想要的字符串
    let arr = [];
    for (let key in obj) {
        arr.push(key + "=" + obj[key]);
    }
    return arr.join("&");
}