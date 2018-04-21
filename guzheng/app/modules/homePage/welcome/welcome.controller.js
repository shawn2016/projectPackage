/*
creat by shawn 2017-3-12
 */
define(['app'], function(app) {
  app.register.controller('welcomeCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $('#carousel-example-generic').carousel();
    $('#carousel-news').carousel();
  }])
})
