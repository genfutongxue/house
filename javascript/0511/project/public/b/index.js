//获取元素
const oUserName = document.querySelector("input[name='userName']");
const oTip_userName = document.querySelector("#tip-userName");
const oPassword = document.querySelector("input[name='passWord']");
const oTip_passWord = document.querySelector("#tip-passWord");
const oRePassword = document.querySelector("input[name='rePassWord']");
const oTip_rePassWord = document.querySelector("#tip-rePassWord");
const oSubmit = document.querySelector("input[type='submit']");

//当输入框失去焦点的时候
oUserName.oninput = function () {
    //判断输入框的值是否为空,如果为空就给后面的span标签添加红色样式，如果符合条件(8到16个字符)就显示绿色的样式
    if (/^\w{8,16}$/.test(this.value)) {
        oTip_userName.textContent = "输入正确";
        oTip_userName.style.color = "green";
    } else {
        oTip_userName.textContent = "输入错误";
        oTip_userName.style.color = "red";
    }

}
oPassword.oninput = function () {
    //密码框的条件是8到16个字符，并且要以字母开头，其他都为字母数字或下划线
    if (/^[A-Za-z]+\w{7,15}$/.test(this.value)) {
        oTip_passWord.textContent = "输入正确";
        oTip_passWord.style.color = "green";
    } else {
        oTip_passWord.textContent = "输入错误";
        oTip_passWord.style.color = "red";
    }
}
oRePassword.oninput = function () {
    if (this.value === oPassword.value) {
        oTip_rePassWord.textContent = "输入正确";
        oTip_rePassWord.style.color = "green";
    } else {
        oTip_rePassWord.textContent = "输入错误";
        oTip_rePassWord.style.color = "red";
    }
}

//当点击登录按钮的时候，要判断输入框的值是否符合内容，那么点击输入框的时候也会让输入框失去焦点，那么就可以直接判断输入框的后面的span的颜色是否为红色，如果红色就直接不提交
oSubmit.onclick = function (e) {
    if (!oTip_userName.style.color || !oTip_passWord.style.color || !oTip_rePassWord.style.color) e.preventDefault();
    if (oTip_userName.style.color === "red" || oTip_passWord.style.color === "red" || oTip_rePassWord.style.color === "red") e.preventDefault();
}