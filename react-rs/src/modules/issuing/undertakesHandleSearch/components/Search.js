/**
 * 收款方信息部分
 * （批量经办）
 */
import React, { PureComponent } from 'react'
import QBInput from 'components/QBInput'
import cookieStorage from 'utils/cookieStorage'
import QBSelect from 'components/QBSelect'
import QBDatePicker from 'components/QBDatePicker'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { timestampFormat } from 'utils/filterCommon'
import PropTypes from 'prop-types'
import * as actions from '../redux/action'
import '../redux/reducer'
let now = new Date(new Date())
const startDatetext = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() //eslint-disable-line
const startDatetext2 = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() //eslint-disable-line
const startDatetext3 = timestampFormat(Date.parse(new Date()) + (1000 * 60 * 60 * 24), 6, true) //eslint-disable-line
class Search extends PureComponent {
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
    queryInfo: PropTypes.object,
    companyAccList: PropTypes.array,
    statusList: PropTypes.array,
    updateSearchInfo: PropTypes.func,
    getCompanyAccList: PropTypes.func,
    getStatusList: PropTypes.func,
    getOrderList: PropTypes.func,
    resetCurrentPage: PropTypes.func,
  }
  static defaultProps = {
    queryInfo: {},
    companyAccList: [],
    statusList: [],
    updateSearchInfo: () => { },
    getCompanyAccList: () => { },
    getStatusList: () => { },
    getOrderList: () => { },
    resetCurrentPage: () => { },
  }
  componentWillMount() {
    let userInfo = cookieStorage.getCookie('userInfo')
    if (userInfo.companyType && userInfo.companyType === '100') {
      this.setState({
        statusList: [
          {
            text: '全部',
            value: ''
          },
          {
            text: '处理中',
            value: [500001, 800010]
          }, {
            text: '待复核',
            value: [700001]
          }, {
            text: '已撤销',
            value: [700002]
          }, {
            text: '复核拒绝',
            value: [700005]
          }, {
            text: '已过期',
            value: [700006]
          }, {
            text: '审核通过',
            value: [700007]
          }, {
            text: '支付失败',
            value: [800019, 800049]
          }, {
            text: '部分成功',
            value: [800041]
          }, {
            text: '支付成功',
            value: [800040]
          }
        ]
      })
    }
    if (userInfo.companyType && userInfo.companyType === '200') {
      this.setState({
        statusList: [
          {
            text: '全部',
            value: ''
          },
          {
            text: '处理中',
            value: [500001, 700001, 700002, 700005, 700007, 800010]
          }, {
            text: '支付失败',
            value: [700006, 800019, 800049]
          }, {
            text: '部分成功',
            value: [800041]
          }, {
            text: '支付成功',
            value: [800040]
          }
        ]
      })
    }
    this.props.getCompanyAccList()
    this.props.getStatusList()
    //this.props.getOrderList(this.props.queryInfo)
    this.props.updateSearchInfo({ createDateFrom: startDatetext2, createDateTo: startDatetext3 })
    this.props.getOrderList({ ...this.props.queryInfo, page: 1, rows: 10, createDateFrom: startDatetext2, createDateTo: startDatetext3 })
  }
  componentWillUnmount = () => {
    this.clean()
  }
  clean = () => {
    this.payerAccountNo.setValue({ text: '全部', value: null })
    this.status.setValue({ text: '全部', value: null })
    this.exceptDate.clearInput('')
    this.exceptDate.clearInput1('')
    this.createTime.clearInput('')
    this.createTime.clearInput1('')
    this.outSerialNo.setValue('')
    //this.receiverAccountName.setValue('')
    this.payerAccountNo.setValue('')
    this.status.setValue({ text: '全部', value: '' })
    this.amount.setValue({
      startValue: '',
      endValue: ''
    })
    this.amountCount.setValue({
      startValue: '',
      endValue: ''
    })
    this.props.updateSearchInfo({
      payAccountName: null,
      createDateFrom: null,
      createDateTo: null,
      expectDateFrom: null,
      expectDateTo: null,
      outSerialNo: null,
      //receiverAccountName: null,
      statusList: null,
      totalAmountMin: null,
      totalAmountMax: null,
      totalCountMin: null,
      totalCountMax: null
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
              label="付方账户名称"
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
              ref={ref => this.amountCount = ref}
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
              shortcutList={['今天', '最近一周', '最近一个月', '最近三个月']}
              defaultValue={this.state.defaultTime}
              isTestRule={this.state.isTestRule}
              handleSelect={(val) => {
                this.props.updateSearchInfo({
                  createDateFrom: val.startDate,
                  createDateTo: val.endDate
                })
              }}
              isShortcut
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
              ref={ref => this.exceptDate = ref}
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
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
            <QBSelect
              label="状态"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              defaultValue={this.state.statusList[0].value}
              isTestRule={this.state.isTestRule}
              options={this.state.statusList}
              handleSelect={val => {
                this.props.updateSearchInfo({
                  statusList: val.value
                })
              }}
              ref={ref => this.status = ref}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 column text-left">
            <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24 rob-col-xs-24">
              <button
                className="rob-btn rob-btn-danger rob-btn-circle pd42 mr10"
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
      if (!this.createTime.getErrStatus()
        && !this.exceptDate.getErrStatus()
        && !this.outSerialNo.getErrStatus()
        && !this.amount.getErrStatus()
        && !this.amountCount.getErrStatus()
        && !this.status.getErrStatus()) {
        this.props.getOrderList(this.props.queryInfo)
        this.props.resetCurrentPage()
      }
    })
  }
}
export default connect(state => ({
  queryInfo: state.IUTH_singleHandleSearchInfo && state.IUTH_singleHandleSearchInfo.IUTH_queryInfo,
  companyAccList: state.IUTH_singleHandleSearchInfo && state.IUTH_singleHandleSearchInfo.IUTH_companyAccList,
  statusList: state.IUTH_singleHandleSearchInfo && state.IUTH_singleHandleSearchInfo.IUTH_statusList
}), dispatch => ({
  updateSearchInfo: bindActionCreators(actions.IUTH_updateSearchInfo, dispatch),
  getCompanyAccList: bindActionCreators(actions.IUTH_getCompanyAccList, dispatch),
  getStatusList: bindActionCreators(actions.IUTH_getStatusList, dispatch),
  getOrderList: bindActionCreators(actions.IUTH_getOrderList, dispatch),
  resetCurrentPage: bindActionCreators(actions.IUTH_resetCurrentPage, dispatch),
}))(Search)