/**
 * 列表部分
 * （批量经办查询）
 */
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
import { connect } from 'react-redux'
import cookieStorage from 'utils/cookieStorage'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { timestampFormat, batchDealStatus, formatMoneyYuan, batchDealStatusSmall } from 'utils/filterCommon'
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
          let param = Object.assign({}, this.props.queryInfo, { page: currentPage })
          this.props.getOrderList(param)
        }
      },
      dataCount: 0,
      data: []
    }
  }
  static propTypes = {
    history: PropTypes.object,
    isReserCurrentPage: PropTypes.number,
    reserCurrentPage: PropTypes.func,
    getOrderList: PropTypes.func,
    dataObj: PropTypes.object,
    queryInfo: PropTypes.object,
  }
  static defaultProps = {
    history: {},
    isReserCurrentPage: 0,
    reserCurrentPage: () => { },
    getOrderList: () => { },
    dataObj: {},
    queryInfo: {},
  }
  componentWillMount() {
    let userInfo = cookieStorage.getCookie('userInfo')
    if (JSON.stringify('userInfo') !== '{}') {
      this.setState({
        companyType: userInfo.companyType
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    // 设置分页
    if (nextProps.isReserCurrentPage === 1) {
      this.pagination.setCurrentPage(1)
      this.props.reserCurrentPage()
    }
    if (nextProps.dataObj && nextProps.dataObj.values) {
      this.setState({
        dataCount: nextProps.dataObj.pagenation.itemCount,
        conf: { ...this.state.conf, currentPage: nextProps.dataObj.pagenation.pageNo }
      })
    }
  }
  render() {
    let mapArray = []
    if (this.props.dataObj && this.props.dataObj.values) {
      mapArray = this.props.dataObj.values
    }
    return (
      <div className="clearfix qb-media-height">
        {/* 数据列表*/}
        <div className="qb-list-g">
          {/* 表格*/}
          <div className="qb-list-g__table">
            <div className="clearfix ">
              <div className="column">
                <div className="rob-table-responsive">
                  <Table striped hoverEffect checkboxType={'default'}>
                    <TableHeader>
                      <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
                      <TableHeaderColumn> 创建日期</TableHeaderColumn>
                      <TableHeaderColumn> 付款方账户名称</TableHeaderColumn>
                      <TableHeaderColumn> 业务参考号</TableHeaderColumn>
                      <TableHeaderColumn> 总笔数（笔）</TableHeaderColumn>
                      <TableHeaderColumn> 总金额（元）</TableHeaderColumn>
                      <TableHeaderColumn> 期望日</TableHeaderColumn>
                      <TableHeaderColumn> 成功笔数（笔）</TableHeaderColumn>
                      <TableHeaderColumn> 失败笔数（笔）</TableHeaderColumn>
                      <TableHeaderColumn> 成功总金额（元）</TableHeaderColumn>
                      <TableHeaderColumn> 状态</TableHeaderColumn>
                      <TableHeaderColumn> 操作</TableHeaderColumn>
                    </TableHeader>
                    <TableBody>
                      {
                        mapArray ? mapArray.map((item, index) => (
                          <TableRow key={`info${index + 1}`}>
                            <TableRowColumn className="text-center"> {(this.props.dataObj.pagenation.pageSize * (this.props.dataObj.pagenation.pageNo - 1)) + index + 1}</TableRowColumn>
                            <TableRowColumn> {timestampFormat(item.createDate, 3, 1)}</TableRowColumn>
                            <TableRowColumn> {item.payerAccountName}{item.payerAccountNo}</TableRowColumn>
                            <TableRowColumn> {item.outSerialNo}</TableRowColumn>
                            <TableRowColumn> {item.totalCount}</TableRowColumn>
                            <TableRowColumn> {formatMoneyYuan(item.totalAmount)}</TableRowColumn>
                            <TableRowColumn> {timestampFormat(item.expectDate, 3, 1)}</TableRowColumn>
                            <TableRowColumn> {item.successCount}</TableRowColumn>
                            <TableRowColumn> {item.failureCount}</TableRowColumn>
                            <TableRowColumn> {item.successAmount ? formatMoneyYuan(item.successAmount) : ''}</TableRowColumn>
                            <TableRowColumn> {this.state.companyType === '100' ? batchDealStatus(item.status) : batchDealStatusSmall(item.status)}</TableRowColumn>
                            <TableRowColumn> <a
                              className="qb-table-g__handle"
                              onClick={() => {
                                this._goToDetailsPage(item)
                              }}
                            >
                              详情
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
            <div className="clearfix">
              <div className="column">
                <Pagination
                  {...this.state.conf}
                  dataCount={this.state.dataCount}
                  ref={(DOM) => this.pagination = DOM}
                />
              </div>
            </div>
          </div>
        </div>
        {/* 暂无数据*/}
      </div>
    )
  }
  _goToDetailsPage = item => {
    this.props.history.push({
      pathname: '/grossSettlement/batchSearchDetails',
      state: { data: item, from: 'searchBatchHandle' }
    })
  }
}


export default connect(state => ({
  dataObj: state.GSSBH_singleHandleSearchInfo && state.GSSBH_singleHandleSearchInfo.GSSBH_orderList,
  queryInfo: state.GSSBH_singleHandleSearchInfo && state.GSSBH_singleHandleSearchInfo.GSSBH_queryInfo,
  isReserCurrentPage: state.GSSBH_singleHandleSearchInfo && state.GSSBH_singleHandleSearchInfo.GSSBH_isReserCurrentPage
}), dispatch => ({
  getOrderList: bindActionCreators(actions.GSSBH_getOrderList, dispatch),
  reserCurrentPage: bindActionCreators(actions.GSSBH_resetCurrentPage, dispatch),
}))(Info)