/**
 * name: home/router.js
 * author: songyaqi
 * date: 2017/07/20
 * desc: 首页
 */
const ActivateRoute = {
  name: 'activate',
  actions: [{
    action: 'activateCompany',
    name: 'activateCompany',
    ensure: () => import('modules/activate/activateCompany')
  },
  {
    action: 'activateCompanyState',
    name: 'activateCompanyState',
    ensure: () => import('modules/activate/activateCompanyState')
  },
  {
    action: 'activateCompanyChange',
    name: 'activateCompanyChange',
    ensure: () => import('modules/activate/activateCompanyChange')
  }
  ]
}
export default ActivateRoute
