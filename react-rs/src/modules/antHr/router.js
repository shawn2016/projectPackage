/**
 * 首页
 */
const AntHrRoute = {
  name: 'antHr',
  actions: [{
    action: 'judgeAntHr',
    name: 'judgeAntHr',
    ensure: () => import('modules/antHr/judgeAntHr'),
    childrenList: [{
      action: 'opeanAntHr',
      name: 'opeanAntHr',
      ensure: () => import('modules/antHr/opeanAntHr')
    }]
  }, {
    action: 'paymentRecord',
    name: 'paymentRecord',
    ensure: () => import('modules/antHr/paymentRecord'),
    childrenList: [{
      action: 'opeanAntHr',
      name: 'opeanAntHr',
      ensure: () => import('modules/antHr/opeanAntHr')
    }]
  }]
}
export default AntHrRoute