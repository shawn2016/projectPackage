import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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
import Pagination from 'react-robotUI/Pagination'
import Tab from 'react-robotUI/Tab'
import cookieStorage from 'utils/cookieStorage'
import { UserManageDetailsStatus, isCfcaUser, refUserRoleCode, formatDay } from 'utils/filterCommon'
import * as action from '../redux/actions'
import '../redux/reducer'
class UserList extends PureComponent {
  constructor(props) {
    super(props)
    this.resetPasswordMsg = ''
    this.state = {
      userListData: [],
      checkType: 400,
      isReason: false,
      approveStatus: false,
      showCloseBtn: false,
      reason: '',
      params: {
        checkType: 400,
      },
      approveStatusDesc: '',
      PaginationConf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        dataCount: 0,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false,
        onChange: (currentPage) => {
          this.setState({
            PaginationConf: { ...this.state.PaginationConf, currentPage }
          })
          setTimeout(() => {
            if (this.state.params.accountNo) {
              this.setState({
                params: { ...this.state.params, accountNo: this.state.params.accountNo }
              })
            }
            if (this.state.params.loan && this.state.params.loan.startValue && this.state.params.loan.endValue) {
              this.setState({
                params: { ...this.state.params, amountFrom: Math.round(this.state.params.loan.startValue * 100), amountTo: Math.round(this.state.params.loan.endValue * 100) }
              })
            }
            if (this.state.params.createTimeFrom) {
              this.setState({
                params: { ...this.state.params, createTimeFrom: this.state.params.createTimeFrom }
              })
            }
            if (this.state.params.createTimeTo) {
              this.setState({
                params: { ...this.state.params, createTimeTo: this.state.params.createTimeTo }
              })
            }
            let params = this.state.params
            params.page = currentPage
            params.rows = this.state.PaginationConf.pageSize
            this.props.changeParams(params)
            this.props.getData(params)
          }, 0)
          // this.setState({ PaginationConf: { ...this.state.PaginationConf, currentPage } })
          // let params = { ...this.state.params, page: currentPage, rows: this.state.PaginationConf.pageSize, }
          // this.props.getData(params)
        }
      },
      dataCount: 0,
      d11: false,
      d12: false,
      d6: false,
      data: []
    }
  }
  componentWillReceiveProps(nextProp) {
    let values = []
    const { userListData = {} } = nextProp
    if (userListData && userListData.body && userListData.body.values) {
      values = userListData.body.values
      this.setState({
        items: values,
        PaginationConf: { ...this.state.PaginationConf, dataCount: userListData.body.pagenation.itemCount, pageSize: userListData.body.pagenation.pageSize, currentPage: 1 }
      })
    }
    // this.setState({
    //   userListData: values,
    //   params: { ...this.state.params, ...nextProp.paramProps }
    // })
    this.setState({
      userListData: values,
      params: nextProp.paramProps
    })
    if (nextProp.isReserCurrentPage === 1) {
      this.pagination.setCurrentPage(1)
      this.props.reserCurrentPage()
    }
  }
  static propTypes = {
    userListData: PropTypes.array,
    history: PropTypes.object
  }
  static defaultProps = {
    userListData: [],
    history: {}
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  addUser = (userid) => {
    this.props.history.push({
      pathname: '/systemManage/addUser',
      state: { id: userid, checkType: this.state.checkType }
    })
  }
  /* 列表操作 */
  userInfo = (userid) => {
    this.props.history.push({
      pathname: '/systemManage/UserManageDetails',
      state: { id: userid, checkType: this.state.checkType }
    })
  }
  userRole = (userid) => {
    this.props.history.push({
      pathname: '/systemManage/userRoleInfo',
      state: { id: userid }
    })
    // this.context.router.history.push('/systemManage/userRoleInfo')
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
  lockUser = (t, type) => {
    if (type !== 600) {
      let lockUser = 'lockUser'
      this.handleOpen('lockUser', { id: t, type: lockUser })
    } else {
      let lockUser = 'unLockUser'
      this.handleOpen('unLockUser', { id: t, type: lockUser })
    }
  }
  checked = (type) => {
    this.setState({
      approveStatus: type
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

  resetPassword = (t, username) => {
    this.props.resetPwdList({ id: t }).then((res) => {
      if (res.data.respCode === '000000') {
        this.resetPasswordMsg = `新登录密码已经成功发送到${username}用户的手机上，请提醒用户查收！`
        this.handleOpen('resetPassword', { showCloseBtn: true })
      } else if (res.data.respCode === '900012') {
        this.resetPasswordMsg = res.data.respMsg
        this.handleOpen('resetPassword', { showCloseBtn: true })
      }
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
    resetPasswordSend: (obj) => {
      this.setState({ d11: true })
      this.content = (
        <div className="rob-alert-content ">
          <span>确定要重置密码吗？</span>
        </div>
      )
      this.actions = ([{
        label: '取消',
        className: 'rob-btn rob-btn-minor rob-btn-circle',
        state: false
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: obj
      }])
    },
    lockUser: (obj) => {
      this.setState({ d11: true })
      this.content = (
        <div className="rob-alert-content ">
          <span>确定要锁定该用户吗？</span>
        </div>
      )
      this.actions = ([{
        label: '取消',
        className: 'rob-btn rob-btn-minor rob-btn-circle',
        state: false
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: obj
      }])
    },
    unLockUser: (obj) => {
      this.setState({ d11: true })
      this.content = (
        <div className="rob-alert-content ">
          <span>确定要解锁该用户吗？</span>
        </div>
      )
      this.actions = ([{
        label: '取消',
        className: 'rob-btn rob-btn-minor rob-btn-circle',
        state: false
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: obj
      }])
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
      this.props.delUserList({ id: state.id, checkType: this.state.checkType }).then((res) => {
        if (res.data.respCode === '000000') {
          this.resetPasswordMsg = '删除成功'
          this.handleOpen('resetPassword', { showCloseBtn: true })
        }
      })
    } else if (state === 'refresh') {
      this.state.params.checkType = this.state.checkType
      this.props.changeStatus(this.state.checkType)
      this.props.getList(this.state.params)
    } else if (state && state.type === 'lockUser') {
      this.props.lockUserList({ id: state.id }).then((res) => {
        if (res.data.respCode === '000000') {
          this.resetPasswordMsg = '锁定成功'
          this.handleOpen('resetPassword', { showCloseBtn: true })
        }
      })
    } else if (state && state.type === 'unLockUser') {
      this.props.unLockUserList({ id: state.id }).then((res) => {
        if (res.data.respCode === '000000') {
          this.resetPasswordMsg = '解锁成功'
          this.handleOpen('resetPassword', { showCloseBtn: true })
        }
      })
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
        this.props.approveInfoList({ id: state.id, approveStatus: this.state.approveStatus, reason: this.state.reason }).then((res) => {
          if (res.data.respCode === '000000') {
            this.resetPasswordMsg = '复核成功'
            this.handleOpen('resetPassword', { showCloseBtn: true })
          }
        })
      }, 0)
    } else if (state && state.type === 'resetPasswordSend') {
      this.resetPassword(state.id, state.userName)
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
          checkType: 400,
          params: { ...this.state.params, checkType: 400 }
        }, () => {
          this.props.getList(this.state.params)
        })
        this.props.changeStatus(400)
        break
      case 2:
        this.setState({
          checkType: 200,
          params: { ...this.state.params, checkType: 200 }
        }, () => {
          this.props.getList(this.state.params)
        })
        this.props.changeStatus(200)
        break
      case 3:
        this.setState({
          checkType: 300,
          params: { ...this.state.params, checkType: 300 }
        }, () => {
          this.props.getList(this.state.params)
        })
        this.props.changeStatus(300)
        break
      default:
        this.setState({
          checkType: 400,
          params: { ...this.state.params, checkType: 400 }
        }, () => {
          this.props.getList(this.state.params)
        })
        this.props.changeStatus(400)
    }
  }
  render() {
    const { userListData, checkType } = this.state
    let userInfo = {}
    if (JSON.stringify(cookieStorage.getCookie('userInfo')) && cookieStorage.getCookie('userInfo').token) {
      userInfo = cookieStorage.getCookie('userInfo')
    }
    return (
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
                <label className="rob-input-label">新增用户</label>
              </div>
              <div className="rob-col-lg-8 rob-col-md-16 rob-col-sm-24 rob-col-xs-24 text-right">
                <label className="rob-input-label">审核意见：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-24 rob-col-xs-24 text-left" style={{ lineHeight: '40px', zIndex: '999' }}>
                <input onClick={() => { this.checked('1') }} className="rob-radio-with-gap" name="group2" type="radio" id="test4" />
                <label htmlFor="test4">同意</label>
                <input onClick={() => { this.checked('2') }} className="rob-radio-with-gap" name="group2" type="radio" id="test5" />
                <label htmlFor="test5">拒绝</label>
                {this.state.approveStatusDesc ? <div style={{ color: '#cc1612' }}><i className="qb-icon-report1" />{this.state.approveStatusDesc}</div> : null}
              </div>
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
                errDirection="bottom"
                handleChange={value => this.updateSearchInfo({
                  reason: value
                })}
                ref={ref => this.reason = ref}
              />
            </div>
          </div>}
          actions={this.actions}
          actionClassName="rob-alert-button-color"
        />
        <div style={{ display: userInfo.companyType === '100' ? 'block' : 'none' }}>
          <Tab name="rob-nav rob-nav-tabs2" icon="qb-icon-home">
            <div title="复核通过" data-func={() => { this.switchState(1) }} />
            <div title="待复核" data-func={() => { this.switchState(2) }} />
            <div title="复核拒绝" data-func={() => { this.switchState(3) }} />
          </Tab>
        </div>
        <button style={{ display: userInfo.companyType === '100' ? 'block' : 'none' }} className="rob-btn rob-btn-minor rob-btn-circle tab-button " onClick={this.addUser.bind(this, null)} type="button">新增用户</button>
        <Table striped hoverEffect >
          <TableHeader>
            <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
            <TableHeaderColumn> 创建日期</TableHeaderColumn>
            <TableHeaderColumn> 用户名</TableHeaderColumn>
            <TableHeaderColumn> 用户姓名</TableHeaderColumn>
            <TableHeaderColumn> 手机号码</TableHeaderColumn>
            <TableHeaderColumn> 身份证号码</TableHeaderColumn>
            <TableHeaderColumn> 数字证书用户</TableHeaderColumn>
            <TableHeaderColumn> 职务</TableHeaderColumn>
            <TableHeaderColumn> 用户类型</TableHeaderColumn>
            <TableHeaderColumn> 用户状态</TableHeaderColumn>
            <TableHeaderColumn> 操作</TableHeaderColumn>
          </TableHeader>
          <TableBody>
            {userListData ? userListData.map((user, k) => (
              <TableRow key={k}>
                <TableRowColumn className="text-center">{(this.state.PaginationConf.pageSize * (this.state.PaginationConf.currentPage - 1)) + k + 1}</TableRowColumn>
                <TableRowColumn> {formatDay(user.createTime)}</TableRowColumn>
                <TableRowColumn title={user.userCode}> {user.userCode}</TableRowColumn>
                <TableRowColumn title={user.userName}> {user.userName}</TableRowColumn>
                <TableRowColumn> {user.phonenum}</TableRowColumn>
                <TableRowColumn> {user.identifyNo}</TableRowColumn>
                <TableRowColumn> {isCfcaUser(user.isCfcaUser)}</TableRowColumn>
                <TableRowColumn> {user.userDuty}</TableRowColumn>
                <TableRowColumn> {refUserRoleCode(user.refUserRoleCode)}</TableRowColumn>
                <TableRowColumn> {UserManageDetailsStatus(user.status)}</TableRowColumn>
                <TableRowColumn>
                  <a className="qb-table-g__handle" onClick={this.userInfo.bind(this, user.id)} >详情</a>
                  {user.refUserRoleCode !== 'ADMIN' && checkType !== 200 && checkType !== 300 ? <a className="qb-table-g__handle" onClick={this.addUser.bind(this, user.id)} >修改</a> : null}
                  {user.refUserRoleCode !== 'ADMIN' && (checkType === 400 || checkType === 300) ? <a className="qb-table-g__handle" onClick={this.delUser.bind(this, user.id)} >删除</a> : null}
                  {(user.status === 100 || user.status === 600) && user.refUserRoleCode !== 'ADMIN' && checkType === 400 ? <a className="qb-table-g__handle" onClick={this.lockUser.bind(this, user.id, user.status)} >{user.status !== 600 ? '锁定' : '解锁'}</a>
                    : null}
                  {user.refUserRoleCode !== 'ADMIN' && checkType === 200 && user.showOrNot === '1' ? <a className="qb-table-g__handle" onClick={this.approveInfo.bind(this, user.id)} >复核</a> : null}
                  {user.refUserRoleCode !== 'ADMIN' && checkType === 400 && user.status !== 500 ? <a className="qb-table-g__handle" onClick={this.resetPasswordSend.bind(this, user.id, user.userName)} >重置密码</a> : null}
                  {checkType === 400 ? <a className="qb-table-g__handle" onClick={this.userRole.bind(this, user.id)}>查看权限</a> : null}
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
    )
  }
}
UserList.propTypes = {
  data: PropTypes.object,
  getList: PropTypes.func,
  delUserList: PropTypes.func,
  resetPwdList: PropTypes.func,
  lockUserList: PropTypes.func,
  unLockUserList: PropTypes.func,
  approveInfoList: PropTypes.func,
  changeStatus: PropTypes.func,
  getData: PropTypes.func,
  paramProps: PropTypes.object,
  reserCurrentPage: PropTypes.func,
  isReserCurrentPage: PropTypes.number,
  changeParams: PropTypes.func
}
UserList.defaultProps = {
  data: {},
  getList: () => { },
  delUserList: () => { },
  resetPwdList: () => { },
  lockUserList: () => { },
  unLockUserList: () => { },
  approveInfoList: () => { },
  changeStatus: () => { },
  getData: () => { },
  paramProps: {},
  reserCurrentPage: () => { },
  isReserCurrentPage: 0,
  changeParams: () => { }
}
export default connect(state => ({
  data: state.SMUS_userListDataQuery,
  isReserCurrentPage: state.SMUS_userListDataQuery.SMUS_isReserCurrentPage
}), dispatch => ({
  getList: bindActionCreators(action.SMUS_getList, dispatch),
  delUserList: bindActionCreators(action.SMUS_delUser, dispatch),
  resetPwdList: bindActionCreators(action.SMUS_resetPwd, dispatch),
  lockUserList: bindActionCreators(action.SMUS_lockUser, dispatch),
  unLockUserList: bindActionCreators(action.SMUS_unLockUser, dispatch),
  approveInfoList: bindActionCreators(action.SMUS_approveInfo, dispatch),
  getData: bindActionCreators(action.SMUS_getList, dispatch),
  reserCurrentPage: bindActionCreators(action.SMUS_reserCurrentPage, dispatch)
}))(UserList)
