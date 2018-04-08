import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Dialog from 'react-robotUI/dialog'
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
import request from 'utils/getRequest.js'
import * as action from '../redux/actions'
import '../redux/reducer'

class Content extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      paybackParams: {},
      PaginationConf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        dataCount: 0,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false,
        onChange: (currentPage) => {
          this.props.repaymentSearch()
          this.setState({ PaginationConf: { ...this.state.PaginationConf, currentPage } })
          let params = this.props.data.repaymentSearch
          params.page = currentPage
          params.rows = this.state.PaginationConf.pageSize
          this.props.getRepaymentList(params)
        }
      },
      values: []
    }
  }
  /* 初始化获取数据 */
  componentWillMount() {
    this.props.getRepaymentList()
  }
  /* 获取数据后，设置dataCount */
  componentWillReceiveProps(nextProps) {
    let values = []
    const { data = {} } = nextProps
    if (data && data.repaymentData && data.repaymentData.body && data.repaymentData.body.values) {
      values = data.repaymentData.body.values
      let _pageParam = nextProps.data.repaymentData.body.pagenation
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
  /* 还款 */
  payBackAll = (id) => {
    (async () => {
      let resData = await request({
        path: '/loans/repay/getAmountTotal',
        method: 'POST',
        param: { loanNo: id }
      })
      if (resData.data.respCode === '000000') {
        this._paybackAlert(resData.data.body)
        this.state.paybackParams.amount = resData.data.body.amount
        this.state.paybackParams.loanNo = id
        this.setState({ paybackParams: { ...this.state.paybackParams } })
      }
      // if (resData.data.respCode !== '000000') {
      //   this.formatAlertInfo(resData.data.respMsg)
      // } else {
      //   this._paybackAlert(resData.data.body)
      //   this.state.paybackParams.amount = resData.data.body.amount
      //   this.state.paybackParams.loanNo = id
      //   this.setState({ paybackParams: { ...this.state.paybackParams } })
      // }
    })()
  }
  /* format alert Info */
  formatAlertInfo = (text) => {
    this.setState({
      alertTitle: '',
      alertTitleClass: '',
      showAlert: true,
      alertContent: text,
      alertAutoClose: true,
      alertBtns: '',
      alertBtnsClass: '',
      alertType: 'bg_icon qb-icon-fail'
    })
  }
  /* 关闭alert弹出框 */
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'successPayback') {
      (async () => {
        let resPayback = await request({
          path: '/loans/repay/saveAmountTotal',
          method: 'POST',
          param: this.state.paybackParams
        })
        if (resPayback.data.respCode === '000000') {
          let paybackBtns = [
            { label: '确定', state: 'reGetData', className: 'rob-btn-danger rob-btn-circle' }
          ]
          this.setState({
            alertTitle: '',
            alertTitleClass: '',
            showAlert: true,
            alertAutoClose: false,
            alertContent: '已成功申请还款，请确保账户余额充足！',
            alertBtns: paybackBtns,
            alertBtnsClass: 'rob-alert-button-color rob-alert-button-45',
            alertType: ''
          })
        }
      })()
    } else if (type === 'reGetData') {
      this.props.getRepaymentList()
    }
  }
  /* 还款弹出框 */
  _paybackAlert = (data) => {
    let paybackBtns = [
      { label: '取消', state: 'cancelPayback', className: 'rob-btn rob-btn-minor rob-btn-circle' },
      { label: '确定', state: 'successPayback', className: 'rob-btn rob-btn-danger rob-btn-circle' }
    ]
    let paybackContent = (
      <div className="qb-form-group-g clearfix text-align">
        <div className="rob-col-lg-offset-3 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
          <div className="rob-form-group">
            <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
              <label className="rob-input-label">还款期次:</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
              <div className="rob-input-item ">
                <label className="rob-input-label" style={{ whiteSpace: 'inherit' }}>{data.periods}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="rob-col-lg-offset-3 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
          <div className="rob-form-group">
            <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
              <label className="rob-input-label">还款金额(元):</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
              <div className="rob-input-item ">
                <label className="rob-input-label">{formatMoneyYuan(data.amount)}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    this.setState({
      alertTitle: '还款',
      alertTitleClass: 'rob-alert-title rob-alert-title-color',
      showAlert: true,
      alertAutoClose: false,
      alertContent: paybackContent,
      alertBtns: paybackBtns,
      alertBtnsClass: 'rob-alert-button-color',
      alertType: ''
    })
  }
  render() {
    const repaymentState = {
      1: '逾期',
      2: '待还款',
      3: '还款中',
      4: '提前还款',
      5: '已结清'
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
                      <TableHeaderColumn> 订单编号</TableHeaderColumn>
                      <TableHeaderColumn> 放款日期</TableHeaderColumn>
                      <TableHeaderColumn> 放款金额(元)</TableHeaderColumn>
                      <TableHeaderColumn> 本期应还款日</TableHeaderColumn>
                      <TableHeaderColumn> 应还总金额(元)</TableHeaderColumn>
                      <TableHeaderColumn> 剩余待还(元)</TableHeaderColumn>
                      <TableHeaderColumn> 还款状态</TableHeaderColumn>
                      <TableHeaderColumn> 操作</TableHeaderColumn>
                    </TableHeader>
                    <TableBody>
                      {
                        this.state.values.map((item, i) => (
                          <TableRow key={i}>
                            <TableRowColumn className="text-center">{(this.state.PaginationConf.pageSize * (this.state.PaginationConf.currentPage - 1)) + i + 1}</TableRowColumn>
                            <TableRowColumn> {item.loanNo}</TableRowColumn>
                            <TableRowColumn> {formatDay(item.loanTime)}</TableRowColumn>
                            <TableRowColumn> {item.loanAmount ? formatMoneyYuan(item.loanAmount) : '0.00'}</TableRowColumn>
                            <TableRowColumn> {formatDay(item.shouldPayDate)}</TableRowColumn>
                            <TableRowColumn> {item.shouldPayAmountTotal ? formatMoneyYuan(item.shouldPayAmountTotal) : '0.00'}</TableRowColumn>
                            <TableRowColumn> {item.unrepayPrinciple ? formatMoneyYuan(item.unrepayPrinciple) : '0.00'}</TableRowColumn>
                            <TableRowColumn> {repaymentState[item.state]}</TableRowColumn>
                            <TableRowColumn>
                              {item.state === 4 || item.state === 5 ? ''
                                : <a href="javascript:void(0)" onClick={() => this.payBackAll(item.loanNo)} className="qb-table-g__handle">还款</a>
                              }
                              <Link to={{ pathname: '/creditManagement/repaymentQueryDetail', state: { id: item.loanNo } }} className="qb-table-g__handle">详情</Link>
                            </TableRowColumn>
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
        <Dialog
          showCover
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          autoClose={this.state.alertAutoClose}
          timeout={2}
          onRequestClose={this.alertClose}
          title={this.state.alertTitle}
          titleClassName={this.state.alertTitleClass}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
}
Content.propTypes = {
  data: PropTypes.object,
  getRepaymentList: PropTypes.func,
  repaymentSearch: PropTypes.func
}
Content.defaultProps = {
  data: {},
  getRepaymentList: () => { },
  repaymentSearch: () => { }
}

export default connect(state => ({
  data: state.repaymentData
}), dispatch => ({
  getRepaymentList: bindActionCreators(action.getRepaymentList, dispatch),
  repaymentSearch: bindActionCreators(action.repaymentSearch, dispatch)
}))(Content)