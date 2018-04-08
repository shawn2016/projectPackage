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
import Pagination from 'react-robotUI/Pagination'
import {
  orderStatus,
  formatMoneyYuan,
  payChannel
} from 'utils/filterCommon'
import * as action from '../redux/actions'
import '../redux/reducer'
class ScancodeContent extends PureComponent {
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
          console.log(realParams)
          this.props.getList(realParams)
        }
      },
      dataCount: 0
    }
  }
  static propTypes = {
    dataList: PropTypes.object,
    searchInfo: PropTypes.object,
    isReserCurrentPage: PropTypes.number,
    history: PropTypes.object,
    getList: PropTypes.func,
    reserCurrentPage: PropTypes.func
  }
  static defaultProps = {
    dataList: {},
    searchInfo: {},
    isReserCurrentPage: 0,
    history: {},
    getList: () => { },
    reserCurrentPage: () => { }
  }
  filter = (type, value) => {
    if (type === 'businessType') {
      switch (value) {
        case '2':
          return '支出'
        case '1':
          return '收入'
        default:
          return value
      }
    }
    if (type === 'orderAmount') {
      if (value) {
        return value / 100
      }
    }
    if (type === 'expectChargeAmount') {
      if (value) {
        return value / 100
      }
    }
    if (type === 'actualChargeAmount') {
      if (value) {
        return value / 100
      }
    }
  }
  componentWillMount = () => {
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.dataList && nextProps.dataList.body) {
      this.setState({
        dataCount: nextProps.dataList.body.pagenation ? nextProps.dataList.body.pagenation.itemCount : null,
        paginationConf: { ...this.state.paginationConf, currentPage: nextProps.dataList.body.pagenation.pageNo }
      })
    }
    if (nextProps.isReserCurrentPage === 1) {
      this.pagination.setCurrentPage(1)
      this.props.reserCurrentPage()
    }
  }
  go = (params) => {
    console.log(params)
    this.props.history.push({
      pathname: '/finance/ScancodeDetail',
      state: { serialNo: params.serialNo }
    })
  }
  render() {
    // const { dataList = {} } = this.props,
    //   { body = {} } = dataList,
    //   { values = [] } = body
    const pagination = this.state.paginationConf
    let values = []
    if (this.props && this.props.dataList && this.props.dataList.body && this.props.dataList.body.values) {
      values = this.props.dataList.body.values
    }
    return (
      <div className="qb-panel-g clearfix qb-media-height">
        <Table striped hoverEffect checkboxType={'default'}>
          <TableHeader>
            <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
            <TableHeaderColumn> 交易日期</TableHeaderColumn>
            <TableHeaderColumn> 二维码编号</TableHeaderColumn>
            <TableHeaderColumn> 交易流水号</TableHeaderColumn>
            <TableHeaderColumn> 支付方式</TableHeaderColumn>
            <TableHeaderColumn> 交易金额（元）</TableHeaderColumn>
            <TableHeaderColumn> 手续费（元）</TableHeaderColumn>
            <TableHeaderColumn> 交易状态</TableHeaderColumn>
            <TableHeaderColumn> 结算金额</TableHeaderColumn>
            <TableHeaderColumn> 操作</TableHeaderColumn>
          </TableHeader>
          <TableBody>
            {
              values.map((item, i) => (
                <TableRow key={i}>
                  <TableRowColumn className="text-center">{(pagination.pageSize * (pagination.currentPage - 1)) + i + 1}</TableRowColumn>
                  <TableRowColumn>{timeStamp(item.receiveTime, 3, 1)}</TableRowColumn>
                  <TableRowColumn title={item.qrcode}>{item.qrcode}</TableRowColumn>
                  <TableRowColumn title={item.outSerialNo}>{item.outSerialNo}</TableRowColumn>
                  <TableRowColumn>{payChannel(item.payChannel)}</TableRowColumn>
                  <TableRowColumn>{item.amount ? formatMoneyYuan(item.amount) : '0.00'}</TableRowColumn>
                  <TableRowColumn>{item.fee ? formatMoneyYuan(item.fee) : '0.00'}</TableRowColumn>
                  <TableRowColumn>{orderStatus(item.status)}</TableRowColumn>
                  <TableRowColumn>{item.status === 100 ? formatMoneyYuan(Math.round(item.amount - item.fee)) : '0.00'}</TableRowColumn>
                  <TableRowColumn>
                    <a onClick={() => this.go(item)} className="qb-table-g__handle">详情</a>
                  </TableRowColumn>
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
  dataList: state.FSQ_chargeScanQueryData && state.FSQ_chargeScanQueryData.FSQ_scanQueryDataList,
  searchInfo: state.FSQ_chargeScanQueryData && state.FSQ_chargeScanQueryData.FSQ_upDateSQSearchInfo,
  isReserCurrentPage: state.FSQ_chargeScanQueryData && state.FSQ_chargeScanQueryData.FSQ_isReserCurrentPage
}), dispatch => ({
  getList: bindActionCreators(action.FSQ_getSqList, dispatch),
  reserCurrentPage: bindActionCreators(action.FSQ_resetCurrentPage, dispatch),
}))(ScancodeContent)