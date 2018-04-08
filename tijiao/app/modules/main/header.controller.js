/*
creat by shawn 2017-3-12
 */
define(['app'], function (app) {
  app.register.controller('headerCtrl', ['$scope', '$http', '$state', '$rootScope', function ($scope, $http, $state, $rootScope) {
    $scope.scrollTopHeader = false;
    $scope.menuOpen = false;

    $scope.menuClick = function () {
      $scope.menuOpen = !$scope.menuOpen;
    }
    $('.nav-first').click(function () {
      if ($(this).hasClass('open')) {
        $('.nav-first').removeClass('open');
      } else {
        $('.nav-first').removeClass('open');
        $(this).addClass('open')
      }
    })
    var loginInfo = sessionStorage.getItem('loginInfo')
    if (loginInfo) {
      var loginInfo = JSON.parse(loginInfo)
      $rootScope.logined = true;
      $rootScope.UserName = loginInfo.data.UserName;
    } else {
      $rootScope.logined = false;
    }
    $scope.out = function () {
      sessionStorage.clear();
      $rootScope.logined = false;
      $rootScope.UserName = '';
    }
    // function ScollPostion() {//滚动条位置
    //   var t, l, w, h;
    //   if (document.documentElement && document.documentElement.scrollTop) {
    //     t = document.documentElement.scrollTop;
    //     l = document.documentElement.scrollLeft;
    //     w = document.documentElement.scrollWidth;
    //     h = document.documentElement.scrollHeight;
    //   } else if (document.body) {
    //     t = document.body.scrollTop;
    //     l = document.body.scrollLeft;
    //     w = document.body.scrollWidth;
    //     h = document.body.scrollHeight;
    //   }
    //   return { top: t, left: l, width: w, height: h };
    // }
    // window.onscroll = function () {
    //   setTimeout(function () {
    //     var locationHref = location.href;
    //     console.log(locationHref.indexOf('#/homePage/index') != -1)
    //     if (locationHref.indexOf('#/homePage/index') != -1) {
    //       var scrollTop = ScollPostion().top;
    //       if (scrollTop > 60) {
    //         $scope.scrollTopHeader = true;
    //         $scope.$apply();
    //       } else {
    //         console.log(scrollTop)
    //         $scope.scrollTopHeader = false;
    //         $scope.$apply();
    //       }
    //     } else {
    //       $scope.scrollTopHeader = true;
    //       $scope.$apply();
    //     }
    //   }, 0)
    // }
    // window.onscroll()
    //返回顶部
    function imj2() {
      this.init();
    }
    imj2.prototype = {
      constructor: imj2,
      init: function () {
        this._initBackTop();
      },
      _initBackTop: function () {
        var $backTop = this.$backTop = $('<div class="m-top-cbbfixed">' +
          '<a class="m-top-weixin m-top-cbbtn"">' +
          '<span class="m-top-weixin-icon"></span><div></div>' +
          '</a>' +
          '<a class="m-top-go m-top-cbbtn">' +
          '<span class="m-top-goicon"></span>' +
          '</a>' +
          '</div>');
        $('body').append($backTop);
        $backTop['click'](function () {
          $("html, body").animate({
            scrollTop: 0
          }, 120);
        });
        var timmer = null;
        $(window).bind("scroll", function () {
          var d = $(document).scrollTop(),
            e = $(window).height();
          0 < d ? $backTop['css']("bottom", "10px") : $backTop['css']("bottom", "-90px");
          clearTimeout(timmer);
          timmer = setTimeout(function () {
            clearTimeout(timmer)
          }, 100);
        });
      }
    }
    var imj2 = new imj2();
    //end返回顶部
  }])
})
