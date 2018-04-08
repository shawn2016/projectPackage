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
import timeStamp from 'utils/timeStamp'
import { formatMoneyYuan } from 'utils/filterCommon'
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
  exports = () => {
    (async () => {
      let data = await getRequest({
        path: '/payment/order/exportList',
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
    let pagenation = {
      pageSize: 0,
      pageNo: 0
    }
    if (this.props.dataList1 && this.props.dataList1.body && this.props.dataList1.body.values) {
      values = this.props.dataList1.body.values
      pagenation = this.props.dataList1.body.pagenation
    }
    return (
      <div className="qb-panel-g clearfix qb-media-height">
        <QBLoading showLoading={this.state.showLoading} />
        <div className="qb-column-header-g qb-column-header-g--button">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li>&nbsp;</li>
          </ol>
          <button className="rob-btn rob-btn-minor rob-btn-circle " onClick={this.exports.bind(this)} type="button">导出交易记录</button>
        </div>
        <Table containCheckbox={this.state.containCheckbox} striped={this.state.striped} hoverEffect={this.state.hoverEffect} pagination={this.state.pagination} checkboxType={this.state.checkboxType}>
          <TableHeader>
            <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
            <TableHeaderColumn> 交易日期</TableHeaderColumn>
            <TableHeaderColumn> 交易金额（元）</TableHeaderColumn>
            <TableHeaderColumn> 交易流水号</TableHeaderColumn>
            <TableHeaderColumn> 资金流向</TableHeaderColumn>
            <TableHeaderColumn> 可用余额（元）</TableHeaderColumn>
            <TableHeaderColumn> 收（付）方名称</TableHeaderColumn>
            <TableHeaderColumn> 收（付）方账号</TableHeaderColumn>
            <TableHeaderColumn> 操作</TableHeaderColumn>
          </TableHeader>
          <TableBody>
            {
              values.map((item, i) => (
                <TableRow key={i}>
                  <TableRowColumn className="text-center">{(pagenation.pageSize * (pagenation.pageNo - 1)) + i + 1}</TableRowColumn>
                  <TableRowColumn >{timeStamp(item.receiveTime, 4, 1)}</TableRowColumn>
                  <TableRowColumn >{formatMoneyYuan(item.amount)}</TableRowColumn>
                  <TableRowColumn title={item.outSerialNo}>{item.outSerialNo}</TableRowColumn>
                  <TableRowColumn title={this.filter('payType', item.payType)}>{this.filter('payType', item.payType)}</TableRowColumn>
                  <TableRowColumn>{formatMoneyYuan(item.accountBalance)}</TableRowColumn>
                  <TableRowColumn title={item.accountName}>{item.accountName}</TableRowColumn>
                  <TableRowColumn>{item.accountNo}</TableRowColumn>
                  <TableRowColumn>{item.serialNo ? <a className="qb-table-g__handle" onClick={this.go.bind(this, item)}>详情</a> : ''}</TableRowColumn>
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
  dataList1: state.FTQ_tradeQueryData && state.FTQ_tradeQueryData.FTQ_tradeDataList1,
  searchInfo: state.FTQ_tradeQueryData && state.FTQ_tradeQueryData.FTQ_upDateSearchInfo,
  exportRecordData: state.FTQ_tradeQueryData && state.FTQ_tradeQueryData.FTQ_exportRecord,
  isReserCurrentPage: state.FTQ_tradeQueryData && state.FTQ_tradeQueryData.FTQ_isReserCurrentPage1
}), dispatch => ({
  getList: bindActionCreators(action.FTQ_getTqList, dispatch),
  exportRecord: bindActionCreators(action.FTQ_exportRecord, dispatch),
  reserCurrentPage: bindActionCreators(action.FTQ_resetCurrentPage, dispatch),
}))(tradeContent)