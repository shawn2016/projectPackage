/*
公告信息列表
戴志祥
2017-7-25
 */
/* eslint-disable */
import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'react-robotUI/dialog'
import QBInput from 'components/QBInput'
import cookieStorage from 'utils/cookieStorage'
import config from '../../../config'
import { formatMoneyYuan } from 'utils/filterCommon'
import QBSelect from 'components/QBSelect'
import * as action from './redux/actions'
import './redux/reducer'
class DepositPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      d11: false,
      isTestRule: false,
      accountData: {},
      balanceData: {},
      formSubmit: '',
      d6: false,
      d14: false,
      title: '提示',
      accountValueData: {},
      balanceValueData: '',
      isDiff: '请输入整数不超过10位，小数不超过2位的金额',
      isNoDiff: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{0,2}$|^0\.{1}\d{0,2}$/
    }
    // 弹窗
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.isRight = this.isRight.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.getFormStatus = this.getFormStatus.bind(this)
    this.lookFunc = this.lookFunc.bind(this)
  }
  // 路由
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  componentWillReceiveProps(nextProp) {
    console.log(nextProp)
  }
  componentDidMount() {
    console.log('componentDidMount')
    // 获取账户信息
    this.props.getAccountData().then(() => {
      console.log('获取账户信息')
      console.log(this.props.accountData)
      if (this.props.accountData.body == null) {
        return false
      }
      let accountList = []
      const { accountData } = this.props,
        { body } = accountData,
        { accounts } = body
      let userInfo = {}, userInfoType
      if (JSON.stringify(cookieStorage.getCookie('userInfo')) && cookieStorage.getCookie('userInfo').token) {
        userInfo = cookieStorage.getCookie('userInfo')
      }
      accounts.forEach(function (item) {
        let accountListItem = {}
        accountListItem = item
        userInfoType = item.umbrellaAccountNo
        accountListItem.text = userInfoType
        // if (userInfo && userInfo.isCfcaUser === '1') {
        //   userInfoType = item.umbrellaAccountNo
        //   accountListItem.text = item.accountName + ' ' + userInfoType
        // } else {
        //   userInfoType = item.virtualAccountNo
        //   accountListItem.text = userInfoType
        // }
        accountListItem.value = item.virtualAccountNo
        accountList.push(accountListItem)
      })
      this.setState({
        accountData: {
          accountList
        }
      })
    })
  }
  // 设置value
  isRight = (type, value) => {
    this.setState({
      [type]: value
    })
    /*let aa = this.state.accountValueData.availableBalance ? this.state.accountValueData.availableBalance : this.state.accountData.accountList[0].availableBalance
    if (value * 100 > aa) {
      this.setState({
        isDiff: '入金金额不能超过可用余额',
        isNoDiff: /^\s{1}$/
      })
      return
    }*/
    if (Number(value) === 0) {
      this.setState({
        isDiff: '入金金额不能为零',
        isNoDiff: /^\s{1}$/
      })
      return
    }
    this.setState({
      isDiff: '请输入整数不超过10位，小数不超过2位的金额',
      isNoDiff: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{0,2}$|^0\.{1}\d{0,2}$/
    })
  }
  // 提交表单
  submitForm = () => {
    this.setState({
      isTestRule: true,
    }, () => {
      if (this.balanceValueData.getErrStatus() || this.accountValueData.getErrStatus()) {
        return
      }
      let params = {}
      params.accountID = this.state.accountValueData
      params.amount = this.state.balanceValueData
      console.log(params)
      this.props.submitForm(params)
    })
  }
  //验证表单
  getFormStatus = () => {
    this.setState({
      isTestRule: true,
    }, () => {
      if (this.balanceValueData.getErrStatus() || this.accountValueData.getErrStatus()) {
        return
      }
      this.handleOpen('d14', '确认入金')
    })
  }
  // 入金记录
  lookFunc = () => {
    this.context.router.history.push('/home/depositlist')
  }
  // 弹窗
  handleOpen = (type, title) => {
    this.dialogShow[type]()
    this.setState({
      title,
      type,
      open: true
    })
  }
  // 关闭弹窗触发
  handleClose = (name, type) => {
    this.setState({ open: false })
    console.log(this.state, name, type)
    if (name && type === 'd14') {
      let params = {
        accountNo: this.state.accountValueData.virtualAccountNo ? this.state.accountValueData.virtualAccountNo : this.state.accountData.accountList[0].virtualAccountNo,
        amount: Math.round(this.state.balanceValueData * 100)
      }
      console.log(params)
      this.props.submitForm(params).then((res) => {
        if (res.data.respCode === '000000') {
          if (res.data.body && res.data.body.formFile) {
            const formFile = res.data.body.formFile
            console.log(formFile)
            document.getElementById('submit_dom').innerHTML = formFile.substr(0, formFile.length - 7) + '<input type="submit" hidden id="submit_button" value="Submit"></form>'
            document.getElementById('submit_button').click()
          }
          this.content = "您的入金操作已完成"
          this.handleOpen('d6', '')
        }
      })
    }
    if (name && type === 'd6') {
      this.context.router.history.push('/home/depositlist')
    }
  }
  dialogShow = {
    d14: () => {
      this.setState({ d14: true })
      const { accountData = {} } = this.state,
        { accountList = [] } = accountData,
        defaultValue = accountList[0] || { value: '1', text: '' }
      this.getContent(
        <div className="rob-alert-content ">
          <div className="rob-row mg-b20">
            <div className="rob-col-lg-24"><div className="rob-col-lg-10">入金账户:</div><div className="rob-col-lg-14 text-left ">{this.state.accountValueData.text || defaultValue.text}</div></div>
          </div>
          <div className="rob-row"> <div className="rob-col-lg-24"><div className="rob-col-lg-10">入金金额(元):</div><div className="rob-col-lg-14 text-left ">{formatMoneyYuan(this.state.balanceValueData * 100)}</div></div></div>
        </div>
      )
      this.getActions([{
        label: '取消',
        className: 'rob-btn-minor rob-btn-circle',
        state: false
      }, {
        label: '确认',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: true
      }])
    },
    d6: () => {
      this.actions = ([{
        label: '确定',
        className: 'rob-btn  rob-btn-danger rob-btn-circle',
        state: true
      }])
      this.setState({ d6: true })
    }
  }


  render() {
    const { accountData = {} } = this.state,
      { accountList = [] } = accountData,
      defaultValue = accountList[0] || { value: '1', text: '' }
    console.log(defaultValue)
    return (
      <div>
        {/* 弹窗start */}
        <Dialog
          showCloseBtn={!!this.state.title}
          open={this.state.open}
          onRequestClose={(name) => this.handleClose(name, this.state.type)}
          title={this.state.title === '提示' ? '' : this.state.title}
          titleClassName="rob-alert-title rob-alert-title-color"
          content={this.content}
          actions={this.actions}
          actionClassName={`rob-alert-button rob-alert-button-45 ${this.state.title ? '' : 'rob-alert-button-color'}`}
          showCover
        />
        {/* 弹窗end */}
        <div id="submit_dom" hidden />
        <div className="qb-panel-g qb-media-height">
          <div className="qb-column-header-g  qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><Link to="/home/home"><i className="qb-icon-home" />首页</Link></li>
              <li className="active"><a>入金</a></li>
            </ol>
            <button className="rob-btn rob-btn-minor rob-btn-circle " type="button" onClick={() => this.lookFunc()}>入金记录</button>
          </div>
          <div className="qb-form-group-g rob-row mgt30 mlr0 qb-form-group-b10-g">
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="qb-form-group">
                <QBSelect
                  name="default"
                  label="入金账户"
                  errDirection="bottom"
                  required
                  defaultValue={defaultValue.value}
                  isTestRule={this.state.isTestRule}
                  containErrorIcon
                  labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                  errorMsg="请选择入金账户"
                  emptyMsg="请选择入金账户"
                  handleSelect={(s) => this.isRight('accountValueData', s)}
                  options={this.state.accountData.accountList}
                  ref={(node) => this.accountValueData = node}
                />
              </div>
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="rob-form-group">
                <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                  <label className="rob-input-label">余额(元)：</label>
                </div>
                <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                  <div className="rob-input-item ">
                    <label className="rob-input-label">{this.state.accountValueData.accountBalance ? formatMoneyYuan(this.state.accountValueData.accountBalance) : formatMoneyYuan(defaultValue.accountBalance)}</label>
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
                    <label className="rob-input-label">{this.state.accountValueData.availableBalance ? formatMoneyYuan(this.state.accountValueData.availableBalance) : formatMoneyYuan(defaultValue.availableBalance)}</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="qb-form-group">
                <QBInput
                  name="default"
                  label="入金金额(元)"
                  required
                  isTestRule={this.state.isTestRule}
                  errDirection="bottom"
                  containErrorIcon
                  labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                  pattern={/^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/}
                  errorMsg={this.state.isDiff}
                  pattern={this.state.isNoDiff}
                  placeholder="请输入入金金额"
                  ref={(node) => this.balanceValueData = node}
                  handleChange={(s) => this.isRight('balanceValueData', s)}
                  emptyMsg="请输入入金金额"
                />
              </div>
            </div>
          </div>
          <div className="qb-form-footButton-g clearfix qb-bg-white-g">
            <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <button className="rob-btn rob-btn-danger rob-btn-circle" onClick={this.getFormStatus} >入金</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DepositPage.propTypes = {
  data: PropTypes.object,
  accountData: PropTypes.object,
  balanceData: PropTypes.object,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
  getAccountData: PropTypes.func,
  submitForm: PropTypes.func,
  isRight: PropTypes.func,
  getFormStatus: PropTypes.func,
  lookFunc: PropTypes.func,
}
DepositPage.defaultProps = {
  accountData: {},
  balanceData: {},
  data: {},
  handleOpen: () => { },
  handleClose: () => { },
  getAccountData: () => { },
  isRight: () => { },
  submitForm: () => { },
  getFormStatus: () => { },
  lookFunc: () => { }
}
export default connect(({ DESP_accountDataQuery = {} }) => ({
  accountData: DESP_accountDataQuery.DESP_accountData,
  balanceData: DESP_accountDataQuery.DESP_balanceData,
}), dispatch => ({
  getAccountData: bindActionCreators(action.DESP_getAccountData, dispatch),
  submitForm: bindActionCreators(action.DESP_submitForm, dispatch)
}))(DepositPage)