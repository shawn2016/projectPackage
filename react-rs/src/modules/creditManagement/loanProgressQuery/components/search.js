import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QBInput from 'components/QBInput'
import QBDatePicker from 'components/QBDatePicker'
import * as action from '../redux/actions'
import '../redux/reducer'

class Search extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      params: {},
      isShowErrorHint: false
    }
  }
  /* 获取查询参数 */
  getSearchDate = () => {
    const { params } = this.state
    this.setState({
      isShowErrorHint: true
    }, () => {
      !this.applyDate.getErrStatus()
        && !this.loan.getErrStatus() ?
        this.props.loanProgressSearch(params)
        && this.props.getLoanProgressList(params) : null
    })
  }
  /* 清空查询参数 */
  clearSearchParams = () => {
    this.orderNo.setValue('')
    this.loan.setValue({ startValue: '', endValue: '' })
    this.applyDate.setValue({ startDate: '', endDate: '' })
    this.props.clearLoanProgressSearch()
    this.setState({
      isShowErrorHint: true
    })
  }
  componentWillUnmount = () => {
    this.clearSearchParams()
  }
  render() {
    const orderLabelClass = 'rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg'
    const orderInputClass = 'rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24'
    const dateLabelClass = 'rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg'
    const dateInputClass = 'rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24 rob-input-date'
    const loanLabelClass = 'rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg'
    const loanInputClass = 'rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24'
    return (
      <div className="qb-search-g">
        <div className="rob-row rob-no-gutters">
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
            <QBDatePicker
              label="申请日期"
              labelClass={dateLabelClass}
              inputClass={dateInputClass}
              handleSelect={(val) => {
                this.state.params.applyTimeFrom = val.startDate || null
                this.state.params.applyTimeTo = val.endDate || null
                this.setState({ params: { ...this.state.params } })
              }}
              isTestRule={this.state.isShowErrorHint}
              ref={(DOM) => { this.applyDate = DOM }}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
            <QBInput
              name="text"
              type="text"
              label="贷款金额（元）"
              pattern={/^\d+$/}
              errorMsg="结束值不能小于开始值，且都为整数"
              labelClass={loanLabelClass}
              inputClass={loanInputClass}
              handleChange={(val) => {
                this.state.params.loanAmountFrom = (Math.round(val.startValue * 100)) || null
                this.state.params.loanAmountTo = (Math.round(val.endValue * 100)) || null
                this.setState({ params: { ...this.state.params } })
              }}
              isTestRule={this.state.isShowErrorHint}
              ref={(DOM) => { this.loan = DOM }}
              isRange
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
            <QBInput
              name="text"
              type="text"
              label="订单编号"
              labelClass={orderLabelClass}
              inputClass={orderInputClass}
              handleChange={(val) => {
                this.setState({ params: { ...this.state.params, orderNo: val } })
              }}
              isTestRule={this.state.isShowErrorHint}
              ref={(DOM) => { this.orderNo = DOM }}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 qb-pull-right-g column text-left">
            <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24 rob-col-xs-24">
              <button className="rob-btn rob-btn-danger rob-btn-circle mr10 pd42" type="button" onClick={this.getSearchDate}>查询</button>
              <button className="rob-btn rob-btn-minor rob-btn-circle pd42" type="button" onClick={this.clearSearchParams}>清空</button>
            </div>
          </div>
          <div className="rob-col-lg-6 column" />
          <div className="rob-col-lg-6 column" />
        </div>
      </div>
    )
  }
}
Search.propTypes = {
  data: PropTypes.object,
  getLoanProgressList: PropTypes.func,
  loanProgressSearch: PropTypes.func,
  clearLoanProgressSearch: PropTypes.func
}
Search.defaultProps = {
  data: {},
  getLoanProgressList: () => { },
  loanProgressSearch: () => { },
  clearLoanProgressSearch: () => { }
}

export default connect(state => ({
  data: state.loanProgressQuery
}), dispatch => ({
  getLoanProgressList: bindActionCreators(action.getLoanProgressList, dispatch),
  loanProgressSearch: bindActionCreators(action.loanProgressSearch, dispatch),
  clearLoanProgressSearch: bindActionCreators(action.clearLoanProgressSearch, dispatch)
}))(Search)