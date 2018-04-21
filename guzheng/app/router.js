define({
  /*==============首页============*/
  'homePage': {
    url: "/homePage",
    requireCtl: ["modules/main/header.controller", "modules/homePage/home.controller"],
    views: {
      "head": {
        templateUrl: "modules/main/head.html",
        controller: "headerCtrl"
      },
      "view_centers": {
        templateUrl: "modules/homePage/homePage.html",
        controller: "homePageCtrl"
      },

      "footer": {
        templateUrl: './modules/main/footer.html'
      }
    }
  },
  'homePage.index': {      //首页
    url: '/index',
    templateUrl: 'modules/homePage/welcome/welcome.html',
    requireCtl: 'modules/homePage/welcome/welcome.controller',
    controller: 'welcomeCtrl'
  },
  'homePage.login': {    //登陆
    url: '/login',
    templateUrl: 'modules/login/login.html',
    requireCtl: 'modules/login/login.controller',
    controller: 'loginCtrl'
  },
  'homePage.register': {    //注册
    url: '/register',
    templateUrl: 'modules/register/register.html',
    requireCtl: 'modules/register/register.controller',
    controller: 'registerCtrl'
  },
  'homePage.getpwd': {    //忘记密码
    url: '/getpwd',
    templateUrl: 'modules/getpwd/getpwd.html',
    requireCtl: 'modules/getpwd/getpwd.controller',
    controller: 'getpwdCtrl'
  },
  'homePage.protocol': {    //注册协议
    url: '/protocol',
    templateUrl: 'modules/protocol/protocol.html',
    requireCtl: 'modules/protocol/protocol.controller',
    controller: 'protocolCtrl'
  },
  'homePage.newsdesc': {    //新闻详情
    url: '/newsdesc',
    templateUrl: 'modules/newsdesc/newsdesc.html',
    requireCtl: 'modules/newsdesc/newsdesc.controller',
    controller: 'newsdescCtrl'
  },

  'homePage.about': {      //关于我们
    url: '/about',
    templateUrl: 'modules/about/about.html',
    requireCtl: 'modules/about/about.controller',
    controller: 'aboutCtrl'
  },
  'homePage.contact': {      //联系我们
    url: '/contact',
    templateUrl: 'modules/contact/contact.html',
    requireCtl: 'modules/contact/contact.controller',
    controller: 'contactCtrl'
  },
  'homePage.news': {      //新闻动态
    url: '/news',
    templateUrl: 'modules/news/news.html',
    requireCtl: 'modules/news/news.controller',
    controller: 'newsCtrl'
  },
  'homePage.docs': {      //调解员
    url: '/docs',
    templateUrl: 'modules/docs/docs.html',
    requireCtl: 'modules/docs/docs.controller',
    controller: 'docsCtrl'
  },
  'homePage.docsDesc': {      //调解员
    url: '/docsDesc',
    templateUrl: 'modules/docsDesc/docsDesc.html',
    requireCtl: 'modules/docsDesc/docsDesc.controller',
    controller: 'docsDescCtrl'
  },
  'homePage.policy': {      //政策
    url: '/policy',
    templateUrl: 'modules/policy/policy.html',
    requireCtl: 'modules/policy/policy.controller',
    controller: 'policyCtrl'
  },
  'homePage.policydesc': {      //政策详情
    url: '/policydesc',
    templateUrl: 'modules/policydesc/policydesc.html',
    requireCtl: 'modules/policydesc/policydesc.controller',
    controller: 'policydescCtrl'
  },
  'homePage.free': {      //费用
    url: '/free',
    templateUrl: 'modules/free/free.html',
    requireCtl: 'modules/free/free.controller',
    controller: 'freeCtrl'
  },
  'homePage.rule': {      //规则
    url: '/rule',
    templateUrl: 'modules/rule/rule.html',
    requireCtl: 'modules/rule/rule.controller',
    controller: 'ruleCtrl'
  },
  'homePage.flow': {      //流程
    url: '/flow',
    templateUrl: 'modules/flow/flow.html',
    requireCtl: 'modules/flow/flow.controller',
    controller: 'flowCtrl'
  },
  'homePage.personnel': {      //调解人员
    url: '/personnel',
    templateUrl: 'modules/personnel/personnel.html',
    requireCtl: 'modules/personnel/personnel.controller',
    controller: 'personnelCtrl'
  }
})
