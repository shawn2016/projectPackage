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
import Dialog from 'react-robotUI/dialog'
import Pagination from 'react-robotUI/Pagination'
import getRequest from 'utils/getRequest'
import { formatMoneyYuan, formatDay } from 'utils/filterCommon'
import * as action from '../redux/actions'
import '../redux/reducer'
class NotificationList extends PureComponent {
  constructor(props) {
    super(props)
    this.resetPasswordMsg = ''
    this.state = {
      paginationConf: {
        type: 'default',
        pageSize: 10,
        maxSize: 8,
        allowJump: true,
        currentPage: 1,
        showPreAndNext: false,
        onChange: (curIndex) => {
          // 改变请求参数的当前页
          this.setState({
            paginationConf: { ...this.state.paginationConf, currentPage: curIndex }
          })
          let realParams = Object.assign({}, { noticeType: this.props.tabTypeId }, { page: curIndex, rows: this.state.paginationConf.pageSize })
          this.props.getList(realParams)
        }
      },
      dataCount: 0,
      data: [],
      isAutoClose: false,
      delId: ''
    }
  }
  componentDidMount() {
    // this.props.getData()
    // this.props.getList({ noticeType: '2' }) // 2表示经办预警
  }
  componentWillReceiveProps() {
    // let { data = {} } = nextProps,
    //   { SENG_queryList = {} } = data
    // SENG_queryList === null ? SENG_queryList = {} : { SENG_queryList = {} } = data
    // let { values = {}, pagenation = {} } = SENG_queryList
    // if (!values) {
    //   values = {}
    // }
    // this.setState({
    //   dataCount: pagenation.itemCount
    // })
  }

  bizTypeFilter(v) {
    let str = String(v)
    switch (str) {
      case '201000':
        return '单笔转账'
      case '201500':
        return '批量经办'
      case '251000':
        return '代发'
      default:
        return str
    }
  }
  timeIntervalFilter(v) {
    let str = String(v)
    switch (str) {
      case '100':
        return '每日'
      case '200':
        return '每月'
      default:
        return str
    }
  }
  /* 列表操作 */
  notificationSettingDetail = (notification) => { //详情
    this.props.history.push({
      pathname: '/systemManage/notificationSettingDetail',
      state: { id: notification, noticeType: this.props.tabTypeId }
    })
  }
  editNotification = (notification, type, noticeType) => { // 修改
    this.props.history.push({
      pathname: '/systemManage/AddNotification',
      state: { ...notification, type, noticeType }
    })
  }
  userRole = () => {
    this.context.router.history.push('/systemManage/userRoleInfo')
  }
  delNotification = (t) => {  //  删除
    this.handleOpen('delNotification')
    this.setState({ delId: t })
  }
  lockUser = () => {
    this.handleOpen('lockUser')
  }
  resetPassword = () => {
    this.handleOpen('resetPassword')
    this.resetPasswordMsg = '新登录密码已经成功发送到qb20170615001用户的手机上，请提醒用户查收！'
  }
  /* 新增经办预警*/
  addNotification = (noticeType, type) => {
    this.props.history.push({
      pathname: '/systemManage/AddNotification',
      state: { noticeType, type }
    })
  }
  /* 弹层 */
  dialogShow = {
    delNotification: () => {
      this.isShowCloseBtn = true
      this.content = (
        <div className="rob-alert-content">
          确定删除该条通知？
        </div>
      )
      this.actions = ([{
        label: '取消',
        className: 'rob-btn rob-btn-minor rob-btn-circle',
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: 'confirmDel'
      }])
      this.setState({ d11: true })
    },
    reConfirmDel: () => {
      this.setState({ d11: false })
      this.isShowCloseBtn = false
      this.content = (
        <div className="rob-alert-content ">
          <span>删除成功！</span>
        </div>
      )
      this.actions = ([{
        label: '确定',
        className: 'rob-btn rob-btn-minor rob-btn-circle'
      }])
      this.setState({ d11: true })
    },
    operateNotice: () => {
      this.isShowCloseBtn = true
      this.content = (
        <div className="rob-alert-content ">
          <span>{`确定${this.props.noticeOfSimpleInfo.body.noticeFlag === 100 ? '关闭' : '开启'}该条通知？`}</span>
        </div>
      )
      this.actions = ([{
        label: '取消',
        className: 'rob-btn rob-btn-minor rob-btn-circle',
        state: 'cancelOperate'
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: 'confirmOperate',
      }])
      this.setState({ d11: true })
    },
    reConfirmOperate: () => {
      // this.setState({ d11: false })
      this.isShowCloseBtn = false
      this.actions = ([{
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle'
      }])
      this.setState({ d11: true })
    }
  }
  handleOpen = (type, param) => {
    this.dialogShow[type](param)
  }
  // close Dialog
  handleClose = (name, type) => {
    if (name === 'confirmOperate') { // 简单通知开启/关闭确认弹框
      // 发送 开启 | 关闭 请求
      this.setState({ [type]: false }, () => {
        let { noticeOfSimpleInfo } = this.props,
          params = {}
        params.noticeFlag = noticeOfSimpleInfo.body.noticeFlag === 100 ? 200 : 100
        getRequest({
          // 请求参数
          path: '/notice/simple/saveInfo',
          method: 'POST',
          param: params
        }).then((res) => {
          if (res.data.respCode === '000000') {
            this.content = (
              <div className="rob-alert-content">
                <i className="bg_icon qb-icon-active" />
                <div>{'保存成功'}</div>
              </div>
            )
            this.handleOpen('reConfirmOperate')
            this.props.getData().then((resp) => {
              let dataSon = resp.data.body
              dataSon.noticeFlag === 100 ? this.setState({ currStateAginst: '关闭' }) : this.setState({ currStateAginst: '开启' })
            })
          }
          // else { //操作失败
          //   this.content = (
          //     <div className="rob-alert-content">
          //       <i className="bg_icon qb-icon-failure" />
          //       <div>{`${this.props.data.SENG_notificationListData.noticeFlag === '1' ? '关闭' : '开启'}失败，请稍后重试！`}</div>
          //     </div>
          //   )
          //   this.handleOpen('reConfirmOperate')
          // }
        })
      })
    } else if (name === 'confirmDel') { // 删除经办预警
      // 发送删除请求 同时关闭弹出的确认弹出框
      this.setState({ [type]: false }, () => {
        let params = {}
        params.id = this.state.delId
        getRequest({
          // 请求参数
          path: '/notice/delInfo',
          method: 'POST',
          param: params
        }).then((res) => {
          if (res.data.respCode === '000000') {  // 删除成功
            this.handleOpen('reConfirmDel')
            let parameters = Object.assign({}, { noticeType: this.props.tabTypeId }, this.props.searchInfo)
            this.props.getList(parameters) // 再次获取经办预警列表
          }
        })
      })
    }
    this.setState({ [type]: false })
  }
  render() {
    let { noticeDataList = {}, noticeOfSimpleInfo = {} } = this.props
    console.log('2222222', this.props)
    return (
      <div>
        <Dialog
          showCloseBtn={this.isShowCloseBtn}
          showCover
          open={this.state.d11}
          onRequestClose={(name) => this.handleClose(name, 'd11')}
          titleClassName="rob-alert-title-color rob-alert-title"
          actionClassName="rob-alert-button-color"
          content={this.content}
          actions={this.actions}
        />
        <div className="qb-panel-g clearfix qb-media-height" style={{ marginTop: '20px', border: 'none' }}>
          {this.props.tabTypeId === '40' ? (<div>
            <div className="qb-list-g">
              <div className="qb-list-g__table">
                <div className="rob-row clearfix mlr0">
                  <div className="column">
                    <div className="qb-column-header-g qb-column-header-g--button">
                      <ol className="rob-breadcrumb rob-breadcrumb-pointed">
                        <li>经办预警</li>
                      </ol>
                      <button onClick={this.addNotification.bind(this, this.props.tabTypeId, 'addNew')} className="rob-btn rob-btn-minor rob-btn-circle " type="button">新增</button>
                    </div>
                    <div className="rob-table-responsive">
                      { noticeDataList.body && noticeDataList.body ? (
                        <Table striped hoverEffect pagination >
                          <TableHeader>
                            <TableHeaderColumn> 序号</TableHeaderColumn>
                            <TableHeaderColumn> 创建日期</TableHeaderColumn>
                            <TableHeaderColumn> 业务类型</TableHeaderColumn>
                            <TableHeaderColumn> 最小金额（元）</TableHeaderColumn>
                            <TableHeaderColumn> 创建人</TableHeaderColumn>
                            <TableHeaderColumn> 操作</TableHeaderColumn>
                          </TableHeader>
                          <TableBody>
                            {noticeDataList.body.map((item, i) => (
                              <TableRow key={i}>
                                <TableRowColumn> {i + 1}</TableRowColumn>
                                <TableRowColumn> {formatDay(item.createTime)}</TableRowColumn>
                                <TableRowColumn> {this.bizTypeFilter(item.bizType)}</TableRowColumn>
                                <TableRowColumn> {formatMoneyYuan(item.minAmt)}</TableRowColumn>
                                <TableRowColumn> {item.createName}</TableRowColumn>
                                <TableRowColumn>
                                  <a className="qb-table-g__handle" onClick={this.notificationSettingDetail.bind(this, item.id)} >详情</a>
                                  <a className="qb-table-g__handle" onClick={this.delNotification.bind(this, item.id)} >删除</a>
                                  <a className="qb-table-g__handle" onClick={this.editNotification.bind(this, item, 'edit', '40')} >修改</a>
                                </TableRowColumn>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : null }
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="qb-list-g__pagination clearfix">
                <div className="rob-row clearfix">
                  <div className="rob-col-lg-24 column">
                    <Pagination {...this.state.paginationConf} dataCount={this.state.dataCount} />
                  </div>
                </div>
              </div>
            </div>
          </div>) : null
          }
          {this.props.tabTypeId === '30' ? (<div>
            <div className="qb-list-g">
              <div className="qb-list-g__table">
                <div className="rob-row clearfix mlr0">
                  <div className="column">
                    <div className="qb-column-header-g qb-column-header-g--button">
                      <ol className="rob-breadcrumb rob-breadcrumb-pointed">
                        <li>余额异常</li>
                      </ol>
                      <button onClick={this.addNotification.bind(this, this.props.tabTypeId, 'addNew')} className="rob-btn rob-btn-minor rob-btn-circle " type="button">新增</button>
                    </div>
                    <div className="rob-table-responsive">
                      { noticeDataList.body ? (
                        <Table striped hoverEffect pagination >
                          <TableHeader>
                            <TableHeaderColumn> 序号</TableHeaderColumn>
                            <TableHeaderColumn> 创建日期</TableHeaderColumn>
                            <TableHeaderColumn> 需通知账号</TableHeaderColumn>
                            <TableHeaderColumn> 最小金额（元）</TableHeaderColumn>
                            <TableHeaderColumn> 最大金额（元）</TableHeaderColumn>
                            <TableHeaderColumn> 创建人</TableHeaderColumn>
                            <TableHeaderColumn> 操作</TableHeaderColumn>
                          </TableHeader>
                          <TableBody>
                            {noticeDataList.body.map((item, i) => (
                              <TableRow key={i}>
                                <TableRowColumn> {i + 1}</TableRowColumn>
                                <TableRowColumn> {formatDay(item.createTime)}</TableRowColumn>
                                <TableRowColumn> {`${item.companyAcctName}${'  '}${item.noticeAccount}`}</TableRowColumn>
                                <TableRowColumn> {formatMoneyYuan(item.minAmt)}</TableRowColumn>
                                <TableRowColumn> {formatMoneyYuan(item.maxAmt)}</TableRowColumn>
                                <TableRowColumn> {item.createName}</TableRowColumn>
                                <TableRowColumn>
                                  <a className="qb-table-g__handle" onClick={this.notificationSettingDetail.bind(this, item.id)} >详情</a>
                                  <a className="qb-table-g__handle" onClick={this.delNotification.bind(this, item.id)} >删除</a>
                                  <a className="qb-table-g__handle" onClick={this.editNotification.bind(this, item, 'edit', '30')} >修改</a>
                                </TableRowColumn>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : null }
                    </div>
                  </div>
                </div>
              </div>
              {/*
                <div className="qb-list-g__pagination clearfix">
                <div className="rob-row clearfix">
                  <div className="rob-col-lg-24 column">
                    <Pagination {...this.state.paginationConf} dataCount={this.state.dataCount} />
                  </div>
                </div>
              </div>
              */}
            </div>
          </div>) : null
          }
          {this.props.tabTypeId === '20' ? (<div>
            <div className="qb-list-g">
              <div className="qb-list-g__table">
                <div className="rob-row clearfix mlr0">
                  <div className="column">
                    <div className="qb-column-header-g qb-column-header-g--button">
                      <ol className="rob-breadcrumb rob-breadcrumb-pointed">
                        <li>付款通知</li>
                      </ol>
                      <button onClick={this.addNotification.bind(this, this.props.tabTypeId, 'addNew')} className="rob-btn rob-btn-minor rob-btn-circle " type="button">新增</button>
                    </div>
                    <div className="rob-table-responsive">
                      { noticeDataList.body ? (
                        <Table striped hoverEffect pagination >
                          <TableHeader>
                            <TableHeaderColumn> 序号</TableHeaderColumn>
                            <TableHeaderColumn> 创建日期</TableHeaderColumn>
                            <TableHeaderColumn> 需通知账号</TableHeaderColumn>
                            <TableHeaderColumn> 最小金额（元）</TableHeaderColumn>
                            <TableHeaderColumn> 创建人</TableHeaderColumn>
                            <TableHeaderColumn> 操作</TableHeaderColumn>
                          </TableHeader>
                          <TableBody>
                            {noticeDataList.body.map((item, i) => (
                              <TableRow key={i}>
                                <TableRowColumn> {i + 1}</TableRowColumn>
                                <TableRowColumn> {formatDay(item.createTime)}</TableRowColumn>
                                <TableRowColumn> {`${item.companyAcctName}${'  '}${item.noticeAccount}`}</TableRowColumn>
                                <TableRowColumn> {formatMoneyYuan(item.minAmt)}</TableRowColumn>
                                <TableRowColumn> {item.createName}</TableRowColumn>
                                <TableRowColumn>
                                  <a className="qb-table-g__handle" onClick={this.notificationSettingDetail.bind(this, item.id)} >详情</a>
                                  <a className="qb-table-g__handle" onClick={this.delNotification.bind(this, item.id)} >删除</a>
                                  <a className="qb-table-g__handle" onClick={this.editNotification.bind(this, item, 'edit', '20')} >修改</a>
                                </TableRowColumn>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : null }
                    </div>
                  </div>
                </div>
              </div>
              {/*
                <div className="qb-list-g__pagination clearfix">
                <div className="rob-row clearfix">
                  <div className="rob-col-lg-24 column">
                    <Pagination {...this.state.paginationConf} dataCount={this.state.dataCount} />
                  </div>
                </div>
              </div>
              */}
            </div>
          </div>) : null
          }
          {this.props.tabTypeId === '10' ? (<div>
            <div className="qb-list-g">
              <div className="qb-list-g__table">
                <div className="rob-row clearfix mlr0">
                  <div className="column">
                    <div className="qb-column-header-g qb-column-header-g--button">
                      <ol className="rob-breadcrumb rob-breadcrumb-pointed">
                        <li>余额通知</li>
                      </ol>
                      <button onClick={this.addNotification.bind(this, this.props.tabTypeId, 'addNew')} className="rob-btn rob-btn-minor rob-btn-circle " type="button">新增</button>
                    </div>
                    <div className="rob-table-responsive">
                      { noticeDataList.body ? (
                        <Table striped hoverEffect pagination >
                          <TableHeader>
                            <TableHeaderColumn> 序号</TableHeaderColumn>
                            <TableHeaderColumn> 创建日期</TableHeaderColumn>
                            <TableHeaderColumn> 需通知账号</TableHeaderColumn>
                            <TableHeaderColumn> 通知间隔</TableHeaderColumn>
                            <TableHeaderColumn> 创建人</TableHeaderColumn>
                            <TableHeaderColumn> 操作</TableHeaderColumn>
                          </TableHeader>
                          <TableBody>
                            {noticeDataList.body.map((item, i) => (
                              <TableRow key={i}>
                                <TableRowColumn> {i + 1}</TableRowColumn>
                                <TableRowColumn> {formatDay(item.createTime)}</TableRowColumn>
                                <TableRowColumn> {`${item.companyAcctName}${'  '}${item.noticeAccount}`}</TableRowColumn>
                                <TableRowColumn> {this.timeIntervalFilter(item.interval)}</TableRowColumn>
                                <TableRowColumn> {item.createName}</TableRowColumn>
                                <TableRowColumn>
                                  <a className="qb-table-g__handle" onClick={this.notificationSettingDetail.bind(this, item.id)} >详情</a>
                                  <a className="qb-table-g__handle" onClick={this.delNotification.bind(this, item.id)} >删除</a>
                                  <a className="qb-table-g__handle" onClick={this.editNotification.bind(this, item, 'edit', '10')} >修改</a>
                                </TableRowColumn>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      ) : null }
                    </div>
                  </div>
                </div>
              </div>
              {/*
                <div className="qb-list-g__pagination clearfix">
                <div className="rob-row clearfix">
                  <div className="rob-col-lg-24 column">
                    <Pagination {...this.state.paginationConf} dataCount={this.state.dataCount} />
                  </div>
                </div>
              </div>
              */}
            </div>
          </div>) : null
          }
          {this.props.tabTypeId !== '40' && this.props.tabTypeId !== '30' && this.props.tabTypeId !== '20' && this.props.tabTypeId !== '10' ? (<div>
            <div className="qb-list-g">
              <div className="qb-list-g__table">
                <div className="rob-row clearfix mlr0">
                  <div className="column">
                    <div className="rob-table-responsive">
                      <Table striped hoverEffect pagination >
                        <TableHeader>
                          <TableHeaderColumn>通知类型</TableHeaderColumn>
                          <TableHeaderColumn>状态</TableHeaderColumn>
                          <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableRowColumn>通知下一审批人</TableRowColumn>
                            <TableRowColumn>
                              <span>
                                {noticeOfSimpleInfo ? (!noticeOfSimpleInfo.body ? '' : noticeOfSimpleInfo.body.noticeFlag === 100 ? '开启' : '关闭') : ''}
                              </span>
                            </TableRowColumn>
                            <TableRowColumn>
                              <a className="qb-table-g__handle" onClick={() => this.handleOpen('operateNotice')}>
                                {noticeOfSimpleInfo ? (!noticeOfSimpleInfo.body ? '' : noticeOfSimpleInfo.body.noticeFlag === 100 ? '关闭' : '开启') : ''}
                              </a>
                            </TableRowColumn>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>) : null
          }
        </div>
      </div>
    )
  }
}
NotificationList.propTypes = {
  noticeDataList: PropTypes.object,
  noticeOfSimpleInfo: PropTypes.object,
  tabTypeId: PropTypes.any,
  getData: PropTypes.func,
  getList: PropTypes.func,
  searchInfo: PropTypes.object,
  history: PropTypes.object
}
NotificationList.defaultProps = {
  noticeDataList: {},
  noticeOfSimpleInfo: {},
  tabTypeId: '',
  getData: () => { },
  getList: () => { },
  searchInfo: { },
  history: {}
}
NotificationList.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    staticContext: PropTypes.object
  })
}
export default connect(state => ({
  tabTypeId: state.SENG_notificationListDataQuery.SENG_getTypeId,
  noticeDataList: state.SENG_notificationListDataQuery.SENG_queryList,
  noticeOfSimpleInfo: state.SENG_notificationListDataQuery.SENG_noticeOfSimpleInfo,
  searchInfo: state.SENG_notificationListDataQuery.SENG_queryInfo  // 查询条件
}), dispatch => ({
  getData: bindActionCreators(action.SENG_getData, dispatch),
  getList: bindActionCreators(action.SENG_getList, dispatch)
}))(NotificationList)
