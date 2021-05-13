window.addEventListener("DOMContentLoaded", function () {
    //放大镜效果：
    preview();

    function preview() {
        //获取要操作的元素
        var oCon_left_1 = document.querySelector(".con>.con-left>.con-left-1");
        var oMask = document.querySelector(".con>.con-left>.con-left-1>.img-small>.mask");
        // var oImg_small = document.querySelector(".con>.con-left>.con-left-1>.img-small");
        var oImg_small_img = document.querySelector(".con>.con-left>.con-left-1>.img-small>img");
        var oImg_big = document.querySelector(".con>.con-left>.con-left-1>.img-big");
        var oImg_big_img = document.querySelector(".con>.con-left>.con-left-1>.img-big>img");

        //初始化数据中的第一张图片
        var imgsrc = goodData.imgsrc;
        oImg_small_img.src = imgsrc[0].s;
        oImg_big_img.src = imgsrc[0].b;

        //绑定鼠标移入事件：
        oCon_left_1.onmousemove = function (e) {
            //把蒙版和大图显示
            oMask.style.display = "block";
            oImg_big.style.display = "block";
            //小图到视口的距离
            var oImg_small_imgXY = {
                x: oImg_small_img.getBoundingClientRect().left,
                y: oImg_small_img.getBoundingClientRect().top
            }
            //计算蒙版的位置：鼠标离视口的距离-小图离视口的距离-蒙版自身宽或高的一半
            var oMaskXY = {
                x: e.clientX - oImg_small_imgXY.x - oMask.offsetWidth / 2,
                y: e.clientY - oImg_small_imgXY.y - oMask.offsetHeight / 2
            }
            //赋值之前要先判断临界值
            if (oMaskXY.x <= 0) {
                oMaskXY.x = 0;
            } else if (oMaskXY.x >= oImg_small_img.clientWidth - oMask.offsetWidth) {
                oMaskXY.x = oImg_small_img.clientWidth - oMask.offsetWidth;
            }
            if (oMaskXY.y <= 0) {
                oMaskXY.y = 0;
            } else if (oMaskXY.y >= oImg_small_img.clientHeight - oMask.offsetHeight) {
                oMaskXY.y = oImg_small_img.clientHeight - oMask.offsetHeight;
            }
            //然后把位置的值赋给蒙版
            oMask.style.left = oMaskXY.x + "px";
            oMask.style.top = oMaskXY.y + "px";

            //计算大图走的位置：根据比例，小图走多少大图就走相应的比例
            //蒙版走的距离/蒙版总共可以走的距离=大图走的距离/大图总共可以走的距离
            //蒙版总共可以走的距离
            var oMaskXYAll = {
                x: oImg_small_img.clientWidth - oMask.offsetWidth,
                y: oImg_small_img.clientHeight - oMask.offsetHeight
            }
            var oBigImgAll = {
                x: oImg_big_img.clientWidth - oImg_big.clientWidth,
                y: oImg_big_img.clientHeight - oImg_big.clientHeight
            }
            //那么就可以根据蒙版走的距离算出大图走的距离，但是要为负的
            var oBigImgMove = {
                x: oMaskXY.x / oMaskXYAll.x * oBigImgAll.x,
                y: oMaskXY.y / oMaskXYAll.y * oBigImgAll.y
            }
            //然后就赋值给大图
            oImg_big_img.style.left = -oBigImgMove.x + "px";
            oImg_big_img.style.top = -oBigImgMove.y + "px";



            //当鼠标移出小图的时候要去掉效果

            oCon_left_1.onmouseleave = function () {
                oMask.style.display = "none";
                oImg_big.style.display = "none";
            }
        }
    }

    //缩略图的效果：
    thumbnail();

    function thumbnail() {
        //先获取到所有需要用的元素
        // var oCon_left_2 = document.querySelector(".con>.con-left>.con-left-2");
        // var oCon_left_2_1 = document.querySelector(".con>.con-left>.con-left-2>.con-left-2-1");
        var oUl = document.querySelector(".con>.con-left>.con-left-2>.con-left-2-1>.img-small-small");
        var oLeft = document.querySelector(".con>.con-left>.con-left-2>.left");
        var oRight = document.querySelector(".con>.con-left>.con-left-2>.right");

        //根据数据生成缩略图的内容
        var oImgsrc = goodData.imgsrc;
        //遍历oImgsrc生成li和img
        oImgsrc.forEach(function (item, index) {
            var Img = document.createElement("img");
            var Li = document.createElement("li");
            //给Img添加图片地址
            Img.src = item.s;
            Li.appendChild(Img);
            //然后给Ul添加创建的li
            oUl.appendChild(Li);
        });


        //获取生成好了的全部li
        var oLis = document.querySelectorAll(".con>.con-left>.con-left-2>.con-left-2-1>.img-small-small>li")

        //计算如何走，每点击一次走两张图片，那么就是走两个li的offsetWidth，要判断临界值,当距离不够时直接走到底
        var everyMove = oLis[0].offsetWidth * 2;
        //计算总共可以走的距离:所有li减去显示的5个li
        var moveAll = oLis[0].offsetWidth * (oLis.length - 5);
        //先获取到当前ul的移动的距离

        var location = 0;

        //绑定点击事件
        //当点击右边的时候就是要查看右边的图片，那么就要把ul往左移动，那么它的left就要为负数
        oRight.onclick = function () {

            //判断临界值:当剩余的距离小于每一步走的距离的时候就让他直接走到底
            if (moveAll - location > everyMove) {
                location += everyMove;
            } else {
                location = moveAll;
            }
            //然后给ul的transform赋值
            oUl.style.transform = "translateX(-" + location + "px)";
        }

        //当点击左边的时候就要查看左边的图片，就要把ul往右移动，那么它的translateX本来是负数的，去掉负号的话，那么它的值会越来越小才对
        oLeft.onclick = function () {
            //判断临界值，每次点击都要把location的数值减少，直到location小于每一次移动的距离的时候，就直接把location的值为0，这样就走到底了
            if (location > everyMove) {
                location -= everyMove;
            } else {
                location = 0;
            }
            oUl.style.transform = "translateX(-" + location + "px)";
        }


        //缩略图的点击效果：
        //遍历每一个li，当li被点击的时候让ul移动，那么可以根据点击的li的下标来控制ul要走的距离
        oLis.forEach(function (item, index) {
            item.onclick = function () {

                //当点击一张图片的时候，把上面的图片和大图的图片路径修改成对应的图片
                var imgsrc = goodData.imgsrc;
                var oImg_small_img = document.querySelector(".con>.con-left>.con-left-1>.img-small>img");
                var oImg_big_img = document.querySelector(".con>.con-left>.con-left-1>.img-big>img");

                oImg_small_img.src = imgsrc[index].s;
                oImg_big_img.src = imgsrc[index].b;

                //计算总共可以走的距离:所有li减去显示的5个li
                var moveAll = oLis[0].offsetWidth * (oLis.length - 5);
                //声明一个位置，然后通过下标去计算位置的大小
                location = index * oLis[0].offsetWidth;
                //判断临界值：
                if (location > moveAll) {
                    location = moveAll;
                }

                //赋值给ul
                oUl.style.transform = "translateX(-" + location + "px)";
            }
        })
    }

    //数据详情插入
    detailData();

    function detailData() {
        //先获取要插入内容的标签
        var oCon_con = document.querySelector(".con>.con-right>.con-con");
        //获取要插入内容的js文件的对象用变量接受
        var goodsDetail = goodData.goodsDetail;
        //生成要插入的内容
        var str = '<h3>' + goodsDetail.title + '</h3>\
        <div class="recommend">' + goodsDetail.recommend + '</div>\
        <div class="price">\
            <div class="price-1">\
                <span class="tit">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>\
                <span>￥</span>\
                <span class="money">' + goodsDetail.price + '</span>\
                <span>元</span>\
            </div>\
            <div class="price-2">\
                <span class="tit">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>\
                <div>\
                    <span class="red">' + goodsDetail.promoteSales.type + '</span>\
                    <span>' + goodsDetail.promoteSales.content + '</span>\
                </div>\
            </div>\
        </div>\
        <div class="price-3">\
            <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>\
            <span>' + goodsDetail.support + '</span>\
        </div>\
        <div class="price-3">\
            <span>配 送 至</span>\
            <span>' + goodsDetail.address + '</span>\
        </div>';
        oCon_con.innerHTML = str;
    }

    //商品选择插入内容
    choose();

    function choose() {
        //先去js数据文件中用一个变量接受到数据
        var crumbData = goodData.goodsDetail.crumbData;

        //获取要插入内容的元素
        var oBuy = document.querySelector(".con>.con-right>.buy");

        //因为crumbData这个数据是一个数组，然后就遍历它再去生成每一个内容
        crumbData.forEach(function (item, index) {
            //先生成dl
            var Dl = document.createElement("dl");
            //再生成dt
            var Dt = document.createElement("dt");
            //给dt插入内容
            Dt.innerHTML = item.title;
            //把Dt插入到Dl中去
            Dl.appendChild(Dt);

            //遍历item.data，去生成对应的dd
            item.data.forEach(function (item, i) {
                //每一项都生成一个dd
                var Dd = document.createElement("dd");
                //给dd插入内容
                Dd.innerHTML = item.type;
                //给每个dd插入自定义属性，值为对应的价钱
                Dd.dataset.price = item.changePrice;
                //然后把生成的Dd插入到Dl中去
                Dl.appendChild(Dd);
            });

            //再把生成的dl插入到目标元素中去
            oBuy.appendChild(Dl);

        });
    }


    //商品筛选
    select();

    function select() {
        //声明一个数组，里面有4个内容，暂时为null
        // var arr=[null,null,null,null];
        var arr = new Array(4);
        arr.fill(null);

        //获取到要添加内容的元素
        var oSelected = document.querySelector(".con>.con-right>.selected");
        //先获取所有的Dl,给所有的dd添加绑定事件
        var oDl = document.querySelectorAll(".con>.con-right>.buy>dl");


        //遍历每一个dl并遍历dl下面的dd并给dd绑定事件
        oDl.forEach(function (item, index) {
            //获取到当前dl中所有的dd
            var oDd = item.querySelectorAll("dd");
            //再遍历所有的Dd并且添加绑定事件
            oDd.forEach(function (item) {
                item.onclick = function () {

                    //先清空所有的dd的颜色样式，所有要再遍历一次dd
                    oDd.forEach(function (item) {
                        item.style.color = "#000";
                    });
                    //给当前点击的dd加上样式
                    this.style.color = "#EA4A36";

                    //把点击的dd的内容赋值给数组中对应位置
                    //这个时候oDl的下标才是数组中对应的位置
                    arr[index] = this;

                    //每次dd被点击的时候要把已经存在的mark去掉
                    oSelected.innerHTML = "";

                    //遍历数组，判断有内容的值就生成mark标签，没有值的就不用生成
                    arr.forEach(function (item, index) {
                        if (item) {
                            //生成mark标签
                            var oMark = document.createElement("mark");
                            //给mark标签添加内容
                            oMark.innerHTML = item.innerHTML;
                            //添加一个a标签在mark里面
                            var oA = document.createElement("a");
                            //给oA标签添加一个自定义属性，方便后面删除的时候去找到要删除哪一个
                            oA.dataset.hello = index;
                            //给a标签插入内容
                            oA.innerHTML = "X";
                            //给mark插入a标签
                            oMark.appendChild(oA);
                            //再把mark添加到selected上
                            oSelected.appendChild(oMark);
                        }
                    });


                    //在dd的点击事件里面绑定oA的点击事件，因为要生成了mark才会有删除标签
                    //获取所有的a标签
                    var oAs = document.querySelectorAll(".con>.con-right>.selected>mark>a");
                    //遍历所有的oAs
                    oAs.forEach(function (item) {
                        //绑定点击事件
                        item.onclick = function () {
                            //删除当前a标签的父级元素mark
                            this.parentNode.remove();
                            //删除arr数组所对应的值,前面给a标签加上了自定义属性，值就是要删除的第几个
                            arr[item.dataset.hello] = null;
                            //然后回到默认样式，dd的默认值都是第一个,怎么找到dl呢，和上面删除数组的值一样，自定义属性的值就是第几个dl
                            var oDs = oDl[item.dataset.hello].querySelectorAll("dd");
                            //获取到了dl下面的全部dd之后，把全部dd的颜色都清空，在给第一个添加样式
                            oDs.forEach(function (item) {
                                item.style.color = "#000";
                            });
                            oDs[0].style.color = "#EA4A36";

                            //调用改变价钱函数
                            changePrice(arr);
                        }
                    });

                    //调用改变价钱函数
                    changePrice(arr);

                }
            });
        });



    }


    //生成一个改变价格的函数
    function changePrice(arr) {
        //先获取数量输入框元素
        var oIpt = document.querySelector(".con>.con-right>form>input");

        //获取到价钱的标签
        var oPrice = document.querySelector(".con>.con-right>.con-con .money");

        //获取到基础价钱
        var basePrice = goodData.goodsDetail.price;

        //价钱根据选择去改变，那么就可以根据数组中的值去找对应的标签的price属性值了,遍历数组
        arr.forEach(function (item) {
            if (item) {
                basePrice += +item.dataset.price;
                console.log(item);
            }
            //然后赋值给价钱标签
            oPrice.innerHTML = basePrice * oIpt.value;
        });
        console.log(arr);
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