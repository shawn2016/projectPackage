/*
 * startslide  整数（默认：0 索引开始
 * speed（默认：300）-指在毫秒下转换速度。
 * auto 开始自动幻灯片（毫秒幻灯片之间的时间）
 * continuous 布尔（默认值：true）-创建一个无限,没有终点
 * disableScroll 布尔（默认：false）-从接触这个容器滚动页面停止
 * stopPropagation 布尔（默认：false）停止事件传播
 * callback function 运行于幻灯片更改
 * transitionEnd 功能-运行在结束幻灯片过渡
 * 
 */
var slider = Swipe(document.getElementById('slider'), {  
    auto: 3000,  
    continuous : true,  
     speed: 400,
      disableScroll: true,
  stopPropagation: false,
    callback: function(pos) {  
        var i = bullets.length;  
        while(i--){  
            bullets[i].className = ' ';  
        }  
        bullets[pos].className = 'on';  
    },
     transitionEnd: function(index, elem) {
    
     	
     }
  });  
var bullets = document.getElementById('position').getElementsByTagName('li');  
