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
import Dialog from 'react-robotUI/dialog'
import { formatMoneyYuan, formatDay } from 'utils/filterCommon'
import request from 'utils/getRequest'
import * as action from '../redux/actions'
import '../redux/reducer'

class DetailList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      paybackParams: {
        ids: [],
        periods: [],
        amount: 0
      },
      paymentDisabled: true
    }
  }
  countCheck = 0
  overdueCount = 0
  /* 初始化数据 */
  componentWillMount() {
    this.props.getRepaymentDetailList({ loanNo: this.props.params.id }).then((res) => {
      let tempData = res.data
      console.log(tempData)
      if (tempData.respCode === '000000') {
        tempData.body.forEach((item) => {
          if (item.state === 1) {
            this.overdueCount += 1
            item.isCheck = true //eslint-disable-line
            this.countCheck += 1
          }
        })
      }
      if (this.overdueCount > 0) this.setState({ paymentDisabled: false })
    })
  }
  // checkbox选择
  checkedFunc = (index) => {
    const { data } = this.props,
      { repaymentDetailList } = data,
      { body } = repaymentDetailList
    body[index].isCheck = !body[index].isCheck
    if (body[index].isCheck) {
      this.countCheck += 1
    } else {
      this.countCheck -= 1
    }
    this.countCheck > 0 ? this.setState({ paymentDisabled: false }) : this.setState({ paymentDisabled: true })
    this.setState({ paybackParams: { ...this.state.paybackParams } })
  }
  // 批量还款
  payBackAll = (currentData) => {
    const { data } = this.props,
      { repaymentDetailList } = data,
      { body } = repaymentDetailList
    this.state.paybackParams.ids = []
    this.state.paybackParams.periods = []
    this.state.paybackParams.amount = 0
    if (currentData.id) {
      if (this.overdueCount > 0 && currentData.state !== 1) {
        let haveOverdueBtns = [
          { label: '确定', state: false, className: 'rob-btn-danger rob-btn-circle' }
        ]
        this.setState({
          alertTitle: '',
          alertTitleClass: '',
          showAlert: true,
          alertAutoClose: false,
          alertContent: '当前贷款有逾期，请先还逾期。',
          alertBtns: haveOverdueBtns,
          alertBtnsClass: 'rob-alert-button-color rob-alert-button-45',
          alertType: ''
        })
        return
      }
      this.state.paybackParams.amount = currentData.repayAmount
      this.state.paybackParams.ids.push(currentData.id)
      this.state.paybackParams.periods.push(currentData.repayedPeriod)
      this.state.paybackParams.periods = this.state.paybackParams.periods.join(',')
    } else {
      body.forEach((item) => {
        if (item.isCheck) {
          this.state.paybackParams.periods.push(item.repayedPeriod)
          this.state.paybackParams.ids.push(item.id)
          this.state.paybackParams.amount += item.repayAmount
        }
      })
      this.state.paybackParams.periods = this.state.paybackParams.periods.join(',')
    }
    this.setState({ paybackParams: { ...this.state.paybackParams } })
    this._paybackAlert()
  }
  /* 关闭alert弹出框 */
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'successPayback') {
      (async () => {
        let resPayback = await request({
          path: '/loans/repay/saveAmount',
          method: 'POST',
          param: this.state.paybackParams
        })
        if (resPayback.data.respCode === '000000') {
          let paybackBtns = [
            { label: '确定', state: 'resetData', className: 'rob-btn-danger rob-btn-circle' }
          ]
          this.setState({
            alertTitle: '',
            alertTitleClass: '',
            showAlert: true,
            alertAutoClose: false,
            alertContent: '已成功申请还款，请确保账户余额充足！',
            alertBtns: paybackBtns,
            alertBtnsClass: 'rob-alert-button-color rob-alert-button-45',
            alertType: '',
            paymentDisabled: true
          })
        }
      })()
    } else if (type === 'resetData') {
      this.props.getRepaymentDetailList({ loanNo: this.props.params.id })
    }
  }
  /* 还款弹出框 */
  _paybackAlert = () => {
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
                <label className="rob-input-label" style={{ whiteSpace: 'inherit' }}>{this.state.paybackParams.periods}</label>
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
                <label className="rob-input-label">{this.state.paybackParams.amount ? formatMoneyYuan(this.state.paybackParams.amount) : '0.00'}</label>
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
    const repaymentDetailListState = {
      1: '逾期',
      2: '待还款',
      3: '还款中',
      4: '提前还款',
      5: '已结清'
    }
    let body = []
    if (this.props.data && this.props.data.repaymentDetailList && this.props.data.repaymentDetailList.body) {
      body = this.props.data.repaymentDetailList.body
    }
    return (
      <div className="qb-panel-g clearfix">
        <div className="qb-column-header-g qb-column-header-g--button">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li>还款明细</li>
          </ol>
          <button className="rob-btn rob-btn-minor rob-btn-circle " disabled={this.state.paymentDisabled} onClick={this.payBackAll} type="button">批量还款</button>
        </div>
        <div className="qb-list-g">
          <div className="qb-list-g__table">
            <div className="rob-row clearfix">
              <div className="rob-col-lg-24 column">
                <div className="rob-table-responsive">
                  <Table striped hoverEffect checkboxType={'default'}>
                    <TableHeader>
                      <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
                      <TableHeaderColumn> 还款期次</TableHeaderColumn>
                      <TableHeaderColumn> 应还总额(元)</TableHeaderColumn>
                      <TableHeaderColumn> 实际还款金额</TableHeaderColumn>
                      <TableHeaderColumn> 应还款日</TableHeaderColumn>
                      <TableHeaderColumn> 实际还款日</TableHeaderColumn>
                      <TableHeaderColumn> 应还本金(元)</TableHeaderColumn>
                      <TableHeaderColumn> 手续费(元)</TableHeaderColumn>
                      <TableHeaderColumn> 还款状态</TableHeaderColumn>
                      <TableHeaderColumn> 提前还款手续费(元)</TableHeaderColumn>
                      <TableHeaderColumn> 逾期罚金(元)</TableHeaderColumn>
                      <TableHeaderColumn> 操作</TableHeaderColumn>
                    </TableHeader>
                    <TableBody>
                      {
                        body.map((item, i) => (
                          <TableRow key={i}>
                            <TableRowColumn className="text-center">
                              {item.state === 4 || item.state === 5 ? ''
                                : <input
                                  type="checkbox"
                                  id={i}
                                  disabled={item.state === 1}
                                  style={{ position: 'inherit' }}
                                  className="rob-checkbox-filled-in"
                                  onChange={() => this.checkedFunc(i)}
                                  checked={item.isCheck}
                                />
                              }
                              <label htmlFor={i}>{i + 1}</label>
                            </TableRowColumn>
                            <TableRowColumn>
                              {item.repayedPeriod}
                            </TableRowColumn>
                            <TableRowColumn> {item.repayAmount ? formatMoneyYuan(item.repayAmount) : '0.00'}</TableRowColumn>
                            <TableRowColumn> {item.actuRepayAmount ? formatMoneyYuan(item.actuRepayAmount) : '0.00'}</TableRowColumn>
                            <TableRowColumn> {formatDay(item.repayDate)}</TableRowColumn>
                            <TableRowColumn> {formatDay(item.actuRepayDate)}</TableRowColumn>
                            <TableRowColumn> {item.repayPrinciple ? formatMoneyYuan(item.repayPrinciple) : '0.00'}</TableRowColumn>
                            <TableRowColumn> {item.fee ? formatMoneyYuan(item.fee) : '0.00'}</TableRowColumn>
                            <TableRowColumn><span className={`${item.state === 1 ? 'qb-has-error' : ''}`}> {repaymentDetailListState[item.state]} </span></TableRowColumn>
                            <TableRowColumn> {item.advanFee ? formatMoneyYuan(item.advanFee) : '0.00'}</TableRowColumn>
                            <TableRowColumn> <span className="qb-has-error">{item.overdueFine ? formatMoneyYuan(item.overdueFine) : '0.00'}</span></TableRowColumn>
                            <TableRowColumn>
                              {item.state === 4 || item.state === 5 ? '' : <a href="javascript:void(0)" onClick={() => this.payBackAll(item)} className="qb-table-g__handle">还款</a>}
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
DetailList.propTypes = {
  data: PropTypes.object,
  getRepaymentDetailList: PropTypes.func,
  params: PropTypes.object
}
DetailList.defaultProps = {
  data: {},
  getRepaymentDetailList: () => { },
  params: {}
}

export default connect(state => ({
  data: state.repaymentDetailData
}), dispatch => ({
  getRepaymentDetailList: bindActionCreators(action.getRepaymentDetailList, dispatch)
}))(DetailList)