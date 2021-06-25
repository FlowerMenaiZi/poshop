/* 封装一些公用的事件或者公用的方法 */
/* 定义的一个命名空间 */
window.ev = {};
/* 封装一个过渡结束的方法 */
ev.translationEnd = function (dom, callback) {
  if (!dom || typeof dom != 'object') {
    //没dom的时候或者不是一个对象的时候 程序停止
    return false;
  }
  // 对过渡结束事件进行监听
  dom.addEventListener('transitionEnd', function () {
    callback && callback();
  });
  dom.addEventListener('webkitTransitionEnd', function () {
    callback && callback();
  });
}

var lbt = function (obj) {
  /*
   * 1.自动轮播  定时器  无缝衔接  动画结束瞬间定位
   * 2.点需要随着轮播的滚动改变对应的点  改变当前样式  当前图片的索引
   * 3.手指滑动的时候让轮播图滑动   touch事件  记录坐标轴的改变 改变轮播图的定位（位移css3）
   * 4.当滑动的距离不超过一定的距离的时候  需要吸附回去  过渡的形式去做
   * 5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向） 一定的距离（屏幕的三分之一）
   * */
  if (typeof obj.count !== "number") {
    return
  }
  if (typeof obj.dom !== "object") {
    return
  }
  var data = {
    "count": obj.count,
    "dom": obj.dom
  };
  if (typeof obj.transTime !== "string") {
    data.transTime = "0.3s"// 默认0.3s
  } else {
    data.transTime = obj.transTime;
  }
  if (typeof obj.autoTime !== "number") {
    data.autoTime = 3000;// 默认3000ms
  } else {
    data.autoTime = obj.autoTime
  }

  /*var data = {
      "count":,// 面中用来轮播的图片数量，必须,5
      "dom":,//轮播图大盒子object，必须
      "transTime":"",// 手指滑动时过渡时间，非必须,0.3s
      "autoTime":"",// 自动播放的时间，非必须,3000
  };*/

  var imageCount = data.count; //页面中用来轮播的图片有5张不同的
  //轮播图大盒子
  var banner = data.dom;
  //图片的宽度
  var width = 340;
  //图片盒子
  var imageBox = banner.querySelector('ul:first-child');
  //点盒子
  var pointBox = banner.querySelector('ul:last-child');

  //公用方法
  //加过渡
  var addTransition = function () {
    imageBox.style.transition = "all " + data.transTime;
    imageBox.style.webkitTransition = "all " + data.transTime;
    /*做兼容*/
  };
  //清除过渡
  var removeTransition = function () {
    imageBox.style.transition = "none";
    imageBox.style.webkitTransition = "none";
  }
  //定位
  var setTranslateX = function (translateX) {
    imageBox.style.transform = "translateX(" + translateX + "px)";
    imageBox.style.webkitTransform = "translateX(" + translateX + "px)";
  }
  var index = 0;

  //等过渡结束之后来做无缝衔接
  ev.translationEnd(imageBox, function () {

    //处理事件结束后的业务逻辑
    if (index > imageCount-1) {
      index = 0;
    } else if (index <= 0) {
      index = imageCount-1;
    }
    console.log(index);
    removeTransition(); //清除过渡
    setTranslateX(-index * width);  //定位
  });

  /*
   手指滑动的时候让轮播图滑动   touch事件  记录坐标轴的改变 改变轮播图的定位（位移css3）
   当滑动的距离不超过一定的距离的时候  需要吸附回去  过渡的形式去做
   当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向） 一定的距离（屏幕的三分之一）
   */
  //touch事件
  var startX = 0; //记录起始  刚刚触摸的点的位置 x的坐标
  var moveX = 0;  //滑动的时候x的位置
  var distanceX = 0;  //滑动的距离
  var isMove = false; //是否滑动过

  imageBox.addEventListener('touchstart', function (e) {
    // clearInterval(timer);   //清除定时器
    startX = e.touches[0].clientX;  //记录起始X
  });

  imageBox.addEventListener('touchmove', function (e) {
    moveX = e.touches[0].clientX;   //滑动时候的X
    distanceX = moveX - startX; //计算移动的距离
    //计算当前定位  -index*width+distanceX
    removeTransition(); //清除过渡
    setTranslateX(-index * width + distanceX);  //实时的定位
    isMove = true;  //证明滑动过
  });

  //在模拟器上模拟的滑动会有问题 丢失的情况  最后在模拟器的时候用window
  imageBox.addEventListener('touchend', function (e) {
    // 滑动超过 1/3 即为滑动有效，否则即为无效，则吸附回去
    if (isMove && Math.abs(distanceX) > width / 3) {
      //5.当滑动超过了一定的距离  需要 跳到 下一张或者上一张  （滑动的方向）*/
      if (distanceX > 0) {  //上一张
        index--;
      }
      else {   //下一张
        index++;
      }
    }
    addTransition();    //加过渡动画
    setTranslateX(-index * width);    //定位

    if (index > imageCount-1) {
      index = 0;
    } else if (index <= 0) {
      index = imageCount;
    }

    //重置参数
    startX = 0;
    moveX = 0;
    distanceX = 0;
    isMove = false;
  })
}