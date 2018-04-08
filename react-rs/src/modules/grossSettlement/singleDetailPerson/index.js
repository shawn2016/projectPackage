/**
 * 单笔经办详情(小B)
 */
import React, { PureComponent } from 'react'
import cookieStorage from 'utils/cookieStorage'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BusinessInfo from './components/BusinessInfo'
import ReceiveInfo from './components/ReceiveInfo'
import VerificationInfo from './components/VerificationInfo'
class SingleHandleDetails extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  userInfo = {}
  componentWillMount() {
    this.userInfo = cookieStorage.getCookie('userInfo')
  }
  goBack = () => {
    this.props.history.push({
      pathname: '/grossSettlement/singleHandle',
      state: { reverseData: this.props.params.query }
    })
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g  qb-search-g--layout">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />支付结算</li>
              <li>
                <Link to={{ pathname: '/grossSettlement/singleHandle' }}>单笔经办</Link>
              </li>
              <li className="active">确认经办</li>
            </ol>
            <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack} type="button">返回</button>
          </div>
          <div className="qb-listdesc-g__header">
            业务信息
          </div>
          {
            /**
             * 业务信息
             */
          }
          <div className="qb-listdesc-g__content">
            <BusinessInfo data={this.props.params.query} />
          </div>
          <div className="qb-listdesc-g__header">
            收方信息
          </div>
          {
            /**
             * 收方信息
             */
          }
          <div className="qb-listdesc-g__content">
            <ReceiveInfo data={this.props.params.query} />
          </div>
          {this.props.params.query && this.userInfo.isCfcaUser === '1' ?
            <VerificationInfo params={this.props.params} history={this.props.history} cfcaUserInfo /> : null
          }
          {this.props.params.query && this.userInfo.isCfcaUser === '2' ?
            <div className="qb-listdesc-g__header">
              验证码信息
            </div> : null}
          {
            /**
             *小B企业管理员审核
             */
          }
          {this.props.params.query && this.userInfo.isCfcaUser === '2' ?
            <div className="qb-listdesc-g__content">
              <VerificationInfo params={this.props.params} history={this.props.history} />
            </div> : null}
        </div>
      </div >
    )
  }
}
SingleHandleDetails.propTypes = {
  params: PropTypes.object,
  history: PropTypes.object
}
SingleHandleDetails.defaultProps = {
  params: {},
  history: {}
}
export default SingleHandleDetails