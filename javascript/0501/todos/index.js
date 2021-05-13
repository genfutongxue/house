//当按下回车键的时候，给ul添加内容
$(".todo-header input").on("keyup", function (e) {

    //如果按的键是enter（13号）的话就获取到输入框的内容
    if (e.keyCode === 13) {
        //按下的时候要判断是否有内容
        let $value = this.value.trim();
        if ($value) {
            //并且要生成li添加到ul里面
            let arr = `<li>
                    <label>
                    <input type="checkbox">
                    <span>${e.target.value}</span>
                    </label>
                    <button class="btn btn-danger">删除</button>
                    </li>`;
            $(".todo-main").append(arr);
            //添加完了之后要把输入框的内容清空
            this.value = "";
            if ($(".todo-main li").length === $(".todo-main input:checked").length) {
                $(".todo-footer input").prop("checked", true);
            } else {
                $(".todo-footer input").prop("checked", false);
            }

        } else {
            alert("请重新输入！");
            this.value = "";
        }
        //动态改变任务数量
        $("#totalNum").text($(".todo-main li").length);
        $("#doneNum").text($(".todo-main input:checked").length);
    }
});

//按下多选框要让当前选中的li的样式改变
//因为会增加内容，所以这里要用事件委托
$(".todo-main").on("click", function (e) {
    //先判断点击的是否是input
    if (e.target.nodeName.toLowerCase() === "input") {
        //判断选项里的选中状态
        if (e.target.checked) {

            //如果选中了，就要判断是否全部都选中了，如果全部选中了下面的全选框要加上
            if ($(".todo-main li").length === $(".todo-main input:checked").length) {
                $(".todo-footer input").prop("checked", true);
            }
            $(e.target).next()[0].classList.add("done")
        } else {
            //如果没有就要去掉
            $(e.target).next()[0].classList.remove("done");
            $(".todo-footer input").prop("checked", false);
        }
        //动态改变任务数量
        $("#totalNum").text($(".todo-main li").length);
        $("#doneNum").text($(".todo-main input:checked").length);
    }
});

//点击全选框，要让全部input都选中
$(".todo-footer input").on("click", function () {
    if ($(".todo-footer input").prop("checked")) {
        $(".todo-main span").addClass("done");
        $(".todo-main input").prop("checked", true);
    } else {
        $(".todo-main input").prop("checked", false);
        $(".todo-main span").removeClass("done");
    }
    //动态改变任务数量
    $("#totalNum").text($(".todo-main li").length);
    $("#doneNum").text($(".todo-main input:checked").length);
});

//点击删除按钮要把当前所在的li删除，还是要事件委托
$(".todo-main").on("click", function (e) {
    if (e.target.nodeName.toLowerCase() === "button") {
        $(e.target).parent().remove();
        if ($(".todo-main li").length === $(".todo-main input:checked").length) {
            $(".todo-footer input").prop("checked", true);
        } else {
            $(".todo-footer input").prop("checked", false);
        }
        if ($(".todo-main li").length === 0) {
            $(".todo-footer input").prop("checked", false);
        }
        //动态改变任务数量
        $("#totalNum").text($(".todo-main li").length);
        $("#doneNum").text($(".todo-main input:checked").length);
    }
});

//点击清除已完成按钮，要把已经选中的input删除掉
$(".todo-footer button").on("click", function () {
    $(".todo-main input:checked").parent().parent().remove();
    if ($(".todo-main li").length === 0) {
        $(".todo-footer input").prop("checked", false);
    }
    //动态改变任务数量
    $("#totalNum").text($(".todo-main li").length);
    $("#doneNum").text($(".todo-main input:checked").length);

});

//动态改变任务数量
$("#totalNum").text($(".todo-main li").length);
$("#doneNum").text($(".todo-main input:checked").length);