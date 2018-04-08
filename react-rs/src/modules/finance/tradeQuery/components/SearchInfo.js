import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QBDatepicker from 'components/QBDatePicker'
import QBInput from 'components/QBInput'
import { timestampFormat } from 'utils/filterCommon'
import QBSelect from 'components/QBSelect'
import * as actions from '../redux/actions'
import '../redux/reducer'
let typeList = [
  { text: '全部', value: '' },
  { text: '收入', value: '10' },
  { text: '支出 ', value: '20' }
]
let now = new Date(new Date())
const startDatetext = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() //eslint-disable-line
const startDatetext2 = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() //eslint-disable-line
const startDatetext3 = timestampFormat(Date.parse(new Date()) + (1000 * 60 * 60 * 24), 6, true) //eslint-disable-line
class SearchHead extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isTestRule: false,
      defaultTime: {
        startDate: startDatetext,
        endDate: startDatetext
      }
    }
  }
  static propTypes = {
    searchInfo1: PropTypes.object,
    accountList1: PropTypes.array,
    getAccountList: PropTypes.func,
    getList: PropTypes.func,
    upDateSearchInfo: PropTypes.func,
    clearSearchInfo: PropTypes.func,
    resetCurrentPage: PropTypes.func,
    isTestRule: PropTypes.bool
  }
  static defaultProps = {
    searchInfo1: {},
    accountList1: [],
    getAccountList: () => { },
    getList: () => { },
    upDateSearchInfo: () => { },
    clearSearchInfo: () => { },
    resetCurrentPage: () => { },
    isTestRule: false
  }
  componentWillMount = () => {
    this.props.getAccountList({ page: 1, rows: 10, receiveTimeFrom: startDatetext2, receiveTimeTo: startDatetext3 }).then(() => {
      if (this.props.accountList1) {
        this.account.setValue({ text: this.props.accountList1[0].text, value: this.props.accountList1[0].value })
        this.type.setValue({ text: typeList[0].text, value: typeList[0].value })
        this.props.upDateSearchInfo({
          accountNo: this.props.accountList1[0].value,
          receiveTimeFrom: startDatetext2,
          receiveTimeTo: startDatetext3
        })
      }
      //this.props.getList(this.props.searchInfo1)
      this.props.getList({ ...this.props.searchInfo1, page: 1, rows: 10, receiveTimeFrom: startDatetext2, receiveTimeTo: startDatetext3 })
    })
  }
  componentWillReceiveProps = () => {
  }
  componentWillUnmount = () => {
    this.clear()
  }
  search = () => {
    this.setState({
      isTestRule: true
    }, () => {
      if (!this.date.getErrStatus()
        && !this.amount.getErrStatus()) {
        this.props.getList(this.props.searchInfo1)
        this.props.resetCurrentPage()
      }
    })
  }
  clear = () => {
    /* this.account.setValue({ text: '全部', value: '' })
     this.date.clearInput('')
     this.date.clearInput1('')
     this.payName.setValue('')
     this.payNo.setValue('')
     this.amount.setValue({ startValue: '', endValue: '' })
     this.type.setValue({ text: '全部', value: '' })
     this.props.clearSearchInfo()*/
    //this.account.setValue({ text: '全部', value: '' })
    this.date.clearInput('')
    this.date.clearInput1('')
    this.date.setValue({ startDate: '', endDate: '' })
    //this.date.clearInput1('')
    this.type.setValue({ text: '全部', value: '' })
    this.amount.setValue({ startValue: '', endValue: '' })
    this.payName.setValue('')
    this.payNo.setValue('')
    let accountList1demo = ''
    if (this.props.accountList1) {
      accountList1demo = this.props.accountList1[0].value
    }
    this.props.clearSearchInfo(accountList1demo)
    this.setState({
      isTestRule: true
    })
  }
  render() {
    return (
      <div className="qb-panel-g qb-search-g--layout">
        <div className="qb-column-header-g qb-border-bottom">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li><i className="qb-icon-account" style={{ marginRight: '5px' }} />财务查询</li>
            <li className="active">交易查询</li>
          </ol>
        </div>
        <div className="qb-search-g">
          <div className="rob-row rob-no-gutters">
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
              <div className="rob-form-group">
                <QBSelect
                  label="账户名称"
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  defaultValue={'1'}
                  options={this.props.accountList1}
                  handleSelect={value => { this.props.upDateSearchInfo({ accountNo: value.value }) }}
                  ref={(DOM) => { this.account = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
              <div className="rob-form-group">
                <QBDatepicker
                  label="交易日期"
                  shortcutList={['今天', '最近一周', '最近一个月', '最近三个月']}
                  defaultValue={this.state.defaultTime}
                  isTestRule={this.state.isTestRule}
                  labelClass=" rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24 rob-input-date"
                  isShortcut
                  handleSelect={value => { this.props.upDateSearchInfo({ receiveTimeFrom: value.startDate, receiveTimeTo: value.endDate }) }}
                  ref={(DOM) => { this.date = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
              <div className="rob-form-group">
                <QBInput
                  label="收（付）方名称"
                  containErrorIcon
                  isTestRule={this.state.isTestRule}
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  handleChange={(value) => this.props.upDateSearchInfo({ accountName: value })}
                  ref={(DOM) => { this.payName = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
              <div className="rob-form-group">
                <QBInput
                  label="交易流水号"
                  containErrorIcon
                  isTestRule={this.state.isTestRule}
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  handleChange={(value) => this.props.upDateSearchInfo({ outSerialNo: value })}
                  ref={(DOM) => { this.payNo = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
              <div className="rob-form-group">
                <QBInput
                  label="交易金额(元)"
                  containErrorIcon
                  isRange
                  isTestRule={this.state.isTestRule}
                  pattern={/^\d+$/}
                  errorMsg="结束值不能小于开始值，且都为整数"
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  handleChange={(value) => this.props.upDateSearchInfo({ amountFrom: value.startValue ? Math.round(value.startValue * 100) : value.startValue, amountTo: value.endValue ? Math.round(value.endValue * 100) : value.endValue })}
                  ref={(DOM) => { this.amount = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
              <div className="rob-form-group">
                <QBSelect
                  label="资金流向"
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  options={typeList}
                  defaultValue={'1'}
                  handleSelect={value => { this.props.upDateSearchInfo({ payType: value.value }) }}
                  ref={(DOM) => { this.type = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 qb-pull-right-g column text-left">
              <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24 rob-col-xs-24">
                <button onClick={this.search} className="rob-btn rob-btn-danger rob-btn-circle mr10 pd42" type="button">查询</button>
                <button onClick={this.clear} className="rob-btn rob-btn-minor rob-btn-circle pd42" type="button">清空</button>
              </div>
            </div>
            <div className="rob-col-lg-6 column" />
            <div className="rob-col-lg-6 column" />
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  accountList1: state.FTQ_tradeQueryData && state.FTQ_tradeQueryData.FTQ_accountList1,
  searchInfo1: state.FTQ_tradeQueryData && state.FTQ_tradeQueryData.FTQ_upDateSearchInfo,
}), dispatch => ({
  clearSearchInfo: bindActionCreators(actions.FTQ_clearSearchInfo, dispatch),
  upDateSearchInfo: bindActionCreators(actions.FTQ_upDateSearchInfo, dispatch),
  getList: bindActionCreators(actions.FTQ_getTqList, dispatch),
  getAccountList: bindActionCreators(actions.FTQ_getAccountList, dispatch),
  resetCurrentPage: bindActionCreators(actions.FTQ_resetCurrentPage, dispatch),
}))(SearchHead)