import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { formatMoneyYuan, formatDay } from 'utils/filterCommon'

class Info extends PureComponent {
  render() {
    const info = this.props.data
    return (
      <div className="qb-listdesc-g__content">
        <div className="rob-row">
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">申请日期：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {formatDay(info.applyTime)}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">订单编号：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {info.loanNo}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">放款日期：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {formatDay(info.loanTime)}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">放款金额（元）：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {info.loanAmount ? formatMoneyYuan(info.loanAmount) : '0.00'}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">贷款期限（天）：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {info.loanDays}
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Info.propTypes = {
  data: PropTypes.object
}
Info.defaultProps = {
  data: {}
}

export default Info