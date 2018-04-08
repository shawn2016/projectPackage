/**
 * name: creditManagement/router.js
 * author: songyaqi
 * date: 2017/07/20
 * desc: 授信管理路由
 */
const CreditManagementRoute = {
  name: 'creditManagement',
  actions: [{
    action: 'loanIntentionQuery',
    name: 'loanIntentionQuery',
    //贷款意向查询
    ensure: () => import('modules/creditManagement/loanIntentionQuery')
  }, {
    action: 'loanProgressQuery',
    name: 'loanProgressQuery',
    //贷款进度查询
    ensure: () => import('modules/creditManagement/loanProgressQuery')
  }, {
    action: 'repaymentQuery',
    name: 'repaymentQuery',
    //还款查询
    ensure: () => import('modules/creditManagement/repaymentQuery'),
    childrenList: [
      {
        action: 'repaymentQueryDetail',
        name: 'repaymentQueryDetail',
        upLevel: 'repaymentQuery',
        //还款查询详情
        ensure: () => import('modules/creditManagement/repaymentQueryDetail')
      }
    ]
  }]
}
export default CreditManagementRoute