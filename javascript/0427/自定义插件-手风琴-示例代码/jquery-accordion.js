/**
 * Created by luodianlei on 2018/4/27.
 */
//由于我们封装的是jquery插件,我们对应的方法需要使用jquery对象调用
// 所以应该把方法添加到jquery的原型上
// $.fn === $.prototype
$.fn.accordion = function (obj) {
  //先获取到全部的li
  var oLis = this.find("li");
  //算出li的最小宽度,给obj拓展一个方法，如果存在就用之前的，没有就用指定的值100
  obj.minWidth = obj.minWidth || 100;
  //那么根据最小宽度算出目标元素的最大宽度
  var maxWidth = this.width() - (oLis.length - 1) * obj.minWidth;
  //算出一个平均宽度
  var avgWidth = this.width() / oLis.length;
  //要给li设置一个原始值，也就是平均值
  oLis.css({width:avgWidth});
  //鼠标移入会把目标元素li的宽度动画过渡到最大宽度，其他li就会动画过渡到最小宽度
  oLis.on("mouseenter", function () {
    $(this).stop(true).animate({
      width: maxWidth
    }).siblings().stop().animate({
      width: obj.minWidth
    });
  });
  //鼠标移出就把每个li的宽度动画过去回一个平均宽度
  this.on("mouseleave", function () {
    oLis.stop().animate({
      width: avgWidth
    });
  });
  //给每个li添加背景颜色,遍历每一个li
  oLis.each(function (index, element) {
    $(element).css({
      backgroundColor: obj.colors[index]
    });
  })

}