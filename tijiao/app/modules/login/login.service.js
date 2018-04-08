define(["app", "config"], function (app, config) {
    app.register.service("loginService", ["$http", function ($http) {
        var returnServer = {
            login: function (param, url) {
                return $http.get(config.domain + url, { params: param });
            },

        }
        return returnServer;
    }])
})
