import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
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
import QBTextarea from 'components/QBTextarea'
import { formatDay } from 'utils/filterCommon'
import Tab from 'react-robotUI/Tab'
import * as actions from '../redux/action'
import '../redux/reducer'
class Info extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      params: {
        bizType: '201000',
        page: 1,
        rows: 10
      },
      approveParams: {},
      isTestRule: false,
      summaryEmpty: false
    }
    this.statusCode = {
      100: '复核通过',
      200: '待复核',
      300: '复核拒绝'
    }
  }
  componentWillMount() {
    this.props.getList({ bizType: this.state.params.bizType, page: this.state.params.page, rows: this.state.params.rows })
  }
  /* 跳转创建规则 */
  goToCreatRule = () => {
    this.props.history.push({
      pathname: '/systemManage/createRule',
      state: { bizType: this.state.params.bizType }
    })
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
  alertClose = () => {
    this.setState({ showAlert: false })
  }
  /* 点击tab切换事件 */
  switchState = (type) => {
    if (type === 'grossSettlement') {
      this.state.params.bizType = '201000'
      this.setState({ params: { ...this.state.params } })
      this.props.getList(this.state.params)
    } else if (type === 'undertakes') {
      this.state.params.bizType = '251000'
      this.setState({ params: { ...this.state.params } })
      this.props.getList(this.state.params)
    }
  }
  render() {
    let { dataList = {} } = this.props,
      { values = [] } = dataList
    return (
      <div className="qb-column-header-g qb-column-header-g--tabs qb-media-height">
        <div className="qb-column-header-g qb-column-header-g--tabs">
          <Tab name="rob-nav rob-nav-tabs2" icon="qb-icon-home">
            <div title="支付结算" data-func={this.switchState.bind(this, 'grossSettlement')} />
            <div title="代发" data-func={this.switchState.bind(this, 'undertakes')} />
          </Tab>
        </div>
        <div id="myTabContent" className="tab-content qb-column-header-g--tabs--tab-content">
          <div role="tabpanel" className="fade" id="home1" aria-labelledby="home-tab" />
          <div role="tabpanel" className="fade active in" id="profile1" aria-labelledby="profile-tab">
            <div role="tabpanel" className="fade active" id="dropdown12" aria-labelledby="dropdown1-tab">
              <ul id="myTabs" className="rob-nav rob-nav-tabs2 " role="tablist">
                <button className="rob-btn rob-btn-minor rob-btn-circle mb10" onClick={this.goToCreatRule} type="button">
                  创建规则
                </button>
              </ul>
              <div id="myTabContent" className="tab-content">
                <div role="tabpanel" className="fade" id="home2" aria-labelledby="home-tab" />
                <div role="tabpanel" className="fade active in" id="profile2" aria-labelledby="profile-tab">
                  <div className="qb-list-g">
                    <div className="qb-list-g__table">
                      <div className="clearfix">
                        <div className="column">
                          <div className="rob-table-responsive">
                            <Table striped hoverEffect checkboxType={'default'}>
                              <TableHeader>
                                <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
                                <TableHeaderColumn> 创建日期</TableHeaderColumn>
                                <TableHeaderColumn> 规则名称</TableHeaderColumn>
                                <TableHeaderColumn> 账户名称</TableHeaderColumn>
                                <TableHeaderColumn> 审核流程</TableHeaderColumn>
                                <TableHeaderColumn> 创建人</TableHeaderColumn>
                                <TableHeaderColumn> 状态</TableHeaderColumn>
                                <TableHeaderColumn> 操作</TableHeaderColumn>
                              </TableHeader>
                              <TableBody>
                                {
                                  values.map((item, index) => (
                                    <TableRow key={`info${index + 1}`}>
                                      <TableRowColumn className="text-center">
                                        {(10 * (this.state.params.page - 1)) + index + 1}
                                      </TableRowColumn>
                                      <TableRowColumn> {formatDay(item.createTime)}</TableRowColumn>
                                      <TableRowColumn> {item.procRuleName}</TableRowColumn>
                                      <TableRowColumn title={item.accountName + item.accountNo}> {item.accountName} {item.accountNo}</TableRowColumn>
                                      <TableRowColumn> {item.refProcName}</TableRowColumn>
                                      <TableRowColumn> {item.createUser}</TableRowColumn>
                                      <TableRowColumn> {this.statusCode[item.status]}</TableRowColumn>
                                      <TableRowColumn>
                                        {item.operStatus !== 0 ? <div>
                                          {item.operStatus === 1 ? <span
                                            className="qb-table-g__handle"
                                            onClick={() => {
                                              this.setState({
                                                showExamineDialog: true,
                                                approveItemId: item.id,
                                                approveItemCode: item.ruleCode,
                                                auditOpinion: true
                                              })
                                            }}
                                          >
                                            复核</span> : null}
                                          {item.operStatus === 2 ? <span
                                            className="qb-table-g__handle"
                                            onClick={() => {
                                              this.props.history.push({
                                                pathname: '/systemManage/createRule',
                                                state: { id: item.id, bizType: this.state.params.bizType }
                                              })
                                            }}
                                          >
                                            修改</span> : null}
                                          <span
                                            className="qb-table-g__handle"
                                            onClick={() => {
                                              this.setState({
                                                showDeleteDialog: true,
                                                deleteItemId: item.id
                                              })
                                            }}
                                          >删除</span>
                                          <span
                                            className="qb-table-g__handle"
                                            onClick={() => {
                                              this.props.history.push({
                                                pathname: '/systemManage/ruleDetails',
                                                state: { id: item.id }
                                              })
                                            }}
                                          >详情</span>
                                        </div> : <div>
                                          <span
                                            className="qb-table-g__handle"
                                            onClick={() => {
                                              this.setState({
                                                showDeleteDialog: true,
                                                deleteItemId: item.id
                                              })
                                            }}
                                          >删除</span>
                                          <span
                                            className="qb-table-g__handle"
                                            onClick={() => {
                                              this.props.history.push({
                                                pathname: '/systemManage/ruleDetails',
                                                state: { id: item.id }
                                              })
                                            }}
                                          >详情</span>
                                        </div>
                                        }
                                      </TableRowColumn>
                                    </TableRow>
                                  ))
                                }
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="qb-list-g__pagination clearfix">
                      <div className="clearfix">
                        <div className="column">
                          <Pagination
                            dataCount={dataList && dataList.pagenation ? dataList.pagenation.itemCount : 0}
                            currentPage={this.state.params.page}
                            onChange={pageNum => {
                              this.setState({
                                params: { ...this.state.params, page: pageNum }
                              }, () => {
                                this.props.getList(this.state.params)
                              })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          /**
           * 删除弹窗
           */
        }
        <Dialog
          showCloseBtn
          showCover
          open={this.state.showDeleteDialog}
          content="确定要删除此规则？"
          onRequestClose={(state) => {
            this.setState({ showDeleteDialog: false }, () => {
              state === 'sure' ? this._deleteItem() : null
            })
          }}
          actions={[{
            label: '取消',
            className: 'rob-btn rob-btn-minor rob-btn-circle',
            state: 'cancel'
          }, {
            label: '确定',
            className: 'rob-btn rob-btn-danger rob-btn-circle',
            state: 'sure'
          }]}
          actionClassName="rob-alert-button-color"
        />
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
           * 复核操作
           */
        }
        {
          this.state.showExamineDialog ? this.getExamineDialog() : null
        }
      </div>
    )
  }
  getExamineDialog = () => (
    <div className="rob-alert-cover" data-dismiss="rob-alert" >
      <div className="qb-alert-g" >
        <div id="alert2" className="rob-alert content rob-alert-dismissible" style={{ zIndex: '9998' }}>
          <div className="qb-time-line-g rob-row qb-form-group-b10-g">
            <div className="rob-form-group rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
                <label className="rob-input-label">复核事件：</label>
              </div>
              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24 lh40">
                新增规则
              </div>
            </div>
            <div className="rob-form-group rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
                <label className="rob-input-label">审核意见：</label>
              </div>
              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24">
                <input
                  className="rob-radio-with-gap"
                  name="group2"
                  checked={this.state.auditOpinion}
                  type="radio"
                  id="test4"
                  onChange={() => {
                    this.setState({
                      auditOpinion: true,
                      summaryEmpty: false
                    })
                  }}
                />
                <label htmlFor="test4">同意</label>
                <input
                  className="rob-radio-with-gap"
                  name="group2"
                  checked={!this.state.auditOpinion}
                  type="radio"
                  id="test5"
                  onChange={() => {
                    this.setState({
                      auditOpinion: false,
                      summaryEmpty: true
                    })
                  }}
                />
                <label htmlFor="test5">拒绝</label>
              </div>
            </div>
            <div className="rob-form-group rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <QBTextarea
                label="备注"
                rows="5"
                inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
                errDirection="bottom"
                required={this.state.summaryEmpty}
                pattern={/^[\S\s]{1,140}$/}
                isTestRule={this.state.isTestRule}
                emptyMsg="审核意见为拒绝时，备注不能为空。"
                errorMsg="请输入1-140个任意字符"
                ref={ref => this.summary = ref}
                handleChange={val => {
                  this.setState({ approveParams: { ...this.state.approveParams, procOperRemark: val } })
                }}
              />
            </div>
          </div>
          <div className="qb-form-footButton-g clearfix ">
            <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <button
                className="rob-btn rob-btn-minor rob-btn-circle "
                type="button"
                onClick={() => {
                  this.setState({
                    showExamineDialog: false
                  })
                }}
              >取消</button>
              <button
                className="rob-btn rob-btn-danger rob-btn-circle"
                onClick={() => {
                  this.setState({
                    isTestRule: true
                  }, () => {
                    if (!this.summary.getErrStatus()) {
                      this.setState({
                        showExamineDialog: false
                      })
                      this._examineItem()
                    }
                  })
                }}
              >确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  _deleteItem = () => {
    (async () => {
      let resResend = await getRequest({
        path: '/rule/delInfo',
        method: 'POST',
        param: { id: this.state.deleteItemId }
      })
      if (resResend.data.respCode === '000000') {
        this.formatAlertInfo('删除成功', 'bg_icon qb-icon-success')
        this.props.getList(this.state.params)
      }
    })()
  }
  _examineItem = () => {
    this.state.auditOpinion ? this.state.approveParams.status = 100 : this.state.approveParams.status = 300
    this.state.approveParams.id = this.state.approveItemId
    this.state.approveParams.ruleCode = this.state.approveItemCode
    this.setState({ approveParams: { ...this.state.approveParams } });
    (async () => {
      let resResend = await getRequest({
        path: '/rule/approveInfo',
        method: 'POST',
        param: this.state.approveParams
      })
      if (resResend.data.respCode === '000000') {
        this.formatAlertInfo('复核成功', 'bg_icon qb-icon-success')
        this.setState({ auditOpinion: true })
        this.props.getList(this.state.params)
      }
    })()
  }
}

Info.propTypes = {
  history: PropTypes.object,
  bussinessStatus: PropTypes.object,
  dataList: PropTypes.object,
  accountList: PropTypes.array,
  updateBussinessStatus: PropTypes.func,
  getList: PropTypes.func,
}
Info.defaultProps = {
  history: {},
  bussinessStatus: {},
  dataList: {},
  accountList: [],
  updateBussinessStatus: () => { },
  getList: () => { },
}
export default connect(state => ({
  bussinessStatus: state.ruleManage && state.ruleManage.bussinessStatus,
  dataList: state.ruleManage && state.ruleManage.ruleManagerDataList,
  accountList: state.ruleManage && state.ruleManage.accountList,
}), dispatch => ({
  updateBussinessStatus: bindActionCreators(actions.updateBussinessStatus, dispatch),
  getList: bindActionCreators(actions.getRuleManagerDataList, dispatch)
}))(Info)