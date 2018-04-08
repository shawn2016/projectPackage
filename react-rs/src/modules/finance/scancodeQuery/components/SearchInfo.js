import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QBDatepicker from 'components/QBDatePicker'
import QBInput from 'components/QBInput'
import QBSelect from 'components/QBSelect'
import { timestampFormat } from 'utils/filterCommon'
import * as actions from '../redux/actions'
import '../redux/reducer'
let typeList = [
  { text: '全部', value: '' },
  { text: '银行卡刷卡', value: '10001' },
  { text: '微信', value: '20001' },
  { text: '支付宝', value: '30001' },
  { text: 'QQ钱包 ', value: '40001' },
  { text: '余额收款 ', value: '50001' }
]
let dataSourceState = [
  { text: '全部', value: '' },
  { text: '处理中', value: [0, 40, 50] },
  { text: '交易成功', value: [100] },
  { text: '交易失败 ', value: [-100] }
]
let now = new Date(new Date())
const startDatetext = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() //eslint-disable-line
const startDatetext2 = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() //eslint-disable-line
const startDatetext3 = timestampFormat(Date.parse(new Date()) + (1000 * 60 * 60 * 24), 6, true) //eslint-disable-line
class SearchHead extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      defaultTime: {
        startDate: startDatetext,
        endDate: startDatetext
      },
      isTestRule: false
    }
  }
  static propTypes = {
    searchInfo: PropTypes.object,
    // accountList: PropTypes.array,
    getList: PropTypes.func,
    upDateSearchInfo: PropTypes.func,
    clearSearchInfo: PropTypes.func,
    resetCurrentPage: PropTypes.func
  }
  static defaultProps = {
    searchInfo: {},
    // accountList: [],
    getList: () => { },
    upDateSearchInfo: () => { },
    clearSearchInfo: () => { },
    resetCurrentPage: () => { }
  }
  componentWillMount = () => {
    this.props.upDateSearchInfo({ createTimeFrom: startDatetext2, createTimeTo: startDatetext3 })
    this.props.getList({ ...this.props.searchInfo, page: 1, rows: 10, createTimeFrom: startDatetext2, createTimeTo: startDatetext3 })
  }
  componentWillUnmount = () => {
    this.props.clearSearchInfo()
    this.clear()
  }
  search = () => {
    this.setState({
      isTestRule: true
    }, () => {
      !this.date.getErrStatus()
        && !this.posAmount.getErrStatus() ?
        this.props.getList(this.props.searchInfo) : null
    })
    // this.props.resetCurrentPage()
  }
  clear = () => {
    this.code.setValue('')
    this.date.clearInput('')
    this.date.clearInput1('')
    this.date.setValue({ startDate: '', endDate: '' })
    this.outSerialNo.setValue('')
    this.type.setValue('')
    this.posAmount.setValue({ startValue: '', endValue: '' })
    this.status.setValue('')
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
            <li className="active">POS/扫码交易查询</li>
          </ol>
        </div>
        <div className="qb-search-g">
          <div className="rob-row rob-no-gutters">
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24  ">
              <div className="rob-form-group">
                <QBInput
                  label="二维码编号"
                  containErrorIcon
                  isTestRule={this.state.isTestRule}
                  labelClass="rob-col-lg-5 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-19 rob-col-md-19 rob-col-sm-24 rob-col-xs-24 qb-no-padding-lf"
                  handleChange={(value) => this.props.upDateSearchInfo({ qrcode: value })}
                  ref={(DOM) => { this.code = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24  ">
              <div className="rob-form-group">
                <QBDatepicker
                  label="交易日期"
                  isShortcut
                  shortcutList={[
                    '今天', '最近一周', '最近一个月', '最近三个月'
                  ]}
                  isTestRule={this.state.isTestRule}
                  defaultValue={this.state.defaultTime}
                  labelClass=" rob-col-lg-5 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-19 rob-col-md-19 rob-col-sm-24 rob-col-xs-24 rob-input-date qb-no-padding-lf"
                  handleSelect={value => { this.props.upDateSearchInfo({ createTimeFrom: value.startDate, createTimeTo: value.endDate }) }}
                  ref={(DOM) => { this.date = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24  ">
              <div className="rob-form-group">
                <QBInput
                  label="订单编号"
                  containErrorIcon
                  isTestRule={this.state.isTestRule}
                  labelClass="rob-col-lg-5 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-19 rob-col-md-19 rob-col-sm-24 rob-col-xs-24 qb-no-padding-lf"
                  handleChange={(value) => this.props.upDateSearchInfo({ outSerialNo: value })}
                  ref={(DOM) => { this.outSerialNo = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24  ">
              <div className="rob-form-group">
                <QBSelect
                  label="支付方式"
                  labelClass="rob-col-lg-5 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-19 rob-col-md-19 rob-col-sm-24 rob-col-xs-24 qb-no-padding-lf"
                  options={typeList}
                  defaultValue=""
                  handleSelect={value => { this.props.upDateSearchInfo({ payChannel: value.value }) }}
                  ref={(DOM) => { this.type = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24  ">
              <div className="rob-form-group">
                <QBInput
                  label="交易金额"
                  containErrorIcon
                  isRange
                  isTestRule={this.state.isTestRule}
                  pattern={/^\d+$/}
                  errorMsg="结束值不能小于开始值，且都为整数"
                  labelClass="rob-col-lg-5 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-19 rob-col-md-19 rob-col-sm-24 rob-col-xs-24 qb-no-padding-lf"
                  handleChange={(value) => this.props.upDateSearchInfo({ amountFrom: Math.round(value.startValue * 100) || null, amountTo: Math.round(value.endValue * 100) || null })}
                  ref={(DOM) => { this.posAmount = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24  ">
              <div className="rob-form-group">
                <QBSelect
                  label="交易状态"
                  labelClass="rob-col-lg-5 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-19 rob-col-md-19 rob-col-sm-24 rob-col-xs-24 qb-no-padding-lf"
                  options={dataSourceState}
                  defaultValue=""
                  handleSelect={value => { this.props.upDateSearchInfo({ statusList: value.value }) }}
                  ref={(DOM) => { this.status = DOM }}
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
  searchInfo: state.FSQ_chargeScanQueryData && state.FSQ_chargeScanQueryData.FSQ_upDateSQSearchInfo,
}), dispatch => ({
  clearSearchInfo: bindActionCreators(actions.FSQ_clearSearchInfo, dispatch),
  upDateSearchInfo: bindActionCreators(actions.FSQ_upDateSQSearchInfo, dispatch),
  getList: bindActionCreators(actions.FSQ_getSqList, dispatch),
  resetCurrentPage: bindActionCreators(actions.FSQ_resetCurrentPage, dispatch),
}))(SearchHead)