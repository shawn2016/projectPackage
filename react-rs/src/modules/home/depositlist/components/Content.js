import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Pagination from 'react-robotUI/Pagination'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'react-robotUI/Table'

import { formatDate, orderStatus, formatMoneyYuan, timestampFormat } from 'utils/filterCommon'
import * as action from '../redux/actions'
import '../redux/reducer'
let now = new Date(new Date())
const startDatetext = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() //eslint-disable-line
const startDatetext2 = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() //eslint-disable-line
const startDatetext3 = timestampFormat(Date.parse(new Date()) + (1000 * 60 * 60 * 24), 6, true) //eslint-disable-line
class Content extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      params: {
        accountNo: '',
        loan: '',
        operator: '',
        endDate: '',
        applyDateFrom: ''
      },
      PaginationConf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        dataCount: 0,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false,
        onChange: (currentPage) => {
          console.log(this.params)
          setTimeout(() => {
            this.setState({
              PaginationConf: { ...this.state.PaginationConf, currentPage }
            })
            if (this.state.params.accountNo) {
              this.setState({
                params: { ...this.state.params, accountNo: this.state.params.accountNo }
              })
            }
            if (this.state.params.operator) {
              this.setState({
                params: { ...this.state.params, operator: this.state.params.operator }
              })
            }
            if ((this.state.params.loan && this.state.params.loan.startValue) || this.state.params.amountFrom) {
              this.setState({
                params: { ...this.state.params, amountFrom: this.state.params.loan ? Math.round(this.state.params.loan.startValue * 100) : this.state.params.amountFrom }
              })
            } else {
              this.setState({
                params: { ...this.state.params, amountFrom: null }
              })
            }
            if ((this.state.params.loan && this.state.params.loan.endValue) || this.state.params.amountTo) {
              this.setState({
                params: { ...this.state.params, amountTo: this.state.params.loan ? Math.round(this.state.params.loan.endValue * 100) : this.state.params.amountTo }
              })
            } else {
              this.setState({
                params: { ...this.state.params, amountTo: null }
              })
            }
            if (this.state.params.applyDateFrom) {
              this.setState({
                params: { ...this.state.params, receiveTimeFrom: this.state.params.applyDateFrom }
              })
            }
            if (this.state.params.endDate) {
              this.setState({
                params: { ...this.state.params, receiveTimeTo: this.state.params.endDate }
              })
            }
            if (!this.state.params.amountTo === '0' && !this.state.params.amountTo) {
              delete (this.state.params.amountTo)
            }
            if (!this.state.params.amountFrom === '0' && !this.state.params.amountFrom) {
              delete (this.state.params.amountFrom)
            }
            if (this.state.params.status === '全部') {
              delete (this.state.params.status)
            }
            delete (this.state.params.loan)
            delete (this.state.params.endDate)
            delete (this.state.params.applyDateFrom)
            let params = this.state.params
            params.page = currentPage
            params.rows = this.state.PaginationConf.pageSize
            this.props.getData(params)
          }, 0)
        }
      }
    }
  }

  componentDidMount() {
    this.props.getData({ page: 1, rows: 10, receiveTimeFrom: startDatetext2, receiveTimeTo: startDatetext3 }).then(() => {
      console.log('入金记录')
      console.log(this.props.data)
    })
  }
  componentWillReceiveProps(nextProp) {
    this.setState({
      params: nextProp.paramProps
    })
    if (nextProp.isReserCurrentPage === 1) {
      this.pagination.setCurrentPage(1)
      this.props.reserCurrentPage()
    }
    let values = []
    let pagenation = []
    if (nextProp && nextProp.data && nextProp.data.DESL_loanProgressData && nextProp.data.DESL_loanProgressData.body && nextProp.data.DESL_loanProgressData.body.values) {
      values = nextProp.data.DESL_loanProgressData.body.values
    }
    if (nextProp && nextProp.data && nextProp.data.DESL_loanProgressData && nextProp.data.DESL_loanProgressData.body && nextProp.data.DESL_loanProgressData.body.pagenation) {
      pagenation = nextProp.data.DESL_loanProgressData.body.pagenation
    }
    this.setState({
      items: values,
      PaginationConf: { ...this.state.PaginationConf, dataCount: pagenation.itemCount, pageSize: pagenation.pageSize, currentPage: pagenation.pageNo }
    })
  }

  render() {
    console.log('render')
    const { items } = this.state
    return (<div className="qb-panel-g clearfix qb-media-height">
      <div className="qb-list-g">
        <div className="qb-list-g__table">
          <div className="rob-row clearfix">
            <div className="rob-col-lg-24 column">
              <div className="rob-table-responsive">
                <Table striped hoverEffect >
                  <TableHeader>
                    <TableHeaderColumn className="text-center">序号</TableHeaderColumn>
                    <TableHeaderColumn>交易流水号</TableHeaderColumn>
                    <TableHeaderColumn>入金时间</TableHeaderColumn>
                    <TableHeaderColumn>入金金额（元）</TableHeaderColumn>
                    <TableHeaderColumn>操作人</TableHeaderColumn>
                    <TableHeaderColumn>状态</TableHeaderColumn>
                  </TableHeader>
                  <TableBody>
                    {items.map((data, i) => (
                      <TableRow key={i}>
                        <TableRowColumn className="text-center">{(this.state.PaginationConf.pageSize * (this.state.PaginationConf.currentPage - 1)) + i + 1}</TableRowColumn>
                        <TableRowColumn title={data.outSerialNo}>{data.outSerialNo}</TableRowColumn>
                        <TableRowColumn>{formatDate(data.receiveTime)}</TableRowColumn>
                        <TableRowColumn>{formatMoneyYuan(data.amount)}</TableRowColumn>
                        <TableRowColumn title={data.createName}>{data.createName}</TableRowColumn>
                        <TableRowColumn>{orderStatus(data.status)}</TableRowColumn>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <div className="qb-list-g__pagination clearfix">
          <div className="rob-row clearfix">
            <div className="rob-col-lg-24 column">
              <Pagination {...this.state.PaginationConf} ref={(DOM) => this.pagination = DOM} />
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
}
Content.propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func,
  reserCurrentPage: PropTypes.func,
  isReserCurrentPage: PropTypes.number

}
Content.defaultProps = {
  data: {},
  getData: () => { },
  reserCurrentPage: () => { },
  isReserCurrentPage: 0
}

export default connect(state => ({
  data: state.DESL_loanProgressQuery,
  isReserCurrentPage: state.DESL_loanProgressQuery.DESL_isReserCurrentPage
}), dispatch => ({
  getData: bindActionCreators(action.DESL_getData, dispatch),
  reserCurrentPage: bindActionCreators(action.DESL_reserCurrentPage, dispatch)
}))(Content)