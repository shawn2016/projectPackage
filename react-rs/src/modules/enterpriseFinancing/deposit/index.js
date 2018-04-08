/*
企业理财转入
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
import Board from '../enterpriseFinancing/components/Board'
import * as action from './redux/actions'
import './redux/reducer'
class EnterpriseDepositPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      isTestRule: false,
      depositMoney: 0,
      showAlert: false,
      accountData: [],
      finishDeposit: false,
      depositSuccData: {}
    }
  }
  componentWillMount() {
    this.props.getAccountData()
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.accountData.accounts) {
      this.setState({ accountData: nextProp.accountData.accounts })
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
  // 提交表单
  submitForm = () => {
    this.setState({
      isTestRule: true,
    }, () => {
      if (this.balanceValueData.getErrStatus()) {
        return
      }
      let params = {
        fundCode: '456789098456',
        moneyTo: this.state.depositMoney
      }
      this.props.submitForm(params).then((res) => {
        let tempCode = res.data.respCode
        if (res.data.respCode === '000000') {
          this.setState({
            finishDeposit: true,
            depositSuccData: res.data.body ? res.data.body : {}
          })
        } else if (tempCode === '500000'
          || tempCode === '500001'
          || tempCode === '500009'
          || tempCode === '500011'
          || tempCode === '500013') {
          this.formatDialog(res.data.respMsg)
        } else if (tempCode === '500004') {
          this.boardAlert.wrappedInstance.delUser()
        } else if (tempCode === '500005') {
          this.formatDialog((<div><p calssName="text-center">您的理财账户正在开通受理中，请耐心等待</p><p calssName="text-center">理财账户开通预计需1个工作日</p></div>), '知道了')
        } else if (tempCode === '500006') {
          this.formatDialog((<div><p calssName="text-center">您的理财账户开通失败，请核对资料并重新提交开户申请</p><p calssName="text-center">理财账户开通预计需1个工作日</p></div>), '重新开通', 'resetOpen')
        } else if (tempCode === '500007') {
          this.formatDialog('根据监管要求，您需先完成风险评测', '进行评测', 'goToTest')
        } else if (tempCode === '500012') {
          this.formatDialog('风险测评结果已过期，请重新进行风险评测', '进行评测', 'goToTest')
        }
      })
    })
  }
  // format dialog
  formatDialog = (text, btnText, state) => {
    this.setState({
      showAlert: true,
      showCloseBtn: false,
      alertContent: text,
      alertBtns: [{
        label: btnText || '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: state || false
      }],
      alertBtnsClass: 'rob-alert-button-color rob-alert-button-45'
    })
  }
  // 关闭弹窗
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'resetOpen') {
      this.boardAlert.wrappedInstance.delUser()
    }
    if (type === 'goToTest') {
      this.props.history.push('/enterpriseFinancing/riskAssessment')
    }
  }
  // 去首页
  goToEnterpriseFinancing = () => {
    this.props.history.push('/enterpriseFinancing/enterpriseFinancing')
  }
  render() {
    let { accountData } = this.state
    return (
      <div>
        <div className="qb-panel-g qb-media-height">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><Link to="/enterpriseFinancing/enterpriseFinancing"><i className="qb-icon-enterprise-financing" />企业理财</Link></li>
              <li className="active"><a>转入</a></li>
            </ol>
          </div>
          {this.state.finishDeposit ? <div>
            <div className="qb-panel_box-g text-center">
              <i className="bg_icon qb-icon-active qb-msg-g__title"></i>
              <p className="fs16 text-center">转入申请提交成功</p>
              <ul className="rob-ant-timeline time-progress">
                <li className="rob-ant-timeline-item">
                  <div className="rob-ant-timeline-item-tail"></div>
                  <div className="rob-ant-timeline-item-head rob-ant-timeline-item-head-green"></div>
                  <div className="rob-ant-timeline-item-desc_01">
                    预计开始计息时间为  {this.state.depositSuccData.calculationTime}
                  </div>
                </li>
                <li className="rob-ant-timeline-item rob-ant-timeline-item-last">
                  <div className="rob-ant-timeline-item-tail"></div>
                  <div className="rob-ant-timeline-item-head rob-ant-timeline-item-head-green"></div>
                  <div className="rob-ant-timeline-item-desc_01">
                    预计收益到账时间为  {this.state.depositSuccData.profitArrivalTime}
                  </div>
                </li>
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
                    <label className="rob-input-label">转入账户：</label>
                  </div>
                  <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                    <div className="rob-input-item ">
                      <label className="rob-input-label">{accountData.length > 0 ? `${accountData[0].umbrellaAccountNo}` : ''}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                <div className="rob-form-group">
                  <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                    <label className="rob-input-label">可用余额(元)：</label>
                  </div>
                  <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                    <div className="rob-input-item ">
                      <label className="rob-input-label">{accountData.length > 0 ? formatMoneyYuan(accountData[0].availableBalance) : ''}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                <div className="qb-form-group">
                  <QBInput
                    name="default"
                    label="转入金额(元)"
                    required
                    isTestRule={this.state.isTestRule}
                    errDirection="bottom"
                    containErrorIcon
                    labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                    inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                    pattern={/^[1-9]\d{0,9}$/}
                    errorMsg="金额需为1的整数倍"
                    placeholder="请输入整数为1的倍数的金额"
                    ref={(node) => this.balanceValueData = node}
                    handleChange={(s) => this.setState({ depositMoney: Math.round(s * 100) })}
                    emptyMsg="请输入转入金额"
                  />
                </div>
              </div>
            </div>
            <div className="qb-form-footButton-g clearfix qb-bg-white-g">
              <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                <button className="rob-btn rob-btn-danger rob-btn-circle" onClick={this.submitForm} >转入</button>
              </div>
            </div>
            <div className="qb-form-group-g rob-row mgt30 mlr0">
              <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                <div className="rob-form-group">
                  <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                    <label className="rob-input-label" />
                  </div>
                  <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                    <div className="rob-input-item text-center">
                      <p className="fs14">由电盈基金提供</p>
                      <p>* 市场有风险，投资需谨慎</p>
                    </div>
                  </div>
                </div>
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
        <Board ref = {s => this.boardAlert = s} hideInfo />
      </div>
    )
  }
}

EnterpriseDepositPage.propTypes = {
  history: PropTypes.object,
  accountData: PropTypes.object,
  enterpriseStatus: PropTypes.object,
  getAccountData: PropTypes.func,
  submitForm: PropTypes.func,
  getEnterpriseStatus: PropTypes.func
}
EnterpriseDepositPage.defaultProps = {
  history: {},
  accountData: {},
  balanceData: {},
  enterpriseStatus: {},
  getAccountData: () => {},
  submitForm: () => {},
  getEnterpriseStatus: () => {}
}
export default connect(({ enterpriseDeposit = {} }) => ({
  accountData: enterpriseDeposit.accountData,
  enterpriseStatus: enterpriseDeposit.enterpriseStatus
}), dispatch => ({
  getAccountData: bindActionCreators(action.getEnterpriseAccountData, dispatch),
  submitForm: bindActionCreators(action.submitEnterpriseForm, dispatch),
  getEnterpriseStatus: bindActionCreators(action.getEnterpriseStatus, dispatch)
}))(EnterpriseDepositPage)