/* eslint-disable */
import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import Routers from 'modules/router'
import VerticalMenu from 'react-robotUI/Verticalmenu'
import cookieStorage from 'utils/cookieStorage'
import NotFound from 'modules/NotFound'
import Dialog from 'react-robotUI/dialog'
import * as action from './redux/actions'
import { formatDate } from '../../../utils/filterCommon'
import './redux/reducer'
const img1 = require('assets/images/logo.png')
/**
 * routerpage
 */
class RouterPage extends Component {
  static propTypes = {
    match: propTypes.any.isRequired,
    history: propTypes.object.isRequired,
    url: propTypes.string.isRequired
  }
  constructor(prop) {
    super(prop)
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      isShowMenu: true,
      isChangeMenu: true,
      d14: false,
      upLevel: '',
      confDataNew: [{
        "imgUrl": "qb-icon-menu-message-thin",
        "menuCode": null,
        "menuId": "1100000",
        'menuLevel': 1,
        'menuName': "基本信息",
        'menuOrder': 1100000,
        'pmenuId': null,
        'url': "/otherInfo/personalinfo",
        'ChildMenu': []
      }, {
        "imgUrl": "qb-icon-menu-lock-thin",
        "menuCode": null,
        "menuId": "1100000",
        'menuLevel': 1,
        'menuName': "安全设置",
        'menuOrder': 1100000,
        'pmenuId': null,
        'url': "/otherInfo/security",
        'ChildMenu': []
      }],
      is404: false

    }
  }
  componentWillReceiveProps(nextProps) {
    const { match } = this.props,
      { match: newMatch } = nextProps,
      { params: newParams } = newMatch,
      { params } = match,
      { modules, page } = params, // eslint-disable-line
      { modules: newModules, page: newPage } = newParams // eslint-disable-line
    if (newModules === modules && page === newPage) {
      return
    }
    // TODO 请求后台查看用户是否有权限访问
    // this.props.getOperRule({ id: '101500' }).then(() => {
    //   console.log(this.props.data.operRule.respCode)
    //   if (this.props.data.operRule.respCode === '000000') {
    //     console.log('22222')
    //   } else {
    //     console.log('无权限访问')
    //   }
    // })
    if (!this.state.newRouter) {
      console.log('走缓存')
      this.loadComponent(nextProps, this.state.newRouter, this.state.newRouterUrl)
    } else {
      let accountInfoSave = sessionStorage.getItem('accountInfoSave')
      let accountInfoData = JSON.parse(accountInfoSave)
      console.log('不走缓存')
      this.getRouters(accountInfoData.menu, nextProps)
    }

  }
  // 弹窗
  handleOpen = (type, msg) => {
    this.dialogShow[type](msg)
  }
  // 关闭弹窗触发
  handleClose = (name, type) => {
    this.setState({ [type]: false })
    if (type === 'd14') {
      this.props.history.push('/login')
    }
  }
  dialogShow = {
    d14: (msg) => {
      this.setState({ d14: true })
      this.getContent(
        <div className="rob-alert-content rob-form-group">
          {msg}
        </div>
      )
      this.getActions([{
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: true
      }])
    }
  }
  menuEdit = (menu) => {
    let confData = []
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].menuLevel === 1) {
        confData.push(menu[i])
      }
      if (menu[i].menuLevel === 2) {
        if (!confData[confData.length - 1].ChildMenu) {
          confData[confData.length - 1].ChildMenu = [menu[i]]
        } else {
          confData[confData.length - 1].ChildMenu.push(menu[i])
        }
      }
      if (!menu[i + 1]) {
        break
      }
      if (menu[i + 1].menuLevel === 1) {
        continue
      }
    }
    return confData
  }
  getRouters = (menuList, props) => {
    let newRouter = {}
    let newRouterUrl = []
    console.log(menuList.length)
    for (let m = 0; m < menuList.length; m++) {
      for (let i in Routers) {
        for (let k = 0; k < Routers[i].actions.length; k++) {
          const tempModule = Routers[i].actions[k].action.split('')
          const routeModule = tempModule.shift().toLowerCase() + tempModule.join('')
          let url = `/${Routers[i].name}/${routeModule}`
          newRouterUrl.push(url)
          if (url === menuList[m].url) {
            if (newRouter[i] && newRouter[i].actions) {
              Routers[i].actions[k].menuId = menuList[m].menuId
              newRouter[i].actions.push(Routers[i].actions[k])
            } else {
              Routers[i].actions[k].menuId = menuList[m].menuId
              newRouter[i] = {
                actions: [Routers[i].actions[k]]
              }
            }
          }
        }
        if (i === 'OtherInfoRoute') {
          newRouter.OtherInfoRoute = Routers.OtherInfoRoute
        }
        if (i === 'ActivateRoute') {
          newRouter.ActivateRoute = Routers.ActivateRoute
        }
      }
    }
    console.log(newRouter)
    this.setState({
      newRouter,
      newRouterUrl
    }, () => {
      this.loadComponent(props, newRouter, newRouterUrl)
    })
  }
  componentWillMount() {
    if (this.state.is404 === false) {
      if (!JSON.stringify(cookieStorage.getCookie('userInfo')) || !cookieStorage.getCookie('userInfo').token) {
        this.props.history.push('/login')
      } else {
        let accountInfoSave = sessionStorage.getItem('accountInfoSave')
        if (!accountInfoSave || !JSON.parse(accountInfoSave).userName) {
          // if (1 === 1) {
          this.props.getMenuList().then((res) => {
            // console.log('菜单')
            if (res.data.respCode === '000000') {
              sessionStorage.setItem('accountInfoSave', JSON.stringify(res.data.body))
              sessionStorage.setItem('companyName', res.data.body.companyName)
              cookieStorage.setCookie('accountInfo', {
                companyName: res.data.body.companyName,
                userName: res.data.body.userName,
                loginTime: res.data.body.loginTime,
                userRole: res.data.body.userRole,
                accountStatus: res.data.body.accountStatus,
                account: res.data.body.account
              })
              // 获取新的Routers
              this.getRouters(res.data.body.menu, this.props)
              let confData = this.menuEdit(res.data.body.menu)
              this.setState({
                getLoginInfo: res.data.body,
                confData
              })
            }
          })
        } else {
          let accountInfoData = JSON.parse(accountInfoSave)
          let confData = this.menuEdit(accountInfoData.menu)
          this.getRouters(accountInfoData.menu, this.props)
          this.setState({
            getLoginInfo: accountInfoData,
            confData
          })
        }
      }
      // 获取路由地址 隐藏菜单
      let locationUrl = location.pathname
      let locationUrlArrayFilter = ['/otherInfo/companynameinfo', '/otherInfo/notice', '/otherInfo/noticedesc', '/activate/activateCompany', '/activate/activateCompanyState', '/otherInfo/agreement', '/activate/activateCompanyChange', '/otherInfo/ruleDetails', '/otherInfo/batchFailDetailList', '/otherInfo/batchDetailList'
      ]
      if (locationUrlArrayFilter.includes(locationUrl)) {
        this.setState({
          isShowMenu: false
        })
      } else {
        this.setState({
          isShowMenu: true
        })
      }
      // 变更菜单
      let locationUrlArrayFilter2 = ['/otherInfo/personalinfo', '/otherInfo/security', '/otherInfo/editloginpwd']
      if (locationUrlArrayFilter2.includes(locationUrl)) {
        this.setState({
          isChangeMenu: false
        })
      } else {
        this.setState({
          isChangeMenu: true
        })
      }
    }
  }

  loadComponent = async (props, newRouters, newRouterUrl) => {
    const { match, history, location } = props
    console.log(props)
    const { params } = match
    const tempModule = params.modules.split('')
    const routePage = params.page.toLowerCase()
    const routeModule = tempModule.shift().toUpperCase() + tempModule.join('')
    console.log('==========', routeModule)
    var isTrue = newRouterUrl.includes(match.url)
    console.log(match.url, isTrue)
    try {
      // if (!newRouters[`${routeModule}Route`]) { // url第一个反斜杠后面没有匹配
      //   this.setState({
      //     is404: true
      //   })
      // }
      let route = ''
      if (newRouters[`${routeModule}Route`] && newRouters[`${routeModule}Route`].actions) {
        outer:
        for (var i = 0; i < newRouters[`${routeModule}Route`].actions.length; i++) {
          if (newRouters[`${routeModule}Route`].actions[i] && newRouters[`${routeModule}Route`].actions[i].action && newRouters[`${routeModule}Route`].actions[i].action.toLowerCase() === routePage) {
            route = newRouters[`${routeModule}Route`].actions[i]
            if (newRouters[`${routeModule}Route`].actions[i].menuId) {
              this.setState({
                selectMenuId: newRouters[`${routeModule}Route`].actions[i].menuId
              })
            }
            break outer
          } else if (newRouters[`${routeModule}Route`].actions[i].childrenList) {
            for (var j = 0; j < newRouters[`${routeModule}Route`].actions[i].childrenList.length; j++) {
              if (newRouters[`${routeModule}Route`].actions[i].childrenList[j].action.toLowerCase() === routePage) {
                route = newRouters[`${routeModule}Route`].actions[i].childrenList[j]
                if (newRouters[`${routeModule}Route`].actions[i].menuId) {
                  this.setState({
                    selectMenuId: newRouters[`${routeModule}Route`].actions[i].menuId
                  })
                }
                break outer
              }
            }
          }
        }
      }
      if (!route && !isTrue) { // url第一个反斜杠匹配上了 第二个没有匹配上
        this.setState({
          is404: true
        })
      } else if (!route && isTrue) {
        window.location.pathname = '/login'
      }
      const component = await route.ensure()
      console.log(component)
      this.setState({
        component: React.createElement(component.default, { match, history, params: location.state })
      })
    } catch (e) {
      // console.log('Global Router', Routers)
      // console.log('moudle: ', `${routeModule}Route`)
      // console.log('page: ', routePage)
      // console.error('没有找到对应的页面', e)
    }
  }
  handleClick = (args) => {
    if (args === true) {
      if (this.state.isMini === false) return
      this.setState({ isMini: !args })
      this.verticalMenu && this.verticalMenu.changeModal('menuClick')
      return
    }
    if (this.state.isMini === true) return
    this.setState({ isMini: !args })
    this.verticalMenu && this.verticalMenu.changeModal('menuClick')
  }
  handleClickMenu = async (args) => {
    if (!args) return
    if (!args.url) return
    if (args && args.menuId) {
      // console.log('~~~~~~~~~~~~~', args.menuId)
      let aa123 = await this.props.getOperRuleInfo({ id: args.menuId })
      if (aa123 && aa123.data && aa123.data.respCode === '000000') {
        const { match } = this.props
        if (match.path === args.url) {
          return
        }
        const { history } = this.props
        history.push(args.url) // 跳转
      }
    }
  }
  componentDidMount() {

  }
  // 点击logo跳转事件
  goToHome = () => {
    let herf = location.pathname.split('/')
    if (herf[1] === 'otherInfo' || 'activate') {
      return
    }
    this.props.history.push('/home/home')
  }

  // 安全退出
  logout = () => {
    this.props.logout().then((res) => {
      if (res.data.respCode = '000000') {
        // 清除缓存
        let userCode = cookieStorage.getCookie('userCode')
        cookieStorage.clearCookie()
        cookieStorage.setCookie('userCode', userCode)
        sessionStorage.clear()
        // localStorage.clear()
        this.props.history.push('/login')
      }
    })
  }
  render() {
    const { isMini, component, getLoginInfo = {}, isShowMenu, isChangeMenu } = this.state,
      { userName, loginTime, companyName } = getLoginInfo
    // console.log(isShowMenu, isMini)
    // console.log(getLoginInfo)
    const footerClasses = classnames('qb-footer-g', {
      'qb-footer-g--mini': isMini && isShowMenu
    }, {
        'qb-footer-g__mg0': !isShowMenu
      })
    const menuClasses = classnames('qb-menu-g', {
      'qb-menu-g--mini': isMini && isShowMenu
    }, {
        'hidden': !isShowMenu
      })
    const layoutClasses = classnames('qb-wapper-g', {
      'qb-wapper-g__menu-mini': isMini && isShowMenu
    }, {
        'qb-wapper-g__mar15': !isShowMenu
      })
    return (
      <div>
        {/* 弹窗start */}
        <Dialog
          open={this.state.d14}
          onRequestClose={(name) => this.handleClose(name, 'd14')}
          content={this.content}
          actions={this.actions}
          actionClassName="rob-alert-button-color rob-alert-button-45"
          showCover
        />
        {this.state.is404 === true ? <NotFound /> : (
          <div>
            <div className="header">
              <div className="rob-container">
                <div className="qb-header-g qb-header-g__bg">
                  <a className="qb-header-g__logo" onClick={this.goToHome}>
                    <img src={img1} alt="" />
                  </a>
                  <div className={classnames('qb-menu-g__switch', { 'qb-menu-g__switch--mini': isMini && isShowMenu }, { 'hidden': !isShowMenu })} onClick={() => this.handleClick(this.state.isMini)}>
                    <i className="qb-icon-back" />
                    <i className="qb-icon-open1" />
                  </div>
                  <ul className="qb-header-g--navbar-right hiden">
                    <li>
                      <i className="qb-head-icon-g qb-icon-user" />
                      <div className="popover qb-popover-g">
                        <div className="arrow" />
                        <p className="popover-title popover-name">{userName}</p>
                        {loginTime ? <p className="popover-title">上次登录时间</p> : null}
                        <p className="popover-title">{loginTime}</p>
                        <div className="popover-content">
                          <Link to="/otherInfo/personalinfo" target="_blank" className="rob-btn rob-btn-danger rob-btn-circle qb-popover-g__pd20">进入个人中心</Link>
                        </div>
                      </div>
                    </li>
                    <li><Link to="/otherInfo/notice" target="_blank"><i className="qb-head-icon-g qb-icon-bell" /></Link></li>
                    <li onClick={this.logout}><i className="qb-head-icon-g qb-icon-quit" /></li>
                  </ul>
                  <Link target="_blank" to="/otherInfo/companynameinfo" className="kind-title">{companyName}</Link>
                </div>
              </div>
            </div>
            <div className={menuClasses} ref={r => this.menuDom = r}>
              {isChangeMenu ?
                <VerticalMenu
                  confData={this.state.confData}
                  handleClick={this.handleClickMenu}
                  selectMenuId={this.state.selectMenuId}
                  // showSidebarIcon
                  upLevel={this.state.upLevel}
                  ref={r => this.verticalMenu = r}
                /> : <VerticalMenu
                  confData={this.state.confDataNew}
                  handleClick={this.handleClickMenu}
                  selectMenuId={13}
                  upLevel={this.state.upLevel}
                  // showSidebarIcon
                  ref={r => this.verticalMenu = r}
                />
              }
            </div>
            <div className={layoutClasses}>
              {component}
            </div>
            <div className={footerClasses} ref={r => this.footerDom = r}>
              <div className="footerTel">邮箱：wallet-service@rongcapital.cn  客服电话：010-57044877   周一至周五：9:00-17:00</div>
              <div>&copy;2017 北京融数沃雷特科技服务有限公司  rswallet.com｜京ICP备16042215号-3</div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

RouterPage.propTypes = {
  data: propTypes.object,
  getMenuList: propTypes.func,
  getOperRule: propTypes.func,
  logout: propTypes.func
}
RouterPage.defaultProps = {
  data: {},
  getMenuList: () => { },
  getOperRule: () => { },
  logout: () => { },
}

export default connect(state => ({
  data: state.common
}), dispatch => ({
  getMenuList: bindActionCreators(action.getMenuList, dispatch),
  getOperRule: bindActionCreators(action.getOperRule, dispatch),
  logout: bindActionCreators(action.logout, dispatch),
  getOperRuleInfo: bindActionCreators(action.getOperRuleInfo, dispatch)
}))(RouterPage)