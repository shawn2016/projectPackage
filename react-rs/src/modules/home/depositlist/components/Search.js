import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QBInput from 'components/QBInput'
import QBSelect from 'components/QBSelect'
import QBDatePicker from 'components/QBDatePicker'
import { timestampFormat } from 'utils/filterCommon'
import * as action from '../redux/actions'
let now = new Date(new Date())
const startDatetext = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() //eslint-disable-line
const startDatetext2 = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() //eslint-disable-line
const startDatetext3 = timestampFormat(Date.parse(new Date()) + (1000 * 60 * 60 * 24), 6, true) //eslint-disable-line
class Search extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      searchParams: {},
      params: {
        loan: '',
        operator: '',
        endDate: '',
        applyDateFrom: ''
      },
      defaultTime: {
        startDate: startDatetext,
        endDate: startDatetext
      },
      PaginationConf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        dataCount: 0,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false
      }
    }
  }
  searchParamsChange = (key, value) => {
    if (key === 'date') {
      setTimeout(() => {
        value.endDate ? this.setState({ params: { ...this.state.params, endDate: value.endDate } }) : null
        value.startDate ? this.setState({ params: { ...this.state.params, applyDateFrom: value.startDate } }) : null
      }, 0)
    } else {
      this.setState({ params: { ...this.state.params, [key]: value } })
    }
  }
  // 查询
  getSearchDate = () => {
    this.setState({
      isTestRule: true
    }, () => {
      if (this.loan.getErrStatus() || this.applyDate.getErrStatus()) {
        return
      }
      setTimeout(() => {
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
        params.page = 1
        params.rows = this.state.PaginationConf.pageSize
        this.props.getData(params)
        this.setState({
          params: { ...this.state.params, page: 1 }
        })
        this.props.changeParams(this.state.params, true)
      }, 0)
    })
    this.props.resetCurrentPage()
  }
  // 清空
  clearSearchParams = () => {
    setTimeout(() => {
      this.accountNo.setValue({ text: '全部', value: '全部' })
      this.loan.setValue({ startValue: '', endValue: '' })
      this.operator.setValue('')
      this.applyDate.clearInput('')
      this.applyDate.clearInput1('')
      delete (this.state.params.applyDateFrom)
      delete (this.state.params.receiveTimeFrom)
      delete (this.state.params.endDate)
      delete (this.state.params.receiveTimeTo)
      delete (this.state.params.loan)
      delete (this.state.params.operator)
      delete (this.state.params.accountNo)
      delete (this.state.params.amountFrom)
      delete (this.state.params.amountTo)
      this.setState({
        params: { ...this.state.params, page: 1 }
      })
      this.props.changeParams(this.state.params)
      this.setState({
        isTestRule: true
      })
    }, 0)
  }
  componentWillMount() {
    // 获取账户信息
    let accounts = [
      { text: '全部', value: '全部' },
      { text: '处理中', value: [0, 40, 50] },
      { text: '交易成功', value: [100] },
      { text: '交易失败 ', value: [-100] }]

    this.setState({ params: { ...this.state.params, receiveTimeTo: startDatetext3, receiveTimeFrom: startDatetext2 } }, () => {
      this.props.changeParams(this.state.params, true)
    })

    let accountList = [
    ]
    accounts.forEach(function (item) {
      let accountListItem = {}
      accountListItem = item
      accountListItem.text = item.text
      accountListItem.value = item.value
      accountList.push(accountListItem)
    })
    this.setState({
      accountList
    })
  }
  componentWillUnmount = () => {
    // this.clearSearchParams()
  }
  // 设置value
  isRight = (type, value) => {
    this.setState({
      params: { ...this.state.params, [type]: value.value }
    })
  }

  render() {
    const orderLabelClass = 'rob-col-lg-5  rob-col-md-5 rob-col-sm-24 rob-col-xs-24'
    const orderInputClass = 'rob-col-lg-19 rob-col-md-19 rob-col-sm-24 rob-col-xs-24'
    const dateLabelClass = 'rob-col-lg-5 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg'
    const dateInputClass = 'rob-col-lg-19 rob-col-md-19 rob-col-sm-24 rob-col-xs-24 rob-input-date'
    const loanLabelClass = 'rob-col-lg-5 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg'
    const loanInputClass = 'rob-col-lg-19 rob-col-md-19 rob-col-sm-24 rob-col-xs-24'
    const { accountList = [] } = this.state
    return (<div className="qb-search-g">
      <div className="rob-row rob-no-gutters">
        <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
          <QBDatePicker
            label="入金时间"
            isShortcut
            shortcutList={[
              '今天', '最近一周', '最近一个月', '最近三个月'
            ]}
            emptyMsg="结束时间不能小于开始时间"
            labelClass={dateLabelClass}
            defaultValue={this.state.defaultTime}
            inputClass={dateInputClass}
            isTestRule={this.state.isTestRule}
            handleSelect={(value) => this.searchParamsChange('date', value)}
            ref={(DOM) => { this.applyDate = DOM }}
          />
        </div>
        <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
          <QBInput
            name="text"
            type="text"
            label="入金金额(元)"
            labelClass={loanLabelClass}
            inputClass={loanInputClass}
            handleChange={(value) => this.searchParamsChange('loan', value)}
            ref={(DOM) => { this.loan = DOM }}
            isRange
            isTestRule={this.state.isTestRule}
            errorMsg="结束值不能小于开始值，且都为整数"
            pattern={/^[0-9]\d*$/}
            containRightIcon={false}
          />
        </div>
        <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
          <QBSelect
            name="default"
            label="状态"
            errDirection="bottom"
            required
            defaultValue="全部"
            containErrorIcon
            labelClass={orderLabelClass}
            inputClass={orderInputClass}
            errorMsg="请选择入金账户"
            emptyMsg="请选择入金账户"
            handleSelect={(s) => this.isRight('status', s)}
            options={accountList}
            ref={(node) => this.accountNo = node}
          />
        </div>
        <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
          <QBInput
            name="text"
            type="text"
            label="操作人"
            labelClass={loanLabelClass}
            inputClass={loanInputClass}
            handleChange={(value) => this.searchParamsChange('operator', value)}
            ref={(DOM) => { this.operator = DOM }}
            isTestRule={this.state.isTestRule}
            containRightIcon={false}
          />
        </div>
        <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 column text-left qb-query-min-g">
          <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24 rob-col-xs-24">
            <button className="rob-btn rob-btn-danger rob-btn-circle pd42 mr10" type="button" onClick={this.getSearchDate}>查询</button>
            <button className="rob-btn rob-btn-minor rob-btn-circle pd42" type="button" onClick={this.clearSearchParams}>清空</button>
          </div>
        </div>

      </div>
    </div>)
  }
}
Search.propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func,
  getAccountData: PropTypes.func,
  changeParams: PropTypes.func,
  resetCurrentPage: PropTypes.func,
}
Search.defaultProps = {
  data: {},
  getData: () => { },
  getAccountData: () => { },
  changeParams: () => { },
  resetCurrentPage: () => { },
}

export default connect(DESL_loanProgressQuery => ({
  data: DESL_loanProgressQuery
}), dispatch => ({
  getData: bindActionCreators(action.DESL_getData, dispatch),
  getAccountData: bindActionCreators(action.DESL_getAccountData, dispatch),
  resetCurrentPage: bindActionCreators(action.DESL_reserCurrentPage, dispatch)
}))(Search)