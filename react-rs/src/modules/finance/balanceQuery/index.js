import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cookieStorage from 'utils/cookieStorage'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'react-robotUI/Table'
import Pagination from 'react-robotUI/Pagination'
import { formatMoneyYuan } from 'utils/filterCommon'
import * as action from './redux/actions'
import './redux/reducer'
let param = {
  page: 1,
  rows: 10
}
class BalanceQuery1 extends PureComponent {
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
          this.setState({
            paginationConf: { ...this.state.paginationConf, currentPage: curIndex }
          })
          param.page = curIndex
          this.props.getList(param)
        }
      },
      dataCount: 0
    }
  }
  static propTypes = {
    dataList: PropTypes.object,
    history: PropTypes.object,
    getList: PropTypes.func
  }
  static defaultProps = {
    dataList: {},
    history: {},
    getList: () => { }
  }
  // 过滤器
  stateFilter = (state) => {
    switch (state) {
      case 100:
        return '正常'
      case -99:
        return '正常'
      default:
        return state
    }
  }
  componentDidMount() {
    this.props.getList()
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.dataList && nextProps.dataList.body && nextProps.dataList.body.pagenation) {
      this.setState({
        dataCount: nextProps.dataList.body.pagenation.itemCount,
        paginationConf: { ...this.state.paginationConf, currentPage: nextProps.dataList.body.pagenation.pageNo }
      })
    }
  }
  go = (num) => {
    this.props.history.push({
      pathname: '/finance/balanceHistory',
      state: { virtualAccountNo: num }
    })
  }
  render() {
    let accounts = []
    if (this.props && this.props.dataList && this.props.dataList.body && this.props.dataList.body.accounts) {
      accounts = this.props.dataList.body.accounts
    }
    return (
      <div>
        <div className="qb-panel-g clearfix qb-media-height">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-account" style={{ marginRight: '5px' }} />财务查询</li>
              <li className="active">余额查询</li>
            </ol>
          </div>
          <Table containCheckbox={this.state.containCheckbox} striped={this.state.striped} hoverEffect={this.state.hoverEffect} pagination={this.state.pagination} checkboxType={this.state.checkboxType}>
            <TableHeader>
              <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
              <TableHeaderColumn> 企业名称</TableHeaderColumn>
              <TableHeaderColumn> 账号</TableHeaderColumn>
              <TableHeaderColumn> 余额（元）</TableHeaderColumn>
              <TableHeaderColumn> 可用余额（元）</TableHeaderColumn>
              <TableHeaderColumn> 冻结金额（元）</TableHeaderColumn>
              <TableHeaderColumn> 账户状态</TableHeaderColumn>
              <TableHeaderColumn> 操作</TableHeaderColumn>
            </TableHeader>
            <TableBody>
              {
                accounts.map((item, i) => (
                  <TableRow key={i}>
                    <TableRowColumn className="text-center"> {(this.state.paginationConf.pageSize * (this.state.paginationConf.currentPage - 1)) + i + 1}</TableRowColumn>
                    <TableRowColumn title={item.accountName}>{item.accountName}</TableRowColumn>
                    <TableRowColumn title={cookieStorage.getCookie('userInfo').isCfcaUser === '1' ? item.umbrellaAccountNo : item.umbrellaAccountNo}>{cookieStorage.getCookie('userInfo').isCfcaUser === '1' ? item.umbrellaAccountNo : item.umbrellaAccountNo}</TableRowColumn>
                    <TableRowColumn>{item.accountBalance ? formatMoneyYuan(item.accountBalance) : '0.00'}</TableRowColumn>
                    <TableRowColumn>{item.availableBalance ? formatMoneyYuan(item.availableBalance) : '0.00'}</TableRowColumn>
                    <TableRowColumn>{item.disabledBalance ? formatMoneyYuan(item.disabledBalance) : '0.00'}</TableRowColumn>
                    <TableRowColumn>{this.stateFilter(item.accountState)}</TableRowColumn>
                    <TableRowColumn><a className="qb-table-g__handle" onClick={this.go.bind(this, item.virtualAccountNo)}>历史余额</a></TableRowColumn>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          <div className="qb-list-g__pagination clearfix">
            <div className="rob-row clearfix">
              <div className="rob-col-lg-24 column">
                <Pagination {...this.state.paginationConf} dataCount={this.state.dataCount} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  dataList: state.FBQ_balanceQList,
}), dispatch => ({
  getList: bindActionCreators(action.FBQ_getList, dispatch)
}))(BalanceQuery1)