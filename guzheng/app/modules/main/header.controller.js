/*
creat by shawn 2017-3-12
 */
define(['app'], function (app) {
  app.register.controller('headerCtrl', ['$scope', '$http', '$state', '$rootScope', function ($scope, $http, $state, $rootScope) {
    $scope.menuHide = true;

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

    // 移动端收齐
    $scope.toogleMenu = function (type) {
      $scope.menuHide = !$scope.menuHide;
      if(type){
        $("html, body").animate({
          scrollTop: 0
        }, 500);
      }
    }
  }])
})
