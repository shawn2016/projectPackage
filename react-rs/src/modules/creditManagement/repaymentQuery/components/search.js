import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QBInput from 'components/QBInput'
import QBSelect from 'components/QBSelect'
import * as action from '../redux/actions'
import '../redux/reducer'

class Search extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      params: {
        state: 'default'
      },
      isShowErrorHint: false
    }
  }
  componentDidMount() {
    console.log(this.state)
  }
  /* 获取查询参数 */
  getSearchDate = () => {
    const { params } = this.state
    if (params.state === 'default') {
      delete (params.state)
    }
    this.setState({
      isShowErrorHint: true
    }, () => {
      this.props.repaymentSearch(params)
      this.props.getRepaymentList(params)
    })
  }
  /* 清空查询参数 */
  clearSearchParams = () => {
    this.loanNo.setValue('')
    this.paybackState.setValue('')
    this.props.clearRepaymentSearch()
    this.setState({
      isShowErrorHint: true
    })
  }
  componentWillUnmount = () => {
    this.clearSearchParams()
  }
  render() {
    const { params } = this.state
    const orderLabelClass = 'rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg'
    const orderInputClass = 'rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24'
    const loanLabelClass = 'rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg'
    const loanInputClass = 'rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24'
    return (
      <div className="qb-search-g">
        <div className="rob-row rob-no-gutters">
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
            <QBInput
              name="text"
              type="text"
              label="订单编号"
              labelClass={orderLabelClass}
              inputClass={orderInputClass}
              handleChange={(val) => {
                this.state.params.loanNo = val
                this.setState({ params: { ...this.state.params } })
              }}
              isTestRule={this.state.isShowErrorHint}
              ref={(DOM) => { this.loanNo = DOM }}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
            <QBSelect
              label="还款状态"
              labelClass={loanLabelClass}
              inputClass={loanInputClass}
              errDirection="bottom"
              options={[
                { text: '全部', value: 'default' },
                { text: '待还款', value: '2' },
                { text: '逾期', value: '1' },
                { text: '已结清', value: '4' }
              ]}
              defaultValue={params.state}
              handleSelect={(val) => {
                this.setState({ params: { ...this.state.params, state: val.value } })
              }}
              ref={(DOM) => { this.paybackState = DOM }}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 column text-left qb-query-min-g">
            <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24 rob-col-xs-24">
              <button className="rob-btn rob-btn-danger rob-btn-circle pd42 mr10" type="button" onClick={this.getSearchDate}>查询</button>
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
  getRepaymentList: PropTypes.func,
  repaymentSearch: PropTypes.func,
  clearRepaymentSearch: PropTypes.func
}
Search.defaultProps = {
  data: {},
  getRepaymentList: () => {},
  repaymentSearch: () => {},
  clearRepaymentSearch: () => {}
}

export default connect(state => ({
  data: state.repaymentData
}), dispatch => ({
  getRepaymentList: bindActionCreators(action.getRepaymentList, dispatch),
  repaymentSearch: bindActionCreators(action.repaymentSearch, dispatch),
  clearRepaymentSearch: bindActionCreators(action.clearRepaymentSearch, dispatch)
}))(Search)