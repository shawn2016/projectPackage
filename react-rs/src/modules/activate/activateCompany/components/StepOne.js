import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QBInput from 'components/QBInput'
import BankAndAddress from 'components/BankAndAddress'
import Button from 'react-robotUI/Button'
import Dialog from 'react-robotUI/dialog'
import emptyFunc from 'utils/emptyFunc'
import getRequest from 'utils/getRequest'
import { trimAll } from 'utils/filterCommon'
import * as action from '../redux/action'
import '../redux/reducer'

class StepOne extends Component {
  static propTypes = {
    data: PropTypes.object,
    history: PropTypes.object,
    saveActivateCompanyInfo: PropTypes.func,
    getActivateCompanyState: PropTypes.func
  }
  static defaultProps = {
    data: {},
    history: {},
    saveActivateCompanyInfo: emptyFunc,
    getActivateCompanyState: emptyFunc
  }
  constructor(prop) {
    super(prop)
    this.state = {
      params: {},
      isShowErrorHint: false,
      skipDialog: false
    }
  }
  componentWillMount() {
    (async () => {
      let resData = await getRequest({
        path: '/curruser/getInfo',
        method: 'POST'
      })
      if (resData.data.respCode === '000000') {
        this.setState({ params: { ...this.state.params, accountName: resData.data.body.companyName } })
      }
    })()
  }
  /* 点击确定事件 */
  handleClick = async () => {
    const isHaveError = await this.handleCheckout()
    if (!isHaveError) {
      return
    }
    (async () => {
      let resData = await getRequest({
        path: '/companyAcc/saveInfo',
        method: 'POST',
        param: this.state.params
      })
      if (resData.data.respCode === '000000') {
        const connectActions = [{
          label: '去支付',
          className: 'rob-btn-danger rob-btn-circle',
          state: 'goPayment'
        }]
        const dialogContent = (
          <div className="rob-alert-content">
            已成功关联对公账户，还差一步就能激活。<br />
            请使用对公账户向融数钱包支付一笔金额（0.01元即可）
          </div>
        )
        this.setState({
          alertTitle: '关联成功',
          alertTitleClass: 'rob-alert-title rob-alert-title-color',
          alertContent: dialogContent,
          showAlert: true,
          alertBtns: connectActions,
          alertBtnsClass: 'rob-alert-button rob-alert-button-45',
          alertType: ''
        })
      }
    })()
  }
  /* 校验表单是否正确 */
  handleCheckout = async () => (
    new Promise(resolve => {
      this.setState({
        isShowErrorHint: true
      }, () => {
        !this.accountNo.getErrStatus()
          && !this.bankAndAddress.getWrappedInstance().getErrStatus() ? resolve(true) : resolve(false)
      })
    })
  )
  /* set params 方法 */
  handleChange = (key) => (value) => {
    this.setState({ params: { ...this.state.params, [key]: trimAll(value) } })
  }
  /* 关闭弹出框 */
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'goPayment') {
      let paymentParams = {
        accountNo: this.state.params.accountNo
      };
      (async () => {
        let resData = await getRequest({
          path: '/payment/recharge/payTheFees',
          method: 'POST',
          param: paymentParams
        })
        if (resData.data.respCode === '000000') {
          if (resData.data.body && resData.data.body.formFile) {
            const formFile = resData.data.body.formFile
            document.getElementById('submit_dom').innerHTML = formFile.substr(0, formFile.length - 7) + '<input type="submit" id="submit_button" value="Submit"></form>' // eslint-disable-line
            document.getElementById('submit_button').click()
          }
          let paymentActions = [{
            label: '确定',
            className: 'rob-btn rob-btn-danger rob-btn-circle',
            state: 'goActivateDetail'
          }]
          this.setState({
            alertTitle: '',
            alertTitleClass: '',
            alertContent: '您的缴费操作已完成',
            showAlert: true,
            alertBtns: paymentActions,
            alertBtnsClass: 'rob-alert-button rob-alert-button-color rob-alert-button-45',
            alertType: ''
          })
        }
      })()
    }
    if (type === 'goActivateDetail') {
      (async () => {
        let resData = await getRequest({
          path: '/companyAcc/getInfo',
          method: 'POST',
          param: { accountNo: this.state.params.accountNo }
        })
        if (resData.data.body.status === '100') {
          this.props.history.push('/login')
        } else {
          this.props.history.push({
            pathname: '/activate/activateCompanyState',
            state: resData.data.body
          })
        }
      })()
    }
  }
  render() {
    const handleChange = this.handleChange
    const { isShowErrorHint } = this.state
    return (
      <div>
        <form className="rob-form qb-form-g__form qb-form-group-b10-g qb-mg-bt70-g">
          <div className="qb-form-pd-g qb-form-pd-g__xs-label">
            <div className="rob-form-group">
              <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left">
                <label className="rob-input-label">账户名称:</label>
              </div>
              <div className="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24">
                <div className="rob-input-item ">
                  <label className="rob-input-label">{this.state.params.accountName}</label>
                </div>
              </div>
            </div>
            <QBInput
              name="recAcctNo"
              label="对公账户"
              defaultValue={this.state.params.recAcctNo}
              required
              isTestRule={isShowErrorHint}
              pattern={/^[\d\W]{1,36}$/}
              errorMsg="请输入数字或符号，长度1-36个字符"
              emptyMsg="对公账户不能为空"
              placeholder="请输入对公账户"
              labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
              inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
              handleChange={handleChange('accountNo')}
              ref={ref => this.accountNo = ref}
            />
            <BankAndAddress
              type="bank"
              required
              isTestRule={this.state.isShowErrorHint}
              branchBankLabel="支行名称"
              errorMsg="请输入支行名称"
              emptyMsg="银行信息不能为空"
              addressLabel="开户地"
              labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
              mainClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
              handleSelect={(val) => {
                this.setState({
                  params: {
                    ...this.state.params,
                    settleBankName: val.bank.bankName,
                    settleBankNo: val.bank.bankCode,
                    bankName: val.branchBank.bankName,
                    bankNo: val.branchBank.bankCode,
                    accountProvince: val.province.code,
                    accountCity: val.city.code
                  }
                })
              }}
              ref={ref => this.bankAndAddress = ref}
            />
            <div className="rob-form-group">
              <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left">
                <label className="rob-input-label">联行号:</label>
              </div>
              <div className="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24">
                <div className="rob-input-item ">
                  <label className="rob-input-label">{this.state.params.bankNo}</label>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="rob-col-lg-24 text-center qb-from-bg-reg-g">
              <Button className="rob-btn rob-btn-danger rob-btn-circle" label="确定" onClick={this.handleClick} />
            </div>
          </div>
        </form>
        <Dialog
          showCover
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={this.alertClose}
          title={this.state.alertTitle}
          titleClassName={this.state.alertTitleClass}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
        <div id="submit_dom" hidden />
      </div>
    )
  }
}
export default connect(state => ({
  data: state.aAC_activateCompanyState
}), dispatch => ({
  saveActivateCompanyInfo: bindActionCreators(action.aAC_saveActivateCompanyInfo, dispatch),
  getActivateCompanyState: bindActionCreators(action.aAC_getActivateCompanyState, dispatch)
}))(StepOne)