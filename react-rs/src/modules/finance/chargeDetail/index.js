import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import timeStamp from 'utils/timeStamp'
import { formatMoneyYuan } from 'utils/filterCommon'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import { fcbusinessType } from 'utils/filterCommon'
import { Link } from 'react-router-dom'
import * as action from './redux/actions'
import './redux/reducer'
let param = {}
class chargeDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.goBackBtn = this.goBackBtn.bind(this)
  }
  static propTypes = {
    params: PropTypes.object,
    dataObj: PropTypes.object,
    history: PropTypes.object,
    getInfo: PropTypes.func
  }
  static defaultProps = {
    params: {},
    dataObj: {},
    history: {},
    getInfo: () => { }
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
    if (type === 'orderAmount') {
      if (value) {
        return value / 100
      }
    }
    if (type === 'expectChargeAmount') {
      if (value) {
        return value / 100
      }
    }
    if (type === 'actualChargeAmount') {
      if (value) {
        return value / 100
      }
    }
  }
  /* 返回按钮事件 */
  goBackBtn = () => {
    this.props.history.push('/finance/chargeQuery')
  }
  componentWillMount = () => {
    param = this.props.params
    this.props.getInfo(param)
  }
  render() {
    return (
      <div className="qb-panel-g qb-listdesc-g qb-media-height">
        <div className="qb-column-header-g qb-column-header-g--button">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li><i className="qb-icon-account" style={{ marginRight: '5px' }} />财务查询</li>
            <li><Link to={{ pathname: '/finance/chargeQuery' }}>收费查询</Link></li>
            <li className="active">详情</li>
          </ol>
          <button className="rob-btn rob-btn-minor rob-btn-circle " onClick={this.goBackBtn} type="button">返回</button>
        </div>
        <div className="qb-listdesc-g__content">
          <div className="rob-row">
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                <label className="qb-listdesc-g__content__title">账户名称：</label>
              </div>
              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? this.props.dataObj.body.accountName : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                <label className="qb-listdesc-g__content__title">收费日期：</label>
              </div>
              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? timeStamp(this.props.dataObj.body.chargeDate, 5, 1) : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                <label className="qb-listdesc-g__content__title">交易流水号：</label>
              </div>
              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? this.props.dataObj.body.outOrderNo : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                <label className="qb-listdesc-g__content__title">资金流向</label>
              </div>
              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                <label className="qb-listdesc-g__content__desc">{ this.props.dataObj.body ? this.filter('payType', this.props.dataObj.body.payType) : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                <label className="qb-listdesc-g__content__title">交易金额（元）</label>
              </div>
              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? formatMoneyYuan(this.props.dataObj.body.orderAmount) : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                <label className="qb-listdesc-g__content__title">收费类型</label>
              </div>
              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                <label className="qb-listdesc-g__content__desc">钱包交易服务费</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                <label className="qb-listdesc-g__content__title">应收小计（元）</label>
              </div>
              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? formatMoneyYuan(this.props.dataObj.body.expectChargeAmount) : null}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                <label className="qb-listdesc-g__content__title">实收小计（元）</label>
              </div>
              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                <label className="qb-listdesc-g__content__desc">{this.props.dataObj.body ? formatMoneyYuan(this.props.dataObj.body.actualChargeAmount) : null}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  dataObj: state.chargeDetail,
}), dispatch => ({
  getInfo: bindActionCreators(action.getInfo, dispatch)
}))(chargeDetail)