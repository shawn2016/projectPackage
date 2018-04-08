/**
 * 业务流程
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { formatDate } from 'utils/filterCommon'
import '../redux/reducer'
class BusinessProcess extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  filter = (type, value) => {
    if (type === 'stateCode') {
      switch (value) {
        case 800030 :
          return '成功'
        default :
          return value
      }
    }
    if (type === 'amount') {
      if (value) {
        return value / 100
      }
    }
    if (type === 'accountBalance') {
      if (value) {
        return value / 100
      }
    }
  }
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-listdesc-g" style={{ border: 'none' }}>
          <div className="qb-time-line-g">
            <ul className="rob-ant-timeline">
              {
                this.props.flowData.map((item, key, arr) => (
                  <li className={key === arr.length - 1 ? 'rob-ant-timeline-item rob-ant-timeline-item-last' : 'rob-ant-timeline-item'} key={key} >
                    <div className="rob-ant-timeline-item-time">{formatDate(item.operateTime)}</div>
                    <div className="rob-ant-timeline-item-tail" />
                    <div className="rob-ant-timeline-item-head rob-ant-timeline-item-head-blue" />
                    <div className="rob-ant-timeline-item-content">
                      <div className="rob-ant-timeline-item-desc right">
                        <div className="arrow" />
                        <div className="rob-row rob-no-gutters">
                          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                            <div className="qb-time-line-g__list-item">
                              <span className="qb-time-line-g__list-title">
                                <label>用户名：</label>
                              </span>
                              <span className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                                {item.userCode}
                              </span>
                            </div>
                          </div>
                          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                            <div className="qb-time-line-g__list-item">
                              <span className="qb-time-line-g__list-title">
                                <label>用户姓名：</label>
                              </span>
                              <span className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                                {item.userName}
                              </span>
                            </div>
                          </div>
                          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                            <div className="qb-time-line-g__list-item">
                              <span className="qb-time-line-g__list-title">
                                <label>所属公司：</label>
                              </span>
                              <span className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                                {item.compangyName}
                              </span>
                            </div>
                          </div>
                          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                            <div className="qb-time-line-g__list-item">
                              <span className="qb-time-line-g__list-title">
                                <label>操作渠道：</label>
                              </span>
                              <span className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                                {item.operatingChannels}
                              </span>
                            </div>
                          </div>
                          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                            <div className="qb-time-line-g__list-item">
                              <span className="qb-time-line-g__list-title">
                                <label>操作步骤：</label>
                              </span>
                              <span className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                                {item.operatingAlias}
                              </span>
                            </div>
                          </div>
                          <div className="rob-col-lg-24 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                            <div className="qb-time-line-g__list-item">
                              <span className="qb-time-line-g__list-title">
                                <label>审批意见：</label>
                              </span>
                              <span className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                                {item.description}
                              </span>
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
        </div>
      </div>
    )
  }
}

BusinessProcess.propTypes = {
  orderFlowInfo: PropTypes.object,
  flowData: PropTypes.array
}
BusinessProcess.defaultProps = {
  orderFlowInfo: {},
  flowData: []
}

export default connect(state => ({
  orderFlowInfo: state.GSSHD_singleHandleDetails && state.GSSHD_singleHandleDetails.GSSHD_orderFlowInfo
}))(BusinessProcess)