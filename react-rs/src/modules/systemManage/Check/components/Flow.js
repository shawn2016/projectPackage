import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formatDate, flowActionAlias } from 'utils/filterCommon'
import * as actions from '../redux/actions'
import '../redux/reducer'
class Flow extends PureComponent {
  static propTypes = {
    params: PropTypes.object
  }
  static defaultProps = {
    params: {}
  }
  componentWillMount() {
    let param = {}
    console.log(this.props.params)
    param.id = this.props.params.id
    this.props.getFlowInfo(param)
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }
  render() {
    let { body = [] } = this.props.flowInfo
    return (
      <div className="qb-time-line-g">
        <ul className="rob-ant-timeline">
          {
            body.map((item, key, arr) => (
              <li className={key === arr.length - 1 ? 'rob-ant-timeline-item rob-ant-timeline-item-last' : 'rob-ant-timeline-item'} key={key} >
                <div className="rob-ant-timeline-item-time">{formatDate(item.createTime)}</div>
                <div className="rob-ant-timeline-item-tail" />
                <div className="rob-ant-timeline-item-head rob-ant-timeline-item-head-blue" />
                <div className="rob-ant-timeline-item-content">
                  <div className="rob-ant-timeline-item-desc right">
                    <div className="arrow" />
                    <div className="rob-row rob-no-gutters">
                      <div className="rob-col-lg-3 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>用户名</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                            {item.userCode}
                          </div>
                        </div>
                      </div>
                      <div className="rob-col-lg-3 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>用户姓名</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                            {item.userName}
                          </div>
                        </div>
                      </div>
                      <div className="rob-col-lg-3 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>所属公司</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                            {item.companyName}
                          </div>
                        </div>
                      </div>
                      <div className="rob-col-lg-3 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>操作日期</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small">
                            {item.createTime}
                          </div>
                        </div>
                      </div>
                      <div className="rob-col-lg-3 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>操作渠道</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small">
                            {item.procChannel}
                          </div>
                        </div>
                      </div>
                      <div className="rob-col-lg-3 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>操作步骤</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small">
                            {flowActionAlias(item.procOperName)}
                          </div>
                        </div>
                      </div>
                      <div className="rob-col-lg-3 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>审批意见</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small">
                            {item.procOperRemark}
                          </div>
                        </div>
                      </div>
                      <div className="rob-col-lg-3 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                        <div className="qb-time-line-g__list-item">
                          <span className="qb-time-line-g__list-title">
                            <label>用途</label>
                          </span>
                          <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small">
                            无此字段
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

Flow.propTypes = {
  flowInfo: PropTypes.object,
  getFlowInfo: PropTypes.func
}
Flow.defaultProps = {
  flowInfo: {},
  getFlowInfo: () => {}
}

export default connect(state => ({
  flowInfo: state.check && state.check.flowInfo
}), dispatch => ({
  getFlowInfo: bindActionCreators(actions.getFlowInfo, dispatch)
}))(Flow)