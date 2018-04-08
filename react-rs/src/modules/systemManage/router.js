/**
 * name: systemManage/router.js
 * author: songyaqi
 * date: 2017/07/20
 * desc: 系统管理
 */
const SystemManageRoute = {
  name: 'systemManage',
  actions: [{
    action: 'UserManage',
    name: 'userManage',
    //用户管理
    ensure: () => import('modules/systemManage/userManage'),
    childrenList: [
      {
        action: 'UserManageDetails',
        name: 'userManageDetails',
        upLevel: 'userManage',
        //用户管理 - 详情
        ensure: () => import('modules/systemManage/userManageDetails')
      }, {
        action: 'UserRoleInfo',
        name: 'userRoleInfo',
        //用户管理 - 权限预览
        upLevel: 'userManage',
        ensure: () => import('modules/systemManage/userRoleInfo')
      }, {
        action: 'AddUser',
        name: 'addUser',
        //用户管理 - 新增用户
        upLevel: 'userManage',
        ensure: () => import('modules/systemManage/addUser')
      },
    ]
  }, {
    action: 'limit',
    name: 'limit',
    //额度设置管理
    ensure: () => import('modules/systemManage/limit'),
    childrenList: [
      {
        action: 'addlimit',
        name: 'addlimit',
        //额度设置管理 - 新增设置
        upLevel: 'limit',
        ensure: () => import('modules/systemManage/addlimit')
      }, {
        action: 'check',
        name: 'check',
        upLevel: 'limit',
        //额度设置管理 - 复核
        ensure: () => import('modules/systemManage/Check')
      }
    ]
  }, {
    action: 'codeManagement',
    name: 'codeManagement',
    // 二维码管理
    ensure: () => import('modules/systemManage/codeManagement'),
    childrenList: [{
      action: 'AddCode',
      name: 'addCode',
      // 二维码管理 - 新增二维码
      upLevel: 'codeManagement',
      ensure: () => import('modules/systemManage/addCode')
    }, {
      action: 'NotifyCode',
      name: 'notifyCode',
      // 二维码管理 - 修改二维码
      upLevel: 'codeManagement',
      ensure: () => import('modules/systemManage/notifyCode')
    }]
  }, {
    action: 'PublicAccountManage',
    name: 'publicAccountManage',
    //对公账户管理
    ensure: () => import('modules/systemManage/publicAccountManage'),
    childrenList: [
      {
        action: 'PublicAccountDetail',
        name: 'publicAccountDetail',
        // 对公账户管理 - 修改对公账户
        upLevel: 'publicAccountManage',
        ensure: () => import('modules/systemManage/publicAccountDetail')
      }
    ]
  }, {
    action: 'NotificationSetting',
    name: 'notificationSetting',
    // 通知设置
    ensure: () => import('modules/systemManage/notificationSetting'),
    childrenList: [
      {
        action: 'NotificationSettingDetail',
        name: 'notificationSettingDetail',
        // 通知设置管理 - 详情
        upLevel: 'notificationSetting',
        ensure: () => import('modules/systemManage/notificationSettingDetail')
      }, {
        action: 'AddNotification',
        name: 'adddNotification',
        // 通知设置管理 - 详情
        upLevel: 'notificationSetting',
        ensure: () => import('modules/systemManage/adddNotification')
      }
    ]
  }, {
    action: 'SystemLog',
    name: 'systemLog',
    // 系统日志
    ensure: () => import('modules/systemManage/systemLog')
  }, {
    action: 'ruleManage',
    name: 'ruleManage',
    //业务规则管理
    ensure: () => import('modules/systemManage/ruleManage'),
    childrenList: [
      {
        action: 'ruleDetails',
        name: 'ruleDetails',
        upLevel: 'ruleManage',
        // 业务规则管理 - 详情
        ensure: () => import('modules/systemManage/ruleDetails')
      }, {
        action: 'createRule',
        name: 'createRule',
        upLevel: 'ruleManage',
        // 业务规则管理 - 创建规则
        ensure: () => import('modules/systemManage/createRule')
      }
    ]
  }]
}
export default SystemManageRoute