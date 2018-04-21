define(['router'], function (backRouter) {
  return {
    baseUrl: "../",
    templatePre: "../",
    controllerPre: "../",
    route: [backRouter],
    defaultRedirect: '/homePage/index',
    nodeUrlPre: "../",
    domain: "http://43.240.138.171:8080/api",

  }
})