//判断是否全选中，全部选中就让下面的选框选中
function isCheckAll() {
    let oFooterInput = document.querySelector(".todo-footer input");
    let oMainInputs = document.querySelectorAll(".todo-main input");
    let oCheckedInputs = document.querySelectorAll(".todo-main input:checked");
    if (oMainInputs.length > 0 && oMainInputs.length === oCheckedInputs.length) {
        oFooterInput.checked = true;
    } else {
        oFooterInput.checked = false;
    }
}


//改变显示内容
function textChange() {
    let oDoneNum = document.getElementById("doneNum");
    let oTotalNum = document.getElementById("totalNum");
    let oMainInputs = document.querySelectorAll(".todo-main input");
    let oCheckedInputs = document.querySelectorAll(".todo-main input:checked");
    oDoneNum.textContent = oCheckedInputs.length;
    oTotalNum.textContent = oMainInputs.length;
}


//当ul里面没有li的时候，要把main和footer的内容隐藏掉，然后显示一个h3标签内容
function textContent() {
    let oWrap=document.querySelector(".todo-wrap");
    let oUl = document.querySelector(".todo-main");
    let oFooter = document.querySelector(".todo-footer");
    let oLis = document.querySelectorAll(".todo-main li");
    if(!oLis.length){
        oUl.style.display="none";
        oFooter.style.display="none";
        let oH3=document.createElement("h3");
        oH3.textContent="没有任务了！";
        oWrap.appendChild(oH3);
    }else{
        oUl.style.display="block";
        oFooter.style.display="block";
        let oH3=oWrap.querySelector("h3");
        if(oH3){
            oWrap.removeChild(oH3);
        }
    }
}
