/**
 * 业务信息
 */
import React, { PureComponent } from 'react'
import cookieStorage from 'utils/cookieStorage'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { timestampFormat, grossBizType, formatMoneyYuan, singleDealStatus, singleDealStatusSmall } from 'utils/filterCommon'
import '../redux/reducer'
class BusinessInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount() {
    let userInfo = cookieStorage.getCookie('userInfo')
    if (JSON.stringify('userInfo') !== '{}') {
      this.setState({
        companyType: userInfo.companyType
      })
    }
  }

  _goToDetailsPage = _id => {
    if (_id) {
      window.open(_id)
    }
  }
  render() {
    let orderInfo = this.props.orderInfo
    return (
      <div className="rob-row">
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">创建日期：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {timestampFormat(orderInfo.createTime, 5, 1)}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">状态：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {this.state.companyType === '100' ? singleDealStatus(orderInfo.status) : singleDealStatusSmall(orderInfo.status)}
            </label>
          </div>
        </div>
        <div className="clearfix">
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">付款方账户名称：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {orderInfo.payerAccountName}{orderInfo.payerAccountNo}
              </label>
            </div>
          </div>
        </div>

        {this.state.companyType === '100' ? <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">业务规则：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.refActRuleName}
            </label>
          </div>
        </div> : null}

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">业务类型：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {grossBizType(orderInfo.bizType)}
            </label>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">金额（元）：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {formatMoneyYuan(orderInfo.amount)}
            </label>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">业务参考号：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.outSerialNo}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">交易流水号：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.serialNo}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">期望日：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {timestampFormat(orderInfo.expectDate, 5, 1)}
            </label>
          </div>
        </div>
        <div className="learfix">
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">用途：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {orderInfo.purpose}
              </label>
            </div>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">摘要：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.summary}
            </label>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">附件：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              <a onClick={() => { this._goToDetailsPage(orderInfo.accessory) }} download="附件资料" className="qb-table-g__handle">附件资料下载</a>
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">备注：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.remark}
            </label>
          </div>
        </div>

      </div>
    )
  }
}

BusinessInfo.propTypes = {
  orderInfo: PropTypes.object
}
BusinessInfo.defaultProps = {
  orderInfo: {}
}
export default connect(state => ({
  orderInfo: state.GSSHD_singleHandleDetails && state.GSSHD_singleHandleDetails.GSSHD_orderInfo
}))(BusinessInfo)