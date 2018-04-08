/**
 * name: home/router.js
 * author: songyaqi
 * date: 2017/07/20
 * desc: 代发
 */
const IssuingRoute = {
  name: 'issuing',
  actions: [{
    action: 'undertakesOrgnaization',
    name: 'undertakesOrgnaization',
    // 代发经办
    ensure: () => import('modules/issuing/undertakesOrgnaization'),
    childrenList: [
      {
        action: 'undertakesDetailPerson',
        name: 'undertakesDetailPerson',
        // 代发小B详情页
        ensure: () => import('modules/issuing/undertakesDetailPerson')
      }
    ]
  }, {
    action: 'undertakesHandleSearch',
    name: 'undertakesHandleSearch',
    // 代发查询
    ensure: () => import('modules/issuing/undertakesHandleSearch'),
    childrenList: [
      {
        action: 'undertakesSearchDetails',
        name: 'undertakesSearchDetails',
        // 代发查询 代发撤销 代发审批 统一详情页
        ensure: () => import('modules/issuing/undertakesHandleDetails')
      }
    ]
  }, {
    action: 'undertakesHandleCancel',
    name: 'undertakesHandleCancel',
    // 代发撤销
    ensure: () => import('modules/issuing/undertakesHandleCancel'),
    childrenList: [
      {
        action: 'undertakesCancelDetails',
        name: 'undertakesCancelDetails',
        // 代发查询 代发撤销 代发审批 统一详情页
        ensure: () => import('modules/issuing/undertakesHandleDetails')
      }
    ]
  }, {
    action: 'undertakesHandleExamine',
    name: 'undertakesHandleExamine',
    // 代发审批
    ensure: () => import('modules/issuing/undertakesHandleExamine'),
    childrenList: [
      {
        action: 'undertakesExamineDetails',
        name: 'undertakesExamineDetails',
        // 代发查询 代发撤销 代发审批 统一详情页
        ensure: () => import('modules/issuing/undertakesHandleDetails')
      }
    ]
  }]
}
export default IssuingRoute