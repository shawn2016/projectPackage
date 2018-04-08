
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../redux/actions'
import '../redux/reducer'

class Detail extends PureComponent {
  static propTypes = {
    params: PropTypes.object
  }
  static defaultProps = {
    params: {}
  }
  filter = (type, value) => {
    if (type === 'bussinessType') {
      switch (value) {
        case null :
          return '待复核'
        case '1' :
          return '支付结算'
        case '2' :
          return '代发'
        default :
          return value
      }
    }
    if (type === 'limitType') {
      switch (value) {
        case '100':
          return '每日限额'
        case '200':
          return '每周限额'
        case '300':
          return '每月限额'
        case '400':
          return '每年限额'
        case '500':
          return '区间限额'
        default:
          return value
      }
    }
  }
  componentWillMount() {
    let param = {}
    param.id = this.props.params.id
    this.props.getDetailsData(param)
    console.log(this.props.params)
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }
  render() {
    return (
      <div className="rob-row">
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">创建日期：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              { this.props.detailInfo.body.createTime }
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">账户名称：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              { this.props.detailInfo.body.accountNo }
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">业务模式：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              { this.filter('bussinessType', this.props.detailInfo.body.productType) }
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">限额类型：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              { this.filter('limitType', this.props.detailInfo.body.limitType) }
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">限额额度（元）：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              { this.props.detailInfo.body.limitAmount }
            </label>
          </div>
        </div>
        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
            <label className="qb-listdesc-g__content__title">摘要：</label>
          </div>
          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
            <label className="qb-listdesc-g__content__desc">
              { this.props.detailInfo.body.summary }
            </label>
          </div>
        </div>
      </div>
    )
  }
}
Detail.propTypes = {
  detailInfo: PropTypes.object,
  getDetailsData: PropTypes.func
}
Detail.defaultProps = {
  getDetailsData: () => {},
  detailInfo: {}
}

export default connect(state => ({
  detailInfo: state.check && state.check.detailInfo
}), dispatch => ({
  getDetailsData: bindActionCreators(actions.getDetailsData, dispatch)
}))(Detail)