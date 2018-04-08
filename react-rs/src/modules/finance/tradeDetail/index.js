import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import timeStamp from 'utils/timeStamp'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { orderStatus, formatMoneyYuan } from 'utils/filterCommon'
import * as action from './redux/actions'
import './redux/reducer'
let param = {}
class chargeDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.goBackBtn = this.goBackBtn.bind(this)
    this.state = {
    }
  }
  static defaultProps = {
    history: {},
  }
  static propTypes = {
    history: PropTypes.object,
    params: PropTypes.object,
    dataObj: PropTypes.object,
    exportRecordData: PropTypes.object,
    getInfo: PropTypes.func,
    exportRecord: PropTypes.func

  }
  goBackBtn = () => {
    this.props.history.push('/finance/tradeQuery')
  }
  filter = (type, value) => {
    if (type === 'payType') {
      switch (value) {
        case '20' :
          return '支出'
        case '10' :
          return '收入'
        default :
          return value
      }
    }
    if (type === 'accountBalance') {
      if (value) {
        return value / 100
      }
    }
  }
  static defaultProps = {
    params: {},
    dataObj: {},
    exportRecordData: {},
    getInfo: () => { },
    exportRecord: () => {}
  }
  componentWillMount = () => {
    param = this.props.params
    console.log(param)
    this.props.getInfo(param)
  }
  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps)
    const { exportRecordData = {} } = nextProps
    if (exportRecordData.respCode === '000000') {
      let url = window.URL.createObjectURL(exportRecordData.data)
      let a = document.createElement('a')
      a.href = url
      a.download = 'filename.xlsx'
      a.click()
    }
  }
  exports = (item) => {
    //let id = []
    //let arr = this.props.dataObj.body
    /*let length = arr.length
    console.log(arr)
    for (let i = 0; i < length; i++) {
      let currId = arr[i].serialNo
      id.push(currId)
    }
    let finalId = id.join(',')
    console.log(finalId)
    this.setState({
      showLoading: true
    })*/
    if (item) {
      window.open(item)
    }
   /* if (this.props.params.outSerialNo) {
      this.props.exportRecord([{ outSerialNo: this.props.params.outSerialNo }])
    }*/
  }
  render() {
    return (
      <div className="qb-panel-g qb-search-g--layout">
        <div className="qb-column-header-g qb-column-header-g--button">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li><i className="qb-icon-account" style={{ marginRight: '5px' }} />财务查询</li>
            <li><Link to={{ pathname: '/finance/tradeQuery' }}>交易查询</Link></li>
            <li className="active">详情</li>
          </ol>
          <button className="rob-btn rob-btn-minor rob-btn-circle " onClick={this.goBackBtn} type="button">返回</button>
        </div>
        {this.props.dataObj.body && this.props.dataObj.body.pdfUrl ? <button className="rob-btn rob-btn-minor rob-btn-circle " style={{ float: 'right', margin: '20px 20px' }} onClick={() => { this.exports(this.props.dataObj.body ? this.props.dataObj.body.pdfUrl : null) }} type="button">导出电子回单</button> : null }
        <div className="qb-listdesc-g__content">
          <div className="rob-row">
            <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-4  rob-col-xs-4 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">账户名称：</label>
              </div>
              <div className="rob-col-lg-20 rob-col-md-20 rob-col-sm-20  rob-col-xs-20">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? this.props.dataObj.body.accountName : ''}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">交易日期：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? timeStamp(this.props.dataObj.body.createTime, 5, 1) : ''}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">资金流向：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? this.filter('payType', this.props.dataObj.body.payType) : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">交易金额（元）：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? formatMoneyYuan(this.props.dataObj.body.amount) : '0.00'}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">交易状态：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? orderStatus(this.props.dataObj.body.stateCode) : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">可用余额（元）：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? formatMoneyYuan(this.props.dataObj.body.accountBalance) : '0.00'}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">交易流水号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? this.props.dataObj.body.outSerialNo : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">收（付）方名称：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? this.props.dataObj.body.recPayAccountName : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">收（付）方账号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? this.props.dataObj.body.recPayAccountNo : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">收（付）方开户行行名：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? this.props.dataObj.body.recPayBankName : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">收（付）方开户行地址：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? this.props.dataObj.body.recPayBankAddress : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-4  rob-col-xs-4 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">用途：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? this.props.dataObj.body.purpose : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-4  rob-col-xs-4 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">备注：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? this.props.dataObj.body.remark : null}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  dataObj: state.chargeQueryData && state.chargeQueryData.singleHandle,
  exportRecordData: state.chargeQueryData && state.chargeQueryData.exportRecord,
}), dispatch => ({
  getInfo: bindActionCreators(action.getInfo, dispatch),
  exportRecord: bindActionCreators(action.exportRecord, dispatch),
}))(chargeDetail)