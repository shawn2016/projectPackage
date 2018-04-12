## 手机验证码输入框实现

使用label标签做显示验证码的框，

然后每个label for属性指向同一个 id 为`vcode` 的input，

为了能够触发input焦点， 将input 改透明度样式隐藏，

这样就实现了 点击label触发 input焦点，调用键盘。