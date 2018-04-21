angular.module("httpInterceptorModule", []).factory("httpInterceptor", ["$injector", "$q", function ($injector, $q) {
    return {
        request: function (config) {
            // var transform = function (data) {
            //     if (data) {
            //         angular.forEach(data, function (obj, key) {
            //             if (typeof obj === 'object') {
            //                 for (var x in obj) {
            //                     if (obj[x] == null || obj[x] == "") {
            //                         delete obj[x]
            //                     }
            //                 }
            //                 data[key] = angular.toJson(obj);
            //             }
            //         });
            //         data.state = sessionStorage.getItem("state");
            //         var userInfo = sessionStorage.getItem("userInfo");
            //         var newData = angular.extend(data, JSON.parse(userInfo))
            //         return $.param(newData);
            //     }

            // }
            // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            // config.transformRequest = transform;

            return config;
        },
        requestError: function (rejection) {
            return $q.reject(rejection);
        },
        response: function (response) {
            return response;
        },
        responseError: function (rejection) {
            return $q.reject(rejection);
        }
    };
}]);