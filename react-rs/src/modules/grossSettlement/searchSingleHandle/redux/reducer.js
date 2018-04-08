import { injectReducer } from 'reduxes/reducers'
import { combineReducers } from 'redux'
import cookieStorage from 'utils/cookieStorage'
import { GSSSH_GETORDERLIST, GSSSH_UPDATESEARCHINFO, GSSSH_GETCOMPANYACCLIST, GSSSH_GETSTATUSLIST } from './constant'

/* 列表*/
const GSSSH_orderList = (state = { values: [], pagenation: { itemCount: 0 } }, action) => {
  switch (action.type) {
    case GSSSH_GETORDERLIST:
      return action.data.body ? action.data.body : state
    default:
      return state
  }
}
/* 查询条件*/
const GSSSH_queryInfo = (state = { page: 1, rows: 10 }, action) => {
  switch (action.type) {
    case GSSSH_UPDATESEARCHINFO:
      return Object.assign({}, state, action.value)
    default:
      return state
  }
}
const GSSSH_isReserCurrentPage = (state = 0, action) => {
  switch (action.type) {
    case 'GSSSH_RESETCURRENTPAGE':
      return state === 0 ? 1 : 0
    default:
      return state
  }
}
/**
 * 以下为查询选项数据（下拉框option）
 */
/* 对公账户列表*/
const mapCompanyAccList = arr => {
  let curArr = []
  let userInfo = {}
  if (JSON.stringify(cookieStorage.getCookie('userInfo')) && cookieStorage.getCookie('userInfo').token) {
    userInfo = cookieStorage.getCookie('userInfo')
  }
  if (arr.body && arr.body.accounts) {
    let accoutAry = arr.body.accounts
    for (let i = 0; i < accoutAry.length; i++) {
      let curObj = {}
      if (accoutAry[i].accountName === null) {
        curObj.text = ''
      } else {
        curObj.text = accoutAry[i].accountName
      }
      if (userInfo && userInfo.isCfcaUser === '1') {
        curObj.value = accoutAry[i].virtualAccountNo
        curObj.text = accoutAry[i].umbrellaAccountNo
      } else {
        curObj.value = accoutAry[i].virtualAccountNo
        curObj.text = accoutAry[i].umbrellaAccountNo
      }
      //curObj={'text':'aaa','value':'ss'}
      curArr.push(curObj)
    }
    return curArr
  }
  return curArr
}
const GSSSH_companyAccList = (state = [], action) => {
  switch (action.type) {
    case GSSSH_GETCOMPANYACCLIST:
      return mapCompanyAccList(action.data.body ? action.data : state)
    default:
      return state
  }
}
/* 状态码表 */
const _statusList = [
  {
    text: '全部',
    value: ''
  },
  {
    text: '处理中',
    value: [500001, 800010]
  }, {
    text: '待审核',
    value: [700001]
  }, {
    text: '已撤销',
    value: [700002]
  }, {
    text: '复核拒绝',
    value: [700005]
  }, {
    text: '已过期',
    value: [700006]
  }, {
    text: '审核通过',
    value: [700007]
  }, {
    text: '交易失败',
    value: [800019, 800049]
  }, {
    text: '交易成功',
    value: [800040]
  }
]
/* 状态列表*/
const GSSSH_statusList = (state = _statusList, action) => {
  switch (action.type) {
    case GSSSH_GETSTATUSLIST:
      return state
    default:
      return state
  }
}

const searchsingleInfo = combineReducers({ GSSSH_orderList, GSSSH_queryInfo, GSSSH_isReserCurrentPage, GSSSH_companyAccList, GSSSH_statusList })
injectReducer(searchsingleInfo, 'GSSSH_singleHandleSearchInfo')