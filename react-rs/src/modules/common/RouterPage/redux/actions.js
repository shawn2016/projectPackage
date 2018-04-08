import { COMMON_GETMENULIST, COMMON_GETOPERRULE, LOGOUT, GETOPERRULEINFO } from './constants'
/* 获取菜单列表 */
export const getMenuList = () => ({
  callApi: {
    type: COMMON_GETMENULIST,
    path: '/curruser/getLoginInfo',
    method: 'POST'
  }
})
/* 获取权限 */
export const getOperRule = () => ({
  callApi: {
    type: COMMON_GETOPERRULE,
    path: '/user/getOperRuleInfo',
    method: 'POST'
  }
})
/* 获取权限 */
export const logout = () => ({
  callApi: {
    type: LOGOUT,
    path: '/logout',
    method: 'POST'
  }
})
/* 获取权限 */
export const getOperRuleInfo = (param) => ({
  callApi: {
    type: GETOPERRULEINFO,
    path: '/user/getOperRuleInfo',
    method: 'POST',
    param
  }
})