'use strict';
// 配置baseurl
require(['config'], function (config) {
  //文件依赖
  var configParam = {
    baseurl: '../', //依赖相对路径
    paths: { //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
      'angular': 'lib/angular/angular.min',
      'ui-route': 'lib/angular-ui-route/angular-ui-router',
      "httpInterceptor": "common/httpInterceptors",
      "w5cvalidator": "lib/w5c-validator/w5cValidator",      
      "jquery": "lib/jquery/dist/jquery",
      'bootstrap':'lib/bootstrap/dist/js/bootstrap.min'
    },
    shim: {
      'angular': {
        exports: 'angular'
      },
      'ui-route': {
        deps: ['angular'],
        exports: 'uiroute'
      },
      'bootstrap': {
        deps: ['jquery'],
      },
      'w5cvalidator': ['angular', 'jquery'],      
      'httpInterceptor': ['angular']
    }
  };
  require.config(configParam);
  require(['angular', 'ui-route', 'app', 'httpInterceptor', 'jquery','bootstrap','w5cvalidator'], function (angular, uirouter, app) {
    angular.bootstrap(document, [app.name]);
  });
})
