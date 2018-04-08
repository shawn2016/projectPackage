/*
 creat by shawn 2017-3-12
 */
define(['app'], function(app) {
  app.register.controller('welcomeCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    /*
     暴露所有方法
     */
    //顶导

    //首页顶导默认透明
    if($("#head-navbar").hasClass("navbar__white")) {
      $("#head-navbar").removeClass("navbar__white");
      $("#head-navbar").addClass("navbar__opacity");
    }
    $(window).scroll(function () {
      var url = window.location.href;
      if(url.indexOf("index") >= 0 ) {
        var scrTop = $(this).scrollTop();
        if(scrTop >= 10){
          if($("#head-navbar").hasClass("navbar__opacity")){
            $("#head-navbar").removeClass("navbar__opacity");
            $("#head-navbar").addClass("navbar__white")
          }
        }else{
          if($("#head-navbar").hasClass("navbar__white")) {
            $("#head-navbar").removeClass("navbar__white");
            $("#head-navbar").addClass("navbar__opacity")
          }
        }
      }
    })


    //切换导航右侧图标
    $(".navbar-toggle.collapsed").click(function () {
      if($(this).hasClass("open")){
        $(this).removeClass("open");
      }else{
        $(this).addClass("open");
      }
    });

  }])
})
