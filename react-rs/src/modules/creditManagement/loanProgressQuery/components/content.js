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
import Pagination from 'react-robotUI/Pagination'
import { formatMoneyYuan, formatDay } from 'utils/filterCommon'
import * as action from '../redux/actions'
import '../redux/reducer'

class Content extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      PaginationConf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        dataCount: 0,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false,
        onChange: (currentPage) => {
          this.props.loanProgressSearch()
          this.setState({ PaginationConf: { ...this.state.PaginationConf, currentPage } })
          let params = this.props.data.loanProgressSearch
          params.page = currentPage
          params.rows = this.state.PaginationConf.pageSize
          this.props.getLoanProgressList(params)
        }
      },
      values: []
    }
  }
  /* 初始化获取数据 */
  componentDidMount() {
    this.props.getLoanProgressList()
  }
  /* 获取数据后，设置dataCount */
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    let values = []
    const { data = {} } = nextProps
    if (data && data.loanProgressData && data.loanProgressData.body && data.loanProgressData.body.values) {
      values = data.loanProgressData.body.values
      let _pageParam = nextProps.data.loanProgressData.body.pagenation
      this.setState({
        PaginationConf: {
          ...this.state.PaginationConf,
          dataCount: _pageParam.itemCount,
          currentPage: _pageParam.pageNo
        }
      })
    }
    this.setState({
      values
    })
  }
  render() {
    const pagination = this.state.PaginationConf
    const loanType = {
      1: '普通贷款',
      2: '专用贷款'
    }
    /* 贷款进度status Map 映射 */
    const loanProgressStatus = {
      1: '待初审',
      2: '初审拒绝',
      3: '初审续议',
      4: '待终审',
      5: '终审拒绝',
      6: '终审续议',
      7: '待放款',
      8: '放款成功',
      9: '放款失败',
      10: '放款终止'
    }
    return (
      <div className="qb-panel-g clearfix qb-media-height">
        <div className="qb-list-g">
          <div className="qb-list-g__table">
            <div className="rob-row clearfix mlr0">
              <div className="column">
                <div className="rob-table-responsive">
                  <Table striped hoverEffect checkboxType={'default'}>
                    <TableHeader>
                      <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
                      <TableHeaderColumn> 申请日期</TableHeaderColumn>
                      <TableHeaderColumn> 订单编号</TableHeaderColumn>
                      <TableHeaderColumn> 贷款金额(元)</TableHeaderColumn>
                      <TableHeaderColumn> 贷款类型</TableHeaderColumn>
                      <TableHeaderColumn> 状态</TableHeaderColumn>
                    </TableHeader>
                    <TableBody>
                      {
                        this.state.values.map((item, i) => (
                          <TableRow key={i}>
                            <TableRowColumn className="text-center">{(pagination.pageSize * (pagination.currentPage - 1)) + i + 1}</TableRowColumn>
                            <TableRowColumn> {formatDay(item.applyTime)}</TableRowColumn>
                            <TableRowColumn> {item.orderNo}</TableRowColumn>
                            <TableRowColumn> {item.loanAmount ? formatMoneyYuan(item.loanAmount) : '0.00'}</TableRowColumn>
                            <TableRowColumn> {loanType[item.loanType]}</TableRowColumn>
                            <TableRowColumn> {loanProgressStatus[item.status]}</TableRowColumn>
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
            <div className="rob-row clearfix">
              <div className="rob-col-lg-24 column">
                <Pagination {...this.state.PaginationConf} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Content.propTypes = {
  data: PropTypes.object,
  getLoanProgressList: PropTypes.func,
  loanProgressSearch: PropTypes.func
}
Content.defaultProps = {
  data: {},
  getLoanProgressList: () => { },
  loanProgressSearch: () => { }
}

export default connect(state => ({
  data: state.loanProgressQuery
}), dispatch => ({
  getLoanProgressList: bindActionCreators(action.getLoanProgressList, dispatch),
  loanProgressSearch: bindActionCreators(action.loanProgressSearch, dispatch)
}))(Content)