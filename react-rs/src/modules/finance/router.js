/**
 * name: finance/router.js
 * author: songyaqi
 * date: 2017/07/20
 * desc: 账户查询路由
 */
const FinanceRoute = {
  name: 'finance',
  actions: [{
    action: 'balanceQuery',
    name: 'balanceQuery',
    //余额查询
    ensure: () => import('modules/finance/balanceQuery'),
    childrenList: [{
      action: 'balanceHistory',
      name: 'balanceHistory',
      upLevel: 'balanceQuery',
      //历史余额查询
      ensure: () => import('modules/finance/balanceHistory')
    }]
  }, {
    action: 'chargeQuery',
    name: 'chargeQuery',
    //收费查询
    ensure: () => import('modules/finance/chargeQuery'),
    childrenList: [{
      action: 'chargeDetail',
      name: 'chargeDetail',
      upLevel: 'chargeQuery',
      //收费查询详情
      ensure: () => import('modules/finance/chargeDetail')
    }]
  }, {
    action: 'tradeQuery',
    name: 'tradeQuery',
    //交易查询
    ensure: () => import('modules/finance/tradeQuery'),
    childrenList: [{
      action: 'tradeDetail',
      name: 'tradeDetail',
      upLevel: 'tradeQuery',
      //交易查询详情
      ensure: () => import('modules/finance/tradeDetail')
    }]
  }, {
    action: 'scancodeQuery',
    name: 'scancodeQuery',
    //pos/扫码交易查询
    ensure: () => import('modules/finance/scancodeQuery'),
    childrenList: [{
      action: 'scancodeDetail',
      name: 'scancodeDetail',
      upLevel: 'scancodeQuery',
      //pos/扫码交易查询详情
      ensure: () => import('modules/finance/scancodeDetail')
    }]
  }]
}
export default FinanceRoute