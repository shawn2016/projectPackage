/**
 * 业务信息
 */
import React, { PureComponent } from 'react'
import cookieStorage from 'utils/cookieStorage'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { timestampFormat, formatMoneyYuan, batchDealStatus, batchDealStatusSmall } from 'utils/filterCommon'
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
              {timestampFormat(orderInfo.createDate, 5, 1)}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">状态：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {this.state.companyType === '100' ? batchDealStatus(orderInfo.status) : batchDealStatusSmall(orderInfo.status)}
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
        {this.state.companyType === '100' ? <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">业务规则：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.refBizRuleName}
            </label>
          </div>
        </div> : null}
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
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">总笔数（笔）：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.totalCount}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">总金额（元）：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {formatMoneyYuan(orderInfo.totalAmount)}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">成功笔数（笔）：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.successCount}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">成功金额（元）：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.status !== 500001 && orderInfo.status !== 800010 ? formatMoneyYuan(orderInfo.successAmount) : null}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">失败笔数（笔）：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.failureCount}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">失败金额（元）：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.status !== 500001 && orderInfo.status !== 800010 ? formatMoneyYuan(orderInfo.failureAmount) : null}
            </label>
          </div>
        </div>
        <div className="clearfix">
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
  orderInfo: state.IUTHD_singleHandleDetails && state.IUTHD_singleHandleDetails.IUTHD_orderInfo
}))(BusinessInfo)