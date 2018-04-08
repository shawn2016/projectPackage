define(['router'], function(backRouter) {
    return {
        baseUrl: "../",
        templatePre: "../",
        controllerPre: "../",
        route: [backRouter],
        defaultRedirect: '/homePage/welcome',
        nodeUrlPre: "../",
        /*开发环境*/
        domain: "http://121.40.68.47:8145/rkylin-robot-platform-web/resourceMain",
        domain1: "http://121.40.68.47:8145/rkylin-robot-platform-web/formatDownLoad",
        domain2: "http://121.40.68.47:8145/rkylin-robot-platform-web/downLoadFile",
        loginOauth: "http://121.40.68.47:8145"
    }
})