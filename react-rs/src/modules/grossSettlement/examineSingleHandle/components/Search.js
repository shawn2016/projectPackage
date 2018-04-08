/**
 * 收款方信息部分
 * （单笔经办）
 */
import React, { PureComponent } from 'react'
import QBInput from 'components/QBInput'
import QBSelect from 'components/QBSelect'
import QBDatePicker from 'components/QBDatePicker'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import cookieStorage from 'utils/cookieStorage'
import getRequest from 'utils/getRequest'
import * as actions from '../redux/action'
import '../redux/reducer'
//let now = new Date(new Date())
class Search extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isTestRule: false,
    }
  }
  componentWillMount() {
    (async () => {
      let data = await getRequest({
        path: '/account/balance/getList',
        method: 'POST',
        param: {}
      })
      let curArr = []
      let userInfo = {}
      if (JSON.stringify(cookieStorage.getCookie('userInfo')) && cookieStorage.getCookie('userInfo').token) {
        userInfo = cookieStorage.getCookie('userInfo')
      }
      if (data && data.data && data.data.body && data.data.body.accounts) {
        let accoutAry = data.data.body.accounts
        for (let i = 0; i < accoutAry.length; i++) {
          let curObj = {}
          if (accoutAry[i].accountName === null) {
            curObj.text = ''
          } else {
            curObj.text = accoutAry[i].accountName
          }
          if (userInfo && userInfo.isCfcaUser === '1') {
            curObj.value = accoutAry[i].virtualAccountNo
            curObj.text = accoutAry[i].umbrellaAccountNo
          } else {
            curObj.value = accoutAry[i].virtualAccountNo
            curObj.text = accoutAry[i].umbrellaAccountNo
          }
          curArr.push(curObj)
        }
      }
      this.setState({
        companyAccList: curArr
      })
    })()
    this.props.updateSearchInfo()
    this.props.getOrderList({ ...this.props.queryInfo, page: 1, rows: 10 })
  }
  componentWillUnmount = () => {
    this.clean()
  }
  clean = () => {
    this.payerAccountNo.setValue({ text: '全部', value: null })
    this.exceptDate.clearInput('')
    this.exceptDate.clearInput1('')
    this.createTime.clearInput('')
    this.createTime.clearInput1('')
    this.outSerialNo.setValue('')
    this.receiverAccountName.setValue('')
    this.amount.setValue({
      startValue: '',
      endValue: ''
    })
    this.props.updateSearchInfo({
      payerAccountNo: null,
      createTimeFrom: null,
      createTimeTo: null,
      exceptDateFrom: null,
      exceptDateTo: null,
      outSerialNo: null,
      receiverAccountName: null,
      amountFrom: null,
      amountTo: null
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
              options={this.state.companyAccList}
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
            <QBInput
              label="收款方名称"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              isTestRule={this.state.isTestRule}
              handleChange={value => this.props.updateSearchInfo({
                receiverAccountName: value
              })}
              ref={ref => this.receiverAccountName = ref}
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
                  createTimeFrom: val.startDate,
                  createTimeTo: val.endDate
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
                  exceptDateFrom: val.startDate,
                  exceptDateTo: val.endDate
                })
              }}
              ref={ref => this.exceptDate = ref}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
            <QBInput
              label="金额（元）"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              isRange
              isTestRule={this.state.isTestRule}
              pattern={/^\d+$/}
              errorMsg="结束值不能小于开始值，且都为整数"
              handleChange={value => this.props.updateSearchInfo({
                amountFrom: value.startValue ? Math.round(value.startValue * 100) : value.startValue,
                amountTo: value.endValue ? Math.round(value.endValue * 100) : value.endValue
              })}
              ref={ref => this.amount = ref}
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
      if (this.receiverAccountName.getErrStatus() || this.createTime.getErrStatus() || this.exceptDate.getErrStatus() || this.outSerialNo.getErrStatus() || this.receiverAccountName.getErrStatus() || this.amount.getErrStatus()) {
        console.log('有错')
      } else {
        this.props.isSearch(true)
        this.props.getOrderList({ ...this.props.queryInfo, ...{ page: 1 } })
      }
    })
  }
}


Search.propTypes = {
  queryInfo: PropTypes.object,
  companyAccList: PropTypes.array,
  updateSearchInfo: PropTypes.func,
  getCompanyAccList: PropTypes.func,
  getStatusList: PropTypes.func,
  getOrderList: PropTypes.func,
  isSearch: PropTypes.func
}
Search.defaultProps = {
  queryInfo: {},
  companyAccList: [],
  updateSearchInfo: () => { },
  getCompanyAccList: () => { },
  getStatusList: () => { },
  getOrderList: () => { },
  isSearch: () => { }
}

export default connect(state => ({
  queryInfo: state.GSESH_batchHandleExamineInfo && state.GSESH_batchHandleExamineInfo.GSESH_queryInfo,
  companyAccList: state.GSESH_batchHandleExamineInfo && state.GSESH_batchHandleExamineInfo.GSESH_companyAccList,
}), dispatch => ({
  isSearch: bindActionCreators(actions.GSESH_isBatchExamineSearch, dispatch),
  updateSearchInfo: bindActionCreators(actions.GSESH_updateBatchExamineSearchInfo, dispatch),
  getCompanyAccList: bindActionCreators(actions.GSESH_getBatchExamineCompanyAccList, dispatch),
  getOrderList: bindActionCreators(actions.GSESH_getBatchExamineOrderList, dispatch)
}))(Search)