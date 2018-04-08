/*
creat by shawn 2017-3-12
 */
define(['app', 'modules/register/register.service'], function (app) {
  app.register.controller('registerCtrl', ['$scope', '$http', '$state', 'registerService', function ($scope, $http, $state, registerService) {
    /*
    暴露所有方法
     */
    $scope.loginName = ""
    $scope.loginPwd = ""
    $scope.xieyi = false

    /*
    暴露所有方法
     */
    $scope.login = login;
    $scope.sendCode = sendCode
    function login() {
      registerService.register({ UserName: $scope.loginName, yzm: $scope.yzm, UserPhone: $scope.UserPhone, UserPwd: $scope.loginPwd, UserType: '个人' }, '/Account/PageLogin').then(function (res) {
        console.log(res)
      })
    }
    var clock = '';
    var nums = 60;
    $scope.btn = '获取验证码';
    function sendCode(thisBtn) {
      $scope.btn = thisBtn;
      $scope.btnDisabled = true; //将按钮置为不可点击
      $scope.btn = nums + '秒后可重新获取';
      clock = setInterval(doLoop, 1000); //一秒执行一次
    }
    function doLoop() {
      nums--;
      if (nums > 0) {
        $scope.btn = nums + '秒后可重新获取';
        $scope.$apply()
      } else {
        clearInterval(clock); //清除js定时器
        $scope.btnDisabled = false;

        $scope.btn = '重新验证码';
        nums = 60; //重置时间
        $scope.$apply()
      }
    }


  }])
})
