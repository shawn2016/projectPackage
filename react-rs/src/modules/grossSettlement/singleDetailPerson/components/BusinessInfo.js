/**
 * 业务信息
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { grossBizType, formatMoneyYuan } from 'utils/filterCommon'
class BusinessInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  _goToDetailsPage = _id => {
    if (_id) {
      window.open(_id)
    }
  }
  render() {
    let orderInfo = this.props.data
    return (
      <div className="rob-row">
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
            <label className="qb-listdesc-g__content__title">期望日：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.expectDate}
            </label>
          </div>
        </div>

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
              <a onClick={() => { this._goToDetailsPage(orderInfo.supplementCode) }} download="附件资料" className="qb-table-g__handle">附件资料下载</a>
            </label>
          </div>
        </div>
      </div>
    )
  }
}

BusinessInfo.propTypes = {
  data: PropTypes.object
}
BusinessInfo.defaultProps = {
  data: {}
}
export default BusinessInfo