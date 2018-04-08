/**
 * 业务信息
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { formatMoneyYuan } from 'utils/filterCommon'
import '../redux/reducer'
class BusinessInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() { }
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
      { users = [] } = ruleInfo
    console.log(this.props)
    return (
      <div className="qb-media-height">
        <div className="rob-row">
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
              <label className="qb-listdesc-g__content__title">账户名称：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {ruleInfo.accountName} {ruleInfo.accountNo}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">最高限额：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {ruleInfo.highLimitAmount ? formatMoneyYuan(ruleInfo.highLimitAmount) : ''}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">最低限额：</label>
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
  ruleInfo: state.ruleDetails && state.ruleDetails.ruleInfo
}))(BusinessInfo)