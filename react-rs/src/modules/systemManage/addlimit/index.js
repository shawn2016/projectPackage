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
import QBTextarea from 'components/QBTextarea'
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
      bizType: {
        value: 100
      },
      limitType: {
        value: 100
      },
      d14: false,
      title: '提示',
      accountValueData: {},
      limitAmount: '',
      isDiff: '请输入整数不超过10位，小数不超过2位的金额',
      isNoDiff: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{0,2}$|^0\.{1}\d{0,2}$/
    }
    this.bizTypeoptions = [{
      text: '支付结算',
      value: 100
    }, {
      text: '代发',
      value: 200
    }]
    this.limitTypeoptions = [{
      text: '每日限额',
      value: 100
    }, {
      text: '每周限额',
      value: 200
    }, {
      text: '每月限额',
      value: 300
    }]
    // 弹窗
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.isRight = this.isRight.bind(this)
    this.isRightNum = this.isRightNum.bind(this)
    this.submitForm = this.submitForm.bind(this)
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
      let userInfoType
      accounts.forEach(function (item) {
        let accountListItem = {}
        accountListItem = item
        userInfoType = item.umbrellaAccountNo
        accountListItem.text = userInfoType
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
  isRightNum = (type, value) => {
    if (type === 'limitAmount' && Number(value) === 0) {
      this.setState({
        isDiff: '限制金额不能为零',
        isNoDiff: /^\s{1}$/
      })
      return
    }
    this.setState({
      isDiff: '请输入整数不超过10位，小数不超过2位的金额',
      isNoDiff: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{0,2}$|^0\.{1}\d{0,2}$/
    })
    this.setState({
      [type]: value
    })
  }
  // 设置value
  isRight = (type, value) => {
    this.setState({
      [type]: value
    })
  }
  // 提交表单
  submitForm = () => {
    this.setState({
      isTestRule: true,
    }, () => {
      if (this.state.limitType.value === 100 && (this.limitAmount.getErrStatus() || this.accountValueData.getErrStatus() || this.summary.getErrStatus())) {
        return
      }
      if (this.state.limitType.value !== 100 && (this.fromToValue.getErrStatus() || this.limitAmount.getErrStatus() || this.accountValueData.getErrStatus() || this.summary.getErrStatus())) {
        return
      }
      let params = {}
      console.log(this.state.accountData)
      if (this.state.limitType.value !== 100) {
        params.fromToValue = this.state.fromToValue
      }
      params.refCompanyAcctId = this.state.accountValueData.virtualAccountNo ? this.state.accountValueData.virtualAccountNo : this.state.accountData.accountList[0].virtualAccountNo
      params.limitAmount = Math.round(this.state.limitAmount * 100)
      params.bizType = this.state.bizType.value
      params.limitType = this.state.limitType.value
      params.summary = this.state.summary
      params.summary = this.state.summary

      console.log(params)
      this.props.submitForm(params).then((res) => {
        if (res && res.data && res.data && res.data.respCode === "000000") {
          this.content = res.data.respMsg
          this.handleOpen('d6', '')
        }
      })
    })
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
    if (name && type === 'd6') {
      this.context.router.history.push('/systemManage/limit')
    }
  }
  dialogShow = {
    d6: () => {
      this.actions = ([{
        label: '确定',
        className: 'rob-btn  rob-btn-danger rob-btn-circle',
        state: true
      }])
      this.setState({ d6: true })
    }
  }
  cancelBtn = () => {
    this.props.history.push('/systemManage/limit')
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
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" />系统管理</li>
              <li className=""><Link to="/systemManage/limit">额度设置管理</Link></li>
              <li className="active"><a>新增设置</a></li>
            </ol>
          </div>
          <div className="qb-form-group-g rob-row mgt30 mlr0 qb-form-group-b10-g">
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="qb-form-group">
                <QBSelect
                  name="default"
                  label="账户名称"
                  errDirection="bottom"
                  required
                  defaultValue={defaultValue.value}
                  isTestRule={this.state.isTestRule}
                  containErrorIcon
                  labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                  errorMsg="请选择账户名称"
                  emptyMsg="请选择账户名称"
                  handleSelect={(s) => this.isRight('accountValueData', s)}
                  options={this.state.accountData.accountList}
                  ref={(node) => this.accountValueData = node}
                />
              </div>
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="qb-form-group">
                <QBSelect
                  name="default"
                  label="业务模式"
                  errDirection="bottom"
                  required
                  defaultValue={100}
                  isTestRule={this.state.isTestRule}
                  containErrorIcon
                  labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                  errorMsg="请选择业务模式"
                  emptyMsg="请选择业务模式"
                  handleSelect={(s) => this.isRight('bizType', s)}
                  options={this.bizTypeoptions}
                  ref={(node) => this.bizType = node}
                />
              </div>
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="qb-form-group">
                <QBSelect
                  name="default"
                  label="限额类型"
                  errDirection="bottom"
                  required
                  defaultValue={100}
                  isTestRule={this.state.isTestRule}
                  containErrorIcon
                  labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                  errorMsg="请选择限额类型"
                  emptyMsg="请选择限额类型"
                  handleSelect={(s) => this.isRight('limitType', s)}
                  options={this.limitTypeoptions}
                  ref={(node) => this.limitType = node}
                />
              </div>
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="qb-form-group">
                <QBInput
                  name="default"
                  label="限制金额(元)"
                  required
                  isTestRule={this.state.isTestRule}
                  errDirection="bottom"
                  containErrorIcon
                  labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                  errorMsg={this.state.isDiff}
                  pattern={this.state.isNoDiff}
                  placeholder="请输入限制金额"
                  ref={(node) => this.limitAmount = node}
                  handleChange={(s) => this.isRightNum('limitAmount', s)}
                  emptyMsg="请输入限制金额"
                />
              </div>
            </div>
            {
              this.state.limitType.value === 200 ?
                (
                  <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                    <div className="qb-form-group">
                      <QBInput
                        name="default"
                        label="起始值"
                        required
                        isTestRule={this.state.isTestRule}
                        errDirection="bottom"
                        containErrorIcon
                        labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                        inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                        pattern={/^[1-7]{1}$/}
                        errorMsg="起始值必须为1-7"
                        placeholder="请输入起始值"
                        desc="起始值必须为1-7，举例：输入“2”则表示从本周二起到下周一止，金额不能超限。"
                        ref={(node) => this.fromToValue = node}
                        handleChange={(s) => this.isRight('fromToValue', s)}
                        emptyMsg="请输入起始值"
                      />
                      <div>
                      </div>
                    </div>
                  </div>
                ) : null
            }
            {
              this.state.limitType.value === 300 ?
                (
                  <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                    <div className="qb-form-group">
                      <QBInput
                        name="default"
                        label="起始值"
                        required
                        isTestRule={this.state.isTestRule}
                        errDirection="bottom"
                        containErrorIcon
                        labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                        inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                        pattern={/^[1-9]{1}$|^[1-2][0-8]$/}
                        errorMsg="起始值必须为1-28"
                        placeholder="请输入起始值"
                        desc="起始值必须为1-28，举例：输入“2”则表示从本月2号起到下月1号止，金额不能超限。"
                        ref={(node) => this.fromToValue = node}
                        handleChange={(s) => this.isRight('fromToValue', s)}
                        emptyMsg="请输入起始值"
                      />
                      <div>
                      </div>
                    </div>
                  </div>
                ) : null
            }
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBTextarea
                name="used"
                type="used"
                label="摘要"
                errDirection="bottom"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg "
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                placeholder="请输入摘要"
                pattern={/^[\S\s]{1,140}$/}
                isTestRule={this.state.isTestRule}
                handleChange={(r) => { this.isRight('summary', r) }}
                ref={(used) => this.summary = used}
                emptyMsg="摘要不能为空"
                errorMsg="请输入1-140个任意字符"
              />
            </div>
          </div>
          <div className="qb-form-footButton-g clearfix ">
            <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <button className="rob-btn rob-btn-minor rob-btn-circle " onClick={this.cancelBtn} type="button">取消</button>
              <button className="rob-btn rob-btn-danger rob-btn-circle" onClick={this.submitForm}>保存</button>
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
  isRightNum: PropTypes.func,
  getFormStatus: PropTypes.func,
}
DepositPage.defaultProps = {
  accountData: {},
  balanceData: {},
  data: {},
  handleOpen: () => { },
  handleClose: () => { },
  getAccountData: () => { },
  isRight: () => { },
  isRightNum: () => { },
  submitForm: () => { },
  getFormStatus: () => { },
}
export default connect(({ DESP_accountDataQuery = {} }) => ({
  accountData: DESP_accountDataQuery.DESP_accountData,
  balanceData: DESP_accountDataQuery.DESP_balanceData,
}), dispatch => ({
  getAccountData: bindActionCreators(action.DESP_getAccountData, dispatch),
  submitForm: bindActionCreators(action.DESP_submitForm, dispatch)
}))(DepositPage)