'use strict';
//定义angular的路由和其他
define(['config', 'ui-route'], function (config) {
  //定义angular的整个程序和依赖关系
  var app = angular.module('myApp', ['ui.router', 'httpInterceptorModule','w5c.validator']);
  app.provider('route', function () {
    this.$get = function () {
      return this;
    }
    this.route = function () {
      function getRoute(routeObj) {
        var returnObj;
        returnObj = routeObj;
        if (routeObj) {
          if (routeObj.views) {
            returnObj.views = routeObj.views;
            if (routeObj.requireCtl) {
              routeObj.resolve = {
                "load": ['$q', '$rootScope', function ($q, $rootScope) {
                  return getResolve($q, $rootScope, routeObj['requireCtl']);
                }]
              }
            }
            for (var key in routeObj.views) {
              returnObj.views[key] = routeObj.views[key];
              returnObj.views[key]["templateUrl"] = config.templatePre + routeObj.views[key]["templateUrl"];

            }
          } else {
            returnObj.templateUrl = config.templatePre + routeObj.templateUrl;
            if (routeObj.requireCtl) {
              returnObj.resolve = {
                "load": ['$q', '$rootScope', function ($q, $rootScope) {
                  return getResolve($q, $rootScope, [routeObj.requireCtl]);
                }]
              }
            }
          }
        }

        function getResolve($q, $rootScope, requireCtl) {
          for (var i = 0; i < requireCtl.length; i++) {
            requireCtl[i] = config.controllerPre + requireCtl[i];
          }
          if (requireCtl) {
            var defer = $q.defer();
            require(requireCtl, function () {
              defer.resolve()
              $rootScope.$apply();
            })
            return defer.promise;
          }
        }
        return returnObj;
      }
      return {
        getRoute: getRoute
      }
    }
  });


  /*
  需要登录时
   */
  // app.run(['$rootScope', '$state', function($rootScope, $state) {
  //   var stateRoute = 'login'
  //     // if (true) stateRoute = 'table'
  //   $rootScope.$state = $state;
  //   $rootScope.isLogin = false;
  //   $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
  //     event.preventDefault();
  //     if (toState.url == '/' + stateRoute) {
  //       $rootScope.isLogin = false;
  //     } else {
  //       $rootScope.isLogin = true;
  //     }
  //   })
  //   var excludeRouter = [stateRoute];
  //   $rootScope
  //     .$on('$stateChangeStart', function(event, toState) {
  //       // console.log("appJs",event,toState)
  //       var User = sessionStorage.getItem("userInfo"); // 登录时候返回的信息将来会包含权限等信息
  //       if (!User) {
  //         if (excludeRouter) {
  //           var isToLogin = true;
  //           for (var i = 0; i < excludeRouter.length; i++) {
  //             if (toState.url.indexOf(excludeRouter[i]) != -1) {
  //               isToLogin = false;
  //               break;
  //             }
  //           }
  //           if (isToLogin) {
  //             event
  //               .preventDefault();
  //             $state.go(stateRoute);
  //           }
  //         }

  //       }
  //     })
  // }]);
  app.config(["$stateProvider", "$urlRouterProvider", "$controllerProvider", "$compileProvider", "$filterProvider", "$provide", "routeProvider", "$httpProvider",
    function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, routeProvider, $httpProvider) {
      $httpProvider.interceptors.push('httpInterceptor');

      app.register = {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service
      };
      $urlRouterProvider.otherwise(config.defaultRedirect);
      var routers = routeProvider.route();
      var route = config.route;
      if (route instanceof Array) {
        angular.forEach(route, function (data, index, array) {
          for (var routestate in data) {
            $stateProvider.state(routestate, routers.getRoute(data[routestate]));
          }
        });
      }
    }
  ]);
  return app;
});
