/**
    * 格式化money(分转元)
    * s为要格式化的money
    * n为小数位数
    */
/* eslint-disable */
export const formatMoneyYuan = (s, n) => {
  if (!s) {
    return '0.00'
  }
  if (s === '') {
    return
  }
  s = s / 100
  let x = n > 0 && n <= 20 ? n : 2
  let k = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(x) + ''
  let l = k.split('.')[0].split('').reverse(),
    r = k.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
}

/**
    * 格式化时间戳(精准到秒)
    * str为要格式化的time
    */
export const formatDate = (str) => {
  const toDu = (n) => n < 10 ? '0' + n : n
  if (!str) {
    return ''
  }
  str += ''
  if (str.indexOf('-') != -1) {
    if (str.indexOf(':') != -1) {
      return str.substr(0, 10)
    } else {
      return str
    }

  }
  var oDate = new Date(str * 1);
  return oDate.getFullYear() + '-' + toDu(oDate.getMonth() + 1) + '-' + toDu(oDate.getDate()) + ' ' + toDu(oDate.getHours()) + ':' + toDu(oDate.getMinutes()) + ':' + toDu(oDate.getSeconds())
}

/**
    * 格式化时间戳(精准到天)
    * str为要格式化的time
    */
export const formatDay = (str) => {
  var s = str / 1;
  if (!s || isNaN(s)) {
    return str;
  } else {
    var date = new Date(s);
    return date.getFullYear() + '-' + (date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate());
  }
}
// 格式化时间
export const timestampFormat = (timestamp, flag, flag1) => {
  if (!timestamp) {
    return
  }

  let date = new Date(timestamp * 1000)
  if (flag1) {
    date = new Date(timestamp)
  }
  let time = ''
  switch (flag) {
    case 1: {
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() + ' ' : date.getSeconds() + ' '
      time = Y + M + D + h + m + s
      break
    }
    case 2: {
      let Y = date.getFullYear() + '-'
      let M = date.getMonth() + 1 + '-'
      let D = date.getDate() + ' '
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() + ' ' : date.getSeconds() + ' '
      time = Y + M + D + h + m + s
      break
    }
    case 3: {
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate()
      time = Y + M + D
      break
    }
    case 4: {
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      time = Y + M + D
      break
    }
    case 5: {
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() + ' ' : date.getSeconds() + ' '
      time = Y + M + D + h + m + s
      break
    }
    case 6: {
      let Y = date.getFullYear() + '/'
      let M = (date.getMonth() + 1 < 10 ? '' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
      let D = date.getDate() < 10 ? '' + date.getDate() + '' : date.getDate() + ''
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() + ' ' : date.getSeconds() + ' '
      time = Y + M + D
      break
    }
    case 7: {
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      time = Y + M
      break
    }
  }
  return time
}
/**
    * 100=验证通过 200=待验证 300=验证失败 400=待缴费 700=待缴费 800=缴费失败
    * str为要格式化的time
    */
export const publicAccountStatusFilter = (old) => {
  switch (Number(old)) {
    case 100:
      return '验证通过'
    case 200:
      return '待验证'
    case 500:
    case 700:
      return '待缴费'
    case 300:
      return '验证失败'
    case 600:
    case 800:
      return '缴费失败'
    case 400:
      return '待缴费'
    default:
      return ' '
  }
}
/**
    * 系统管理的用户状态
    */
export const UserManageDetailsStatus = (str) => {
  switch (str) {
    case 100:
      return '启用'
    case 200:
      return '待审核'
    case 300:
      return '审核拒绝'
    case 400:
      return '复核通过'
    case 500:
      return '待激活'
    case 600:
      return '锁定'
    case -999:
      return '停用'
    default:
      return ' '
  }
}
/**
    * 是否是uKey用户
    */
export const isCfcaUser = (str) => {
  switch (str) {
    case '1':
      return '是'
    case '2':
      return '否'
    default:
      return ' '
  }
}
/** 
    * 用户身份 
    */
export const refUserRoleCode = (str) => {
  switch (str) {
    case 'ADMIN':
      return '管理员'
    case 'USER':
      return '普通用户'
    default:
      return ' '
  }
}
/**
    * 订单状态
    */
export const orderStatus = (str) => {
  switch (str) {
    case 0:
      return '处理中'
    case 40:
      return '处理中'
    case 50:
      return '处理中'
    case 100:
      return '交易成功'
    case 200:
      return '退汇'
    case -100:
      return '交易失败'
    default:
      return ' '
  }
}
/**
    * 交易状态
    */
export const dealStatus = (str) => {
  switch (str) {
    case 500001:
      return '处理中'
    case 700001:
      return '待审核'
    case 700002:
      return '已撤销'
    case 700005:
      return '复核拒绝'
    case 700006:
      return '已过期'
    case 700007:
      return '审核通过'
    case 800010:
      return '处理中'
    case 800019:
      return '交易失败'
    case 800040:
      return '交易成功'
    case 800049:
      return '交易失败'
    default:
      return ' '
  }
}
/**
    * 单笔经办状态
    */
export const singleDealStatus = (str) => {
  switch (str) {
    case 500001:
      return '处理中'
    case 700001:
      return '待审核'
    case 700002:
      return '已撤销'
    case 700005:
      return '复核拒绝'
    case 700006:
      return '已过期'
    case 700007:
      return '审核通过'
    case 800010:
      return '处理中'
    case 800019:
      return '交易失败'
    case 800040:
      return '交易成功'
    case 800041:
      return '部分成功'
    case 800049:
      return '交易失败'
    default:
      return ' '
  }
}
/**
 * 单笔经办状态
 */
export const batchDealStatus = (str) => {
  switch (str) {
    case 500001:
      return '处理中'
    case 700001:
      return '待复核'
    case 700002:
      return '已撤销'
    case 700005:
      return '复核拒绝'
    case 700006:
      return '已过期'
    case 700007:
      return '审核通过'
    case 800010:
      return '处理中'
    case 800019:
      return '支付失败'
    case 800040:
      return '支付成功'
    case 800041:
      return '部分成功'
    case 800049:
      return '支付失败'
    default:
      return ' '
  }
}
/**
 * 单笔经办小B状态
 */
export const singleDealStatusSmall = (str) => {
  switch (str) {
    case 500001:
      return '处理中'
    case 700001:
      return '处理中'
    case 700002:
      return '处理中'
    case 700005:
      return '处理中'
    case 700006:
      return '交易失败'
    case 700007:
      return '处理中'
    case 800010:
      return '处理中'
    case 800019:
      return '交易失败'
    case 800040:
      return '交易成功'
    case 800041:
      return '部分成功'
    case 800049:
      return '交易失败'
    default:
      return ' '
  }
}
export const batchDealStatusSmall = (str) => {
  switch (str) {
    case 500001:
      return '处理中'
    case 700001:
      return '处理中'
    case 700002:
      return '处理中'
    case 700005:
      return '处理中'
    case 700006:
      return '支付失败'
    case 700007:
      return '处理中'
    case 800010:
      return '处理中'
    case 800019:
      return '支付失败'
    case 800040:
      return '支付成功'
    case 800041:
      return '部分成功'
    case 800049:
      return '支付失败'
    default:
      return ' '
  }
}
/**
    * 支付方式
    */
export const payChannel = (str) => {
  switch (str) {
    case 10001:
      return '银行卡刷卡'
    case 20001:
      return '微信'
    case 30001:
      return '支付宝'
    case 40001:
      return 'QQ钱包'
    case 50001:
      return '余额收款'
    default:
      return ' '
  }
}
/**
* 交易状态
*/
// export const transactionType = (str) => {
//   switch (str) {
//     case 500001:
//       return '处理中'
//     case 800010:
//       return '处理中'
//     case 800019:
//       return '交易失败'
//     case 800030:
//       return '处理中'
//     case 800039:
//       return '交易失败'
//     case 800040:
//       return '交易成功'
//     case 800049:
//       return '交易失败'
//     default:
//       return ' '
//   }
// }
/**
 * 首页待办事项
 */
export const schedule = (str) => {
  switch (str) {
    case '201000':
      return {
        label: '支付结算 ',
        url: '/grossSettlement/examineSingleHandle'
      }
    case '201500':
      return {
        label: '批量支付 ',
        url: '/grossSettlement/examineBatchHandle'
      }
    case '251000':
      return {
        label: '费用代发 ',
        url: '/issuing/undertakesHandleExamine'
      }
    case 'e10000':
      return {
        label: '额度设置 ',
        url: '/systemManage/limit'
      }
    case 'b20000':
      return {
        label: '业务管理 ',
        url: '/systemManage/ruleManage'
      }
    case 's30000':
      return {
        label: '设置用户 ',
        url: '/systemManage/userManage'
      }
    default:
      return ' '
  }
}
/**
 * rule&user流程操作渠道
 */
export const flowActionChannel = (str) => {
  switch (str) {
    case '01':
      return '企业网上'
    case '02':
      return 'APP'
    default:
      return ' '
  }
}
/**
 * rule&user流程操作别名
 */
export const flowActionAlias = (str) => {
  switch (str) {
    case '1':
      return '新增'
    case '2':
      return '修改'
    case '3':
      return '删除'
    case '4':
      return '锁定'
    case '5':
      return '密码重置'
    case '6':
      return '撤销关联'
    case '7':
      return '初审'
    case '8':
      return '复核'
    case '9':
      return '开通'
    default:
      return ' '
  }
}

/**
* 财务查询-收费查询 业务类型
*/
export const fcbusinessType = (str) => {
  let newStr
  switch (Number(str)) {
    case 100:
      newStr = '单笔转账'
      break
    case 200:
      newStr = '批量转账'
      break
    case 300:
      newStr = '入金充值'
      break
    case 400:
      newStr = '出金提现'
      break
    case 500:
      newStr = '代付'
      break
    case 600:
      newStr = '代收'
      break
    case 700:
      newStr = '账户验证'
      break
    case 1000:
      newStr = '贷款还款'
      break
    default:
      newStr = ' '
  }
  return newStr
}

/**
* 额度设置  	限额类型	dzx   100：每日限额 200：每周限额 300：每月限额 400：每年限额 500：区间限额
*/
export const limitType = (str) => {
  let newStr
  switch (Number(str)) {
    case 100:
      newStr = '每日限额'
      break
    case 200:
      newStr = '每周限额'
      break
    case 300:
      newStr = '每月限额'
      break
    case 400:
      newStr = '每年限额'
      break
    case 500:
      newStr = '区间限额'
      break
    default:
      newStr = ' '
  }
  return newStr
}
/**
* 	额度设置 业务模式   100：支付结算，200：代发
*/
export const bizType = (str) => {
  let newStr
  switch (Number(str)) {
    case 100:
      newStr = '支付结算'
      break
    case 200:
      newStr = '代发'
      break
    default:
      newStr = ' '
  }
  return newStr
}
/**
 * 	支付结算  业务规则
 */
export const grossBizType = (str) => {
  let newStr
  switch (Number(str)) {
    case 100:
      newStr = '单笔转账'
      break
    case 200:
      newStr = '批量转账'
      break
    case 300:
      newStr = '入金充值'
      break
    case 400:
      newStr = '出金提现'
      break
    case 500:
      newStr = '代付'
      break
    case 600:
      newStr = '代收'
      break
    case 700:
      newStr = '账户验证'
      break
    default:
      newStr = ' '
  }
  return newStr
}

/**
* 额度设置 	状态   200：待复核 100：复核通过 300：复核拒绝 -999：删除
*/
export const limitStatus = (str) => {
  let newStr
  switch (Number(str)) {
    case 200:
      newStr = '待复核'
      break
    case 100:
      newStr = '复核通过'
      break
    case 300:
      newStr = '复核拒绝'
      break
    case -999:
      newStr = '删除'
      break
    default:
      newStr = ' '
  }
  return newStr
}
/**
 * 企业注册进度-进度详情  wucx 客户来源过滤
 * 
 */
export const clientSource = (str) => {
  let newStr
  switch (str) {
    case '1':
      newStr = '前台注册'
      break
    case '2':
      newStr = '后台注册'
      break
    default:
      newStr = ' '
  }
  return newStr
}
/**
 * 系统管理-通知设置  wucx 通知类型
 */
export const noticeTypeFliter = (str) => {
  let newStr
  switch (str) {
    case '50':
      newStr = '简单通知'
      break
    case '40':
      newStr = '经办预警'
      break
    case '30':
      newStr = '余额异常'
      break
    case '20':
      newStr = '付款通知'
      break
    case '10':
      newStr = '余额通知'
      break
    default:
      newStr = ' '
  }
  return newStr
}
/**
 * 企业理财-近期交易记录  类型
 */
export const enterpriseFinancingType = (str) => {
  let newStr
  switch (str) {
    case '0':
      newStr = '转入'
      break
    case '1':
      newStr = '转出'
      break
    default:
      newStr = ' '
  }
  return newStr
}
export const enterpriseFinancingStatus = (str) => {
  let newStr
  switch (str) {
    case 0:
      newStr = '转入成功'
      break
    case 1:
      newStr = '转出成功'
      break
    case 2:
      newStr = '转出受理中'
      break
    case 3:
      newStr = '转入受理中'
      break
    case 4:
      newStr = '转入失败'
      break
    case 5:
      newStr = '转出失败'
      break
    case 6:
      newStr = '转入撤销成功'
      break
    case 7:
      newStr = '转入撤销失败'
      break
    default:
      newStr = ' '
  }
  return newStr
}
/**
 * 结算-收方列表  类型
 */
export const grossReceiverType = (str) => {
  let newStr
  switch (str) {
    case 800040:
      newStr = '成功'
      break
    case 800049:
      newStr = '失败'
      break
    case 800019:
      newStr = '失败'
      break
    default:
      newStr = ' '
  }
  return newStr
}
/**
 * 蚂蚁Hr-代缴状态
 */
export const surrenderStatus = (str) => {
  let newStr
  switch (str) {
    case 0:
      newStr = '缴费中'
      break
    case 1:
      newStr = '缴费成功'
      break
    case 2:
      newStr = '缴费失败'
      break
    default:
      newStr = ' '
  }
  return newStr
}
/**
 * 蚂蚁Hr-缴费状态
 */
export const antPaymentStatus = (str) => {
  let newStr
  switch (str) {
    case 100:
      newStr = '待支付'
      break
    case 200:
      newStr = '已支付'
      break
    case 300:
      newStr = '已退款'
      break
    default:
      newStr = ' '
  }
  return newStr
}
/**
 * 去除字符串中所有空格
 */
export const trimAll = (str) => (
  str.replace(/\s+/g, '')
)
/**
 * 去除字符串中首尾空格
 */
export const trimLeftAndRight = (str) => (
  str.replace(/(^\s+)|(\s+$)/g, '')
)
export default {
  flowActionAlias,
  schedule,
  formatMoneyYuan,
  formatDate,
  formatDay,
  timestampFormat,
  UserManageDetailsStatus,
  isCfcaUser,
  publicAccountStatusFilter,
  refUserRoleCode,
  singleDealStatus,
  dealStatus,
  payChannel,
  fcbusinessType,
  noticeTypeFliter,
  limitType,
  bizType,
  grossBizType,
  limitStatus,
  orderStatus,
  batchDealStatus,
  singleDealStatusSmall,
  batchDealStatusSmall,
  clientSource,
  enterpriseFinancingType,
  enterpriseFinancingStatus,
  grossReceiverType,
  surrenderStatus,
  antPaymentStatus,
  trimAll,
  trimLeftAndRight
}

