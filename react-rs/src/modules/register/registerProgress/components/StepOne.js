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
      label: '营业执照号',
      name: 'companyLicense',
      required: true,
      placeholder: '请输入营业执照号',
      errorMsg: '请输入15位营业执照注册号或18位的统一社会信用代码',
      emptyMsg: '请输入营业执照号',
      pattern: /^[\da-zA-Z]{15,15}$|^[\da-zA-Z]{18,18}$/
    }, {
      label: '联系人手机号',
      name: 'contactPhone',
      required: true,
      placeholder: '请输入手机号码',
      pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
      errorMsg: '请输入正确的手机号码',
      emptyMsg: '请输入手机号码'
    }]
    this.inputs = {}
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
  handleClose = (name) => {
    if (name === 'regainVerification') {
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
  }
  /**
   * 跳转到登陆
  */
  goLogin = () => {
    this.context.router.history.push('/login')
  }
  handleClick = async () => {
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
    // 验证身份
    this.props.handleCheckSessionIdInfo(test).then((res) => {
      if (res.data.respCode === '000000') {
        // todo: 跳转至进度详情 并传入参数 整个返回参数
        this.context.router.history.push({
          pathname: '/registerDetail',
          state: res.data
        })
      } else if (res.data.respCode === '500001' ||
        res.data.respCode === '500003' ||
        res.data.respCode === '500004' ||
        res.data.respCode === '500005' ||
        res.data.respCode === '500010' ||
        res.data.respCode === '500011' ||
        res.data.respCode === '500012' ||
        res.data.respCode === '500013' ||
        res.data.respCode === '500014' ||
        res.data.respCode === '900006' ||
        res.data.respCode === '900007' ||
        res.data.respCode === '900008' ||
        res.data.respCode === '900009') {
        this.content = res.data.respMsg
        this.actions = ([{
          label: '确定',
          className: 'rob-btn rob-btn-danger rob-btn-circle'
        }])
        this.setState({
          open: true,
          showCloseBtn: false
        })
      } else if (res.data.respCode === '500002') {
        this.content = res.data.respMsg
        this.actions = ([{
          label: '确定',
          className: 'rob-btn rob-btn-danger rob-btn-circle',
          state: 'regainVerification'
        }])
        this.setState({
          open: true,
          showCloseBtn: false
        })
      }
    })
    // this.context.router.history.push({
    //   pathname: '/registerDetail',
    //   state: test
    // })
    // this.props.handleCheckSessionIdInfo(test).then((res) => {
    //   this.context.router.history.push({
    //     pathname: '/registerDetail',
    //     state: res
    //   })
    //   if (res.data.respCode === '000000') {
    //     // todo: 跳转至进度详情 并传入参数 整个返回参数
      //   this.context.router.history.push({
      //     pathname: '/registerDetail',
      //     state: res
      //   })
    //     // this.props.handleClick(2)()
    //   } else if (res.data.respCode === '500011') {
    //     this.handleOpen('d11', '企业信息已受理在审核中，请联系客服查询审核进度，客服电话:010-57044877')
    //   } else if (res.data.respCode === '500012') {
    //     this.handleOpen('d11', '企业注册次数已达到上线,请联系客服，客服电话:010-57044877')
    //   } else if (res.data.respCode === '500001') {
    //     this.handleOpen('d11', res.data.respMsg)
    //   }/* else {
    //     this.handleOpen('d11', res.data.respMsg)
    //   }*/
    // })
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
        if (isVarificationCoderError || isImgCapchaError) {
          resolve(false)
        }
        if (!varifacationCode || !imgCaptcha) {
          resolve(false)
        }
        resolve(true)
      })
    })
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
    await this.setState({
      isShowErrorHint: true,
      isShowErrorHint2: true
    })
    this.handleVerificationBlur('imgCapcha')
    if (this.inputs.companyLicense.getErrStatus()) {
      return false
    }
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
    this.props.getVerificationCode({
      companyLicense: this.state.params.companyLicense,
      imgCode: this.state.params.imgCaptcha,
      imgCodeToken: this.state.params.imgCodeToken,
      mobileNo: this.state.params.contactPhone,
      smsType: 'WPS_10005'
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
      } else if (res.data.respCode === '500001' ||
        res.data.respCode === '500004' ||
        res.data.respCode === '500005' ||
        res.data.respCode === '900012' ||
        res.data.respCode === '900013' ||
        res.data.respCode === '900014') {
        this.handleOpen('d11', res.data.respMsg)
      } else if (res.data.respCode === '500002' || res.data.respCode === '500003') {
        this.content = res.data.respMsg
        this.actions = ([{
          label: '确定',
          className: 'rob-btn rob-btn-danger rob-btn-circle',
          state: 'regainVerification'
        }])
        this.setState({
          open: true,
          showCloseBtn: false
        })
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
    this.props.getImgVerficationCode({}, { imgCodeToken: uuid }).then((res) => {
      if (res.data && res.data.respCode === '000000') {
        this.setState({
          params: {
            ...this.state.params,
            imgCodeToken: uuid
          }
        })
      }
    })
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
              <div className="qb-red-g rob-input-label text-left" style={{ display: this.state.isImgCapchaError ? 'inline-block' : 'none' }} >
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
              <div className="qb-red-g rob-input-label text-left" style={{ display: this.state.isVarificationCoderError ? 'inline-block' : 'none' }}>
                <i className="qb-icon-report1" />{this.state.smsErrorMsg}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="rob-col-lg-24 text-center qb-from-bg-reg-g">
            <Button className="rob-btn rob-btn-minor rob-btn-circle" label="返回" onClick={this.goLogin} />
            <Button className="rob-btn rob-btn-danger rob-btn-circle" label="确定" onClick={this.handleClick} />
          </div>
        </div>
        {/* 弹窗start */}
        <Dialog
          showCover
          showCloseBtn={this.state.showCloseBtn}
          open={this.state.open}
          onRequestClose={(name) => this.handleClose(name, this.state.type)}
          titleClassName="rob-alert-title rob-alert-title-color"
          content={this.content}
          actions={this.actions}
          actionClassName="rob-alert-button rob-alert-button-color rob-alert-button-45"
        />
        {/* 弹窗end */}
      </form>
    )
  }
}
StepOne.propTypes = {
  handleCheckSessionIdInfo: PropTypes.func,
  getVerificationCode: PropTypes.func,
  getImgVerficationCode: PropTypes.func,
  imgVerificationCode: PropTypes.object,
  handleClick: PropTypes.func,
  stepNum: PropTypes.number,
  handleChange: PropTypes.func,
  handleGetVerificationCode: PropTypes.func,
  getOneStep: PropTypes.func,
  getOneStepData: PropTypes.object,
  sendSmsCode: PropTypes.func,
  isTestRule: PropTypes.bool
}
StepOne.defaultProps = {
  handleCheckSessionIdInfo: () => {},
  getVerificationCode: () => {},
  getImgVerficationCode: () => {},
  imgVerificationCode: {},
  handleClick: emptyFunc,
  stepNum: 0,
  isTestRule: false,
  handleChange: emptyFunc,
  handleGetVerificationCode: emptyFunc,
  getOneStep: emptyFunc,
  getOneStepData: {},
  sendSmsCode: () => { }
}
StepOne.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    staticContext: PropTypes.object
  })
}
export default connect((state) => ({
  smsVerification: state.registerProgressSrearch && state.registerProgressSrearch.smsVerificationCode,
  imgVerificationCode: state.registerProgressSrearch && state.registerProgressSrearch.imgVerificationCode,
  sessionId: state.registerProgressSrearch && state.registerProgressSrearch.registerProgressSessionId
}),
dispatch => ({
  getImgVerficationCode: bindActionCreators(action.getImgVerficationCode, dispatch), // 获取图形验证码
  getVerificationCode: bindActionCreators(action.getVerificationCode, dispatch), // 获取短信验证码
  handleCheckSessionIdInfo: bindActionCreators(action.handleCheckSessionIdInfo, dispatch), // 验证身份信息
//   sendSmsCode: bindActionCreators(action.sendSmsCode, dispatch)
})
)(StepOne)