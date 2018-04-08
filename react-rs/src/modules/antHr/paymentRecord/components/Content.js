import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'react-robotUI/Table'
import { formatMoneyYuan, surrenderStatus, antPaymentStatus, timestampFormat } from 'utils/filterCommon'
import Pagination from 'react-robotUI/Pagination'
import QBLoading from 'components/QBLoading'
import getRequest from 'utils/getRequest'
import * as action from '../redux/actions'
import '../redux/reducer'
class tradeContent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      containCheckbox: false,
      striped: true,
      hoverEffect: true,
      divide: true,
      pagination: false,
      paginationConf: {
        type: 'default',
        pageSize: 10,
        maxSize: 8,
        allowJump: true,
        currentPage: 1,
        showPreAndNext: false,
        onChange: (curIndex) => {
          // 改变请求参数的当前页
          this.setState({ paginationConf: { ...this.state.paginationConf, currentPage: curIndex } })
          let realParams = Object.assign({}, this.props.searchInfo, { page: curIndex })
          this.props.getList(realParams)
        }
      },
      dataCount: 0,
      showLoading: false
    }
  }
  filter = (type, value) => {
    if (type === 'payType') {
      switch (value) {
        case '20':
          return '支出'
        case '10':
          return '收入'
        default:
          return value
      }
    }
    if (type === 'status') {
      switch (value) {
        case 800040:
          return '成功'
        default:
          return value
      }
    }
    if (type === 'amount') {
      if (value) {
        return value / 100
      }
    }
    if (type === 'accountBalance') {
      if (value) {
        return value / 100
      }
    }
  }
  static propTypes = {
    dataList1: PropTypes.object,
    searchInfo: PropTypes.object,
    exportRecordData: PropTypes.object,
    id: PropTypes.object,
    isReserCurrentPage: PropTypes.number,
    history: PropTypes.object,
    getList: PropTypes.func,
    reserCurrentPage: PropTypes.func,
    exportRecord: PropTypes.func
  }
  static defaultProps = {
    dataList1: {},
    searchInfo: {},
    exportRecordData: {},
    id: {},
    isReserCurrentPage: 0,
    history: {},
    getList: () => { },
    reserCurrentPage: () => { },
    exportRecord: () => { }
  }
  componentWillMount = () => {
  }
  searchInfoF = {}
  componentWillReceiveProps = (nextProps) => {
    const { exportRecordData = {} } = nextProps
    if (exportRecordData.respCode === '000000') {
      /*let url = window.URL.createObjectURL(exportRecordData.data)
      let a = document.createElement('a')
      a.href = url
      a.download = 'filename.xlsx'
      a.click()*/
      window.open(exportRecordData.body)
    }
    if (nextProps.dataList1.body) {
      this.setState({
        dataCount: nextProps.dataList1.body ? nextProps.dataList1.body.pagenation.itemCount : null,
        paginationConf: { ...this.state.paginationConf, currentPage: nextProps.dataList1.body.pagenation.pageNo }
      })
    }
    if (nextProps.isReserCurrentPage === 1) {
      this.pagination.setCurrentPage(1)
      this.props.reserCurrentPage()
    }
    this.searchInfoF = JSON.parse(JSON.stringify(nextProps.searchInfo))
    delete this.searchInfoF.page
    delete this.searchInfoF.rows
  }
  go = (params) => {
    this.props.history.push({
      pathname: '/finance/tradeDetail',
      state: { serialNo: params.serialNo, tableSign: params.tableSign }
    })
  }
  ids = []
  save = () => {
    (async () => {
      let data = await getRequest({
        path: '/payment/order/exportList',
        method: 'POST',
        param: {
          id: this.ids
        }
      })
      this.ids = []
      if (data.data.respCode === '000000') {
        window.open(data.data.body)
      }
    })()
  }
  exports = () => {
    (async () => {
      let data = await getRequest({
        path: '/anthr/detail/exportList',
        method: 'POST',
        param: this.searchInfoF
      })
      if (data.data.respCode === '000000') {
        window.open(data.data.body)
      }
    })()
  }
  render() {
    let values = []
    if (this.props.dataList1 && this.props.dataList1.body && this.props.dataList1.body.values) {
      values = this.props.dataList1.body.values
    }
    return (
      <div className="qb-panel-g clearfix qb-media-height">
        <QBLoading showLoading={this.state.showLoading} />
        <div className="qb-column-header-g qb-column-header-g--button">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li>&nbsp;</li>
          </ol>
          <button className="rob-btn rob-btn-minor rob-btn-circle " onClick={this.exports.bind(this)} type="button">导出缴费明细</button>
        </div>
        <Table containCheckbox={this.state.containCheckbox} striped={this.state.striped} hoverEffect={this.state.hoverEffect} pagination={this.state.pagination} checkboxType={this.state.checkboxType}>
          <TableHeader>
            <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
            <TableHeaderColumn className="text-center"> 员工ID</TableHeaderColumn>
            <TableHeaderColumn> 员工姓名</TableHeaderColumn>
            <TableHeaderColumn> 服务类型</TableHeaderColumn>
            <TableHeaderColumn> 金额</TableHeaderColumn>
            <TableHeaderColumn> 缴纳月份</TableHeaderColumn>
            <TableHeaderColumn> 缴费状态</TableHeaderColumn>
            <TableHeaderColumn> 代缴状态</TableHeaderColumn>
          </TableHeader>
          <TableBody>
            {
              values.map((item, i) => (
                <TableRow key={i}>
                  <TableRowColumn className="text-center">{(this.state.paginationConf.pageSize * (this.state.paginationConf.currentPage - 1)) + i + 1}</TableRowColumn>
                  <TableRowColumn className="text-center">{item.employeeId ? item.employeeId : '--'}</TableRowColumn>
                  <TableRowColumn>{item.employeeName ? item.employeeName : '--'}</TableRowColumn>
                  <TableRowColumn>{item.serviceType ? item.serviceType : '--'}</TableRowColumn>
                  <TableRowColumn>{item.amount ? formatMoneyYuan(item.amount) : '--'}</TableRowColumn>
                  <TableRowColumn>{item.paymentMonth ? timestampFormat(item.paymentMonth, 7, 1) : '--'}</TableRowColumn>
                  <TableRowColumn>{item.paymentStatus ? antPaymentStatus(item.paymentStatus) : '--'}</TableRowColumn>
                  <TableRowColumn>{item.surrenderStatus || item.surrenderStatus === 0 ? surrenderStatus(item.surrenderStatus) : '--'}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <div className="qb-list-g__pagination clearfix">
          <div className="rob-row clearfix">
            <div className="rob-col-lg-24 column">
              <Pagination
                {...this.state.paginationConf}
                dataCount={this.state.dataCount}
                ref={(DOM) => this.pagination = DOM}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  dataList1: state.AHPR_tradeQueryData && state.AHPR_tradeQueryData.AHPR_tradeDataList1,
  searchInfo: state.AHPR_tradeQueryData && state.AHPR_tradeQueryData.AHPR_upDateSearchInfo,
  exportRecordData: state.AHPR_tradeQueryData && state.AHPR_tradeQueryData.AHPR_exportRecord,
  isReserCurrentPage: state.AHPR_tradeQueryData && state.AHPR_tradeQueryData.AHPR_isReserCurrentPage1
}), dispatch => ({
  getList: bindActionCreators(action.AHPR_getTqList, dispatch),
  exportRecord: bindActionCreators(action.AHPR_exportRecord, dispatch),
  reserCurrentPage: bindActionCreators(action.AHPR_resetCurrentPage, dispatch),
}))(tradeContent)