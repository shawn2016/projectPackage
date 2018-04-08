/**
 * name: home/router.js
 * author: songyaqi
 * date: 2017/07/20
 * desc: 首页
 */
const HomeRoute = {
  name: 'home',
  actions: [{//首页
    action: 'Home',
    name: 'home',
    upLevel: '',
    ensure: () => import('modules/home/home')
  },
  {// 贷款意向申请
    action: 'LoanIntention',
    name: 'loanIntention',
    upLevel: '',
    ensure: () => import('modules/home/loanIntention')
  }, {
    // 出金
    action: 'withdraw',
    name: 'withdraw',
    upLevel: 'withdraw',
    ensure: () => import('modules/home/withdraw'),
    childrenList: [{
      // 出金记录
      action: 'withdrawlist',
      name: 'withdrawlist',
      upLevel: 'withdraw',
      ensure: () => import('modules/home/withdrawlist')
    }]
  }, {
    // 入金
    action: 'deposit',
    name: 'deposit',
    upLevel: 'deposit',
    ensure: () => import('modules/home/deposit'),
    childrenList: [
      {
        // 入金记录
        action: 'depositlist',
        name: 'depositlist',
        upLevel: 'deposit',
        ensure: () => import('modules/home/depositlist')
      }
    ]
  }
  ]
}
export default HomeRoute