/**
 * 业务信息
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { formatDay, formatMoneyYuan } from 'utils/filterCommon'
import '../redux/reducer'
class BusinessInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  formatPersonName = (list) => {
    let nameString = ''
    list.forEach((person) => {
      nameString += person.userName + ',' // eslint-disable-line
    })
    nameString = nameString.substr(0, nameString.length - 1)
    return nameString
  }
  render() {
    const { ruleInfo } = this.props,
      { users = [] } = ruleInfo,
      ruleDetailStatus = {
        100: '复核通过',
        200: '待复核',
        300: '复核拒绝'
      }
    return (
      <div>
        <div className="rob-row">
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">创建日期：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {formatDay(ruleInfo.createTime)}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">状态：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {ruleDetailStatus[ruleInfo.status]}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">规则名称：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {ruleInfo.procRuleName}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">审核流程：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {ruleInfo.refProcName}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">账户名称：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {ruleInfo.accountName}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">创建人：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {ruleInfo.createUser}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">单笔支付上限（元）：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {ruleInfo.highLimitAmount ? formatMoneyYuan(ruleInfo.highLimitAmount) : ''}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">单笔支付下限（元）：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {ruleInfo.lowLimitAmount ? formatMoneyYuan(ruleInfo.lowLimitAmount) : ''}
              </label>
            </div>
          </div>
          {users.map((item, i) => (
            <div className="clearfix" key={`users${i}`}>
              <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                  <label className="qb-listdesc-g__content__title">{item.groupCode} :</label>
                </div>
                <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                  <label className="qb-listdesc-g__content__desc">
                    {this.formatPersonName(item.user)}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

BusinessInfo.propTypes = {
  ruleInfo: PropTypes.object,
  params: PropTypes.object
}
BusinessInfo.defaultProps = {
  ruleInfo: {},
  params: {}
}
export default connect(state => ({
  ruleInfo: state.SMRD_ruleDetails && state.SMRD_ruleDetails.ruleInfo
}))(BusinessInfo)