import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import cookieStorage from 'utils/cookieStorage'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'react-robotUI/Table'
import QBTextarea from 'components/QBTextarea'
import Dialog from 'react-robotUI/dialog'
import QBSelect from 'components/QBSelect'
import Pagination from 'react-robotUI/Pagination'
import { formatMoneyYuan, limitType, limitStatus, bizType } from 'utils/filterCommon'
import Tab from 'react-robotUI/Tab'
import * as action from '../redux/actions'
import '../redux/reducer'
class UserList extends PureComponent {
  constructor(props) {
    super(props)
    this.resetPasswordMsg = ''
    this.state = {
      userListData: [],
      accountData: {},
      status: 100,
      isReason: false,
      approveStatus: false,
      showCloseBtn: false,
      companyType: '100',
      reason: '',
      params: {
        status: 100,
      },
      approveStatusDesc: '',
      d11: false,
      d12: false,
      d6: false,
      data: []
    }
    this.statusOptions = [{
      text: '全部',
      value: 'default'
    },
    {
      text: '支付结算',
      value: 100
    },
    {
      text: '代发',
      value: 200
    }
    ]
  }
  componentWillMount() {
    let userInfo = cookieStorage.getCookie('userInfo')
    if (JSON.stringify('userInfo') !== '{}') {
      this.setState({
        companyType: userInfo.companyType
      })
    }
  }
  componentDidMount() {
    // 获取账户信息
    let accountList = []
    this.props.getAccountData().then((res) => {
      if (res.data.respCode === '000000') {
        let userInfoType
        if (res.data.body && res.data.body.accounts) {
          res.data.body.accounts.forEach(function (item) {
            let accountListItem = {}
            accountListItem = item
            userInfoType = item.umbrellaAccountNo
            accountListItem.text = `${userInfoType}`
            accountListItem.value = item.virtualAccountNo
            accountList.push(accountListItem)
          })
          this.setState({
            accountData: {
              accountList
            },
            params: {
              ...this.state.params,
              payAccountNo: accountList[0].virtualAccountNo
            }
          })
        }
      }
    }).then(() => {
      if (accountList) {
        this.props.getList({
          status: 100,
          payAccountNo: accountList[0].virtualAccountNo
        })
        this.setState({
          params: { ...this.state.params, payAccountNo: accountList[0].virtualAccountNo }
        })
      }
    })
  }
  componentWillReceiveProps(nextProp) {
    let values = []
    const { SMUS_userListData = {} } = nextProp.data
    if (SMUS_userListData && SMUS_userListData.body && SMUS_userListData.body.values) {
      values = SMUS_userListData.body.values
      this.setState({
        items: values
      })
    }
    this.setState({
      userListData: values
    })
  }
  static propTypes = {
    userListData: PropTypes.array,
    history: PropTypes.object,
    isTestRule: PropTypes.bool,
    getAccountData: PropTypes.func
  }
  static defaultProps = {
    userListData: [],
    isTestRule: false,
    history: {},
    getAccountData: () => { }
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  getSearchDate = () => {
    const {
      params
    } = this.state
    if (params.bizType === 'default') {
      delete (params.bizType)
    }
    this.props.getList(params)
  }
  /* 清空查询参数 */
  clearSearchParams = () => {
    this.payAccountNo.setValue(this.state.accountData.accountList[0] || '')
    this.bizType.setValue({
      text: '全部',
      value: 'default'
    })
    this.setState({
      params: {
        payAccountNo: this.state.accountData.accountList[0].virtualAccountNo,
        status: this.state.params.status,
        bizType: ''
      }
    })
  }
  // 返回
  goBack = () => {
    this.context.router.history.push('/systemManage/addlimit')
  }
  addUser = (userid) => {
    this.props.history.push({
      pathname: '/systemManage/addUser',
      state: { id: userid, status: this.state.params.status }
    })
  }
  delUser = (t) => {
    this.handleOpen('delUser', { id: t, type: 'delUser' })
  }
  approveInfo = (t) => {
    this.setState({
      approveStatusDesc: '',
      reason: '',
      approveStatus: ''
    })
    this.handleOpen('approveInfo', { id: t, type: 'approveInfo' })
  }
  checked = (type) => {
    console.log('22222222')
    this.setState({
      approveStatus: type,
      approveStatusDesc: ''
    })
  }
  resetPasswordSend = (t, username) => {
    this.handleOpen('resetPasswordSend', { id: t, userName: username, type: 'resetPasswordSend' })
  }
  updateSearchInfo = (obj) => {
    this.setState({
      reason: obj.reason
    })
  }
  /* 弹层 */
  dialogShow = {
    delUser: (obj) => {
      this.content = (
        <div className="rob-alert-content ">
          <span>删除后这条记录将不会再被找回!</span>
        </div>
      )
      this.actions = ([{
        label: '取消',
        className: 'rob-btn rob-btn-minor rob-btn rob-btn-circle'
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: obj
      }])
      this.setState({ d11: true })
    },
    approveInfo: (obj) => {
      this.actions = ([{
        label: '取消',
        className: 'rob-btn rob-btn-minor rob-btn-circle',
        state: false
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: obj
      }])
      this.setState({ d12: true })
    },
    resetPassword: (obj) => {
      this.actions = ([{
        label: '确定',
        className: 'rob-btn  rob-btn-danger rob-btn-circle',
        state: 'refresh'
      }])
      if (obj && obj.showCloseBtn) {
        this.setState({
          showCloseBtn: true
        })
      } else {
        this.setState({
          showCloseBtn: false
        })
      }
      this.setState({
        d6: true,
      })
    }
  }
  handleOpen = (type, obj) => {
    this.dialogShow[type](obj)
  }
  // close Dialog
  handleClose = (state, type) => {
    if (!state) {
      this.setState({ [type]: false })
    }
    if (state && state.type === 'delUser') {
      this.props.delUserList({ id: state.id }).then((res) => {
        if (res.data.respCode === '000000') {
          this.resetPasswordMsg = '删除成功'
          this.handleOpen('resetPassword', { showCloseBtn: true })
        }
      })
    } else if (state === 'refresh') {
      this.props.getList(this.state.params)
    } else if (state && state.type === 'approveInfo') {
      setTimeout(() => {
        this.setState({
          isReason: true,
        })
        if (!this.state.approveStatus) {
          this.setState({
            approveStatusDesc: '请选择审核意见'
          })
          return
        }
        if ((this.state.approveStatus === '2' && !this.state.reason)) {
          return
        }
        if (this.state.reason.length > 140) {
          return
        }
        this.props.approveInfoList({ id: state.id, isConsent: this.state.approveStatus === '1' ? 100 : 300, procOperName: '额度设置', procOperRemark: this.state.reason }).then((res) => {
          if (res.data.respCode === '000000') {
            this.resetPasswordMsg = '复核成功'
            this.handleOpen('resetPassword', { showCloseBtn: true })
          }
        })
      }, 0)
    }
    if (!this.state.approveStatus && state && state.type === 'approveInfo') {
      return false
    }
    if ((this.state.approveStatus === '2' && !this.state.reason && state && state.type === 'approveInfo') || (this.state.reason.length > 140 && state && state.type === 'approveInfo')) {
      return false
    }
    this.setState({ [type]: false })
  }
  /* 切換tab*/
  switchState = (p) => {
    let params = {}
    params.type = p
    switch (p) {
      case 1:
        this.setState({
          status: 100,
          params: { ...this.state.params, status: 100 }
        }, () => {
          this.props.getList(this.state.params)
        })
        break
      case 2:
        this.setState({
          status: 200,
          params: { ...this.state.params, status: 200 }
        }, () => {
          this.props.getList(this.state.params)
        })
        break
      case 3:
        this.setState({
          status: 300,
          params: { ...this.state.params, status: 300 }
        }, () => {
          this.props.getList(this.state.params)
        })
        break
      default:
        this.setState({
          status: 100,
          params: { ...this.state.params, status: 100 }
        }, () => {
          this.props.getList(this.state.params)
        })
    }
  }
  render() {
    const { userListData, status, accountData = {} } = this.state,
      {
      accountList = []
    } = accountData,
      defaultValue = accountList[0] || {
        value: '1',
        text: ''
      }
    return (
      <div>
        <div className="qb-panel-g clearfix">
          <div className="qb-column-header-g qb-border-bottom qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li className="active">额度设置管理</li>
            </ol>
            <button onClick={this.goBack} className="rob-btn rob-btn-minor rob-btn-circle " type="button">增加设置</button>
          </div>
          <div className="qb-search-g" >
            <div className="rob-row rob-no-gutters" >
              <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24" >
                <div className="rob-form-group" >
                  <QBSelect
                    name="isCfcaUser"
                    label="账号名称"
                    errDirection="bottom"
                    labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                    inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                    containErrorIcon
                    defaultValue={defaultValue.value}
                    isTestRule={this.props.isTestRule}
                    handleSelect={
                      (val) => {
                        this.setState({
                          params: {
                            ...this.state.params,
                            payAccountNo: val.value
                          }
                        })
                      }
                    }
                    options={this.state.accountData.accountList}
                    ref={ref => this.payAccountNo = ref}
                  />
                </div>
              </div>
              <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24" >
                <div className="rob-form-group" >
                  <QBSelect
                    name="bizType"
                    label="业务模式"
                    errDirection="bottom"
                    defaultValue="default"
                    labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                    inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                    containErrorIcon
                    isTestRule={
                      this.props.isTestRule
                    }
                    handleSelect={
                      (val) => {
                        this.setState({
                          params: {
                            ...this.state.params,
                            bizType: val.value
                          }
                        })
                      }
                    }
                    options={
                      this.statusOptions
                    }
                    ref={
                      ref => this.bizType = ref
                    }
                  /> </div>
              </div>
              <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 column text-left qb-query-min-g" >
                <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24 rob-col-xs-24" >
                  <button
                    className="rob-btn rob-btn-danger rob-btn-circle pd42 mr10"
                    onClick={
                      this.getSearchDate
                    }
                    type="button"
                  >
                    查询
                    </button>
                  <button
                    className="rob-btn rob-btn-minor rob-btn-circle pd42"
                    type="button"
                    onClick={
                      this.clearSearchParams
                    }
                  >
                    清除
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="qb-panel-g clearfix">
          <div className="qb-column-header-g qb-column-header-g--tabs qb-column-header-g--tab-button">
            <div id="myTabContent" className="tab-content ">
              <div className="qb-media-height">
                <Dialog
                  showCloseBtn
                  showCover
                  open={this.state.d11}
                  onRequestClose={(name) => this.handleClose(name, 'd11')}
                  titleClassName="rob-alert-title rob-alert-title-color"
                  content={this.content}
                  actions={this.actions}
                  actionClassName="rob-alert-button rob-alert-button-color"
                />
                <Dialog
                  showCloseBtn={!this.state.showCloseBtn}
                  showCover
                  open={this.state.d6}
                  onRequestClose={(name) => this.handleClose(name, 'd6')}
                  titleClassName="rob-alert-title rob-alert-title-color"
                  actionClassName="rob-alert-button rob-alert-button-color rob-alert-button-45"
                  content={this.resetPasswordMsg}
                  actions={this.actions}
                />
                <Dialog
                  showCloseBtn
                  showCover
                  open={this.state.d12}
                  onRequestClose={(name) => this.handleClose(name, 'd12')}
                  titleClassName="rob-alert-title rob-alert-title-color"
                  content={<div className="rob-alert-content">
                    <div className="rob-row">
                      <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-24 rob-col-xs-24  text-right">
                        <label className="rob-input-label">复核事件：</label>
                      </div>
                      <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-24 rob-col-xs-24 text-left">
                        <label className="rob-input-label">额度设置</label>
                      </div>
                      <div className="rob-col-lg-8 rob-col-md-16 rob-col-sm-24 rob-col-xs-24 text-right">
                        <label className="rob-input-label">审核意见：</label>
                      </div>
                      <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-24 rob-col-xs-24 text-left" style={{ lineHeight: '40px' }}>
                        <input onClick={() => { this.checked('1') }} className="rob-radio-with-gap" name="group2" type="radio" id="test4" />
                        <label htmlFor="test4">同意</label>
                        <input onClick={() => { this.checked('2') }} className="rob-radio-with-gap" name="group2" type="radio" id="test5" />
                        <label htmlFor="test5">拒绝</label>
                        {this.state.approveStatusDesc ? <div style={{ color: '#cc1612' }}><i className="qb-icon-report1" />{this.state.approveStatusDesc}</div> : null}
                      </div>
                      <div className="limit-group-form">
                        <QBTextarea
                          name="username"
                          type="text"
                          rows="6"
                          label="备注"
                          labelClass="rob-col-lg-8 rob-col-md-8 rob-col-sm-24 rob-col-xs-24 text-right"
                          inputClass="rob-col-lg-16 rob-col-md-16 rob-col-sm-24 rob-col-xs-24"
                          emptyMsg="审核意见为拒绝时，备注不能为空"
                          containErrorIcon
                          pattern={/^[\S\s]{1,140}$/}
                          errorMsg="请输入1-140个任意字符"
                          required={this.state.approveStatus === '2'}
                          isTestRule={this.state.isReason}
                          placeholder="请输入备注"
                          errDirection="bottom"
                          handleChange={value => this.updateSearchInfo({
                            reason: value
                          })}
                          ref={ref => this.reason = ref}
                        />
                      </div>
                    </div>
                  </div>}
                  actions={this.actions}
                  actionClassName="rob-alert-button-color"
                />
                {this.state.companyType === '100' ? (<Tab name="rob-nav rob-nav-tabs2" icon="qb-icon-home" >
                  <div title="复核通过" data-func={() => { this.switchState(1) }} />
                  <div title="待复核" data-func={() => { this.switchState(2) }} />
                  <div title="复核拒绝" data-func={() => { this.switchState(3) }} />
                </Tab>) : null
                }
                {/* <button className="rob-btn rob-btn-minor rob-btn-circle tab-button " onClick={this.addUser.bind(this, null)} type="button">新增用户</button> */}
                <Table striped hoverEffect >
                  <TableHeader>
                    <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
                    <TableHeaderColumn> 账号名称</TableHeaderColumn>
                    <TableHeaderColumn> 限额类型</TableHeaderColumn>
                    <TableHeaderColumn> 限额（元）</TableHeaderColumn>
                    <TableHeaderColumn> 说明</TableHeaderColumn>
                    <TableHeaderColumn> 业务模式</TableHeaderColumn>
                    <TableHeaderColumn> 摘要</TableHeaderColumn>
                    {this.state.companyType === '100' ? <TableHeaderColumn> 状态</TableHeaderColumn> : null}
                    <TableHeaderColumn> 操作</TableHeaderColumn>
                  </TableHeader>
                  <TableBody>
                    {userListData ? userListData.map((user, k) => (
                      <TableRow key={k}>
                        <TableRowColumn className="text-center">{k + 1}</TableRowColumn>
                        <TableRowColumn > {user.accountName} {user.accountNo}</TableRowColumn>
                        <TableRowColumn> {limitType(user.limitType)}</TableRowColumn>
                        <TableRowColumn> {formatMoneyYuan(user.limitAmount)}</TableRowColumn>
                        <TableRowColumn> {user.createDesc}</TableRowColumn>
                        <TableRowColumn> {bizType(user.bizType)}</TableRowColumn>
                        <TableRowColumn> {user.summary}</TableRowColumn>
                        {this.state.companyType === '100' ? <TableRowColumn> {limitStatus(user.status)}</TableRowColumn> : null}
                        <TableRowColumn>
                          {(status === 100 || status === 300) ? <a className="qb-table-g__handle" onClick={this.delUser.bind(this, user.id)} >删除</a> : null}
                          {status === 200 && user.operStatus === 1 ? <a className="qb-table-g__handle" onClick={this.approveInfo.bind(this, user.id)} >复核</a> : null}
                        </TableRowColumn>
                      </TableRow>
                    )) : null}
                  </TableBody>
                </Table>
                <div className="qb-list-g__pagination clearfix">
                  <div className="rob-row clearfix">
                    <div className="rob-col-lg-24 column">
                      <Pagination {...this.state.PaginationConf} ref={(DOM) => this.pagination = DOM} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
UserList.propTypes = {
  data: PropTypes.object,
  getList: PropTypes.func,
  delUserList: PropTypes.func,
  approveInfoList: PropTypes.func,
  changeStatus: PropTypes.func,
  paramProps: PropTypes.object,
  reserCurrentPage: PropTypes.func,
  isReserCurrentPage: PropTypes.number
}
UserList.defaultProps = {
  data: {},
  getList: () => { },
  delUserList: () => { },
  approveInfoList: () => { },
  changeStatus: () => { },
  paramProps: {},
  reserCurrentPage: () => { },
  isReserCurrentPage: 0
}
export default connect(state => ({
  data: state.SMUS_userListDataQuery,
  isReserCurrentPage: state.SMUS_userListDataQuery.SMUS_isReserCurrentPage
}), dispatch => ({
  getList: bindActionCreators(action.SMUS_getList, dispatch),
  delUserList: bindActionCreators(action.SMUS_delUser, dispatch),
  approveInfoList: bindActionCreators(action.SMUS_approveInfo, dispatch),
  // getData: bindActionCreators(action.SMUS_getList, dispatch),
  reserCurrentPage: bindActionCreators(action.SMUS_reserCurrentPage, dispatch),
  getAccountData: bindActionCreators(action.DESP_getAccountData, dispatch)
}))(UserList)
