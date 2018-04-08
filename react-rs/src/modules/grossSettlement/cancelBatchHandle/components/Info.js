/**
 * 列表部分
 * （批量经办撤销）
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
        onChange: (index) => {
          this.setState({
            conf: { ...this.state.conf, currentPage: index }
          })
          this.props.getOrderList({ ...this.props.queryInfo, ...{ page: index }, ...{ rows: this.state.conf.pageSize } })
        }
      },
      dataCount: 0,
      data: [],
      showAlert: false,
      isAllChecked: false,
      isDisabled: true,
      ids: []
    }
  }
  componentWillReceiveProps(nextProps) {
    let values = []
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
  /**
   * 点击撤销事件（批量/单个）
   */
  _cancelItem = (type = {}) => {
    if (!type.actInstanceId && this.state.ids.length === 0) {
      return false
    }
    this.setState({
      alertContent: '确定要撤销？撤销后该记录不会再被找回？',
      showCloseBtn: true,
      alertBtns: [{
        label: '取消',
        className: 'rob-btn-minor rob-btn rob-btn-circle',
        state: false
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: type
      }],
      alertBtnsClass: 'rob-alert-button-color rob-alert-button-45',
      alertType: '',
      showAlert: true
    })
  }
  /* 跳转详情页事件 */
  _goToDetailsPage = item => {
    this.props.history.push({
      pathname: '/grossSettlement/BatchCancelDetails',
      state: { data: item, from: 'cancelBatchHandle' }
    })
  }
  /* 关闭弹出事件 */
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'goFailDetail') {
      sessionStorage.setItem('failureDataList', JSON.stringify({ list: this.state.detail, type: 'Revoke', from: 'batch' }))
      window.open('/otherInfo/batchFailDetailList')
      return
    }
    if (type) {
      this._save(type)
    }
  }
  _save = (type) => {
    let currentParam = []
    if (type.actInstanceId) {
      currentParam.push({ actInstanceId: type.actInstanceId, serialNo: type.serialNo})
    } else {
      currentParam = this.state.ids
    }
    (async () => {
      let data = await getRequest({
        path: '/payment/batch/revokeOrder',
        method: 'POST',
        param: {
          revokeList: currentParam
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
          isAllChecked: false
        })
        this.props.getOrderList(this.props.queryInfo)
        this.setState({ isDisabled: true })
      } else if (data.data.respCode === '500001') {
        this.setState({
          alertContent: `很抱歉，有${data.data.body.failureCount}笔撤销失败，请稍后重试。`,
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
  // checkbox选择
  checkedFunc = (node) => {
    let { data } = this.state
    if (node) {
      let tempIds = []
      node.isCheck = !node.isCheck
      data.forEach((item) => {
        if (item.isCheck) {
          tempIds.push({ actInstanceId: item.actInstanceId, serialNo: item.serialNo})
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
          if (!item.isCheck) item.isCheck = true
        })
        this.setState({ isAllChecked: true, ids: tempIds, isDisabled: false })
      }
    }
  }
  render() {
    return (
      <div className="qb-panel-g clearfix qb-media-height">
        <div className="qb-column-header-g qb-column-header-g--button">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li />
          </ol>
          <button
            className="rob-btn rob-btn-minor rob-btn-circle "
            type="button"
            onClick={this._cancelItem}
            disabled={this.state.isDisabled}
          >批量撤销</button>
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
                      <TableHeaderColumn> 付款方账号名称</TableHeaderColumn>
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
                            <TableRowColumn className="text-center">
                              {(Number(this.state.conf.pageSize) * (Number(this.state.conf.currentPage) - 1)) + index + 1}
                            </TableRowColumn>
                            <TableRowColumn> {Filter.timestampFormat(item.createDate, 3, true)}</TableRowColumn>
                            <TableRowColumn> {item.outSerialNo}</TableRowColumn>
                            <TableRowColumn> {item.payerAccountName}{item.payerAccountNo}</TableRowColumn>
                            <TableRowColumn> {item.totalCount}</TableRowColumn>
                            <TableRowColumn> {Filter.formatMoneyYuan(item.totalAmount, 2)}</TableRowColumn>
                            <TableRowColumn> {Filter.timestampFormat(item.expectDate, 3, true)}</TableRowColumn>
                            <TableRowColumn>
                              <a
                                className="qb-table-g__handle"
                                onClick={() => {
                                  this._goToDetailsPage(item)
                                }}
                              >
                                详情
                                </a>
                              <a
                                className="qb-table-g__handle"
                                onClick={() => {
                                  this._cancelItem(item)
                                }}
                              >
                                撤销
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
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
}

Info.propTypes = {
  queryInfo: PropTypes.object,
  history: PropTypes.object,
  getOrderList: PropTypes.func,
  saveCancelResult: PropTypes.func,
  pageInfo: PropTypes.object,
  orderList: PropTypes.array,
}
Info.defaultProps = {
  queryInfo: {},
  history: {},
  getOrderList: () => { },
  pageInfo: {},
  orderList: []
}
export default connect(state => ({
  queryInfo: state.batchHandleCancelInfo && state.batchHandleCancelInfo.queryInfo,
  orderList: state.batchHandleCancelInfo && state.batchHandleCancelInfo.orderList,
  pageInfo: state.batchHandleCancelInfo && state.batchHandleCancelInfo.pageInfo,
  examineResult: state.batchHandleCancelInfo && state.batchHandleCancelInfo.examineResult
}), dispatch => ({
  updateSearchInfo: bindActionCreators(actions.updateCancelBatchSearchInfo, dispatch),
  getOrderList: bindActionCreators(actions.getCancelBatchOrderList, dispatch)
}))(Info)