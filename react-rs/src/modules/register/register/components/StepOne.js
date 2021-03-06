import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import uuidv4 from 'uuid/v4'
import QBInput from 'components/QBInput'
import Button from 'react-robotUI/Button'
import emptyFunc from 'utils/emptyFunc'
import Dialog from 'react-robotUI/dialog'
import * as action from '../redux/action'
import '../redux/reducer'
const countTime = 60
class StepOne extends Component {
  constructor(prop) {
    super(prop)
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
    this.state = {
      params: {
        varifacationCode: ''
      },
      count: countTime,
      isShowErrorHint: false
    }
    this.renderData = [{
      label: '企业名称',
      name: 'companyName',
      required: true,
      placeholder: '请输入企业名称',
      pattern: /^.{1,60}$/,
      errorMsg: '请输入1-60个字的企业名称',
      emptyMsg: '请输入企业名称'
    }, {
      label: '营业执照号',
      name: 'companyLicense',
      required: true,
      placeholder: '请输入营业执照号',
      errorMsg: '请输入15位营业执照注册号或18位的统一社会信用代码',
      emptyMsg: '请输入营业执照号',
      pattern: /^[\da-zA-Z]{15,15}$|^[\da-zA-Z]{18,18}$/
    }, {
      label: '联系人姓名',
      name: 'contactName',
      required: true,
      placeholder: '请输入联系人姓名',
      pattern: /^.{1,58}$/,
      errorMsg: '请输入1-58个字的姓名',
      emptyMsg: '请输入联系人姓名'
    }, {
      label: '联系方式',
      name: 'contactPhone',
      required: true,
      placeholder: '请输入手机号码',
      pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
      errorMsg: '请输入正确的手机号码',
      emptyMsg: '请输入手机号码'
    }]
    this.inputs = {}
  }
  componentWillMount() {
    this.getImgVerficationCode() // 获取图形验证码
    let getOneStepData = sessionStorage.getItem('getOneStepData')
    if (!getOneStepData) {
      return
    }
    this.setState({
      params: JSON.parse(getOneStepData)
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isUpdate) {
      // 如果是修改 处理反显信息
      if (this.props.routerParams && this.props.routerParams.companyType === '100' && nextProps.bigRegisterCompanyInfo.respCode === '000000' && nextProps.bigRegisterCompanyInfo.body) {
        this.setState({
          params: { ...nextProps.bigRegisterCompanyInfo.body }
        }, () => {
          let { body = {} } = nextProps.bigRegisterCompanyInfo
          this.inputs.companyName.setValue(body.companyName) // 企业名称
          this.inputs.companyLicense.setValue(body.companyLicense) // 营业执照号
          this.inputs.contactName.setValue(body.contactName) // 联系人姓名
          this.inputs.contactPhone.setValue(body.contactPhone) // 联系方式
        })
      }
    }
  }
  static propTypes = {
    isUpdate: PropTypes.bool,
    bigRegisterCompanyInfo: PropTypes.object,
    routerParams: PropTypes.object,
    getImgVerficationCode: PropTypes.func,
    imgVerificationCode: PropTypes.object,
    handleClick: PropTypes.func,
    stepNum: PropTypes.number,
    handleChange: PropTypes.func,
    handleGetVerificationCode: PropTypes.func,
    getOneStep: PropTypes.func,
    getOneStepData: PropTypes.object,
    handleCheckBaseInfo: PropTypes.func,
    sendSmsCode: PropTypes.func,
    isTestRule: PropTypes.bool
  }
  static defaultProps = {
    isUpdate: true,
    bigRegisterCompanyInfo: {},
    routerParams: {},
    getImgVerficationCode: () => {},
    imgVerificationCode: {},
    handleClick: emptyFunc,
    stepNum: 0,
    isTestRule: false,
    handleChange: emptyFunc,
    handleGetVerificationCode: emptyFunc,
    getOneStep: emptyFunc,
    getOneStepData: {},
    handleCheckBaseInfo: emptyFunc,
    sendSmsCode: () => { }
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  // 弹窗
  handleOpen = (type, msg) => {
    this.setState({
      contentDom: msg,
      type,
      open: true,
      showCloseBtn: false
    }, function () {
      this.dialogShow[type]()
    })
  }
  // 关闭弹窗触发
  handleClose = (name, type) => {
    if (type === 'd14') {
      sessionStorage.removeItem('getOneStepData')
      sessionStorage.removeItem('getTwoStepData')
      sessionStorage.removeItem('getThreeStepData')
      // 如果是修改
      if (this.props.routerParams && this.props.routerParams.companyLicense) {
        let params = {}
        params.companyLicense = this.props.routerParams.companyLicense
        params.companyType = this.props.routerParams.companyType
        params.companyId = this.props.routerParams.companyId
        this.context.router.history.push({
          pathname: '/selectRegister',
          state: params
        })
      } else {
        this.context.router.history.push('/selectRegister')
      }
    }
    if (type === 'd12') {
      // 重新获取二维码
      this.getImgVerficationCode()
    }
    this.setState({ open: false, showCloseBtn: false })
  }
  dialogShow = {
    d11: () => {
      this.setState({ d11: true })
      this.getContent(
        <div className="rob-alert-content ">
          {this.state.contentDom}
        </div>
      )
      this.getActions([{
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle'
      }])
    },
    d12: () => {
      this.setState({ d12: true })
      this.getContent(
        <div className="rob-alert-content ">
          {this.state.contentDom}
        </div>
      )
      this.getActions([{
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle'
      }])
    },
    d14: () => {
      this.setState({ d14: true, showCloseBtn: true })
      this.getContent(
        <div className="rob-alert-content rob-form-group">
          信息尚未提交，确定要离开？
        </div>
      )
      this.getActions([{
        label: '取消',
        className: 'rob-btn-minor rob-btn-circle',
        state: false
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: true
      }])
    }
  }
  /**
   * 跳转到登陆
  */
  goLogin = () => {
    this.handleOpen('d14')
  }
  goSelectRegister = () => {
  }
  handleClick = async () => {
    sessionStorage.setItem('getOneStepData', JSON.stringify(this.state.params))
    const isHaveError = await this.handleCheckout()
    if (!isHaveError) {
      return
    }
    const { params = {} } = this.state,
      { companyLicense, contactPhone, varifacationCode } = params
    let test = {}
    test.companyLicense = companyLicense
    test.contactPhone = contactPhone
    test.phoneCaptcha = varifacationCode
    test.companyType = '100' // 大中型企业 固定传值
    // test.captcha = imgCaptcha
    // test.imgCodeToken = this.uuid
    // 如果是修改
    if (this.props.routerParams && this.props.routerParams.companyId) {
      test.companyId = this.props.routerParams.companyId
    }
    this.props.handleCheckBaseInfo(test).then((res) => {
      if (res.data.respCode === '000000') {
        this.props.handleClick(2)()
      } else if (res.data.respCode === '500011') {
        this.handleOpen('d11', '企业信息已受理在审核中，请联系客服查询审核进度，客服电话:010-57044877')
      } else if (res.data.respCode === '500012') {
        this.handleOpen('d11', '企业注册次数已达到上线,请联系客服，客服电话:010-57044877')
      } else if (res.data.respCode === '500000' || res.data.respCode === '500002' || res.data.respCode === '500010') {
        this.handleOpen('d11', res.data.respMsg)
      } else if (res.data.respCode === '900006' || res.data.respCode === '900007' || res.data.respCode === '900008' || res.data.respCode === '900009') {
        this.handleOpen('d11', res.data.respMsg)
      }
    })
  }
  handleCheckout = async () => {
    const { isVarificationCoderError, isImgCapchaError, params } = this.state,
      { varifacationCode = '', imgCaptcha = '' } = params
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
        this.handleVerificationBlur('smsCapcha')
        this.handleVerificationBlur('imgCapcha')
        if (isVarificationCoderError || isImgCapchaError || isVarificationCoderError === undefined || isImgCapchaError === undefined) {
          resolve(false)
        }
        if (!varifacationCode || !imgCaptcha) {
          return false
        }
        resolve(true)
      })
    })
  }
  handleClearValue = () => (
    Object.keys(this.inputs).forEach((key) => {
      if (this.inputs[key]) {
        this.inputs[key].setValue('')
      }
    })
  )
  handleVerificationBlur = (type) => {
    const { params } = this.state
    if (type === 'smsCapcha') {
      let isVarificationCoderError = false,
        smsErrorMsg = '验证码不能为空'
      if (!params.varifacationCode) {
        isVarificationCoderError = true
      } else if (params.varifacationCode.length < 6) {
        smsErrorMsg = '请输入6位验证码'
        isVarificationCoderError = true
      } else {
        smsErrorMsg = ''
        isVarificationCoderError = false
      }
      this.setState({
        smsErrorMsg,
        isVarificationCoderError
      })
    } else if (type === 'imgCapcha') {
      let imgErrorMsg = '验证码不能为空',
        isImgCapchaError = false
      if (!params.imgCaptcha) {
        isImgCapchaError = true
      } else if (params.imgCaptcha.length < 4) {
        imgErrorMsg = '请输入4位验证码'
        isImgCapchaError = true
      } else {
        imgErrorMsg = ''
        isImgCapchaError = false
      }
      this.setState({
        imgErrorMsg,
        isImgCapchaError
      })
    }
  }
  sendSmsCodeStatus = async () => (
    new Promise(resolve => {
      this.setState({
        isShowErrorHint2: true
      }, () => {
        if (this.inputs.contactPhone && this.inputs.contactPhone.getErrStatus()) {
          resolve(false)
        }
        resolve(true)
      })
    })
  )
  /**
   * 获取短信验证码
   */
  handleGetVerificationCode = async () => {
    this.handleVerificationBlur('imgCapcha')
    if (this.state.isImgCapchaError) {
      return false
    }
    const { params } = this.state
    if (!params.imgCaptcha) {
      return false
    }
    let a = await this.sendSmsCodeStatus()
    if (!a) {
      return
    }
    if (this.__interval && this.state.isClickGetVerificationCode) {
      return
    }
    this.props.sendSmsCode({
      imgCode: this.state.params.imgCaptcha,
      imgCodeToken: this.uuid,
      mobileNo: this.state.params.contactPhone,
      smsType: 'WPS_10001'
    }).then((res) => {
      if (res.data.respCode === '000000') {
        this.setState({
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
      } else if (res.data.respCode === '500000' ||
      res.data.respCode === '500002' ||
      res.data.respCode === '500003' ||
      res.data.respCode === '500004' ||
      res.data.respCode === '500005' ||
      res.data.respCode === '500010' ||
      res.data.respCode === '900012' ||
      res.data.respCode === '900013' ||
      res.data.respCode === '900014') {
        this.handleOpen('d12', res.data.respMsg)
      }
      this.setState({
        count: --this.state.count
      })
    }, 1000)
  }
  /*
  * 获取图形验证码
  */
  getImgVerficationCode = () => {
    const uuid = uuidv4()
    this.uuid = uuid
    this.props.getImgVerficationCode({}, { imgCodeToken: uuid })
  }
  handleChange = (key) => (value) => this.setState({ params: { ...this.state.params, [key]: value } })
  handleSetDefaultValue = (params) => this.setState({ params })
  handleGetValue = () => this.state.params
  render() {
    const { stepNum, imgVerificationCode = {} } = this.props,
      { body = {} } = imgVerificationCode,
      { imgCode } = body
    const handleChange = this.handleChange
    const { params, isShowErrorHint, count, isShowErrorHint2, isClickGetVerificationCode } = this.state
    return (
      <form className="rob-form qb-form-g__form qb-form-group-b10-g qb-mg-bt70-g" style={{ display: stepNum === 0 || stepNum === 1 ? 'block' : 'none' }}>
        <div className="qb-form-pd-g qb-form-pd-g__xs-label">
          {this.renderData.map(({ name, label, pattern, required, errorMsg, emptyMsg, placeholder }, index) => (
            <QBInput
              labelClass="rob-col-lg-3 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left qb-no-padding-rg"
              inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
              label={label}
              name={name}
              placeholder={placeholder}
              isTestRule={name === 'contactPhone' ? isShowErrorHint2 || isShowErrorHint : isShowErrorHint}
              errorMsg={errorMsg}
              ref={r => this.inputs[name] = r}
              handleChange={handleChange(name)}
              defaultValue={params[name]}
              pattern={pattern}
              required={required}
              key={index}
              emptyMsg={emptyMsg}
            />
          ))}
          <div className="rob-form-group">
            <div className="rob-col-lg-3 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left qb-no-padding-rg">
              <label className="rob-input-label">图形验证码
              </label>
            </div>
            <div className={classnames('rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24', { 'rob-input-has-error': this.state.isImgCapchaError })}>
              <div className="rob-input-item qb-getmsg-g">
                <input
                  type="text"
                  maxLength="4"
                  className="rob-input"
                  placeholder="请输入图形验证码"
                  value={params.imgCaptcha}
                  onInput={(e) => this.setState({ params: { ...this.state.params, imgCaptcha: e.target.value } })}
                  onBlur={() => { this.handleVerificationBlur('imgCapcha') }}
                />
                <img style={{ width: '80px', height: '30px', position: 'absolute', right: '18px', top: '5px' }} src={imgCode} onClick={this.getImgVerficationCode} alt="" />
              </div>
            </div>
            <div className="rob-col-lg-5 rob-col-md-5 rob-col-sm-5 rob-col-xs-24 qb-pd0-g">
              <div title={this.state.imgErrorMsg} className="qb-red-g rob-input-label text-left" style={{ display: this.state.isImgCapchaError ? 'inline-block' : 'none' }} >
                <i className="qb-icon-report1" />{this.state.imgErrorMsg}
              </div>
            </div>
          </div>
          <div className="rob-form-group">
            <div className="rob-col-lg-3 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left qb-no-padding-rg">
              <label className="rob-input-label">短信验证码
              </label>
            </div>
            <div className={classnames('rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24', { 'rob-input-has-error': this.state.isVarificationCoderError })}>
              <div className="rob-input-item qb-getmsg-g">
                <input
                  type="text"
                  maxLength="6"
                  className="rob-input"
                  placeholder="请输入短信验证码"
                  value={params.varifacationCode}
                  onInput={(e) => this.setState({ params: { ...this.state.params, varifacationCode: e.target.value } })}
                  onBlur={() => { this.handleVerificationBlur('smsCapcha') }}
                />
                <span className="qb-getmsg-g__rgbd" onClick={this.handleGetVerificationCode}>{isClickGetVerificationCode ? `重新获取(${count})` : '获取验证码'}</span>
              </div>
            </div>
            <div className="rob-col-lg-5 rob-col-md-5 rob-col-sm-5 rob-col-xs-24 qb-pd0-g">
              <div title={this.state.smsErrorMsg} className="qb-red-g rob-input-label text-left" style={{ display: this.state.isVarificationCoderError ? 'inline-block' : 'none' }}>
                <i className="qb-icon-report1" />{this.state.smsErrorMsg}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="rob-col-lg-24 text-center qb-from-bg-reg-g">
            <Button className="rob-btn rob-btn-minor rob-btn-circle" label="返回" onClick={this.goLogin} />
            <Button className="rob-btn rob-btn-danger rob-btn-circle" label="下一步" onClick={this.handleClick} />
          </div>
        </div>
        {/* 弹窗start */}
        <Dialog
          showCloseBtn={this.state.showCloseBtn}
          open={this.state.open}
          onRequestClose={(name) => this.handleClose(name, this.state.type)}
          titleClassName="rob-alert-title rob-alert-title-color"
          content={this.content}
          actions={this.actions}
          actionClassName="rob-alert-button rob-alert-button-color rob-alert-button-45"
          showCover
        />
        {/* 弹窗end */}
      </form>
    )
  }
}

export default connect(({ registerState = {} }) => ({
  getOneStatusData: registerState.getOneStatus,
  imgVerificationCode: registerState.imgVerificationCode,
  bigRegisterCompanyInfo: registerState.bigRegisterCompanyInfo
}), dispatch => ({
  getImgVerficationCode: bindActionCreators(action.getImgVerficationCode, dispatch), // 获取图形验证码,
  handleCheckBaseInfo: bindActionCreators(action.handleCheckBaseInfo, dispatch),
  sendSmsCode: bindActionCreators(action.sendSmsCode, dispatch)
}))(StepOne)