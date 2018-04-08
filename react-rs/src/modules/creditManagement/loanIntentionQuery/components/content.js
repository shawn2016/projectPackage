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
          this.props.loanIntentionSearch()
          this.setState({ PaginationConf: { ...this.state.PaginationConf, currentPage } })
          let params = this.props.data.loanIntentionSearch
          params.page = currentPage
          params.rows = this.state.PaginationConf.pageSize
          this.props.getLoanIntentionList(params)
        }
      },
      values: []
    }
  }
  /* 初始化获取数据 */
  componentDidMount() {
    this.props.getLoanIntentionList()
  }
  /* 获取数据后，设置dataCount */
  componentWillReceiveProps(nextProps) {
    let values = []
    const { data = {} } = nextProps
    if (data && data.loanIntentionData && data.loanIntentionData.body && data.loanIntentionData.body.values) {
      values = data.loanIntentionData.body.values
      let _pageParam = nextProps.data.loanIntentionData.body.pagenation
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
                      <TableHeaderColumn> 期望额度(元)</TableHeaderColumn>
                      <TableHeaderColumn> 融资用途</TableHeaderColumn>
                      <TableHeaderColumn> 联系人姓名</TableHeaderColumn>
                      <TableHeaderColumn> 手机号码</TableHeaderColumn>
                    </TableHeader>
                    <TableBody>
                      {
                        this.state.values.map((item, i) => (
                          <TableRow key={i}>
                            <TableRowColumn className="text-center">{(pagination.pageSize * (pagination.currentPage - 1)) + i + 1}</TableRowColumn>
                            <TableRowColumn> {formatDay(item.applyTime)}</TableRowColumn>
                            <TableRowColumn> {item.orderNo}</TableRowColumn>
                            <TableRowColumn> {item.applyAmount ? formatMoneyYuan(item.applyAmount) : '0.00'}</TableRowColumn>
                            <TableRowColumn> {item.loanUsed}</TableRowColumn>
                            <TableRowColumn> {item.contactName}</TableRowColumn>
                            <TableRowColumn> {item.contactPhone}</TableRowColumn>
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
  getLoanIntentionList: PropTypes.func,
  loanIntentionSearch: PropTypes.func
}
Content.defaultProps = {
  data: {},
  getLoanIntentionList: () => { },
  loanIntentionSearch: () => { }
}

export default connect(state => ({
  data: state.loanIntentionQuery
}), dispatch => ({
  getLoanIntentionList: bindActionCreators(action.getLoanIntentionList, dispatch),
  loanIntentionSearch: bindActionCreators(action.loanIntentionSearch, dispatch)
}))(Content)