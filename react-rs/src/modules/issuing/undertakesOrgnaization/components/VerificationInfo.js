/**
 * 业务流程
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import Dialog from 'react-robotUI/dialog'
import getRequest from 'utils/getRequest'
import * as actions from '../redux/actions'
import '../redux/reducer'
const countTime = 60
class VerificationInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      errMsg: '',
      count: 60,
      showAlert: false,
      phoneCode: '',
      personPhoneNo: ''
    }
  }
  componentWillMount() {
    (async () => {
      let phoneData = await getRequest({
        path: '/generic/getPhonenum',
        method: 'POST',
        param: {}
      })
      if (phoneData.data.respCode === '000000') {
        this.setState({ personPhoneNo: phoneData.data.body.phonenum })
      }
    })()
  }
  submit = async () => {
    await this.handleVerificationBlur()
    if (this.state.isVarificationCoderError) {
      return !this.state.isVarificationCoderError
    }
    this.props.submit()
  }
  /* 手机验证码失去焦点事件 */
  handleVerificationBlur = () => {
    const { phoneCode } = this.state
    let msg = '请输入验证码',
      isVarificationCoderError = false
    if (!phoneCode) {
      isVarificationCoderError = true
    } else if (phoneCode.length < 6) {
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
      return false
    }
    (async () => {
      let smsData = await getRequest({
        path: '/generic/sendPaymentSmsCode',
        method: 'POST',
        param: {}
      })
      if (smsData.data.respCode === '000000') {
        this.setState({
          alertTitle: '',
          alertTitleClass: '',
          showAlert: true,
          alertContent: `验证码已成功发送到您注册的${this.state.personPhoneNo}手机上，请注意查收！`,
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
          let tempCount = this.state.count - 1
          this.setState({
            count: tempCount
          })
        }, 1000)
      } else if (smsData.data.respCode === '500000' || smsData.data.respCode === '500001' || smsData.data.respCode === '500002' || smsData.data.respCode === '500003' || smsData.data.respCode === '900012') {
        this.formatAlertInfo(smsData.data.respMsg)
      }
    })()
  }
  /* 关闭弹出框 */
  alertClose = () => {
    this.setState({ showAlert: false })
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
  render() {
    let { isClickGetVerificationCode } = this.state
    return (
      <div className="qb-time-line-g rob-row">
        <div className="rob-form-group">
          <div className="rob-form-group rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
              <label className="rob-input-label ">
                手机号码：
                </label>
            </div>
            <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
              <label className="rob-input-label ">{this.state.personPhoneNo}</label>
            </div>
          </div>
          <div className="rob-form-group rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
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
                  value={this.state.phoneCode}
                  onChange={(e) => {
                    this.setState({ phoneCode: e.target.value })
                    this.props.updateOrderInfo({
                      smsCode: e.target.value
                    })
                  }
                  }
                  onBlur={this.handleVerificationBlur}
                />
                <span className="qb-getmsg-g__rgbd" onClick={this.handleGetPhoneCode}>{isClickGetVerificationCode ? `重新获取(${this.state.count})` : '获取验证码'}</span>
              </div>
            </div>
          </div>
          <div className="rob-form-group rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
              <label className="rob-input-label" />
            </div>
            <div className="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24">
              <div className="qb-red-g rob-input-label text-left">
                {this.state.errorMsg ? <i className="qb-icon-report1" /> : null}
                {this.state.errorMsg}
              </div>
            </div>
          </div>
        </div>
        <div className="qb-form-footButton-g clearfix qb-bg-white-g">
          <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <button
              className="rob-btn rob-btn-danger rob-btn-circle"
              onClick={() => {
                this.submit()
              }}
            >经办</button>
          </div>
        </div>
        <Dialog
          showCover
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          title={this.state.alertTitle}
          titleClassName={this.state.alertTitleClass}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
}

VerificationInfo.propTypes = {
  submit: PropTypes.func,
  updateOrderInfo: PropTypes.func
}
VerificationInfo.defaultProps = {
  submit: () => {},
  updateOrderInfo: () => {}
}

export default connect(() => {}, dispatch => ({
  updateOrderInfo: bindActionCreators(actions.updateUndertakesOrgOrderInfo, dispatch)
}))(VerificationInfo)