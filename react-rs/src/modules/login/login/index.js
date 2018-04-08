import React, { PureComponent } from 'react'
import propTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cookieStorage from 'utils/cookieStorage'
import uuidv4 from 'uuid/v4'
import Dialog from 'react-robotUI/dialog'
import { emptyFunc, Ukey } from 'utils'
// import QBInput from 'components/QBInput'
// import md5 from 'md5'
import Top from './components/Top'
import LoginContent from './components/Content'
import * as action from './redux/action'
import './redux/reducer'

class LoginPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      params: {}
    }
    this.inputs = {}
  }
  componentWillMount() {
    this.handleGetVerificationCode() // 获取验证码
    // 清除session
    sessionStorage.clear()
    // localStorage.clear()
    sessionStorage.setItem('isCfcaUser', '') // 页面一加载 先初始化session
  }
  /**
   * 获取验证码
   */
  handleGetVerificationCode = () => {
    const uuid = uuidv4()
    this.uuid = uuid
    this.props.handleGetVerificationCode({}, { imgCodeToken: uuid })
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    const { userInfo } = nextProps
    if (userInfo.respCode) {
      this.isCanLogin = true
    }
  }
  // 默认状态
  isCanLogin = true
  /**
   * 自动读取ukey功能
   */
  handleUkeyLogic = () => {
    let ukey = new Ukey()
    this.ukey = ukey
    if (ukey.isBrowserSupport === false) {
      return ukey
    }
    let cert = ukey.selectSignCert() // 获取证书 // mac版本不会返回错误, 只是data为空
    if (!cert.isSuccess) {
      // 选择证书失败
      return
    }
    let certInfo = ukey.getSelectCertInfo() // 获取证书信息
    if (!certInfo.isSuccess) {
      // 获取证书信息失败
      return false
    }
    this.props.handleGetUserBySerial({ serial: certInfo.data })
  }
  /**
   *  判断对公账户状态 决定路由跳转
   */
  switchRouter = (userInfo, body) => {
    // 获取对公账户信息
    cookieStorage.clearCookie()
    cookieStorage.setCookie('userInfo', { ...userInfo.body }) // 100 大b 200：小b
    sessionStorage.setItem('userInfoToken', userInfo.body.token)
    cookieStorage.setCookie('userCode', body.userCode)
    this.props.handleGetLoginInfo()
      .then((res) => {
        if (res.data.respCode === '000000' && res.data.body) {
          // 登陆成功
          const { history } = this.context.router
          if (res.data.body.accountStatus === '1') { //未绑定对公账户
            // 跳转到绑定对公账户
            history.push('/activate/activateCompany')
          } else if (res.data.body.accountStatus === '2' || res.data.body.accountStatus === '4') { // 绑定未验证
            // 跳转到验证结果页
            history.push({
              pathname: '/activate/activateCompanyState',
              state: res.data.body.account
            })
          } else if (res.data.body.accountStatus === '3') { // 已绑定 已验证 已缴费
            // 跳转到首页
            history.push('/home/home')
          }
        }
      })
  }
  /**
   * 登录返回的数据监测
   */
  handleCheckLogin = (userInfo, body) => {
    // isCfcaUser = session.getItem('isCfcaUser')
    const { respCode, respMsg } = userInfo
    // if (!isCfcaUser) { // 默认是不存在的
    //   return
    // }
    let isCfcaUser
    // if (isCfcaUser === '2') {
    let errMsg = '',
      isShowErrorWindow = false
    if (respCode === undefined) {
      return
    } else if (respCode === '000000') {
      // 正常用户
      isCfcaUser = userInfo.body.isCfcaUser
      if (isCfcaUser === '2') { // 非ukey用户
        this.switchRouter(userInfo, body)
      } else if (isCfcaUser === '1') { // ukey用户
        this.switchRouter(userInfo, body)
      }
    } else if (respCode === '500000' || respCode === '500001' || respCode === '500003' || respCode === '500006') {
      this.isShowCloseBtn = false
      errMsg = respMsg
      isShowErrorWindow = true
    } else if (respCode === '900006' || respCode === '900007') { // 图片验证码过期和错误
      this.isShowCloseBtn = false
      errMsg = respMsg
      isShowErrorWindow = true
      this.handleGetVerificationCode()
    }
    // switch (respCode) {
    //   case undefined:
    //     return
    //   case '000000':
    //     // 正常用户
    //     isCfcaUser = userInfo.body.isCfcaUser
    //     if (isCfcaUser === '2') { // 非ukey用户
    //       this.switchRouter(userInfo, body)
    //     } else if (isCfcaUser === '1') { // ukey用户
    //       // 判断浏览器是否支持ukey等逻辑
    //       // TODO: UKEY 操作
    //       // if (this.ukey.isBrowserSupport === false) {
    //       //   isShowErrorWindow = true
    //       //   errMsg = '您的浏览器不支持UKEY'
    //       //   this.setState({ isShowErrorWindow, errMsg })
    //       //   return false
    //       // }
    //       // let cert = this.ukey.selectSignCert() // 判断Ukey是否插入
    //       // if (!cert.isSuccess) {
    //       //   isShowErrorWindow = true
    //       //   errMsg = '请插入有效的Ukey'
    //       //   this.setState({ isShowErrorWindow, errMsg })
    //       //   return false
    //       // }
    //       this.switchRouter(userInfo, body)
    //     }
    //     break
    //   case '500000':
    //     errMsg = respMsg
    //     isShowErrorWindow = true
    //     break
    //   case '500001':
    //     errMsg = respMsg
    //     isShowErrorWindow = true
    //     break
    //   case '500006': // 用户已锁定
    //     errMsg = respMsg
    //     // if (data.userRole === 'ADMIN') { // 管理员用户
    //     //   errMsg = '该账号已锁定，请联系客服人员，客服电话：010-57044877 周一至周五：9:00-17:00'
    //     // } else { // 普通用户
    //     //   errMsg = '用户已锁定，请联系管理员'
    //     // }
    //     isShowErrorWindow = true
    //     break
    //   case '500003':
    //     // errMsg = `账号或密码错误,您还有${data.opportunityNum}次机会!!`
    //     errMsg = respMsg
    //     isShowErrorWindow = true
    //     break
    //   case '900006':
    //     errMsg = respMsg
    //     isShowErrorWindow = true
    //     this.handleGetVerificationCode()
    //     break
    //   case '900007':
    //     errMsg = respMsg
    //     isShowErrorWindow = true
    //     this.handleGetVerificationCode()
    //     break
    //   default:
    //     break
    // }
    this.setState({ isShowErrorWindow, errMsg })
    // }
  }

  /**
   * 登录登录
  */
  handleLogin = async (body) => {
    // this.session = new SessionStorage()
    // let isCfcaUser = this.session.getItem('isCfcaUser')
    // if (isCfcaUser === '1' && !this.ukey.isBrowserSupport) { // 如果是ukey用户检测浏览器是否插入ukey
    //   let isShowErrorWindow = true,
    //     errMsg = '您的浏览器不支持UKEY'
    //   this.setState({ isShowErrorWindow, errMsg })
    //   return false
    // }
    // 防止多次触发登陆
    if (!this.isCanLogin) {
      return
    }
    this.isCanLogin = false
    const { handleLogin: propHandleLogin = emptyFunc } = this.props
    await propHandleLogin(body)
    const { userInfo } = this.props
    await this.handleCheckLogin(userInfo, body)
  }
  handleCloseErrMsg = () => {
    this.setState({ isShowErrorWindow: false, errMsg: '' })
  }
  handleChangeUkeyPwd = (value) => {
    this.setState({
      ukeyPwd: value
    })
  }
  render() {
    const {
      handleGetUserIsAcitveState, // 获取用户名的状态
      handleCheckUkeyPass, // 校验密码
      verificationCodeUrl, // 验证码链接
      userCode
    } = this.props, {
      errMsg,
        isShowErrorWindow,
    } = this.state
    return (
      <div>
        <Dialog
          showCover
          open={isShowErrorWindow}
          showCloseBtn={this.isShowCloseBtn}
          title=""
          titleClassName="rob-alert-title rob-alert-title"
          content={errMsg}
          actions={[{
            label: '确定',
            className: 'rob-btn-circle rob-btn-danger'
          }]}
          onRequestClose={this.handleCloseErrMsg}
          actionClassName="rob-alert-button-color"
        />
        <Top />
        <div className="qb-login-bj" />
        <LoginContent
          handleGetUserBySerial={this.handleGetUserBySerial}
          getUserIsAcitveState={handleGetUserIsAcitveState}
          handleCheckUkeyPass={handleCheckUkeyPass}
          handleLogin={this.handleLogin}
          verificationCodeUrl={verificationCodeUrl}
          imgCodeToken={this.uuid}
          handleGetVerificationCode={this.handleGetVerificationCode}
          userCode={userCode}
          userInfo={this.props.userInfo}
          userStatus={this.props.userStatus}
        />
        <div className="qb-footer-g qb-footer-g__fixed_bottom">
          <div className="footerTel">邮箱：wallet-service@rongcapital.cn  客服电话：010-57044877   周一至周五：9:00-17:00</div>
          <div>&copy;2017 北京融数沃雷特科技服务有限公司  rswallet.com｜京ICP备16042215号-3</div>
        </div>
      </div>
    )
  }
}
LoginPage.propTypes = {
  history: propTypes.any,
  handleGetUserIsAcitveState: propTypes.func, // 获取用户是否激活
  handleCheckUkeyPass: propTypes.func, // 校验UKEY密码
  handleLogin: propTypes.func, // 登录
  handleGetVerificationCode: propTypes.func, // 获取验证码
  userStatus: propTypes.object, // 用户的状态
  userCode: propTypes.object, // 根据序列号获取的用户名
  userInfo: propTypes.object, // 登录返回的信息, 是不是Ukey用户
  checkUkey: propTypes.object, // 校验Ukey, 密码发挥的结果
  verificationCodeUrl: propTypes.object, // 验证码链接
  handleGetUserBySerial: propTypes.func, // 获取用户名, 根据ukey序列号
  loginInfo: propTypes.object, // 登录信息
  handleGetLoginInfo: propTypes.func
}
LoginPage.defaultProps = {
  handleGetUserIsAcitveState: emptyFunc,
  handleGetVerificationCode: emptyFunc,
  handleCheckUkeyPass: emptyFunc,
  handleLogin: emptyFunc,
  userStatus: {},
  userInfo: {},
  checkUkey: {},
  verificationCodeUrl: {},
  handleGetUserBySerial: emptyFunc,
  history: {},
  userCode: {},
  loginInfo: {},
  handleGetLoginInfo: emptyFunc
}
LoginPage.contextTypes = {
  router: propTypes.shape({
    history: propTypes.object.isRequired,
    route: propTypes.object.isRequired,
    staticContext: propTypes.object
  })
}
const mapDispatchToProps = (dispatch) => ({
  handleGetUserIsAcitveState: bindActionCreators(action.handleGetUserIsAcitveState, dispatch),
  handleLogin: bindActionCreators(action.handleLogin, dispatch),
  handleCheckUkeyPass: bindActionCreators(action.handleCheckUkeyPass, dispatch),
  handleGetVerificationCode: bindActionCreators(action.handleGetVerificationCode, dispatch),
  handleGetUserBySerial: bindActionCreators(action.handleGetUserBySerial, dispatch),
  handleGetLoginInfo: bindActionCreators(action.handleGetLoginInfo, dispatch)
})
export default connect(({ loginState = {} }) => ({
  userStatus: loginState.userStatus,
  userInfo: loginState.userInfo,
  checkUkey: loginState.checkUkey,
  verificationCodeUrl: loginState.verificationCode,
  userCode: loginState.userCode,
  loginInfo: loginState.loginInfo
}), mapDispatchToProps)(LoginPage)