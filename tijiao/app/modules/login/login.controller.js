/*
creat by shawn 2017-3-12
 */
define(['app', 'modules/login/login.service'], function (app) {
  app.register.controller('loginCtrl', ['$scope', '$http', '$state', 'loginService', '$rootScope', function ($scope, $http, $state, loginService, $rootScope) {
    $scope.loginName = ""
    $scope.loginPwd = ""

    /*
    暴露所有方法
     */
    $scope.login = login;
    function login() {
      loginService.login({ uName: $scope.loginName, uPass: $scope.loginPwd }, '/Account/PageLogin').then(function (res) {
        console.log(res)
        if (!res.data.Msg) {
          sessionStorage.setItem("loginInfo", JSON.stringify(res));
          $state.go('homePage.index')
          $rootScope.logined = true;
          $rootScope.UserName = res.data.UserName;
        } else {
          $scope.error = res.data.Msg
        }
      })
    }


  }])
})
