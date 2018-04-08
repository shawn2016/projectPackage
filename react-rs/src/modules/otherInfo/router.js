const OtherInfoRoute = {
  name: 'OtherInfo',
  actions: [{
    action: 'notice',
    name: 'notice',
    ensure: () => import('modules/otherInfo/notice')
  }, {
    action: 'noticedesc',
    name: 'noticedesc',
    ensure: () => import('modules/otherInfo/noticedesc')
  }, {
    action: 'personalinfo',
    name: 'personalinfo',
    ensure: () => import('modules/otherInfo/personalinfo')
  }, {
    action: 'security',
    name: 'security',
    ensure: () => import('modules/otherInfo/security')
  }, {
    action: 'editloginpwd',
    name: 'editloginpwd',
    ensure: () => import('modules/otherInfo/editloginpwd')
  }, {
    action: 'editnumpwd',
    name: 'editnumpwd',
    ensure: () => import('modules/otherInfo/editnumpwd')
  }, {
    action: 'nopower',
    name: 'nopower',
    ensure: () => import('modules/otherInfo/nopower')
  }, {
    action: 'companynameinfo',
    name: 'companynameinfo',
    ensure: () => import('modules/otherInfo/companynameinfo')
  }, {
    action: 'ruleDetails',
    name: 'ruleDetails',
    ensure: () => import('modules/otherInfo/ruleDetails')
  }, {
    action: 'agreement',
    name: 'agreement',
    ensure: () => import('modules/otherInfo/agreement')
  }, {
    action: 'batchDetailList',
    name: 'batchDetailList',
    ensure: () => import('modules/otherInfo/batchDetailList')
  }, {
    action: 'batchFailDetailList',
    name: 'batchFailDetailList',
    ensure: () => import('modules/otherInfo/batchFailDetailList')
  }]
}
export default OtherInfoRoute