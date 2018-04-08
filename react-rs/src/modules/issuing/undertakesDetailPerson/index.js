/**
 * 单笔经办详情(小B)
 */
import React, { PureComponent } from 'react'
import cookieStorage from 'utils/cookieStorage'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import getRequest from 'utils/getRequest'
import BusinessInfo from './components/BusinessInfo'
import ReceiveInfo from './components/ReceiveInfo'
import VerificationInfo from './components/VerificationInfo'
class DetailPerson extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataList: {}
    }
  }
  userInfo = {}
  componentWillMount() {
    this.userInfo = cookieStorage.getCookie('userInfo');
    (async () => {
      let resData = await getRequest({
        path: '/payment/agency/getTemp',
        method: 'POST',
        param: { serialNo: this.props.params.serialNo }
      })
      if (resData.data.respCode === '000000') {
        this.setState({ dataList: resData.data.body })
      }
    })()
  }
  goBack = () => {
    this.props.history.push({
      pathname: '/issuing/undertakesOrgnaization',
      state: { reverseData: this.props.params.query }
    })
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g  qb-search-g--layout">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />代发</li>
              <li>
                <Link to={{ pathname: '/issuing/undertakesOrgnaization' }}>代发经办</Link>
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
            <BusinessInfo query={this.props.params.query} data={this.state.dataList} />
          </div>
          <div className="qb-listdesc-g__header">
            收方信息
          </div>
          {
            /**
             * 收方信息
             */
          }
          <div>
            <ReceiveInfo data={this.state.dataList} />
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
DetailPerson.propTypes = {
  params: PropTypes.object,
  history: PropTypes.object
}
DetailPerson.defaultProps = {
  params: {},
  history: {}
}
export default DetailPerson