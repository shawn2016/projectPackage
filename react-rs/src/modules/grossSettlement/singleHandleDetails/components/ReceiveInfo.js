/**
 * 收款方信息
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../redux/reducer'
class ReceiveInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount() {

  }
  render() {
    let orderInfo = this.props.orderInfo
    return (
      <div className="rob-row">
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">收款方名称：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.receiverAccountName}
            </label>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">收款方银行账号：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.receiverAccountNo}
            </label>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">收款方编号：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.receiverNo}
            </label>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">开户银行：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.receiverSettleBankName}
            </label>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">所属地区：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.receiverProvince}{orderInfo.receiverCity}
            </label>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">支行名称：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.receiverBankName}
            </label>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">联行号：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.receiverBankNo}
            </label>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">联系人姓名：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.recName}
            </label>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">联系人移动电话：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.recTel}
            </label>
          </div>
        </div>

        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">电子邮件：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              {orderInfo.recMail}
            </label>
          </div>
        </div>

      </div>
    )
  }
}

ReceiveInfo.propTypes = {
  orderInfo: PropTypes.object
}
ReceiveInfo.defaultProps = {
  orderInfo: {}
}

export default connect(state => ({
  orderInfo: state.GSSHD_singleHandleDetails && state.GSSHD_singleHandleDetails.GSSHD_orderInfo
}))(ReceiveInfo)