/**
 * 业务流程
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { formatDate, flowActionChannel } from 'utils/filterCommon'
import * as actions from '../redux/action'
import '../redux/reducer'

class BusinessProcess extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount() {
    this.props.getRuleFlowInfo({
      id: this.props.id
    })
  }
  render() {
    const { ruleFlowInfo } = this.props
    return (
      <div className="qb-time-line-g">
        <ul className="rob-ant-timeline">
          {ruleFlowInfo && ruleFlowInfo.map((item, index) => (
            <li className={`rob-ant-timeline-item ${ruleFlowInfo.length === (index + 1) ? 'rob-ant-timeline-item-last' : ''} `} key={index}>
              <div className="rob-ant-timeline-item-time">{formatDate(item.createTime)}</div>
              <div className="rob-ant-timeline-item-tail" />
              <div className="rob-ant-timeline-item-head rob-ant-timeline-item-head-blue" />
              <div className="rob-ant-timeline-item-content">
                <div className="rob-ant-timeline-item-desc right">
                  <div className="arrow" />
                  <div className="rob-row rob-no-gutters">
                    <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                      <div className="qb-time-line-g__list-item">
                        <span className="qb-time-line-g__list-title">
                          <label>用户名：</label>
                        </span>
                        <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                          {item.userCode}
                        </div>
                      </div>
                    </div>
                    <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                      <div className="qb-time-line-g__list-item">
                        <span className="qb-time-line-g__list-title">
                          <label>用户姓名：</label>
                        </span>
                        <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                          {item.userName}
                        </div>
                      </div>
                    </div>
                    <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                      <div className="qb-time-line-g__list-item">
                        <span className="qb-time-line-g__list-title">
                          <label>所属公司：</label>
                        </span>
                        <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                          {item.companyName}
                        </div>
                      </div>
                    </div>
                    <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                      <div className="qb-time-line-g__list-item">
                        <span className="qb-time-line-g__list-title">
                          <label>操作渠道：</label>
                        </span>
                        <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                          {flowActionChannel(item.procChannel)}
                        </div>
                      </div>
                    </div>
                    <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                      <div className="qb-time-line-g__list-item">
                        <span className="qb-time-line-g__list-title">
                          <label>操作步骤：</label>
                        </span>
                        <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                          {item.procOperName === '7' ? '经办' : item.procOperName}
                        </div>
                      </div>
                    </div>
                    <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                      <div className="qb-time-line-g__list-item">
                        <span className="qb-time-line-g__list-title">
                          <label>审批意见：</label>
                        </span>
                        <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                          {item.isConsent === '100' ? '同意' : item.isConsent === '300' ? '拒绝' : ''} {item.procOperRemark ? item.procOperRemark : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

BusinessProcess.propTypes = {
  id: PropTypes.string.isRequired,
  ruleFlowInfo: PropTypes.array,
  getRuleFlowInfo: PropTypes.func
}
BusinessProcess.defaultProps = {
  ruleFlowInfo: [],
  getRuleFlowInfo: () => { }
}

export default connect(state => ({
  ruleFlowInfo: state.SMRD_ruleDetails && state.SMRD_ruleDetails.ruleFlowInfo
}), dispatch => ({
  getRuleFlowInfo: bindActionCreators(actions.getRuleFlowInfo, dispatch)
}))(BusinessProcess)