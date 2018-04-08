/**
 * name: grossSettlement/router.js
 * author: songyaqi
 * date: 2017/07/20
 * desc: 支付结算路由
 */
const GrossSettlementRoute = {
  name: 'grossSettlement',
  actions: [{
    action: 'applicationEditor',
    name: 'applicationEditor',
    //用途编辑
    ensure: () => import('modules/grossSettlement/applicationEditor')
  }, {
    action: 'beneficiaryEditor',
    name: 'beneficiaryEditor',
    //收款方编辑
    ensure: () => import('modules/grossSettlement/beneficiaryEditor'),
    childrenList: [
      {
        action: 'beneficiaryEditorDetail',
        name: 'beneficiaryEditorDetail',
        //收款方编辑 - 详情
        ensure: () => import('modules/grossSettlement/beneficiaryEditorDetail')
      },
      {
        action: 'beneficiaryEditorAdd',
        name: 'beneficiaryEditorAdd',
        //收款方编辑 - 增加收款方
        ensure: () => import('modules/grossSettlement/beneficiaryEditorAdd')
      }
    ]
  },
  /**
   * 单笔经办
   */
  {
    action: 'singleHandle',
    name: 'singleHandle',
    ensure: () => import('modules/grossSettlement/singleHandle'),
    childrenList: [
      {
        action: 'singleDetailPerson',
        name: 'singleDetailPerson',
        // 单笔经办 详情
        ensure: () => import('modules/grossSettlement/singleDetailPerson')
      }
    ]
  }, {
    action: 'searchSingleHandle',
    name: 'searchSingleHandle',
    //单笔经办查询
    ensure: () => import('modules/grossSettlement/searchSingleHandle'),
    childrenList: [
      {
        action: 'singleSearchDetails',
        name: 'singleSearchDetails',
        // 单笔经办查询 单笔经办撤销 单笔经办审核  统一详情
        ensure: () => import('modules/grossSettlement/singleHandleDetails')
      }
    ]
  }, {
    action: 'cancelSingleHandle',
    name: 'cancelSingleHandle',
    //单笔经办撤销
    ensure: () => import('modules/grossSettlement/cancelSingleHandle'),
    childrenList: [
      {
        action: 'singleCancelDetails',
        name: 'singleCancelDetails',
        // 单笔经办查询 单笔经办撤销 单笔经办审核  统一详情
        ensure: () => import('modules/grossSettlement/singleHandleDetails')
      }
    ]
  }, {
    action: 'examineSingleHandle',
    name: 'examineSingleHandle',
    //单笔经办审批
    ensure: () => import('modules/grossSettlement/examineSingleHandle'),
    childrenList: [
      {
        action: 'singleExamineDetails',
        name: 'singleExamineDetails',
        // 单笔经办查询 单笔经办撤销 单笔经办审核  统一详情
        ensure: () => import('modules/grossSettlement/singleHandleDetails')
      }
    ]
  },
  /**
   * 批量经办
   */
  {
    action: 'batchHandle',
    name: 'batchHandle',
    ensure: () => import('modules/grossSettlement/batchHandle'),
    childrenList: [
      {
        action: 'batchDetailPerson',
        name: 'batchDetailPerson',
        //批量经办 详情
        ensure: () => import('modules/grossSettlement/batchDetailPerson')
      }
    ]
  },
  {
    action: 'searchBatchHandle',
    name: 'searchBatchHandle',
    //批量经办查询
    ensure: () => import('modules/grossSettlement/searchBatchHandle'),
    childrenList: [
      {
        action: 'batchSearchDetails',
        name: 'batchSearchDetails',
        //批量经办查询 批量经办撤销 批量经办审核  统一详情
        ensure: () => import('modules/grossSettlement/batchHandleDetails')
      }
    ]
  }, {
    action: 'examineBatchHandle',
    name: 'examineBatchHandle',
    //批量经办审批
    ensure: () => import('modules/grossSettlement/examineBatchHandle'),
    childrenList: [
      {
        action: 'batchExamineDetails',
        name: 'batchExamineDetails',
        //批量经办查询 批量经办撤销 批量经办审核  统一详情
        ensure: () => import('modules/grossSettlement/batchHandleDetails')
      }
    ]
  }, {
    action: 'cancelBatchHandle',
    name: 'cancelBatchHandle',
    //批量经办撤销
    ensure: () => import('modules/grossSettlement/cancelBatchHandle'),
    childrenList: [
      {
        action: 'batchCancelDetails',
        name: 'batchCancelDetails',
        //批量经办查询 批量经办撤销 批量经办审核  统一详情
        ensure: () => import('modules/grossSettlement/batchHandleDetails')
      }
    ]
  }]
}
export default GrossSettlementRoute