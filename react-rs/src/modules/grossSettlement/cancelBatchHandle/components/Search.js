/**
 * 查询信息部分
 * （批量经办撤销）
 */
import React, { PureComponent } from 'react'
import QBInput from 'components/QBInput'
import QBSelect from 'components/QBSelect'
import QBDatePicker from 'components/QBDatePicker'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actions from '../redux/action'
import '../redux/reducer'
//let now = new Date(new Date())
//const startDatetext = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() //eslint-disable-line
//const startDatetext2 = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() //eslint-disable-line
class Search extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isTestRule: false,
    }
  }
  componentWillMount() {
    this.props.getCompanyAccList()
    this.props.updateSearchInfo()
    this.props.getOrderList({ ...this.props.queryInfo, page: 1, rows: 10 })
  }
  componentWillUnmount = () => {
    this.clean()
  }
  clean = () => {
    this.payerAccountNo.setValue({ text: '全部', value: null })
    this.expectDate.clearInput('')
    this.expectDate.clearInput1('')
    this.createTime.clearInput('')
    this.createTime.clearInput1('')
    this.outSerialNo.setValue('')
    this.amount.setValue({
      startValue: '',
      endValue: ''
    })
    this.count.setValue({
      startValue: '',
      endValue: ''
    })
    this.props.updateSearchInfo({
      payerAccountNo: null,
      createDateFrom: null,
      createDateTo: null,
      expectDateFrom: null,
      expectDateTo: null,
      outSerialNo: null,
      totalAmountMax: null,
      totalAmountMin: null,
      totalCountMax: null,
      totalCountMin: null
    })
    this.setState({
      isTestRule: true
    })
  }

  render() {
    return (
      <div className="qb-search-g">
        <div className="rob-row rob-no-gutters">
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
            <QBSelect
              label="付款方账户名称"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              isTestRule={this.state.isTestRule}
              options={this.props.companyAccList}
              handleSelect={item => {
                this.props.updateSearchInfo({
                  payerAccountNo: item.value
                })
              }}
              ref={ref => this.payerAccountNo = ref}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
            <QBInput
              label="总笔数（笔）"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              isRange
              isTestRule={this.state.isTestRule}
              pattern={/^\d+$/}
              errorMsg="结束笔数不能小于开始笔数,且不小于零的整数"
              handleChange={value => this.props.updateSearchInfo({
                totalCountMin: value.startValue,
                totalCountMax: value.endValue
              })}
              ref={ref => this.count = ref}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
            <QBInput
              label="总金额（元）"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              isRange
              isTestRule={this.state.isTestRule}
              pattern={/^\d+$/}
              errorMsg="结束值不能小于开始值，且都为整数"
              handleChange={value => this.props.updateSearchInfo({
                totalAmountMin: value.startValue ? Math.round(value.startValue * 100) : value.startValue,
                totalAmountMax: value.endValue ? Math.round(value.endValue * 100) : value.endValue
              })}
              ref={ref => this.amount = ref}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
            <QBDatePicker
              label="创建日期"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              isTestRule={this.state.isTestRule}
              handleSelect={(val) => {
                this.props.updateSearchInfo({
                  createDateFrom: val.startDate,
                  createDateTo: val.endDate
                })
              }}
              ref={ref => this.createTime = ref}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
            <QBDatePicker
              label="期望日"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              isTestRule={this.state.isTestRule}
              handleSelect={val => {
                this.props.updateSearchInfo({
                  expectDateFrom: val.startDate,
                  expectDateTo: val.endDate
                })
              }}
              ref={ref => this.expectDate = ref}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
            <QBInput
              label="业务参考号"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              isTestRule={this.state.isTestRule}
              handleChange={value => this.props.updateSearchInfo({
                outSerialNo: value
              })}
              ref={ref => this.outSerialNo = ref}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 qb-pull-right-g column text-left">
            <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24 rob-col-xs-24">
              <button
                className="rob-btn rob-btn-danger rob-btn-circle mr10 pd42"
                type="button"
                onClick={this._search}
              >查询</button>
              <button className="rob-btn rob-btn-minor rob-btn-circle pd42" type="button" onClick={this.clean} >清空</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  _search = () => {
    this.setState({
      isTestRule: true
    }, () => {
      if (!this.createTime.getErrStatus() && !this.expectDate.getErrStatus() && !this.outSerialNo.getErrStatus() && !this.count.getErrStatus() && !this.amount.getErrStatus()) {
        this.props.getOrderList({ ...this.props.queryInfo, ...{ page: 1 } })
      }
    })
  }
}


Search.propTypes = {
  queryInfo: PropTypes.object,
  pageInfo: PropTypes.object,
  companyAccList: PropTypes.array,
  updateSearchInfo: PropTypes.func,
  getCompanyAccList: PropTypes.func,
  getOrderList: PropTypes.func
}
Search.defaultProps = {
  queryInfo: {},
  pageInfo: {},
  companyAccList: [],
  updateSearchInfo: () => { },
  getCompanyAccList: () => { },
  getOrderList: () => { }
}

export default connect(state => ({
  queryInfo: state.batchHandleCancelInfo && state.batchHandleCancelInfo.queryInfo,
  pageInfo: state.batchHandleCancelInfo && state.batchHandleCancelInfo.pageInfo,
  companyAccList: state.batchHandleCancelInfo && state.batchHandleCancelInfo.companyAccList,
}), dispatch => ({
  updateSearchInfo: bindActionCreators(actions.updateCancelBatchSearchInfo, dispatch),
  getCompanyAccList: bindActionCreators(actions.getCancelBatchCompanyAccList, dispatch),
  getOrderList: bindActionCreators(actions.getCancelBatchOrderList, dispatch)
}))(Search)