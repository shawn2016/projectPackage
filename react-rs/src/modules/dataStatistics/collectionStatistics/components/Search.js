/**
 * 收款方信息部分
 * （批量经办）
 */
import React, { PureComponent } from 'react'
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
      },
      payMethodList: [
        {
          text: '全部',
          value: ''
        }, {
          text: '微信',
          value: 20001
        }, {
          text: '支付宝',
          value: 30001
        }
      ],
      qrCode: [
        {
          text: '全部',
          value: ''
        }
      ]
    }
  }
  static propTypes = {
    queryInfo: PropTypes.object,
    companyAccList: PropTypes.array,
    updateSearchInfo: PropTypes.func,
    getCompanyAccList: PropTypes.func,
    getStatusList: PropTypes.func,
    getOrderList: PropTypes.func,
  }
  static defaultProps = {
    queryInfo: {},
    companyAccList: [],
    updateSearchInfo: () => { },
    getCompanyAccList: () => { },
    getStatusList: () => { },
    getOrderList: () => { },
  }
  componentWillMount() {
    this.props.getCompanyAccList()
    this.props.updateSearchInfo({ createTimeFrom: startDatetext2, createTimeTo: startDatetext3 })
    this.props.getOrderList({ ...this.props.queryInfo, createTimeFrom: startDatetext2, createTimeTo: startDatetext3 })
  }
  componentWillUnmount = () => {
    this.clean()
  }
  clean = () => {
    this.createTime.clearInput('')
    this.createTime.clearInput1('')
    //this.receiverAccountName.setValue('')
    this.qrCode.setValue({ text: '全部', value: '' })
    this.payType.setValue({ text: '全部', value: '' })
    this.props.updateSearchInfo({
      qrCode: null,
      createTimeFrom: null,
      createTimeTo: null,
      //receiverAccountName: null,
      payType: null,

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
            <QBDatePicker
              label="交易日期"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              shortcutList={['今天', '最近一周', '最近一个月', '最近三个月']}
              defaultValue={this.state.defaultTime}
              isTestRule={this.state.isTestRule}
              handleSelect={(val) => {
                this.props.updateSearchInfo({
                  createTimeFrom: val.startDate,
                  createTimeTo: val.endDate
                })
              }}
              isShortcut
              ref={ref => this.createTime = ref}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
            <QBSelect
              label="支付方式"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              defaultValue={this.state.payMethodList[0].value}
              isTestRule={this.state.isTestRule}
              options={this.state.payMethodList}
              handleSelect={val => {
                this.props.updateSearchInfo({
                  payType: val.value
                })
              }}
              ref={ref => this.payType = ref}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
            <QBSelect
              label="二维码"
              placeholder="全部"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              isTestRule={this.state.isTestRule}
              defaultValue={this.props.companyAccList[0] && this.props.companyAccList[0].value}
              options={this.props.companyAccList}
              handleSelect={item => {
                this.props.updateSearchInfo({
                  qrCode: item.value
                })
              }}
              ref={ref => this.qrCode = ref}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 " />
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 " />
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
      if (!this.createTime.getErrStatus()) {
        this.props.getOrderList(this.props.queryInfo)
      }
    })
  }
}
export default connect(state => ({
  queryInfo: state.DSCS_singleHandleSearchInfo && state.DSCS_singleHandleSearchInfo.DSCS_queryInfo,
  companyAccList: state.DSCS_singleHandleSearchInfo && state.DSCS_singleHandleSearchInfo.DSCS_companyAccList,
  statusList: state.DSCS_singleHandleSearchInfo && state.DSCS_singleHandleSearchInfo.DSCS_statusList
}), dispatch => ({
  updateSearchInfo: bindActionCreators(actions.DSCS_updateSearchInfo, dispatch),
  getCompanyAccList: bindActionCreators(actions.DSCS_getCompanyAccList, dispatch),
  getOrderList: bindActionCreators(actions.DSCS_getOrderList, dispatch),
}))(Search)