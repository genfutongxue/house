//获取元素
const oUserName = document.querySelector("input[name=userName]");
const oPassWord = document.querySelector("input[name=passWord]");
const oBtn = document.querySelector("button");

//当用户输入框输入内容的时候，时刻检测输入的字符是否合法
oUserName.oninput = function () {
    if (this.value.length < 11 && /^\w{0,10}$/.test(this.value)) {
        this.style.color = "black";
    } else {
        this.style.color = "red";
    }

}
//当密码输入框输入内容的时候，时刻检测输入的值是否为合法的密码值
oPassWord.oninput = function () {
    if (this.value.length < 16 && /^\w{0,15}$/.test(this.value)) {
        this.style.color = "black";
    } else {
        this.style.color = "red";
    }
}

//当点击登录按钮的时候，判断输入框的值是否合法，如果合法就提交，如果不合法就不提交
oBtn.onclick = function (e) {
    //判断两个输入框是否为空
    if (!oUserName.value || !oPassWord.value) e.preventDefault();
    //判断两个输入框的颜色不是为red的时候就提交
    if (oUserName.style.color === "red" || oPassWord.style.color === "red") e.preventDefault();
}