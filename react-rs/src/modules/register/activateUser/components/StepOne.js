import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import uuidv4 from 'uuid/v4'
import QBInput from 'components/QBInput'
import Dialog from 'react-robotUI/dialog'
import Button from 'react-robotUI/Button'
import emptyFunc from 'utils/emptyFunc'
import getRequest from 'utils/getRequest'
import QBSelect from 'components/QBSelect'
import * as action from '../redux/action'
import '../redux/reducer'
const countTime = 60
class StepOne extends Component {
  static propTypes = {
    getCompanyList: PropTypes.func,
    data: PropTypes.object,
    history: PropTypes.object,
    handleClick: PropTypes.func,
    stepNum: PropTypes.number,
    handleChange: PropTypes.func,
    handleMessageCode: PropTypes.func,
    verificationCodeUrl: PropTypes.object,
    getUserState: PropTypes.func,
    getUserInfo: PropTypes.func,
    handleGetVerificationCode: PropTypes.func
  }
  static defaultProps = {
    getCompanyList: () => {},
    data: {},
    history: {},
    handleClick: emptyFunc,
    stepNum: 0,
    handleChange: emptyFunc,
    handleMessageCode: emptyFunc,
    verificationCodeUrl: {},
    getUserState: emptyFunc,
    getUserInfo: emptyFunc,
    handleGetVerificationCode: emptyFunc
  }
  constructor(prop) {
    super(prop)
    this.state = {
      params: {
        phoneCode: ''
      },
      resendParams: {
        captcha: ''
      },
      count: 60,
      isShowErrorHint: false,
      isVarificationImgError: true,
      isShowList: false,
      isShowErrorHint2: false
    }
    this.renderData = [{
      label: '用户名',
      name: 'userCode',
      required: true,
      pattern: /^.{1,25}$/,
      errorMsg: '请输入1-25个任意字符',
      emptyMsg: '请输入用户名',
      handleBlur: this.handleBlur
    }, {
      label: '身份证号码后四位',
      name: 'identityNo',
      required: true,
      errorMsg: '请输入4位数字或者三位数字加X',
      emptyMsg: '请输入身份证号后四位',
      pattern: /^[\d]{4}$|^[\d]{3}x$|^[\d]{3}X$/,
      handleBlur: () => { }
    }]
    this.inputs = {
      userCode: ''
    }
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
  }
  // 关闭弹窗触发
  handleClose = (state, type) => {
    if (state) {
      this.props.history.push('/login')
    }
    this.setState({ [type]: false })
  }
  /* 进入页面显示用户名 */
  showUserName = () => {
    this.inputs.userCode.setValue(this.props.history.location.state.userCode)
    this.state.params.userCode = this.props.history.location.state.userCode
    this.setState({ ...this.state.params })
  }
  componentDidMount() {
    if (this.props.history.location.state) this.showUserName()
  }
  componentWillReceiveProps(nextProps) {
    const { data = {} } = nextProps,
      { verificationCode = {} } = data,
      { body = {} } = verificationCode
    this.setState({ imgCode: body.imgCode })
    let companyList = []
    if (nextProps.data.companyList.body && nextProps.data.companyList.body.length > 1 && this.state.isHandleBlur) {
      nextProps.data.companyList.body.forEach((item) => {
        companyList.push({
          text: item.companyName,
          value: item.id
        })
      })
      this.setState({
        isShowList: true,
        companyList
      }, () => {
        this.companyId.setValue(this.state.companyList[0])
      })
    } else if (nextProps.data.companyList.body && nextProps.data.companyList.body.length === 1) {
      // companyList.push(nextProps.data.companyList.body)
      this.setState({
        isShowList: false,
        resendParams: { ...this.state.resendParams, id: nextProps.data.companyList.body[0].id }
      })
    } else {
      this.setState({
        resendParams: { ...this.state.resendParams, id: '' }
      })
    }
  }
  /* 设置企业id入参 */
  getCompanyId = (item) => {
    this.setState({ resendParams: { ...this.state.resendParams, id: item.value } })
  }
  /* format alert Info */
  formatAlertInfo = (text) => {
    this.setState({
      alertTitle: '',
      alertTitleClass: '',
      showAlert: true,
      showCloseBtn: false,
      alertContent: text,
      alertBtns: [{
        label: '确定',
        className: 'rob-btn rob-btn rob-btn-danger rob-btn-circle',
        state: true
      }],
      alertBtnsClass: 'rob-alert-button-color',
      alertType: 'bg_icon qb-icon-fail'
    })
  }
  formatAlertInfo1 = (text, state) => {
    this.setState({
      alertTitle1: '',
      alertTitleClass1: '',
      showAlert1: true,
      alertContent1: text,
      alertBtns1: [{
        label: '确定',
        className: 'rob-btn rob-btn rob-btn-danger rob-btn-circle',
        state: state || true
      }],
      alertBtnsClass1: 'rob-alert-button-color',
      alertType1: 'bg_icon qb-icon-fail'
    })
  }
  /* 点击确定事件 */
  handleClick = async () => {
    const isHaveError = await this.handleCheckout()
    if (!isHaveError) {
      return
    }
    let activateOne = await this.props.getUserInfo(this.state.params)
    /* 处理用户状态 */
    if (activateOne.data.respCode === '000000') {
      this.props.handleClick(2, activateOne.data.body)()
    } else if (activateOne.data.respCode === '500000' || activateOne.data.respCode === '500001' || activateOne.data.respCode === '500002' || activateOne.data.respCode === '500003' || activateOne.data.respCode === '500010') {
      this.formatAlertInfo(activateOne.data.respMsg)
    }
    /* else {
      this.formatAlertInfo(activateOne.data.respMsg)
    }*/
  }
  /* 校验表单是否正确 */
  handleCheckout = async () => {
    const { isVarificationCoderError, params } = this.state
    this.handleVerificationBlur()
    if (isVarificationCoderError) {
      return !isVarificationCoderError
    }
    let filter = []
    if (params.companyLicense === '' || params.companyLicense === undefined) {
      filter.push('companyLicense')
    }
    return new Promise(resolve => {
      this.setState({
        isShowErrorHint: true
      }, () => {
        const keys = Object.keys(this.inputs)
        for (let i = 0, len = keys.length; i < len; i++) {
          let key = keys[i]
          if (filter.includes(key)) {
            continue // eslint-disable-line
          }
          if (this.inputs[key] && this.inputs[key].getErrStatus()) {
            resolve(false)
            break
          }
        }
        resolve(true)
      })
    })
  }
  /* 图片验证码失去焦点事件 */
  handleVerificationBlurImg = () => {
    const { resendParams } = this.state
    let msg = '请输入验证码',
      isVarificationImgError = false
    if (!resendParams.captcha) {
      isVarificationImgError = true
    } else if (resendParams.captcha.length < 4) {
      msg = '请输入4位验证码，不区分大小写'
      isVarificationImgError = true
    } else {
      msg = ''
      isVarificationImgError = false
    }
    this.setState({
      errorImgMsg: msg,
      isVarificationImgError
    })
  }
  /* 手机验证码失去焦点事件 */
  handleVerificationBlur = () => {
    const { params } = this.state
    let msg = '请输入验证码',
      isVarificationCoderError = false
    if (!params.phoneCode) {
      isVarificationCoderError = true
    } else if (params.phoneCode.length < 6) {
      msg = '请输入6位验证码'
      isVarificationCoderError = true
    } else {
      msg = ''
      isVarificationCoderError = false
    }
    this.setState({
      errorMsg: msg,
      isVarificationCoderError
    })
  }
  /* 倒数60秒 */
  handleGetPhoneCode = () => {
    if (this.__interval && this.state.isClickGetVerificationCode) {
      return
    }
    this.setState({
      isShowErrorHint: true
    }, () => {
      if (this.inputs.identityNo.getErrStatus() || this.inputs.userCode.getErrStatus()) return false
      this.props.handleMessageCode({ identityNo: this.state.params.identityNo || '', userCode: this.state.params.userCode || '' }).then((res) => {
        if (res.data.respCode === '000000') {
          this.setState({
            alertTitle: '',
            alertTitleClass: '',
            showAlert: true,
            alertContent: `验证码已成功发送到您注册的${res.data.body.mobileNo}手机上，请注意查收！`,
            alertBtns: [{
              label: '确定',
              className: 'rob-btn rob-btn rob-btn-danger rob-btn-circle',
              state: true
            }],
            alertBtnsClass: 'rob-alert-button rob-alert-button-45',
            alertType: 'bg_icon qb-icon-success',
            isClickGetVerificationCode: true
          })
          this.__interval = setInterval(() => {
            if (this.state.count === 0) {
              clearInterval(this.__interval)
              this.setState({
                isClickGetVerificationCode: false,
                count: countTime
              })
              return
            }
            this.setState({
              count: --this.state.count
            })
          }, 1000)
        } else if (res.data.respCode === '500000' || res.data.respCode === '500001' || res.data.respCode === '500002' || res.data.respCode === '500003' || res.data.respCode === '900012') {
          this.formatAlertInfo(res.data.respMsg)
        }
      })
    })
  }
  /* 用户名失去焦点判断是否为激活用户 */
  handleBlur = async () => {
    if (this.state.params.userCode && this.state.params.userCode.length > 0) {
      let userState = await this.props.getUserState({ userCode: this.state.params.userCode })
      /* 处理用户状态 */
      if (userState.data.respCode === '000000') {
        this.formatAlertInfo(userState.data.respMsg)
      } else if (userState.data.respCode === '500000') {
        this.formatAlertInfo(userState.data.respMsg)
      } else if (userState.data.respCode === '500002') {
        this.formatAlertInfo(userState.data.respMsg)
      }
    }
  }
  /* 关闭alert弹出框 */
  alertClose = async (type) => {
    this.setState({ errorImgMsg: '', isHandleBlur: false, resendParams: { ...this.state.resendParams } })
    if (type === 'successReSend') {
      this.handleVerificationBlurImg()
      let aa = await this.getCompanyList()
      if (!aa) {
        return false
      }
      if (this.state.resendParams.captcha !== '' && this.state.resendParams.captcha.length !== 4) {
        return false
      }
      if (!this.state.resendParams.id) {
        return false
      }
      if (!this.state.isVarificationImgError) {
        (async () => {
          let resResend = await getRequest({
            path: '/activate/resendUserInfo',
            method: 'POST',
            param: this.state.resendParams
          })
          if (resResend.data.respCode === '000000') {
            this.setState({ isVarificationImgError: true })
            let resendBtns = [
              { label: '确定', state: 'cancel', className: 'rob-btn-danger rob-btn-circle' }
            ]
            this.setState({
              alertTitle: '发送成功！',
              alertTitleClass: 'rob-alert-title rob-alert-title-color',
              showAlert: true,
              showCloseBtn: false,
              alertContent: '正在火速处理您的申请，请耐心等待！',
              alertBtns: resendBtns,
              alertBtnsClass: 'rob-alert-button rob-alert-button-45',
              alertType: ''
            }, () => {
              this.setState({ errorImgMsg: '', resendParams: { ...this.state.resendParams, captcha: '' } })
            })
          } else if (resResend.data.respCode === '500000' || resResend.data.respCode === '500011' || resResend.data.respCode === '500001' || resResend.data.respCode === '500002' || resResend.data.respCode === '500003' || resResend.data.respCode === '900006') {
            if (resResend.data.respCode === '500002' || resResend.data.respCode === '900006') this.handleGetVerificationCode()
            resResend.data.respCode === '500011' ? this.formatAlertInfo1(resResend.data.respMsg, 'goToLogin') : this.formatAlertInfo1(resResend.data.respMsg)
            this.setState({ isVarificationImgError: true })
          } else if (resResend.data.respCode === '900012' || resResend.data.respCode === '900007') {
            this.handleGetVerificationCode()
            this.formatAlertInfo1(resResend.data.respMsg)
          } else if (resResend.data.respCode === '900013') {
            let resendBtns = [
              { label: '确定', state: 'cancel', className: 'rob-btn-danger rob-btn-circle' }
            ]
            this.setState({
              alertTitle: '发送成功！',
              alertTitleClass: 'rob-alert-title rob-alert-title-color',
              showAlert: true,
              showCloseBtn: false,
              alertContent: resResend.data.respMsg,
              alertBtns: resendBtns,
              alertBtnsClass: 'rob-alert-button rob-alert-button-45',
              alertType: ''
            }, () => {
              this.setState({ errorImgMsg: '', resendParams: { ...this.state.resendParams, captcha: '' } })
            })
          }
          this.setState({ isShowList: false, companyList: [] })
        })()
      }
    } else {
      this.setState({ showAlert: false })
    }
  }
  /* 关闭alert弹出框1 */
  alertClose1 = (type) => {
    this.setState({ showAlert1: false })
    if (type === 'goToLogin') {
      this.props.history.push('/login')
    }
  }
  /**
   * 获取验证码
   */
  handleGetVerificationCode = () => {
    const uuid = uuidv4()
    this.uuid = uuid
    this.props.handleGetVerificationCode({}, { imgCodeToken: uuid })
    this.setState({ resendParams: { ...this.state.resendParams, imgCodeToken: uuid, id: this.state.resendParams.id } })
  }
  /* 获取注册的企业列表 */
  getCompanyList = async () => {
    await this.setState({ isShowErrorHint2: true })
    // 如果身份证号格式不对
    if (this.resendIdentityNo.getErrStatus()) {
      return false
    }
    this.props.getCompanyList({ identityNo: this.state.resendParams.identityNo })
    // .then((res) => {

    // })
    this.setState({ isHandleBlur: true })
    return true
  }
  /* 重发账号信息 */
  resendUserInfo = async () => {
    // 执行获取验证码方法
    await this.handleGetVerificationCode()
    // 确定弹出框数据
    let resendBtns = [
      { label: '取消', state: 'cancelReSend', className: 'rob-btn-minor rob-btn-circle' },
      { label: '确定', state: 'successReSend', className: 'rob-btn-danger rob-btn-circle' }
    ]
    this.setState({
      isShowErrorHint: false,
      isShowErrorHint2: false,
      isHandleBlur: false,
      resendParams: { ...this.state.resendParams, id: '', captcha: '' }
    }, () => {
      this.setState({
        alertTitle: '申请重发账号信息',
        alertTitleClass: 'rob-alert-title rob-alert-title-color',
        showAlert: true,
        showCloseBtn: true,
        alertContent: 'resendInfo',
        alertBtns: resendBtns,
        alertBtnsClass: 'rob-alert-button rob-alert-button-45',
        alertType: '',
        isShowList: false,
        companyList: []
      })
    })
  }
  component = (type) => {
    if (type === 'resendInfo') {
      return (
        <div>
          <QBInput
            labelClass="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-6 qb-pd0-g text-right"
            inputClass="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-16 text-left"
            label="身份证号"
            name="identityNo"
            placeholder="请输入身份证号"
            isTestRule={this.state.isShowErrorHint2}
            errDirection="bottom"
            errorMsg="请输入18位数字或字母身份证号码"
            emptyMsg="请输入身份证号"
            ref={r => this.resendIdentityNo = r}
            handleChange={(val) => this.setState({ resendParams: { ...this.state.resendParams, identityNo: val } })}
            pattern={/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/}
            required
            handleBlur={() => this.getCompanyList()}
          />
          {
            this.state.isShowList && this.state.isHandleBlur ? (
              <div className="rob-form-group">
                <QBSelect
                  name="default"
                  label="选择企业"
                  defaultValue=""
                  errDirection="bottom"
                  options={this.state.companyList}
                  handleSelect={item => {
                    this.getCompanyId(item)
                  }}
                  ref={ref => this.companyId = ref}
                  labelClass="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-6 qb-pd0-g text-right"
                  inputClass="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-16 text-left "
                />
              </div>
            ) : null
          }
          <div className="rob-form-group">
            <div>
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-6 qb-pd0-g">
                <label className="rob-input-label text-right">验证码:</label>
              </div>
              <div className={classnames('rob-col-lg-12 rob-col-lg-10 rob-col-sm-10 rob-col-xs-10 text-left', { 'rob-input-has-error': this.state.errorImgMsg })}>
                <div className="rob-input-item">
                  <input
                    type="text"
                    maxLength="4"
                    className="rob-input"
                    placeholder="请输入验证码"
                    defaultValue={this.state.resendParams.captcha}
                    // value={this.state.resendParams.captcha}
                    onInput={(e) => this.setState({ resendParams: { ...this.state.resendParams, captcha: e.target.value } })}
                    onBlur={this.handleVerificationBlurImg}
                  />
                  <div className="rob-error-message">
                    {this.state.errorImgMsg}
                  </div>
                </div>
              </div>
              <div className="rob-col-lg-4 rob-col-md-6 rob-col-sm-6 rob-col-xs-6 qb-img-g">
                <img src={this.state.imgCode} onClick={this.handleGetVerificationCode} alt="" />
              </div>
            </div>
          </div>
        </div>
      )
    }
    return this.state.alertContent
  }
  /* set params 方法 */
  handleChange = (key) => (value) => this.setState({ params: { ...this.state.params, [key]: value } })
  /* set resendParams 方法 */
  resendHandleChange = (e) => {
    this.setState({ resendParams: { ...this.state.resendParams, [e.target.name]: e.target.value } })
    if (this.state[e.target.name].isBlur) {
      this.handleCheck(e)
    }
  }
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
  /* 返回按钮事件 */
  goToLogin = () => {
    this.props.history.push('/login')
  }
  render() {
    const { stepNum } = this.props
    const handleChange = this.handleChange
    const { params, isShowErrorHint, count, isClickGetVerificationCode } = this.state
    return (
      <div>
        {this.props.stepNum === 1 ? <div className="text-right qb-container-g qb-red-g__line">
          <a href="javascript:void(0)" onClick={this.resendUserInfo} className="qb-red-g qb__line">没有收到账户信息？</a>
        </div> : null}
        <form className="rob-form qb-form-g__form qb-form-group-b10-g qb-mg-bt70-g" style={{ display: stepNum === 0 || stepNum === 1 ? 'block' : 'none' }}>
          <div className="qb-form-pd-g qb-form-pd-g__xs-label">
            {this.renderData.map(({ name, label, pattern, required, errorMsg, handleBlur, emptyMsg }, index) => (
              <QBInput
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
                inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
                label={label}
                name={name}
                emptyMsg={emptyMsg}
                placeholder={emptyMsg}
                isTestRule={isShowErrorHint}
                errorMsg={errorMsg}
                ref={r => this.inputs[name] = r}
                handleChange={handleChange(name)}
                handleBlur={handleBlur}
                defaultValue={params[name]}
                pattern={pattern}
                required={required}
                key={index}
              />
            ))}
            <div className="rob-form-group">
              <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left">
                <label className="rob-input-label">短信验证码
                </label>
              </div>
              <div className={classnames('rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24', { 'rob-input-has-error': this.state.errorMsg })}>
                <div className="rob-input-item qb-getmsg-g">
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="请输入短信验证码"
                    className="rob-input"
                    value={this.state.params.phoneCode}
                    onInput={(e) => this.setState({ params: { ...this.state.params, phoneCode: e.target.value } })}
                    onBlur={this.handleVerificationBlur}
                  />
                  <span className="qb-getmsg-g__rgbd" onClick={this.handleGetPhoneCode}>{isClickGetVerificationCode ? `重新获取(${count})` : '获取验证码'}</span>
                </div>
              </div>
              <div className="rob-col-lg-5 rob-col-md-5 rob-col-sm-5 rob-col-xs-24 qb-pd0-g">
                <div className="qb-red-g rob-input-label text-left">
                  {this.state.errorMsg}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="rob-col-lg-24 text-center qb-from-bg-reg-g">
              <Button className="rob-btn rob-btn-minor rob-btn-circle" label="返回" onClick={this.goToLogin} />
              <Button className="rob-btn rob-btn-danger rob-btn-circle" label="确定" onClick={this.handleClick} />
            </div>
          </div>
        </form>
        <Dialog
          showCover
          showCloseBtn={this.state.showCloseBtn}
          open={this.state.showAlert}
          content={{ content: this.component(this.state.alertContent), icon: this.state.alertType }}
          onRequestClose={this.alertClose}
          title={this.state.alertTitle}
          titleClassName={this.state.alertTitleClass}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
        <Dialog
          showCover
          open={this.state.showAlert1}
          content={this.state.alertContent1}
          onRequestClose={this.alertClose1}
          title={this.state.alertTitle1}
          titleClassName={this.state.alertTitleClass}
          actions={this.state.alertBtns1}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
}
export default connect(state => ({
  data: state.activateUserState
}), dispatch => ({
  handleMessageCode: bindActionCreators(action.handleMessageCode, dispatch),
  getUserState: bindActionCreators(action.getUserState, dispatch),
  getUserInfo: bindActionCreators(action.getUserInfo, dispatch),
  handleGetVerificationCode: bindActionCreators(action.handleGetVerificationCode, dispatch),
  getCompanyList: bindActionCreators(action.getCompanyList, dispatch)
}))(StepOne)