define(["app", "config"], function (app, config) {
    app.register.service("registerService", ["$http", function ($http) {
        var returnServer = {
            register: function (param, url) {
                return $http.post(config.domain + url, param);
            },

        }
        return returnServer;
    }])
})
