//生成数量显示
textChange();

//内容有无任务显示效果
textContent();


//按下enter键添加内容
function enter() {
    let oHeaderInput = document.querySelector(".todo-header input");
    let oUl = document.querySelector(".todo-main");
    oHeaderInput.onkeyup = function (e) {
        if (e.keyCode === 13) {
            let li = document.createElement("li");
            let arr =
                `<label>
                    <input type="checkbox">
                    <span>${oHeaderInput.value}</span>
                </label>
                <button class="btn btn-danger">删除</button>`;
            li.innerHTML = arr;
            oUl.appendChild(li);
            oHeaderInput.value = "";
            isCheckAll();
            textChange();
            textContent();
        }
    }
}
enter();


//ul里面的点击事件
function ul() {
    let oUl = document.querySelector(".todo-main");
    oUl.onclick = function (e) {
        //点击ul里面的选框，让同级的span改变样式
        if (e.target.nodeName.toLowerCase() === "input") {
            let oSpan = e.target.parentNode.querySelector("span");
            e.target.checked ? oSpan.classList.add("done") : oSpan.classList.remove("done");
        }

        //点击ul里面的删除按钮，删除当前的li
        if (e.target.nodeName.toLowerCase() === "button") {
            e.target.parentNode.id = "delete";
            let oDelete = oUl.querySelector("li#delete");
            oUl.removeChild(oDelete);
            textContent();
        }
        isCheckAll();
        textChange();
    }
}
ul();


//点击footer的input框让ul的选框全部选中或不选中
function footerInput() {
    let oFooterInput = document.querySelector(".todo-footer input");
    oFooterInput.onclick = function () {
        let oMainInputs = document.querySelectorAll(".todo-main input");
        let oMainSpans = document.querySelectorAll(".todo-main span");
        if (this.checked) {
            oMainInputs.forEach(function (item) {
                item.checked = true;
            });
            oMainSpans.forEach(function (item) {
                item.classList.add("done");
            });
        } else {
            oMainInputs.forEach(function (item) {
                item.checked = false;
            });
            oMainSpans.forEach(function (item) {
                item.classList.remove("done");
            });
        }
        textChange();
    }
}
footerInput();


//点击footer下面的清除任务按钮，删除掉已经完成的任务
function footerDelete() {
    let oFooterButton = document.querySelector(".todo-footer button");
    oFooterButton.onclick = function () {
        let oUl = document.querySelector(".todo-main");
        let oMainSpanDones = document.querySelectorAll(".todo-main span.done");
        oMainSpanDones.forEach(function (item) {
            oUl.removeChild(item.parentNode.parentNode);
        });
        isCheckAll();
        textChange();
        textContent();
    }
}
footerDelete();