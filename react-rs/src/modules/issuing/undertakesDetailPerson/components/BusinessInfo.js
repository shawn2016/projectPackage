/**
 * 业务信息
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { formatMoneyYuan } from 'utils/filterCommon'
class BusinessInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    let { query, data } = this.props
    return (
      <div className="rob-row">
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">付款方账户名称：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {query.umbrellaAccountNo}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">期望日：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {query.expectDate}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">业务参考号：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {query.outSerialNo}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">用途：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {query.purpose}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">总笔数（笔）：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {data.successCount}
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
            <label className="qb-listdesc-g__content__title">总金额（元）：</label>
          </div>
          <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
            <label className="qb-listdesc-g__content__desc">
              {formatMoneyYuan(data.successAmount)}
            </label>
          </div>
        </div>
      </div>
    )
  }
}

BusinessInfo.propTypes = {
  query: PropTypes.object,
  data: PropTypes.object
}
BusinessInfo.defaultProps = {
  query: {},
  data: {}
}
export default BusinessInfo