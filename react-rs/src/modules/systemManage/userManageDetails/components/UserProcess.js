import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { formatDate, flowActionAlias } from 'utils/filterCommon'
import PropTypes from 'prop-types'
import cookieStorage from 'utils/cookieStorage'
import * as action from '../redux/actions'
import '../redux/reducer'
class UserProcessPage extends PureComponent {
  constructor(props) {
    super(props)
    this.resetPasswordMsg = ''
    this.state = {
      getUserProcessData: []
    }
  }
  static propTypes = {
    match: PropTypes.object,
    userInfo: PropTypes.object,
    params: PropTypes.number
  }
  static defaultProps = {
    match: {},
    userInfo: {},
    params: ''
  }
  /* 用户流程数据 */

  componentWillMount() {
    this.props.getUserProcess({ id: this.props.params.id, checkType: this.props.params.checkType }).then(res => {
      if (res.data.respCode === '000000') {
        this.setState({
          getUserProcessData: res.data.body
        })
      }
    })
    // this.props.getUserProcess({ id: 'WUC-170918-141348-100000003059' })
  }
  render() {
    let userProcessList = this.state.getUserProcessData
    let userInfo = cookieStorage.getCookie('userInfo')
    return (
      <div className="qb-panel-g qb-media-height" style={{ display: userInfo.companyType === '200' ? 'none' : 'block' }}>
        <div className="qb-column-header-g">
          业务流程
          </div>
        <div className="qb-time-line-g">
          <ul className="rob-ant-timeline">
            {userProcessList && userProcessList.length !== 0 ? userProcessList.map((process, k) => (
              <li key={k} className={(k + 1) === userProcessList.length ? 'rob-ant-timeline-item rob-ant-timeline-item-last' : 'rob-ant-timeline-item'} >
                <div className="rob-ant-timeline-item-time">{formatDate(process.createTime)}</div>
                <div className="rob-ant-timeline-item-tail" />
                <div className="rob-ant-timeline-item-head rob-ant-timeline-item-head-blue" />
                <div className="rob-ant-timeline-item-content">
                  <div className="rob-ant-timeline-item-desc right">
                    <div className="arrow" />
                    <div className="rob-row rob-no-gutters">
                      <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>用户名</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                            {process.userCode}
                          </div>
                        </div>
                      </div>
                      <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>用户姓名</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                            {process.userName}
                          </div>
                        </div>
                      </div>
                      <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>所属公司</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                            {process.companyName}
                          </div>
                        </div>
                      </div>
                      <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>操作渠道</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                            {process.procChannel === '01' ? '企业网上' : process.procChannel === '02' ? '后台平台' : ''}
                          </div>
                        </div>
                      </div>
                      <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>操作步骤</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                            {process.procOperName === '7' ? '经办' : flowActionAlias(process.procOperName)}
                          </div>
                        </div>
                      </div>
                      <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>审批意见</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                            {process.procOperRemark === '1' ? '同意' : process.procOperRemark === '2' ? '拒绝' : ''} {process.procOperRemark ? process.procOperRemark : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )) : <div className="qb-nodate-g__box mb140"><span className="qb-nodate-g bg_icon" /><p>无数据</p></div>}
          </ul>
        </div>
      </div>
    )
  }
}


UserProcessPage.propTypes = {
  dataProcess: PropTypes.array,
  getUserProcess: PropTypes.func
}
UserProcessPage.defaultProps = {
  dataProcess: [],
  getUserProcess: () => { }
}

export default connect(state => ({
  dataProcess: state.userInfoDataQuery.userProcess
}), dispatch => ({
  getUserProcess: bindActionCreators(action.getUserProcess, dispatch)
}))(UserProcessPage)
