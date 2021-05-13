//获取元素
const oUserName = document.querySelector("input[name=userName]");
const oPassWord = document.querySelector("input[name=passWord]");
const oRePassWord = document.querySelector("input[name=rePassWord]");
const oRe=document.getElementById("re");
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
        //如果该输入框的长度与确认密码的输入框的长度一致，那么就让确认密码框的颜色为黑色
        if (this.value.length === oRePassWord.value.length) {
            oRePassWord.style.color = "black";
        }
    } else {
        this.style.color = "red";
    }
}
//当确认密码框输入的时候长度不与上个密码框相等就显示红色
oRePassWord.oninput = function () {
    if (this.value.length > oPassWord.value.length) {
        this.style.color = "red";
    } else {
        this.style.color = "black";
    }
}

//当点击登录按钮的时候，判断输入框的值是否合法，如果合法就提交，如果不合法就不提交
oBtn.onclick = function (e) {
    oRe.style.color="black";
    //判断两个输入框是否为空
    if (!oUserName.value || !oPassWord.value || !oRePassWord.value) e.preventDefault();
    //判断两个输入框的颜色不是为red的时候就提交
    if (oUserName.style.color === "red" || oPassWord.style.color === "red" || oRePassWord.style.color === "red") e.preventDefault();
    //还要判断确认密码是否和第一次密码一致，如果不一致要弹出提示
    if(oPassWord.value!==oRePassWord.value){
        e.preventDefault();
        oRe.textContent="两次密码不一致";
        oRe.style.color="red";
    }
}