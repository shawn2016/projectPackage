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
import {
  formatMoneyYuan
} from 'utils/filterCommon'
import timeStamp from 'utils/timeStamp'
import Pagination from 'react-robotUI/Pagination'
import * as action from '../redux/actions'
import '../redux/reducer'
class ChargeContent extends PureComponent {
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
      dataCount: 0
    }
  }
  static propTypes = {
    dataList2: PropTypes.object,
    searchInfo: PropTypes.object,
    isReserCurrentPage: PropTypes.number,
    history: PropTypes.object,
    getList: PropTypes.func,
    reserCurrentPage: PropTypes.func
  }
  static defaultProps = {
    dataList2: {},
    searchInfo: {},
    isReserCurrentPage: 0,
    history: {},
    getList: () => { },
    reserCurrentPage: () => { }
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
    if (nextProps.dataList2 && nextProps.dataList2.body && nextProps.dataList2.body.pagenation && nextProps.dataList2.body.pagenation.itemCount) {
      this.setState({
        dataCount: (nextProps.dataList2.body && nextProps.dataList2.body.pagenation) ? nextProps.dataList2.body.pagenation.itemCount : null,
        paginationConf: { ...this.state.paginationConf, currentPage: nextProps.dataList2.body.pagenation.pageNo }
      })
    }
    if (nextProps.isReserCurrentPage === 1) {
      this.pagination.setCurrentPage(1)
      this.props.reserCurrentPage()
    }
  }
  go = (params) => {
    this.props.history.push({
      pathname: '/finance/chargeDetail',
      state: { id: params }
    })
  }
  render() {
    let values = []
    let pagenation = {}
    if (this.props && this.props.dataList2 && this.props.dataList2.body && this.props.dataList2.body.values) {
      values = this.props.dataList2.body.values
      pagenation = this.props.dataList2.body.pagenation
    }

    return (
      <div className="qb-panel-g clearfix qb-media-height">
        <Table containCheckbox={this.state.containCheckbox} striped={this.state.striped} hoverEffect={this.state.hoverEffect} pagination={this.state.pagination} checkboxType={this.state.checkboxType}>
          <TableHeader>
            <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
            <TableHeaderColumn> 收费日期</TableHeaderColumn>
            <TableHeaderColumn> 资金流向</TableHeaderColumn>
            <TableHeaderColumn> 交易流水号</TableHeaderColumn>
            <TableHeaderColumn> 交易金额(元)</TableHeaderColumn>
            <TableHeaderColumn> 应收小计(元)</TableHeaderColumn>
            <TableHeaderColumn> 实收小计(元)</TableHeaderColumn>
            <TableHeaderColumn> 操作</TableHeaderColumn>
          </TableHeader>
          <TableBody>
            {
              values.map((item, i) => (
                <TableRow key={i}>
                  <TableRowColumn className="text-center">{(pagenation.pageSize * (pagenation.pageNo - 1)) + i + 1}</TableRowColumn>
                  <TableRowColumn>{timeStamp(item.chargeDate, 3, 1)}</TableRowColumn>
                  <TableRowColumn title={this.filter('payType', item.payType)}>{this.filter('payType', item.payType)}</TableRowColumn>
                  <TableRowColumn title={item.outOrderNo}>{item.outOrderNo}</TableRowColumn>
                  <TableRowColumn title={formatMoneyYuan(item.orderAmount)}>{formatMoneyYuan(item.orderAmount)}</TableRowColumn>
                  <TableRowColumn title={formatMoneyYuan(item.expectChargeAmount)}>{formatMoneyYuan(item.expectChargeAmount)}</TableRowColumn>
                  <TableRowColumn title={formatMoneyYuan(item.actualChargeAmount)}>{formatMoneyYuan(item.actualChargeAmount)}</TableRowColumn>
                  <TableRowColumn><a className="qb-table-g__handle" onClick={this.go.bind(this, item.id)}>详情</a></TableRowColumn>
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
  dataList2: state.FCQ_chargeQueryData && state.FCQ_chargeQueryData.FCQ_dataList2,
  searchInfo: state.FCQ_chargeQueryData && state.FCQ_chargeQueryData.FCQ_upCQDateSearchInfo,
  isReserCurrentPage: state.FCQ_chargeQueryData && state.FCQ_chargeQueryData.FCQ_isReserCurrentPage
}), dispatch => ({
  getList: bindActionCreators(action.FCQ_getList, dispatch),
  reserCurrentPage: bindActionCreators(action.FCQ_resetCurrentPage, dispatch),
}))(ChargeContent)