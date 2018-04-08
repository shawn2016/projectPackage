/**
 * 列表部分
 * （单笔经办审批）
 */
/*eslint-disable*/
import React, { PureComponent } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'react-robotUI/Table'
import Pagination from 'react-robotUI/Pagination'
import QBTextarea from 'components/QBTextarea'
import Dialog from 'react-robotUI/dialog'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import getRequest from 'utils/getRequest'
import Filter from 'utils/filterCommon'
import * as actions from '../redux/action'
import '../redux/reducer'
class Info extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      conf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false,
        previousLabel: '',
        onChange: (currentPage) => {
          this.props.getOrderList({ ...this.props.queryInfo, ...{ page: currentPage }, ...{ rows: this.state.conf.pageSize } })
        }
      },
      dataCount: 0,
      data: [],
      showAlert: false,
      approveStatusDesc: false,
      isReject: false,
      isTestRule: false,
      isAllChecked: false,
      isDisabled: true,
      ids: []
    }
  }
  auditOpinion = ''
  remark = ''
  totalMoney = 0
  totalCount = 0
  componentWillMount() {}
  componentWillReceiveProps(nextProps) {
    let values = []
    if (nextProps.isSearch) {
      this.Pagination.setCurrentPage(1)
      this.props.isSearchFunc(false)
    }
    if (nextProps.orderList && nextProps.pageInfo) {
      values = nextProps.orderList
      this.setState({
        conf: { ...this.state.conf, currentPage: nextProps.pageInfo.pageNo },
        dataCount: nextProps.pageInfo.itemCount
      })
    }
    this.setState({
      data: values
    })
  }
  /* 跳转详情页事件 */
  _goToDetailsPage = item => {
    this.props.history.push({
      pathname: '/grossSettlement/batchExamineDetails',
      state: { data: item, from: 'examineBatchHandle', source: 2 }
    })
  }
  // checkbox选择
  checkedFunc = (node) => {
    let { data } = this.state
    this.totalMoney = 0
    this.totalCount = 0
    if (node) {
      let tempIds = []
      node.isCheck = !node.isCheck
      data.forEach((item) => {
        if (item.isCheck) {
          tempIds.push({ actInstanceId: item.actInstanceId, serialNo: item.serialNo })
          this.totalMoney += item.totalAmount
          this.totalCount += item.totalCount
        }
      })
      if (!node.isCheck && this.state.isAllChecked) {
        this.setState({ isAllChecked: false })
      }
      if (tempIds.length === data.length) {
        this.setState({ isAllChecked: true })
      }
      tempIds.length > 0 ? this.setState({ isDisabled: false }) : this.setState({ isDisabled: true })
      this.setState({ ids: tempIds })
    } else {
      if (this.state.isAllChecked) {
        data.forEach((item) => {
          if (item.isCheck) item.isCheck = false
        })
        this.setState({ isAllChecked: false, ids: [], isDisabled: true })
      } else {
        let tempIds = []
        data.forEach((item) => {
          tempIds.push({ actInstanceId: item.actInstanceId, serialNo: item.serialNo})
          this.totalMoney += item.totalAmount
          this.totalCount += item.totalCount
          if (!item.isCheck) item.isCheck = true
        })
        this.setState({ isAllChecked: true, ids: tempIds, isDisabled: false })
      }
    }
  }
  /* 批量复核事件 */
  examineMutipleConten = (type) => {
    if (type === 'examineDialog') {
      return (
        <div className="">
          <div className="rob-row ">
            <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-right">
              <label className="rob-input-label">总笔数(笔):</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24 text-left">
              <label className="rob-input-label">{this.totalCount}</label>
            </div>
          </div>
          <div className="rob-row">
            <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-right">
              <label className="rob-input-label">总金额(元):</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24 text-left">
              <label className="rob-input-label">{Filter.formatMoneyYuan(this.totalMoney, 2)}</label>
            </div>
          </div>
          <div className="rob-row">
            <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-right">
              <label className="rob-input-label">审核意见:</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24 text-left mtb10">
              <input onChange={() => { this.dialogCheckout('700007') }} className="rob-radio-with-gap" name="group2" type="radio" id="test4" />
              <label htmlFor="test4">同意</label>
              <input onChange={() => { this.dialogCheckout('700005') }} className="rob-radio-with-gap" name="group2" type="radio" id="test5" />
              <label htmlFor="test5">拒绝</label>
              {this.state.approveStatusDesc ? <div style={{ color: '#cc1612' }}><i className="qb-icon-report1" />请选择审核意见</div> : null}
            </div>
          </div>
          <div className="rob-row">
            <QBTextarea
              name="username"
              type="text"
              rows="4"
              label="备注"
              labelClass="rob-col-lg-8 rob-col-md-8 rob-col-sm-28 rob-col-xs-24 text-right"
              inputClass="rob-col-lg-16 rob-col-md-16 rob-col-sm-26 rob-col-xs-24"
              emptyMsg="审核意见为拒绝时，备注不能为空"
              errorMsg="请输入1-140个字的备注"
              pattern={/^[\S\s]{1,140}$/}
              containErrorIcon
              required={this.state.isReject}
              isTestRule={this.state.isTestRule}
              errDirection="bottom"
              handleChange={value => this.remark = value}
              ref={ref => this.reason = ref}
            />
          </div>
        </div>
      )
    }
    return this.state.alertContent
  }
  examineMutiple = () => {
    if (this.state.ids.length === 0) {
      return false
    }
    this.setState({
      alertContent: 'examineDialog',
      showCloseBtn: true,
      alertBtns: [{
        label: '取消',
        className: 'rob-btn-minor rob-btn rob-btn-circle',
        state: false
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: 'examineSuccess'
      }],
      alertBtnsClass: 'rob-alert-button-color rob-alert-button-45',
      alertType: '',
      showAlert: true
    })
  }
  _save = () => {
    (async () => {
      let data = await getRequest({
        path: '/payment/batch/approveOrder',
        method: 'POST',
        param: {
          auditOpinion: this.auditOpinion,
          description: this.remark,
          approveList: this.state.ids
        }
      })
      if (data.data.respCode === '000000') {
        this.setState({
          alertContent: data.data.respMsg,
          showCloseBtn: false,
          alertBtns: [{
            label: '确定',
            className: 'rob-btn rob-btn-danger rob-btn-circle',
            state: false
          }],
          alertBtnsClass: 'rob-alert-button-color rob-alert-button-45',
          alertType: 'bg_icon qb-icon-success',
          showAlert: true,
          ids: [],
          isAllChecked: false,
          approveStatusDesc: false,
          isTestRule: false,
          isReject: false
        })
        this.remark = ''
        this.totalMoney = 0
        this.totalCount = 0
        this.auditOpinion = ''
        this.props.getOrderList(this.props.queryInfo)
        this.setState({ isDisabled: true })
      } else if (data.data.respCode === '500001') {
        this.setState({
          alertContent: `很抱歉，有${data.data.body.failureCount}笔审批失败，请稍后重试。`,
          showCloseBtn: false,
          alertBtns: [{
            label: '查看详情',
            className: 'rob-btn-minor rob-btn rob-btn-circle',
            state: 'goFailDetail'
          }, {
            label: '确定',
            className: 'rob-btn rob-btn-danger rob-btn-circle',
            state: false
          }],
          alertBtnsClass: 'rob-alert-button-color rob-alert-button-45',
          alertType: '',
          showAlert: true,
          ids: [],
          isAllChecked: false
        })
        if(data.data.body && data.data.body.failureList){
          this.setState({ detail: data.data.body.failureList })
        }
        this.props.getOrderList(this.props.queryInfo)
      }
    })()
  }
  /* 弹出框里的校验 */
  dialogCheckout = (code) => {
    this.auditOpinion = code
    this.setState({
      approveStatusDesc: false,
      isTestRule: false
    })
    if (this.auditOpinion === '700005') {
      this.setState({
        isReject: true
      })
      return
    }
    this.setState({
      isReject: false
    })
  }
  /* 关闭弹出框事件 */
  alertClose = (type) => {
    if (type === 'examineSuccess') {
      this.setState({
        isTestRule: true
      }, () => {
        if (this.auditOpinion === '') {
          this.setState({
            approveStatusDesc: true
          })
          return
        }
        if (this.reason.getErrStatus()) {
          return false
        }
        this.setState({
          showAlert: false,
          isTestRule: false
        })
        this._save()
      })
      return
    }
    if (type === 'goFailDetail') {
      sessionStorage.setItem('failureDataList', JSON.stringify({ list: this.state.detail, type: 'Approve', from: 'batch' }))
      window.open('/otherInfo/batchFailDetailList')
    }
    this.setState({ showAlert: false })
  }
  render() {
    return (
      <div className="clearfix qb-media-height">
        <div className="qb-column-header-g qb-column-header-g--button">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li />
          </ol>
          {/* disabled={this.state.ifDisabled}           */}
          <button
            className="rob-btn rob-btn-minor rob-btn-circle "
            type="button"
            disabled={this.state.isDisabled}
            onClick={this.examineMutiple}
          >批量复核</button>
        </div>
        {/* 数据列表*/}
        <div className="qb-list-g">
          {/* 表格*/}
          <div className="qb-list-g__table">
            <div className="rob-row clearfix mlr0">
              <div className="column">
                <div className="rob-table-responsive">
                  <Table striped hoverEffect>
                    <TableHeader>
                      {this.state.data.length > 0 ? <th className="text-center">
                        <input type="checkbox" id="checkboxAll" className="rob-checkbox-filled-in" onChange={() => this.checkedFunc()} checked={this.state.isAllChecked} />
                        <label htmlFor="checkboxAll" />
                      </th> : null}
                      <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
                      <TableHeaderColumn> 创建日期</TableHeaderColumn>
                      <TableHeaderColumn> 业务参考号</TableHeaderColumn>
                      <TableHeaderColumn> 付款方账户名称</TableHeaderColumn>
                      <TableHeaderColumn> 总笔数（笔）</TableHeaderColumn>
                      <TableHeaderColumn> 总金额（元）</TableHeaderColumn>
                      <TableHeaderColumn> 期望日</TableHeaderColumn>
                      <TableHeaderColumn> 操作</TableHeaderColumn>
                    </TableHeader>
                    <TableBody>
                      {
                        this.state.data ? this.state.data.map((item, index) => (
                          <TableRow key={`info${index + 1}`}>
                            {this.state.data.length > 0 ? <th className="text-center">
                              <input type="checkbox" id={`checkbox${index + 1}`} className="rob-checkbox-filled-in" onChange={() => this.checkedFunc(item)} checked={item.isCheck} />
                              <label htmlFor={`checkbox${index + 1}`} />
                            </th> : null}
                            <TableRowColumn className="text-center"> {(this.props.pageInfo.pageSize * (this.props.pageInfo.pageNo - 1)) + index + 1}</TableRowColumn>
                            <TableRowColumn> {Filter.timestampFormat(item.createDate, 3, true)}</TableRowColumn>
                            <TableRowColumn> {item.outSerialNo}</TableRowColumn>
                            <TableRowColumn> {item.payerAccountName}{item.payerAccountNo}</TableRowColumn>
                            <TableRowColumn> {item.totalCount}</TableRowColumn>
                            <TableRowColumn> {Filter.formatMoneyYuan(item.totalAmount, 2)}</TableRowColumn>
                            <TableRowColumn> {Filter.timestampFormat(item.expectDate, 3, true)}</TableRowColumn>
                            <TableRowColumn>
                              <a
                                onClick={() => {
                                  this._goToDetailsPage(item)
                                }}
                                className="qb-table-g__handle"
                              >
                                复核
                                </a>
                            </TableRowColumn>
                          </TableRow>
                        )) : null
                      }
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          {/* 分页*/}
          <div className="qb-list-g__pagination clearfix">
            <div className="rob-row clearfix">
              <div className="rob-col-lg-24 column">
                <Pagination {...this.state.conf} dataCount={this.state.dataCount} ref={ref => this.Pagination = ref} />
              </div>
            </div>
          </div>
        </div>
        <Dialog
          showCover
          showCloseBtn={this.state.showCloseBtn}
          open={this.state.showAlert}
          content={{ content: this.examineMutipleConten(this.state.alertContent), icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
}
Info.propTypes = {
  history: PropTypes.object,
  getOrderList: PropTypes.func,
  pageInfo: PropTypes.object,
  orderList: PropTypes.array,
  queryInfo: PropTypes.object,
  updateSearchInfo: PropTypes.func,
  isSearch: PropTypes.bool,
  isSearchFunc: PropTypes.func
}
Info.defaultProps = {
  history: {},
  getOrderList: () => { },
  pageInfo: {},
  orderList: [],
  queryInfo: {},
  updateSearchInfo: () => { },
  isSearch: false,
  isSearchFunc: () => { }
}
export default connect(state => ({
  isSearch: state.batchHandleExamineInfo && state.batchHandleExamineInfo.isSearch,
  queryInfo: state.batchHandleExamineInfo && state.batchHandleExamineInfo.queryInfo,
  orderList: state.batchHandleExamineInfo && state.batchHandleExamineInfo.orderList,
  pageInfo: state.batchHandleExamineInfo && state.batchHandleExamineInfo.pageInfo
}), dispatch => ({
  isSearchFunc: bindActionCreators(actions.isBatchExamineSearch, dispatch),
  updateSearchInfo: bindActionCreators(actions.updateBatchExamineSearchInfo, dispatch),
  getOrderList: bindActionCreators(actions.getBatchExamineOrderList, dispatch)
}))(Info)