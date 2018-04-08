import React, { PureComponent } from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { emptyFunc, Ukey } from 'utils'
import cookieStorage from 'utils/cookieStorage'
// import Button from 'react-robotUI/Button'
import Dialog from 'react-robotUI/dialog'
// import SessionStorage from 'utils/sessionStorage'
//import LocalStorage from 'utils/localStroage'
import md5 from 'md5'
import * as action from '../redux/action'
let delFlag = false
class LoginContent extends PureComponent {
  constructor(prop) {
    super(prop)
    this.focus = this.focus.bind(this)
    this.state = {
      iptType: 'password',
      d16: false,
      params: {
        userCode: '',
        userPass: ''
      },
      userCode: '',
      state: {},
      captcha: {},
      userPass: {},
      isShowInput: true,
      userList: [],
      isOpen: true,
      openClassName: 'rob-select open'
    }
    // 弹窗
    this.getContent = (re) => { this.content = re }
    // this.getActions = (re) => { this.actions = re }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.checkRule = {
      userCode: {
        pattern: /^.{1,25}$/,
        emptyMsg: '请输入用户名',
        errMsg: '请输入1-25个数字、字母、符号、中文用户名'
      },
      userPass: {
        pattern: /^.{8,12}$/,
        emptyMsg: '请输入登录密码',
        errMsg: '请输入8-12个数字、字母、符号登录密码'
      },
      captcha: {
        pattern: /^.{4}$/,
        emptyMsg: '请输入图形验证码',
        errMsg: '请输入4位验证码，不区分大小写'
      }
    }
    this.initErrMsg = [{ // 用于初始化错误
      target: {
        name: 'userCode',
        value: ''
      }
    }, {
      target: {
        name: 'userPass',
        value: ''
      }
    }, {
      target: {
        name: 'captcha',
        value: ''
      }
    }]
  }
  // 读取local中上次登录用户名
  componentWillMount() {
    let userCode = cookieStorage.getCookie('userCode')
    if (JSON.stringify(userCode) !== '{}') { // 能读取到上次登录人
      this.setState({ params: { userCode } })
    }
  }
  componentDidMount() {
    this.textInput.focus() // 用户名框自动获取焦点
    this.handleUkeyLogic()
  }
  componentWillReceiveProps(nextProps) {
    const { userCode: newUserCode = {} } = nextProps,
      { userCode = {} } = this.props,
      { body: newBody = {} } = newUserCode,
      { body = {} } = userCode,
      { params } = this.state
    if (body.userCode !== newBody.userCode) {
      this.setState({ ...params, userCode: newBody.userCode })
    }
  }

  /**
   * 用户输入会触发
   */
  handleChange = (e) => {
    this.setState({ params: { ...this.state.params, [e.target.name]: e.target.value } })
    if (this.state[e.target.name].isBlur) {
      this.handleCheck(e)
    }
  }


  /**
   * 登录
   */
  handleLogin = async (e) => {
    e.preventDefault()
    this.userPass.blur()
    this.captcha.blur()
    let isError = false
    for (let i = 0, len = this.initErrMsg.length; i < len; i++) {
      if (this.handleCheck(this.initErrMsg[i])) {
        isError = true
      }
    }
    if (isError) return undefined  // 格式校验错误 不进行下面的操作
    // TODO: 发送登录请求
    const { userCode, userPass, captcha } = this.state.params
    // 登陆
    // const { getUserIsAcitveState } = this.props
    // if (this.state.params.userCode) {
    //   getUserIsAcitveState({ userCode: this.state.params.userCode }).then((res) => {
    //     // 用户名失焦后 用户名异常错误提示
    //     // if (res.data.respCode === '500000') { // 用户不存在
    //     //   this.setState({ isShowErrorWindow: true, errMsg: res.data.respMsg })
    //     //   return
    //     // }
    //     // if (res.data.respCode === '500001') { // 用户未激活
    //     //   this.setState({ isActiveWindowShow: true })
    //     //   return
    //     // }
    //     if (res.data.respCode === '500002') { // 用户已锁定
    //       if (res.body.userRole === 'ADMIN') { // 管理员
    //         this.setState({ isShowErrorWindow: true, errMsg: '该账号已锁定，请联系客服人员，客服电话：010-57044877 周一至周五：9:00-20:00' })
    //       } else {
    //         this.setState({ isShowErrorWindow: true, errMsg: '该账号已锁定，请联系管理员' })
    //       }
    //     }
    //     // 登陆bug
    //   })
    // }
    this.props.handleLogin({
      userCode,
      captcha,
      imgCodeToken: this.props.imgCodeToken,
      userPass: md5(userPass)
    })
  }

  /**
   * 跳转激活页面
   */
  handleGoActivePage = (name) => {
    const { history } = this.context.router
    if (name === 'goActive') {
      this.setState({ isShowErrorWindow: false }, () => {
        history.push({
          pathname: '/activateUser',
          state: this.state.params
        })
      })
      return
    }
    this.setState({ isShowErrorWindow: false })
  }
  /**
   * 查询用户名是否激活以及是否ukey用户
   */
  handleUserCodeBlur = (e) => {
    this.handleCheck(e)
    delFlag = true
    const { getUserIsAcitveState } = this.props
    setTimeout(() => {
      if (this.state.params.userCode && delFlag) {
        getUserIsAcitveState({ userCode: this.state.params.userCode }).then((res) => {
          // 用户名失焦后 用户名异常错误提示
          if (res.data.respCode === '500000') { // 用户不存在
            this.isShowCloseBtn = false
            this.content = res.data.respMsg
            this.actions = [{
              label: '确定',
              className: 'rob-btn-circle rob-btn-danger'
            }]
            this.setState({ isShowErrorWindow: true, errMsg: res.data.respMsg })
            return
          }
          if (res.data.respCode === '500001') { // 用户未激活
            this.isShowCloseBtn = true
            this.content = res.data.respMsg
            this.actions = [{
              label: '去激活',
              className: 'rob-btn-circle rob-btn-danger',
              state: 'goActive'
            }]
            this.setState({ isShowErrorWindow: true })
            return
          }
          if (res.data.respCode === '500002') { // 用户已锁定
            // if (res.body.userRole === 'ADMIN') { // 管理员
              // this.content = '当前账号已被锁定，请联系客服人员，客服电话：010-57044877'
            this.isShowCloseBtn = false
            this.content = res.data.respMsg
            this.actions = [{
              label: '确定',
              className: 'rob-btn-circle rob-btn-danger'
            }]
            this.setState({ isShowErrorWindow: true })
            // } else {
            //   // this.content = '当前账号已被锁定，请联系管理员'
            //   this.content = res.data.respMsg
            //   this.setState({ isShowErrorWindow: true })
            // }
          }
        })
      }
    }, 300)
    this.handleCheck(e)
  }
  /*
   * 关闭弹出框
  */
  handleCloseErrMsg = (name) => {
    this.title = ''
    this.content = ''
    this.actions = ''
    if (name === 'goActive') {
      const { history } = this.context.router
      this.setState({ isShowErrorWindow: false }, () => {
        history.push({
          pathname: '/activateUser',
          state: this.state.params
        })
      })
      return
    }
    this.setState({ isShowErrorWindow: false })
    // this.setState({ isActiveWindowShow: false })
  }
  /**
   * 表单校验
   */
  handleCheck = (e) => {
    const key = e.target.name,
      value = e.target.value || this.state.params[key],
      { checkRule } = this,
      rule = checkRule[key]
    let msg = '',
      isError = false

    if (!value) {
      isError = true
      msg = checkRule[key].emptyMsg
    } else if (!rule.pattern.test(value)) {
      isError = true
      msg = checkRule[key].errMsg
    }
    this.setState({
      [key]: { ...this.state[key], isError, msg, isBlur: true }
    })
    return isError
  }


  /**
   * 失去焦点
   */
  handleBlur = (e) => {
    this.handleCheck(e)
  }
/**
 * 跳转到注册进度
 */
  handleRegisterProgress = () => {
    const { history } = this.context.router
    history.push('/registerProgress')
  }
  /**
   * 跳转到注册账号
  */
  handleRegisterAccount = () => {
    const { history } = this.context.router
    history.push('/onlineProtocol')
  }

  /**
   * 跳转到激活账号
  */
  handleActiveAccount = () => {
    const { history } = this.context.router
    history.push('/activateUser')
  }

  /**
   * 找回密码
  */
  handleFindPassword = () => {
    this.setState({ isForgetPassword: true })
  }
  // 弹窗
  handleOpen = (type) => {
    this.setState({ d16: true }, () => {
      this.dialogShow[type]()
    })
  }
  // 关闭弹窗
  handleClose = (name, type) => {
    this.setState({ [type]: false })
  }
  // dialog弹出框
  dialogShow = {
    d16: () => {
      this.title = ''
      this.content = (
        <div>
          <div className="rob-alert-title rob-alert-title-color">请联系客服</div>
          <div className="rob-alert-content">
            <div>客服电话：010-57044877 周一至周五：9:00-17:00</div>
          </div>
        </div>
      )
      this.actions = [{
        label: '确定',
        className: 'rob-btn-circle rob-btn-danger',
      }]
      this.setState({ isShowErrorWindow: true })
    }
  }
  // 密码的显示与隐藏
  toggleShow = (e) => {
    if (this.state.iptType === 'password') {
      e.target.className = 'rob-is-icon-right qb-icon-open rob-icon'
      this.setState({ iptType: 'text' })
    } else {
      e.target.className = 'rob-is-icon-right qb-icon-eye-close'
      this.setState({ iptType: 'password' })
    }
  }
  // 获取焦点
  focus() {
    // 直接使用原生 API 使 text 输入框获得焦点
    this.textInput.focus()
  }
  /**
  * 自动读取ukey功能
  */
  handleUkeyLogic = () => {
    let ukey = new Ukey()
    this.ukey = ukey
    this.ukey.init()
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
      // 获取证书信息失败 读取localStorage中上次登陆人信息
      return false
    }
    // 获取证书成功后 根据ukey获取用户名
    this.props.handleGetUserBySerial({ certCode: certInfo.data }).then((res) => {
      if (res.data.body && res.data.body.length === 1) { // 只有一个用户
        this.setState({ params: { userCode: res.data.body[0] }, isShowInput: true })
      } else if (res.data.body && res.data.body.length > 1) {
        this.setState({ params: { userCode: res.data.body[0] }, userList: res.data.body, isShowInput: false, isOpen: true })
      }
      sessionStorage.setItem('isCfcaUser', 1)
    })
  }
  // 把选中的值付给 userCode
  setSlectedValue = (value) => {
    this.setState({ params: { userCode: value } })
    this.setIsOpen()
    sessionStorage.setItem('isCfcaUser', 1)
  }
  // togole 选择下拉框
  setIsOpen = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      this.state.isOpen ? this.setState({ openClassName: 'rob-select open' }) : this.setState({ openClassName: 'rob-select' })
    })
  }
  // 点击清除
  clearIptText = (name) => {
    if (name === 'userCode') {
      delFlag = false
    }
    this.setState({ params: { ...this.state.params, [name]: '' } })
  }
  render() {
    let { params = {}, userPass, userCode, captcha, isShowErrorWindow, isShowInput, openClassName, userList } = this.state,
      { verificationCodeUrl = {}, handleGetVerificationCode } = this.props,
      { body = {} } = verificationCodeUrl
    body ? { body = {} } = verificationCodeUrl : body = {}
    return (
      <div>
        <Dialog
          showCover
          showCloseBtn={this.isShowCloseBtn}
          open={isShowErrorWindow}
          title={this.title}
          content={this.content}
          actions={this.actions}
          onRequestClose={(name) => { this.handleCloseErrMsg(name) }}
          actionClassName="rob-alert-button rob-alert-button-45"
          titleClassName="rob-alert-title rob-alert-title-color"
        />
        <div className="rob-container qb-login-box-g">
          <div className="rob-panel  qb-login-g">
            <h3 className="text-center qb-login-g__login-h3">
              登录
            </h3>
            <form>
              {
                isShowInput ? (
                  <div className="rob-form-group">
                    <div className={classnames('rob-form-group rob-col-lg-24 rob-input-line', { 'rob-input-has-error': userCode.isError })}>
                      <div className=" rob-has-icon-left rob-has-icon-right">
                        <i className="rob-is-icon-left qb-icon-username " />
                        <label htmlFor="iptUserCode" onClick={() => { this.clearIptText('userCode') }} className="rob-is-icon-right qb-icon-close rob-icon-show" />
                        <input
                          id="iptUserCode"
                          type="text"
                          ref={(input) => { this.textInput = input }}
                          className="rob-input rob-login-password-padding-right"
                          placeholder="请输入用户名"
                          name="userCode"
                          maxLength="25"
                          value={params.userCode}
                          onChange={this.handleChange}
                          onBlur={this.handleUserCodeBlur}
                        />
                        <label className="rob-input-line-border" htmlFor="input" />
                        <div className="rob-error-message" style={{ display: userCode.isError ? 'block' : 'none' }}>
                          <i className="qb-icon-report1" />{userCode.msg}
                        </div>
                      </div>
                    </div>
                  </div>
                )
                  : (
                    <div className="rob-form-group">
                      <div className="rob-form-group rob-has-icon-left rob-has-icon-right">
                        <i className="rob-is-icon-left qb-icon-username " style={{ paddingLeft: 0 }} />
                        <div className={openClassName}>
                          <div className="rob-has-icon-right" onClick={() => { this.setIsOpen() }} data-toggle="dropdown" aria-expanded="true">
                            <div className="rob-select-box rob-has-icon-right bd-bottom" style={{ borderBottom: '1px solid #ccc', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
                              <span>{params.userCode}</span>
                              <i className="rob-is-icon-right qb-icon-angle-down" />
                            </div>
                            <div className="rob-select-items" style={{ background: 'rgb(255, 255, 255)', zIndex: '9999' }}>
                              {userList.map((item, i) => (
                                <div className="rob-select-item" onClick={() => { this.setSlectedValue(item) }} key={i}>{item}</div>
                            )
                            )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              }
              <div className="rob-form-group">
                <div className={classnames('rob-form-group rob-col-lg-24 rob-input-line', { 'rob-input-has-error': userPass.isError })}>
                  <div className=" rob-has-icon-left rob-has-icon-right">
                    <i className="rob-is-icon-left qb-icon-password " />
                    <i className="rob-is-icon-right qb-icon-close rob-icon-show rg22" onClick={() => { this.clearIptText('userPass') }} />
                    <i className="rob-is-icon-right qb-icon-eye-close" onClick={(e) => { this.toggleShow(e) }} />
                    <input
                      type={this.state.iptType}
                      className="rob-input rob-login-password-padding-right"
                      placeholder="请输入密码"
                      name="userPass"
                      value={params.userPass}
                      onBlur={this.handleBlur}
                      onChange={this.handleChange}
                      ref={(DOM) => { this.userPass = DOM }}
                    />
                    <label className="rob-input-line-border" htmlFor="input" />
                    <div className="rob-error-message " style={{ display: userPass.isError ? 'block' : 'none' }}>
                      <i className="qb-icon-report1" />
                      {userPass.msg}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rob-form-group">
                <div className={classnames('rob-form-group rob-col-lg-24 rob-input-line', { 'rob-input-has-error': captcha.isError })}>
                  <div className=" rob-has-icon-left">
                    <i className="rob-is-icon-left qb-icon-code " />
                    <div className="rob-code-img"><img src={body.imgCode} onClick={handleGetVerificationCode} alt="" /></div>
                    <input
                      type="text"
                      className="rob-input rob-login-code-padding-right"
                      placeholder="请输入验证码"
                      name="captcha"
                      maxLength="4"
                      value={params.captcha || ''}
                      onBlur={this.handleBlur}
                      onChange={this.handleChange}
                      ref={dom => this.captcha = dom}
                    />
                    <label className="rob-input-line-border" htmlFor="input" />
                    <div className="rob-error-message" style={{ display: captcha.isError ? 'block' : 'none' }}>
                      <i className="qb-icon-report1" />
                      {captcha.msg}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rob-form-group">
                <div className="rob-panel-button">
                  <button className="rob-btn rob-btn-block rob-btn-danger rob-btn-circle" onClick={this.handleLogin}>登录</button>
                </div>
              </div>
            </form>
            <div className="rob-login-entries">
              <ul className="clearfix">
                <li onClick={this.handleFindPassword = () => { this.handleOpen('d16') }}><a href="javascript:void(0)">找回密码</a></li>
                <li className="list-tag"> | </li>
                <li onClick={this.handleRegisterProgress}><a href="javascript:void(0)">注册进度</a></li>
                <li className="list-tag"> | </li>
                <li onClick={this.handleActiveAccount}><a href="javascript:void(0)">激活账号</a></li>
                <li className="list-tag"> | </li>
                <li onClick={this.handleRegisterAccount}><a href="javascript:void(0)">注册账号</a></li>
              </ul>
            </div>
          </div>
          <div className="qb-login-name-g">
            <h3>企业钱包</h3>
            <span className="qb-login-name-g__ft2">网上财务管理,<span className="pd5" />聚八方点滴,<span className="pd5" />化万户吉彩</span>
            <p className="qb-login-name-g__ft3">
              POS收单<span className="pd5" />·<span className="pd5" />扫码付款<span className="pd5" />·<span className="pd5" />转账支付<span className="pd5" />·<span className="pd5" />批量代发<span className="pd5" />·<span className="pd5" />集团资金管理
            </p>
          </div>
        </div>
      </div>
    )
  }
}
LoginContent.propTypes = {
  history: propTypes.any,
  getUserIsAcitveState: propTypes.func,
  handleLogin: propTypes.func,
  verificationCodeUrl: propTypes.object,
  imgCodeToken: propTypes.string,
  handleGetVerificationCode: propTypes.func,
  userCode: propTypes.object,
  userStatus: propTypes.object,
  handleGetUserIsAcitveState: propTypes.func,
  handleGetUserBySerial: propTypes.func,
}
LoginContent.defaultProps = {
  history: {},
  getUserIsAcitveState: emptyFunc,
  handleLogin: emptyFunc,
  verificationCodeUrl: {},
  imgCodeToken: '',
  handleGetVerificationCode: emptyFunc,
  userCode: {},
  userStatus: {},
  handleGetUserIsAcitveState: emptyFunc,
  handleGetUserBySerial: emptyFunc
}
LoginContent.contextTypes = {
  router: propTypes.shape({
    history: propTypes.object.isRequired,
    route: propTypes.object.isRequired,
    staticContext: propTypes.object
  })
}
// export default LoginContent
const mapDispatchToProps = (dispatch) => ({
  handleGetUserBySerial: bindActionCreators(action.handleGetUserBySerial, dispatch)
})

export default connect(({ userCode = {} }) => ({
  userCode
}), mapDispatchToProps)(LoginContent)