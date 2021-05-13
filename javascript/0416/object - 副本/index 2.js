window.addEventListener("DOMContentLoaded", function () {
    //放大镜效果
    magnifier();

    function magnifier() {
        //先获取元素，当鼠标移入的时候蒙版和大图要显示出来
        var oMask = document.querySelector(".content>.con .img-small .mask");

        var oBigimg = document.querySelector(".content>.con .img-big");

        var oSmallimg = document.querySelector(".content>.con .img-small");

        var oImageB = document.querySelector(".content>.con .img-big>img");

        //鼠标移入事件
        oSmallimg.onmousemove = function (e) {
            //先让他们显现出来
            oMask.style.display = "block";
            oBigimg.style.display = "block";

            //首先要把蒙版跟着鼠标走，让鼠标一直在蒙版的中间
            //获取鼠标距离视口的位置，然后获取小图框到视口的距离，相减就获取到了鼠标距离小图边框的距离，再减去蒙版的一半，就获取到了蒙版在小图中的实时位置了
            var mouseToWindow = {
                x: e.clientX,
                y: e.clientY
            }
            var smallImgToWindow = {
                x: oSmallimg.getBoundingClientRect().left,
                y: oSmallimg.getBoundingClientRect().top
            }
            var maskToSmallImg = {
                x: mouseToWindow.x - smallImgToWindow.x - oMask.offsetWidth / 2,
                y: mouseToWindow.y - smallImgToWindow.y - oMask.offsetHeight / 2
            }
            //赋值之前先进行判断，如果超过临界值就把它固定在边上
            if (maskToSmallImg.x > oSmallimg.clientWidth - oMask.offsetWidth) {
                maskToSmallImg.x = oSmallimg.clientWidth - oMask.offsetWidth;
            }
            if (maskToSmallImg.x < 0) {
                maskToSmallImg.x = 0;
            }
            if (maskToSmallImg.y > oSmallimg.clientHeight - oMask.offsetHeight) {
                maskToSmallImg.y = oSmallimg.clientHeight - oMask.offsetHeight;
            }
            if (maskToSmallImg.y < 0) {
                maskToSmallImg.y = 0;
            }
            //算出来之后就进行赋值
            oMask.style.left = maskToSmallImg.x + "px";
            oMask.style.top = maskToSmallImg.y + "px";


            //大图也要跟着走，蒙版走的距离/蒙版总共可以走的距离=大图走的距离/大图总共可以走的距离
            var maskMoveAll = {
                x: oSmallimg.clientWidth - oMask.offsetWidth,
                y: oSmallimg.clientHeight - oMask.offsetHeight
            }
            var bigMoveAll = {
                x: oImageB.clientWidth - oBigimg.clientWidth,
                y: oImageB.clientHeight - oBigimg.clientHeight
            }
            var bigMove = {
                x: maskToSmallImg.x / maskMoveAll.x * bigMoveAll.x,
                y: maskToSmallImg.y / maskMoveAll.y * bigMoveAll.y
            }
            //算出了大图走的距离之后，就可以赋值了，因为蒙版的值被限定了范围，所以这个就不用去判断了
            oImageB.style.left = -bigMove.x + "px";
            oImageB.style.top = -bigMove.y + "px";

        }
        oSmallimg.onmouseleave = function () {
            oMask.style.display = "none";
            oBigimg.style.display = "none";
        }
    }


    //缩略图生成
    produce();

    function produce() {

        var oImgsrc = goodData.imgsrc;

        var oUl = document.querySelector(".con-left-2 .con-left-2-1 .img-small-small");

        //遍历oImgsrc
        oImgsrc.forEach(function (item) {

            //生成img
            var Img = document.createElement("img");
            Img.src = item.s;

            //生成li
            var Li = document.createElement("li");
            Li.appendChild(Img);
            oUl.appendChild(Li);

        });


    }


    //缩略图的效果
    thumbnail();

    function thumbnail() {
        //插入中图大图的获取元素
        var oImgsrc = goodData.imgsrc;

        var oImageB = document.querySelector(".content>.con .img-big>img");

        var oImageS = document.querySelector(".content>.con .img-small>img");

        //获取元素
        var oLis = document.querySelectorAll(".con-left-2 .con-left-2-1 .img-small-small li");
        var oUl = document.querySelector(".con-left-2 .con-left-2-1 .img-small-small");
        var oLeft = document.querySelector(".con>.con-left>.con-left-2>.left");
        var oRight = document.querySelector(".con>.con-left>.con-left-2>.right");

        //先算出来每一步要走的距离
        var everyMove = oLis[0].offsetWidth * 2;

        //算出总共要走的距离：显示5张图，那么图片数量-5再乘以每张图片的宽就是距离了
        var moveAll = (oLis.length - 5) * oLis[0].offsetWidth;

        //声明一个基础距离
        var distance = 0;

        //声明一个变量用来计算点击之后谁在显示的最前面
        var number = null;

        //绑事件
        //点击左边，意思是要查看左边的图，那么底图就要往右走才行
        oLeft.onclick = function () {
            //图片往右走，除去负号的话distance应该是要越来越小才对，所以判定distance是否小于每一次走的距离，如果不是，那么就让它直接为0
            if (distance > everyMove) {
                distance -= everyMove;
            } else {
                distance = 0;
            }
            //然后给要移动的框赋值,因为css设置样式的时候是用动画让它移动的，所以这里要给translate赋值
            oUl.style.transform = "translateX(-" + distance + "px)";

            //通过ul的位置计算出谁在最前面
            number = distance / oLis[0].offsetWidth;
            //设置对应的图片
            oImageB.src = oImgsrc[number].b;
            oImageS.src = oImgsrc[number].s;
        }

        //同理，点击右边，意思就是要查看右边的图片，那么底图就应该往左走
        oRight.onclick = function () {
            //图片往左走，出去负号distance的值应该越来越大，所以判定moveAll-distance是否小于everyMove，如果是，就直接让它走到底了
            if (moveAll - distance > everyMove) {
                distance += everyMove;
            } else {
                distance = moveAll;
            }
            //赋值
            oUl.style.transform = "translateX(-" + distance + "px)";

            //通过ul的位置计算出谁在最前面
            number = distance / oLis[0].offsetWidth;
            //设置对应的图片
            oImageB.src = oImgsrc[number].b;
            oImageS.src = oImgsrc[number].s;
        }

        //点击每个缩略图的移动效果
        //遍历每一个li，当被点击的时候，让他们的ul移动，效果就是点击哪一张就让哪一张走到第一个位置，只有走到底的时候不进行移动
        oLis.forEach(function (item, index) {
            item.onclick = function () {
                //每次点击的时候,根据点击的是哪一张图，通过下标就可以知道，那么就可以得出ul的位移距离
                //点击之前先判定下标为几，如果是最后5张则不移动,让ul的位置固定在那里
                if (index >= oLis.length - 5) {
                    oUl.style.transform = "translateX(-" + moveAll + "px)";
                } else {
                    distance = oLis[0].offsetWidth * index;
                    oUl.style.transform = "translateX(-" + distance + "px)";
                }

                //设置对应的图片
                oImageB.src = oImgsrc[index].b;
                oImageS.src = oImgsrc[index].s;
            }

        });
    }


    //数据详情插入
    detailData();

    function detailData() {
        //给con-right插入内容
        //con-con插入内容
        var oGoodsDetail = goodData.goodsDetail;
        var oCon_con = document.querySelector(".content>.con>.con-right>.con-con");
        oCon_con.innerHTML = '<h3>' + oGoodsDetail.title + '</h3>\
        <div class="recommend">' + oGoodsDetail.recommend + '</div>\
        <div class="price">\
            <div class="price-1">\
                <span class="tit">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>\
                <span>￥</span>\
                <span class="money">' + oGoodsDetail.price + '</span>\
                <span>元</span>\
            </div>\
            <div class="price-2">\
                <span class="tit">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>\
                <div>\
                    <span class="red">' + oGoodsDetail.promoteSales.type + '</span>\
                    <span>' + oGoodsDetail.promoteSales.content + '</span>\
                </div>\
            </div>\
        </div>\
        <div class="price-3">\
            <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>\
            <span>' + oGoodsDetail.support + '</span>\
        </div>\
        <div class="price-3">\
            <span>配 送 至</span>\
            <span>' + oGoodsDetail.address + '</span>\
        </div>';

        //给buy插入内容
        var oBuy = document.querySelector(".content>.con>.con-right>.buy");
        var oCrumbData = goodData.goodsDetail.crumbData;

        oCrumbData.forEach(function (item) {
            //数组中有多少个对象，就生成多少个dl
            var Dl = document.createElement("dl");
            //每个对象的title就生成对应的dt
            var Dt = document.createElement("dt");
            //给dt插入内容
            Dt.innerHTML = item.title;
            //再给dl插入Dt
            Dl.appendChild(Dt);
            //再遍历data生成对应的dd
            item.data.forEach(function (item) {
                var Dd = document.createElement("dd");
                Dd.innerHTML = item.type;
                //生成dd的时候给dd添加一个自定义属性，值为价格
                Dd.dataset.price=item.changePrice;
                //给dl中插入dd
                Dl.appendChild(Dd);
            })
            //再给buy中插入dl
            oBuy.appendChild(Dl);
        })

        //获取到所有的dl,给dl中第一个dd添加默认样式
        var oDl = document.querySelectorAll(".content>.con>.con-right>.buy>dl");
        oDl.forEach(function (item) {
            var oDd = item.querySelectorAll("dd");
            oDd[0].style.backgroundColor = "red";
            oDd[0].style.color = "#fff";
        })
    }



    //商品筛选
    select();

    function select() {
        //声明一个空数组，里面放入4个null
        var arr = new Array(4);
        arr.fill(null);

        //先获取到所有的dl，然后遍历这些dl，再获取到每个dl下面的dd，再遍历dd，给每个dd绑定点击事件
        var oDl = document.querySelectorAll(".content>.con>.con-right>.buy>dl");

        //获取到要添加mark的元素
        var oSelected = document.querySelector(".content>.con>.con-right>.selected");

        oDl.forEach(function (item, index) {

            //再获取到每个dl下面的dd
            var oDd = item.querySelectorAll("dd");

            oDd.forEach(function (item) {

                item.onclick = function () {

                    //点击dd的时候先清空当前dl所在的所有dd的样式
                    oDd.forEach(function (item) {
                        item.style.backgroundColor = "";
                        item.style.color = "#000";
                    });

                    //再给当前dd的样式变成红色
                    this.style.backgroundColor = "red";
                    this.style.color = "#fff";

                    //当dd被点击的时候：给数组中对应位置的地方加上dd
                    arr[index] = this;

                    //每次添加mark标签的时候要先把mark里的内容清空掉
                    oSelected.innerHTML = "";

                    //再遍历arr数组去生成对应的mark标签
                    arr.forEach(function (item, i) {

                        if (item) {
                            //生成mark标签
                            var oMark = document.createElement("mark");
                            oMark.innerHTML = item.innerHTML;

                            //生成a标签
                            var oA = document.createElement("a");

                            //给a标签添加内容为X
                            oA.innerHTML = "X";

                            //给a标签添加一个自定义属性，值为当前点击所对应的数组的下标
                            oA.dataset.under = i;

                            //把a标签插入到mark标签里面
                            oMark.appendChild(oA);

                            //再把mark标签插入到它的内容里面去
                            oSelected.appendChild(oMark);
                        }
                    })

                    //给a标签绑定删除功能,先获取到所有的a标签，然后遍历
                    var oDel = document.querySelectorAll("mark a");

                    oDel.forEach(function (item) {

                        item.onclick = function () {

                            //把当前的mark标签删除
                            item.parentNode.remove();

                            //并且要把数组中的值也要删掉
                            arr[item.dataset.under] = null;

                            //删除掉之后，先把当前dl中所有的dd的样式清空，再把第一个dd的样式设置为默认样式
                            var oDd = oDl[item.dataset.under].querySelectorAll("dd");
                            oDd.forEach(function (item) {
                                item.style.backgroundColor = "transparent";
                                item.style.color = "#000";
                            });
                            oDd[0].style.backgroundColor = "red";
                            oDd[0].style.color = "#fff";

                            //每次删除的时候也要修改价格
                            changePrice(arr);

                        }
                    })

                    //每次点击的时候都要修改价格
                    changePrice(arr);
                }
            })
        })


    }


    //生成一个改变价格的函数
    function changePrice(arr) {
        //获取到要改变价格的标签
        var oMoney=document.querySelector(".content>.con>.con-right>.con-con>.price>.price-1>.money");
        //先获取到基础价钱
        var basePrice=goodData.goodsDetail.price;
        //获取到具体的数量
        var oIpt=document.querySelector(".content>.con>.con-right>form>input");
        //遍历数组，如果数组有内容就加上基础价格
        arr.forEach(function(item){
            if(item){
                basePrice += +item.dataset.price;
            }
        });
        oMoney.innerHTML=basePrice*oIpt.value;
    }


    //数量改变
    number();

    function number() {
        //先获取数量输入框元素
        var oIpt = document.querySelector(".con>.con-right>form>input");
        var oPlus = document.querySelector(".con>.con-right>form>.plus");
        var oLower = document.querySelector(".con>.con-right>form>.lower");
        //获取到价钱，然后根据数量去改变它的值
        var oPrice = document.querySelector(".con>.con-right>.con-con .money");
        //初始化数量框的值为1
        oIpt.value = 1;
        //添加一个初始化的值，让它点击的时候根据点击次数累加
        var num = 1;
        //添加点击事件
        oPlus.onclick = function () {
            num++;
            oIpt.value = num;
            //先获取到原来的价格，但是因为原来的价格是可能已经修改过的，所以要除以num-1，得出的就是单价了
            var price = oPrice.innerHTML / (num - 1);
            oPrice.innerHTML = price * num;
        }
        oLower.onclick = function () {
            num--;
            if (num < 1) {
                num = 1;
                return;
            }
            oIpt.value = num;
            //先获取价格，因为点击的时候num已经先-1了，所以再除以num+1，因为设置了num的最小值，所以价钱也会有最小值
            var price = oPrice.innerHTML / (num + 1);
            oPrice.innerHTML = price * num;
        }
    }


    //左边的tab切换
    tabChange();

    function tabChange() {

        //获取元素
        var oH4 = document.querySelectorAll(".con-1>.con-sidebar>header>h4");
        var oTab = document.querySelectorAll(".con-1>.con-sidebar>.con-sidebar-con>.tab");
        //绑定点击事件
        oH4.forEach(function (item, index) {
            item.onclick = function () {
                //把所有的h4和tab都清掉类名,因为h4和tab是相对应的，所以可以跟着h4的下标一起清掉
                oH4.forEach(function (item, index) {
                    item.classList.remove("active");
                    oTab[index].classList.remove("active");
                });
                this.classList.add("active");
                oTab[index].classList.add("active");
            }
        });
    }


    //选择搭配：更改价格
    collocation();

    function collocation() {
        //先获取到元素，ul下面的全部li，价格部分
        //思想：用一个数组去做储存，选择了的就放入数组中，然后计算价格的时候遍历数组
        //先获取到基础价格
        var oPrice = document.querySelector(".con-1 .con-1-con .collocation .goodSuits .master>p>span");

        //获取到全部的li下面的label下面的input
        var oInputs = document.querySelectorAll(".con-1 .con-1-con .collocation .goodSuits  .suits label input");

        //获取到要改动的价格
        var oPriceChange = document.querySelector(".con-1 .con-1-con .collocation .goodSuits .check .priceAll span");

        //声明一个基本价格
        var basePrice = +oPrice.textContent;

        //声明一个改动价格，然后赋值
        var changePrice = 0;

        // 获取到件数
        var oNum = document.querySelector(".con-1 .con-1-con .collocation .goodSuits .check .num>span");

        //声明一个计数器
        var num = 0;

        //遍历oInputs
        oInputs.forEach(function (item) {

            //给每个input的父级label绑定点击事件
            item.parentNode.onclick = function () {
                //每次点击的时候初始化改变价格的变量
                changePrice = 0;
                //每次点击的时候都要把num初始化为0;
                num = 0;

                //再次遍历所有的input标签，选中了的就加上价格
                oInputs.forEach(function (item) {
                    //判断是否选中，如果选中则给数组加上内容值,并且计数加1
                    if (item.checked) {
                        num++;

                        changePrice += +item.value;

                        oPriceChange.innerHTML = changePrice + basePrice;

                    }

                });
                if (num === 0) {

                    oPriceChange.innerHTML = basePrice;

                    oNum.innerHTML = 1

                } else {

                    oNum.innerHTML = num + 1;
                }
            }
        });






    }


    //内容介绍环节
    //设置点击哪个就跳转到哪个地方
    skip();

    function skip() {
        //获取元素
        var oTabs = document.querySelectorAll(".con-1 .con-1-con .introduce .intro-tab>li");
        var oIntroduces = document.querySelectorAll(".con-1 .con-1-con .introduce>div");

        //遍历并添加绑定事件
        oTabs.forEach(function (item, index) {
            item.onclick = function () {
                //把所有的tab的point删掉，再给当前的加上
                oTabs.forEach(function (item, index) {
                    item.classList.remove("point");
                });

                //把介绍页的全部point删掉
                oIntroduces.forEach(function (item) {
                    item.classList.remove("point");
                });

                this.classList.add("point");
                oIntroduces[index].classList.add("point");
            }
        });
    }


    //侧边栏:搭配css动画
    sidebarClick();

    function sidebarClick() {
        var oSidebar = document.querySelector(".sidebar");
        var oSwitch = document.querySelector(".sidebar>.switch");
        var flag = false;
        oSwitch.onclick = function () {
            //判断之后改变right的值
            if (flag) {
                oSidebar.style.right = -294 + "px";
                flag = !flag;
            } else {
                oSidebar.style.right = 0;
                flag = !flag;
            }
        }

    }

});