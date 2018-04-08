import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  formatMoneyYuan,
  payChannel,
  orderStatus
} from 'utils/filterCommon'
import timeStamp from 'utils/timeStamp'
import { Link } from 'react-router-dom'
import * as action from './redux/actions'
import './redux/reducer'
class ScancodeDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.goBackBtn = this.goBackBtn.bind(this)
  }
  static propTypes = {
    params: PropTypes.object,
    dataObj: PropTypes.object,
    getInfo: PropTypes.func,
    history: PropTypes.object,
  }
  static defaultProps = {
    params: {},
    dataObj: {},
    history: {},
    getInfo: () => { },
  }
  componentWillMount = () => {
    const { serialNo } = this.props.params
    this.props.getInfo({ serialNo })
  }
  /* 返回按钮事件 */
  goBackBtn = () => {
    this.props.history.push('/finance/scancodeQuery')
  }
  render() {
    const { dataObj } = this.props,
      { body } = dataObj
    return (
      <div className="qb-panel-g qb-listdesc-g qb-media-height">
        <div className="qb-column-header-g qb-column-header-g--button">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li><i className="qb-icon-account" style={{ marginRight: '5px' }} />财务查询</li>
            <li><Link to={{ pathname: '/finance/scancodeQuery' }}>POS/扫码交易查询</Link></li>
            <li className="active">详情</li>
          </ol>
          <button className="rob-btn rob-btn-minor rob-btn-circle " onClick={this.goBackBtn} type="button">返回</button>
        </div>
        <div className="qb-listdesc-g__content">
          <div className="rob-row">
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">二维码编号:</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.qrcode ? body.qrcode : ' '}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">交易流水号:</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.outSerialNo}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">交易时间:</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.receiveTime ? timeStamp(body.receiveTime, 5, 1) : ''}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">系统订单号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.serialNo}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">交易金额（元）:</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.amount ? formatMoneyYuan(body.amount) : '0.00'}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">支付方式：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{payChannel(body.payChannel)}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">手续费（元）：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.fee ? formatMoneyYuan(body.fee) : '0.00'}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">交易状态：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{orderStatus(body.status)}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">结算金额（元）：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.status === 100 ? formatMoneyYuan(Math.round(body.amount - body.fee)) : '0.00'}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">结算时间：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.completeTime ? timeStamp(body.completeTime, 5, 1) : ''}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">支付渠道流水号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.channelSerialNo ? body.channelSerialNo : ' '}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">商户编号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.accountNo ? body.accountNo : ' '}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">终端编号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.terminalNo ? body.terminalNo : ' '}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">银联参考号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.unionpayNo ? body.unionpayNo : ' '}</label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">操作员号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{body.operatorNo ? body.operatorNo : ' '}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  dataObj: state.FSD_chargeQueryData && state.FSD_chargeQueryData.FSD_singleHandle
}), dispatch => ({
  getInfo: bindActionCreators(action.FSD_getInfo, dispatch)
}))(ScancodeDetail)