/**
 * 业务规则创建
 * 刘鹏钢  2017.12.11
 */
import React, { PureComponent } from 'react'
import QBInput from 'components/QBInput'
import PropTypes from 'prop-types'
import { fromJS } from 'immutable'
import { bindActionCreators } from 'redux'
import QBSelect from 'components/QBSelect'
import Dialog from 'react-robotUI/dialog'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as actions from './redux/action'
import './redux/reducer'
class CreateRule extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isTestRule: false,
      actFlowInfo: [],
      allUsersForStep: fromJS([]),
      params: {
        bizType: '201000'
      }
    }
  }
  addUserFlagArray = []
  selectedUsers = []
  componentWillMount() {
    this.state.params.bizType = this.props.params.bizType
    this.state.params.id = this.props.params.id
    if (this.props.params.id) {
      this.props.getRuleInfo({ id: this.props.params.id }).then((res) => {
        if (res.data.respCode === '000000') {
          let { ruleInfo } = this.props
          this.ruleName.setValue(ruleInfo.procRuleName)
          if (ruleInfo.highLimitAmount) this.maxAmount.setValue(ruleInfo.highLimitAmount / 100)
          if (ruleInfo.lowLimitAmount) this.minAmount.setValue(ruleInfo.lowLimitAmount / 100)
          // set account&&flow
          this.props.getAccountList().then((accRes) => {
            if (accRes.data.respCode === '000000') {
              this.props.accountList.forEach((item, i) => {
                if (ruleInfo.accountName === item.accountName) {
                  this.accountName.setValue(this.props.accountList[i])
                }
              })
            }
          })
          this.props.getAccFlowList().then((flowRes) => {
            if (flowRes.data.respCode === '000000') {
              for (let i = 0; i < this.props.accFlowList.length; i++) {
                let currentItem = this.props.accFlowList[i]
                if (ruleInfo.refProcName === currentItem.refProcName) {
                  this.flowType.setValue(this.props.accFlowList[i])
                }
              }
            }
          })
        }
      })
    } else {
      this.props.getAccountList().then((res) => {
        if (res.data.respCode === '000000') {
          this.accountName.setValue(this.props.accountList[0])
        }
      })
      this.props.getAccFlowList().then((res) => {
        if (res.data.respCode === '000000') {
          this.flowType.setValue(this.props.accFlowList[0])
        }
      })
    }
  }
  changeInit = () => {
    let { ruleInfo } = this.props
    if (this.props.params.id) {
      for (let i = 0; i < ruleInfo.users.length; i++) {
        let currentItem = ruleInfo.users[i],
          tempNameStr = ''
        for (let j = 0; j < currentItem.user.length; j++) {
          let tempName = currentItem.user[j]
          tempNameStr += tempName.userName + ',' // eslint-disable-line
        }
        tempNameStr = tempNameStr.substr(0, tempNameStr.length - 1)
        this[`flowStep${i}`].setValue(tempNameStr)
        this.selectedUsers.push(currentItem.user)
        this.setState({
          [`selectedUsersForStep${i + 1}`]: fromJS(currentItem.user)
        })
      }
    }
  }
  componentWillReceiveProps() {}
  /* 保存按钮事件 */
  saveRule = () => {
    let { params, actFlowInfo } = this.state
    if (params.minAmount && params.maxAmount && params.minAmount > params.maxAmount) {
      this.formatAlertInfo('支付下限不能超过支付上限', 'bg_icon qb-icon-fail')
      return false
    }
    for (let i = 0; i < actFlowInfo.length; i++) {
      let currentItem = actFlowInfo[i]
      if (!this.state[`selectedUsersForStep${i + 1}`].size > 0) {
        this.formatAlertInfo(`${currentItem.groupName}不能为空`, 'bg_icon qb-icon-fail')
        return false
      }
    }
    this.setState({
      isTestRule: true
    }, () => {
      !this.ruleName.getErrStatus()
        && !this.accountName.getErrStatus()
        && !this.flowType.getErrStatus()
        && !this.maxAmount.getErrStatus()
        && !this.minAmount.getErrStatus() ?
        this.checkOutData() : null
    })
  }
  /* 保存之前的校验 */
  checkOutData = async () => {
    let paramsUsers = []
    this.state.actFlowInfo.forEach((item, index) => {
      let currentItem = {}
      currentItem.groupCode = item.groupCode
      currentItem.groupName = item.groupName
      currentItem.groupType = item.groupType
      currentItem.user = this.state[`selectedUsersForStep${index + 1}`]
      paramsUsers.push(currentItem)
    })
    this.state.params.users = paramsUsers
    this.setState({ params: { ...this.state.params } })
    await this.props.createRule(this.state.params)
    if (this.props.createResult.respCode === '000000') {
      this.formatAlertInfo('保存成功', 'bg_icon qb-icon-success')
    }
  }
  /* format alert Info */
  formatAlertInfo = (text, type) => {
    this.setState({
      showAlert: true,
      alertContent: text,
      alertType: type
    })
  }
  /* 关闭弹出框事件 */
  alertClose = (type) => {
    if (type === 'bg_icon qb-icon-success') {
      this.props.history.push('/systemManage/ruleManage')
    }
    this.setState({ showAlert: false })
  }
  //返回到业务规则列表页面
  goList = () => {
    this.props.history.push('/systemManage/ruleManage')
  }
  /* 增加经办人 */
  addHandleUser = (index) => {
    this.setState({
      showHandleUserDialog: true,
      flowListIndex: index + 1
    }, () => {
      for (let i = 0; i < this.addUserFlagArray.length; i++) {
        let currentItem = this.addUserFlagArray[i]
        if (index === currentItem) {
          return false
        }
      }
      this.addUserFlagArray.push(index)
      this.props.getUserList({ bizType: '201000', refCompanyAcctId: this.state.params.refCompanyAccId }).then((res) => {
        if (res.data.respCode === '000000') {
          if (this.props.params.id) {
            for (let i = 0; i < this.props.userList.length; i++) {
              let currentItem = this.props.userList[i]
              for (let j = 0; j < this.selectedUsers[index].length; j++) {
                let tempNode = this.selectedUsers[index][j]
                if (tempNode.userCode === currentItem.userCode) {
                  currentItem.selected = true
                  currentItem.oldIndex = i
                  tempNode.oldIndex = i
                }
              }
            }
            this.setState({ [`allUsersForStep${index + 1}`]: fromJS(this.props.userList), [`selectedUsersForStep${index + 1}`]: fromJS(this.selectedUsers[index]) })
          } else {
            this.setState({ [`allUsersForStep${index + 1}`]: fromJS(this.props.userList), [`selectedUsersForStep${index + 1}`]: fromJS([]) })
          }
        }
      })
    })
  }
  /* 保存经办人 */
  savehandleUser = () => {
    this.setState({
      showHandleUserDialog: false,
    }, () => {
      let tempNameStr = ''
      this.state[`selectedUsersForStep${this.state.flowListIndex}`].forEach((item) => {
        tempNameStr += item.get('userName') + ',' // eslint-disable-line
      })
      tempNameStr = tempNameStr.substr(0, tempNameStr.length - 1)
      this[`flowStep${this.state.flowListIndex - 1}`].setValue(tempNameStr)
    })
  }
  render() {
    const { getFlowGroupInfo, accountList = [] } = this.props
    return (
      <div className="qb-form-group-b10-g">
        <div className="qb-panel-g qb-media-height">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li><Link to={{ pathname: '/systemManage/ruleManage' }}>业务规则管理</Link></li>
              <li className="active">创建规则</li>
            </ol>
          </div>
          {
            /**
            * 业务信息
            */
          }
          <div>
            <div className="qb-time-line-g rob-form-group">
              <div className="qb-form-group-g">
                <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                  <QBInput
                    name=""
                    type=""
                    label="规则名称"
                    placeholder="请输入规则名称"
                    errDirection="bottom"
                    inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
                    required
                    pattern={/^[a-zA-Z0-9\u4e00-\u9fa5]{1,60}$/}
                    errorMsg="请输入1-60位字母、汉字、数字"
                    isTestRule={this.state.isTestRule}
                    handleChange={(val) => {
                      this.setState({ params: { ...this.state.params, ruleName: val } })
                    }}
                    ref={ref => this.ruleName = ref}
                  />
                </div>
                <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                  <QBSelect
                    name="accountName"
                    type="default"
                    isTestRule={this.state.isTestRule}
                    label="账户名称"
                    placeholder="请选择账户名称"
                    errDirection="bottom"
                    inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
                    required
                    options={accountList}
                    handleSelect={item => {
                      this.addUserFlagArray = []
                      this.setState({ params: { ...this.state.params, companyAccountName: item.accountName, refCompanyAccId: item.value } })
                    }}
                    ref={ref => this.accountName = ref}
                  />
                </div>
                <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                  <QBSelect
                    name="purpose"
                    type="default"
                    isTestRule={this.state.isTestRule}
                    label="审核流程"
                    placeholder="请选择审核流程"
                    errDirection="bottom"
                    inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
                    required
                    options={this.props.accFlowList}
                    handleSelect={item => {
                      this.setState({ params: { ...this.state.params, refProcName: item.text, refProcKey: item.value } })
                      getFlowGroupInfo({ refProcKey: item.value }).then((res) => {
                        if (res.data.respCode === '000000') {
                          let tempArray = []
                          this.addUserFlagArray.forEach((flag) => {
                            if (flag < this.props.flowGroupInfo.procGroups.length) {
                              tempArray.push(flag)
                            }
                          })
                          this.addUserFlagArray = tempArray
                          this.setState({ actFlowInfo: this.props.flowGroupInfo.procGroups },
                            () => {
                              this.changeInit()
                            }
                          )
                        }
                      })
                    }}
                    ref={ref => this.flowType = ref}
                  />
                </div>
                {
                  /**
                    * 流程信息开始
                    */
                }
                {
                  this.state.actFlowInfo.map((node, index) => (
                    <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12" key={`flow${index}`}>
                      <QBInput
                        name={`flowStep${index}`}
                        type={`flowStep${index}`}
                        label={node.groupName}
                        containErrorIcon
                        inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
                        handleOnFocus={() => this.addHandleUser(index)}
                        handleChange={(val) => {
                          console.log(val)
                        }}
                        ref={ref => this[`flowStep${index}`] = ref}
                      />
                      <span
                        className="qb-form-group-buttonbox"
                        style={{ right: '-80px' }}
                        onClick={() => this.addHandleUser(index)}
                      >
                        <button className="rob-btn rob-btn-danger rob-btn-circle" style={{ opacity: '1' }} type="button">从用户中选择</button>
                      </span>
                    </div>
                  ))
                }
                {
                  /**
                    * 流程信息结束
                    */
                }
                <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                  <QBInput
                    name="mixAmount"
                    type="mixAmount"
                    label="单笔支付上限（元）"
                    placeholder="请输入单笔支付上限（选填）"
                    errDirection="bottom"
                    inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
                    pattern={/^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}[1-9]{1}$|^0\.{1}[1-9]{1}\d{1}$|^0\.{1}\d{1}[1-9]{1}$/}
                    errorMsg="整数部分最多为10位，小数部分为2位。"
                    isTestRule={this.state.isTestRule}
                    handleChange={(val) => {
                      this.setState({ params: { ...this.state.params, maxAmount: Math.round(val * 100) } })
                    }}
                    ref={ref => this.maxAmount = ref}
                  />
                </div>
                <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                  <QBInput
                    name="minAmount"
                    type="minAmount"
                    label="单笔支付下限（元）"
                    placeholder="请输入单笔支付下限（选填）"
                    errDirection="bottom"
                    inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
                    pattern={/^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}[1-9]{1}$|^0\.{1}[1-9]{1}\d{1}$|^0\.{1}\d{1}[1-9]{1}$/}
                    errorMsg="整数部分最多为10位，小数部分为2位。"
                    isTestRule={this.state.isTestRule}
                    handleChange={(val) => {
                      this.setState({ params: { ...this.state.params, minAmount: Math.round(val * 100) } })
                    }}
                    ref={ref => this.minAmount = ref}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="qb-form-footButton-g clearfix " style={{ marginBottom: '-10px' }}>
            <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <button className="rob-btn rob-btn-minor rob-btn-circle" type="button" onClick={this.goList}>
                取消
              </button>
              <button
                className="rob-btn rob-btn-danger rob-btn-circle"
                type="button"
                onClick={() => {
                  this.saveRule()
                }}
              >
                保存
              </button>
            </div>
          </div>
          <div className="qb-form-footButton-g qb-bg-white-g clearfix " style={{ marginBottom: '-10px' }}>
            <div className=" rob-col-lg-offset-9 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12 text-left">
              <p><strong>温馨提示：</strong></p>
              <p>1、经办与复核不能为同一个人；</p>
              <p>2、可设置最多三级审批，同一个人不能同时担任多级审批；</p>
              <p>3、可设置交叉复核规则，例如A经办B复核，也可B经办A复核。</p>
            </div>
          </div>
        </div>
        <Dialog
          showCover
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={() => this.alertClose(this.state.alertType)}
          actions={[{
            label: '确定',
            className: 'rob-btn rob-btn rob-btn-danger rob-btn-circle',
            state: true
          }]}
          actionClassName="rob-alert-button-color"
        />
        {
          /**
           * 增加经办人操作
           */
        }
        {
          this.state.showHandleUserDialog ? this.showHandleUserDialog() : null
        }
      </div>
    )
  }
  showHandleUserDialog = () => (
    <div>
      <div className="rob-alert-cover" data-dismiss="rob-alert" />
      <div className="qb-alert-g">
        <div id="alert2" className="rob-alert content rob-alert-dismissible " style={{ marginTop: this.state.alertheight }} ref={dom => this.alerthight = dom}>
          <div className="rob-alert-title">增加经办人员</div>
          <div className="qb-time-line-g rob-row" style={{ marginTop: '40px' }}>
            <div className="">
              <div className="rob-form-group rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
                  <label className="rob-input-label">增加用户：
                    </label>
                </div>
                <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24">
                  <div className="qb-select-menu-g text-left">
                    <div className="rob-row">
                      <div className="rob-col-md-12 rol-col-sm-12 rob-col-xs-24 qb-rg-bdsilid-g">
                        <div className="qb-select-box-g">
                          <p>可选用户列表：</p>
                          {
                            this.state[`allUsersForStep${this.state.flowListIndex}`] && this.state[`allUsersForStep${this.state.flowListIndex}`].map((item, index1) => (
                              <label key={`step${index1}`}>
                                {item.get('userName')}
                                <i
                                  className={`qb-select-menu-g--selectIcon qb-icon-add ${item.get('selected') ? 'qb-select-menu-g--selectIcon__hover' : ''}`}
                                  onClick={() => {
                                    item.get('selected') ? null : (
                                      this.setState({
                                        [`allUsersForStep${this.state.flowListIndex}`]: this.state[`allUsersForStep${this.state.flowListIndex}`].setIn([`${index1}`, 'selected'], true).setIn([`${index1}`, 'oldIndex'], index1),
                                        [`selectedUsersForStep${this.state.flowListIndex}`]: this.state[`selectedUsersForStep${this.state.flowListIndex}`].push(item.set('oldIndex', `${index1}`))
                                      })
                                    )
                                  }}
                                />
                              </label>
                            ))
                          }
                        </div>
                      </div>
                      <div className="rob-col-md-12 rol-col-sm-12 rob-col-xs-24">
                        <p className="">已选用户列表：</p>
                        {
                          this.state[`selectedUsersForStep${this.state.flowListIndex}`] && this.state[`selectedUsersForStep${this.state.flowListIndex}`].map((item, index1) => (
                            <label key={`selectedStep${index1}`}>
                              {item.get('userName')}
                              <i
                                className="qb-select-menu-g--selectIcon qb-icon-delete1"
                                onClick={() => {
                                  this.setState({
                                    [`selectedUsersForStep${this.state.flowListIndex}`]: this.state[`selectedUsersForStep${this.state.flowListIndex}`].delete(index1),
                                    [`allUsersForStep${this.state.flowListIndex}`]: this.state[`allUsersForStep${this.state.flowListIndex}`].setIn([`${item.get('oldIndex')}`, 'selected'], false)
                                  })
                                }}
                              />
                            </label>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <div className="rob-col-lg-5 rob-col-md-5 rob-col-sm-5 rob-col-xs-24 qb-pd0-g">
                    <div className="qb-red-g rob-input-label text-left " />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="qb-form-footButton-g clearfix ">
            <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <button
                className="rob-btn rob-btn-minor rob-btn-circle "
                type="button"
                onClick={() => {
                  this.setState({
                    showHandleUserDialog: false
                  })
                }}
              >取消</button>
              <button
                className="rob-btn rob-btn-danger rob-btn-circle"
                onClick={this.savehandleUser}
              >保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CreateRule.propTypes = {
  history: PropTypes.object,
  params: PropTypes.object,
  accountList: PropTypes.array,
  accFlowList: PropTypes.array,
  flowGroupInfo: PropTypes.object,
  userList: PropTypes.array,
  createResult: PropTypes.object,
  getAccountList: PropTypes.func,
  getAccFlowList: PropTypes.func,
  getFlowGroupInfo: PropTypes.func,
  getUserList: PropTypes.func,
  createRule: PropTypes.func,
  ruleInfo: PropTypes.object,
  getRuleInfo: PropTypes.func
}
CreateRule.defaultProps = {
  history: {},
  params: {},
  accountList: [],
  accFlowList: [],
  flowGroupInfo: {},
  userList: [],
  createResult: {},
  getAccountList: () => { },
  getAccFlowList: () => { },
  getFlowGroupInfo: () => { },
  getUserList: () => { },
  createRule: () => { },
  ruleInfo: {},
  getRuleInfo: () => {}
}
export default connect(state => ({
  accountList: state.SMCR_createRuleInfo && state.SMCR_createRuleInfo.accountList,
  accFlowList: state.SMCR_createRuleInfo && state.SMCR_createRuleInfo.accFlowList,
  flowGroupInfo: state.SMCR_createRuleInfo && state.SMCR_createRuleInfo.flowGroupInfo,
  userList: state.SMCR_createRuleInfo && state.SMCR_createRuleInfo.userList,
  createResult: state.SMCR_createRuleInfo && state.SMCR_createRuleInfo.createResult,
  ruleInfo: state.SMCR_createRuleInfo && state.SMCR_createRuleInfo.ruleInfo
}), dispatch => ({
  getAccountList: bindActionCreators(actions.SMCR_getAccountList, dispatch),
  getAccFlowList: bindActionCreators(actions.SMCR_getAccFlowList, dispatch),
  getFlowGroupInfo: bindActionCreators(actions.SMCR_getFlowGroupInfo, dispatch),
  getUserList: bindActionCreators(actions.SMCR_getUserList, dispatch),
  createRule: bindActionCreators(actions.SMCR_createRule, dispatch),
  getRuleInfo: bindActionCreators(actions.SMCR_getRuleInfo, dispatch)
}))(CreateRule)

