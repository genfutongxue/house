//$.fn===$.prototype
//给$的原型对象上扩展方法，这样所有的$函数就都能使用这个方法了
$.fn.accordion = function (obj) {
    //先获取到所有的li
    //这个函数里面的this就指向调用该方法的那个jQuery对象
    var oLis = this.find("li");
    //设置一个li的最小宽度，如果参数里面传入了最小宽度那么就用参数里面的，如果没有就用自定义的
    obj.minWidth = obj.minWidth || 100;
    //计算每个li的平均宽度
    var avgWidth = this.width() / oLis.length;
    //计算目标元素的最大宽度
    var maxWidth = this.width() - (oLis.length - 1) * obj.minWidth;
    //先设置好每个li的宽度
    oLis.css({width: avgWidth});
    //设置每个li的颜色，那么就要给oLis遍历了，jQuery中用each方法
    oLis.each(function (index, element) {
        //这里的this就是指向的每个li，且element是DOM对象
        $(this).css({backgroundColor: obj.colors[index]});
    });
    //设置鼠标移入事件
    oLis.on("mouseenter",function(){
        //这里的this就是指鼠标移入的那个li  并且是个jQuery对象
        $(this).stop(true).animate({width:maxWidth}).siblings().stop(true).animate({width:obj.minWidth});
    });
    //设置鼠标移出事件
    //这里的this指的就是调用该方法的那个jQuery对象
    this.on("mouseleave",function(){
        oLis.stop(true).animate({width:avgWidth});
    })



}