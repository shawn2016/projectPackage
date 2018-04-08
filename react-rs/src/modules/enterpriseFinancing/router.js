/**
 * 首页
 */
const EnterpriseFinancingRoute = {
  name: 'enterpriseFinancing',
  actions: [{
    action: 'enterpriseFinancing',
    name: 'enterpriseFinancing',
    //融数宝首页
    ensure: () => import('modules/enterpriseFinancing/enterpriseFinancing'),
    childrenList: [{
      action: 'agreement',
      name: 'agreement',
      //融数宝服务协议
      ensure: () => import('modules/otherInfo/agreement')
    }]
  }, {
    action: 'transactionRecord',
    name: 'transactionRecord',
    //融数宝近期交易记录
    ensure: () => import('modules/enterpriseFinancing/transactionRecord')
  }, {
    action: 'agreement',
    name: 'agreement',
    //融数宝服务协议
    ensure: () => import('modules/otherInfo/agreement'),
  }, {
    action: 'deposit',
    name: 'deposit',
    //融数宝转入
    ensure: () => import('modules/enterpriseFinancing/deposit')
  }, {
    action: 'withdraw',
    name: 'withdraw',
    //融数宝转出
    ensure: () => import('modules/enterpriseFinancing/withdraw')
  }, {
    action: 'riskAssessment',
    name: 'riskAssessment',
    //融数宝风险评测
    ensure: () => import('modules/enterpriseFinancing/riskAssessment'),
    childrenList: [{
      action: 'agreement',
      name: 'agreement',
      //融数宝服务协议
      ensure: () => import('modules/otherInfo/agreement')
    }]
  }]
}
export default EnterpriseFinancingRoute