/*
企业理财转出
刘鹏钢
2017-12-7
 */
/* eslint-disable */
import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'react-robotUI/dialog'
import QBInput from 'components/QBInput'
import { formatMoneyYuan } from 'utils/filterCommon'
import * as action from './redux/actions'
import './redux/reducer'
class EnterpriseWithdrawPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      isTestRule: false,
      withdrawMoney: 0,
      showAlert: false,
      accountData: [],
      wayOfFundsOut: '1',
      accountToWay: false,
      finishWithdraw: false,
      withdrawSuccData: {}
    }
  }
  componentWillMount() {
    this.props.getAccountData()
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.accountData) {
      this.setState({ accountData: nextProp.accountData })
    }
  }
  // 获取当前时间
  getNowDate = () => {
    let month, date
    let time = new Date()
    month = time.getMonth()
    date = time.getDate()
    if (month + 1 < 10) month = '0' + month
    if (date < 10) data = '0' + date
    return {
      month,
      date
    }
  }
  //验证表单
  getFormStatus = () => {
    let { accountData, withdrawMoney } = this.state
    this.setState({
      isTestRule: true,
    }, () => {
      if (this.balanceValueData.getErrStatus()) {
        return
      }
      this.props.submitForm({ moneyOut: this.state.withdrawMoney, wayOfFundsOut: this.state.wayOfFundsOut }).then((res) => {
        let tempCode = res.data.respCode
        if (tempCode === '000000') {
          if (withdrawMoney > accountData.investedMoney) {
            this.setState({
              showAlert: true,
              showCloseBtn: false,
              alertContent: '超过在投金额，请重新输入',
              alertBtns: [{
                label: '确定',
                className: 'rob-btn rob-btn-danger rob-btn-circle',
                state: false
              }],
              alertBtnsClass: 'rob-alert-button-color rob-alert-button-45'
            })
            return false
          }
          this.setState({
            finishWithdraw: true,
            withdrawSuccData: res.data.body ? res.data.body : {}
          })
        } else if (tempCode === '500001'
          || tempCode === '500004'
          || tempCode === '500005'
          || tempCode === '500006'
          || tempCode === '500008'
          || tempCode === '500010') {
          this.setState({
            showAlert: true,
            showCloseBtn: false,
            alertContent: res.data.respMsg,
            alertBtns: [{
              label: '确定',
              className: 'rob-btn rob-btn-danger rob-btn-circle',
              state: false
            }],
            alertBtnsClass: 'rob-alert-button-color rob-alert-button-45'
          })
        } else if (tempCode === '500007') {
          this.setState({
            showAlert: true,
            showCloseBtn: true,
            alertContent: '根据监管要求，您需先完成风险评测',
            alertBtns: [{
              label: '进行评测',
              className: 'rob-btn rob-btn-danger rob-btn-circle',
              state: 'goToTest'
            }],
            alertBtnsClass: 'rob-alert-button-color rob-alert-button-45'
          })
        }
      })
    })
  }
  // 关闭弹窗
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'goToTest') {
      this.props.history.push('/enterpriseFinancing/riskAssessment')
    }
  }
  // 去首页
  goToEnterpriseFinancing = () => {
    this.props.history.push('/enterpriseFinancing/enterpriseFinancing')
  }
  render() {
    let { accountData = {} } = this.state
    return (
      <div>
        <div className="qb-panel-g qb-media-height">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><Link to="/enterpriseFinancing/enterpriseFinancing"><i className="qb-icon-enterprise-financing" />企业理财</Link></li>
              <li className="active"><a>转出</a></li>
            </ol>
          </div>
          {this.state.finishWithdraw ? <div>
            <div className="qb-panel_box-g text-center">
              <ul className="rob-ant-timeline time-progress">
                {!this.state.accountToWay ? <li className="rob-ant-timeline-item">
                  <div className="rob-ant-timeline-item-desc_01" style={{ padding: 0 }}>
                    转出申请提交成功，资金预计到账时间为  {this.state.withdrawSuccData}
                  </div>
                </li> :
                <li className="rob-ant-timeline-item rob-ant-timeline-item-last">
                  <div className="rob-ant-timeline-item-desc_01" style={{ padding: 0 }}>
                    转出申请提交成功，资金预计2小时内到账
                  </div>
                </li>}
              </ul>
              <div className="text-center mt40">
                <button type="button" className="rob-btn rob-btn-danger rob-btn-circle pb50" onClick={this.goToEnterpriseFinancing}>返回</button>
              </div>
            </div>
          </div> :
          <div>
            <div className="qb-form-group-g rob-row mgt30 mlr0">
              <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                <div className="rob-form-group">
                  <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                    <label className="rob-input-label">转出至：</label>
                  </div>
                  <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                    <div className="rob-input-item ">
                      <label className="rob-input-label">{accountData.accountOut}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                <div className="rob-form-group">
                  <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                    <label className="rob-input-label">可转出金额(元)：</label>
                  </div>
                  <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                    <div className="rob-input-item ">
                      <label className="rob-input-label">{formatMoneyYuan(accountData.investedMoney)}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                <div className="qb-form-group">
                  <QBInput
                    name="default"
                    label="转出金额(元)"
                    required
                    isTestRule={this.state.isTestRule}
                    errDirection="bottom"
                    containErrorIcon
                    labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                    inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                    pattern={/^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}[1-9]{1}$|^0\.{1}[1-9]{1}\d{1}$|^0\.{1}\d{1}[1-9]{1}$/}
                    errorMsg="请输入整数不超过10位，小数不超过2位的金额"
                    placeholder="请输入整数不超过10位，小数不超过2位的金额"
                    ref={(node) => this.balanceValueData = node}
                    handleChange={(s) => this.setState({ withdrawMoney: Math.round(s * 100) })}
                    emptyMsg="请输转出金额"
                  />
                </div>
              </div>
              <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                <div className="rob-form-group">
                  <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                    <label className="rob-input-label">到账方式：</label>
                  </div>
                  <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                    <input
                      className="rob-radio-with-gap"
                      name="group2"
                      checked={this.state.accountToWay}
                      type="radio"
                      id="test4"
                      onChange={() => {
                        this.setState({
                          accountToWay: true,
                          wayOfFundsOut: '0'
                        })
                      }}
                    />
                    <label htmlFor="test4">
                      快速到账
                      <span className="mlr10">转出将损失当天收益</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                <div className="rob-form-group">
                  <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                    <label className="rob-input-label" />
                  </div>
                  <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                    <input
                      className="rob-radio-with-gap"
                      name="group2"
                      checked={!this.state.accountToWay}
                      type="radio"
                      id="test5"
                      onChange={() => {
                        this.setState({
                          accountToWay: false,
                          wayOfFundsOut: '1'
                        })
                      }}
                    />
                    <label htmlFor="test5">
                      普通到账
                      <span className="mlr10">次日到账（如遇节假日顺延）</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="qb-form-footButton-g clearfix qb-bg-white-g">
              <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                <button className="rob-btn rob-btn-danger rob-btn-circle" onClick={this.getFormStatus} >转出</button>
              </div>
            </div>
          </div>}
        </div>
        <Dialog
          showCover
          showCloseBtn={this.state.showCloseBtn}
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
}

EnterpriseWithdrawPage.propTypes = {
  history: PropTypes.object,
  accountData: PropTypes.object,
  getAccountData: PropTypes.func,
  submitForm: PropTypes.func
}
EnterpriseWithdrawPage.defaultProps = {
  history: {},
  accountData: {},
  submitForm: () => { },
  getAccountData: () => { }
}
export default connect(({ enterpriseWithdraw = {} }) => ({
  accountData: enterpriseWithdraw.accountData
}), dispatch => ({
  getAccountData: bindActionCreators(action.getWithdrawAccountData, dispatch),
  submitForm: bindActionCreators(action.submitWithdrawForm, dispatch)
}))(EnterpriseWithdrawPage)