import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Detail from './components/detail.js'
import Flow from './components/Flow.js'
import Auditing from './components/Auditing.js'
class Check extends PureComponent {
  static propTypes = {
    params: PropTypes.object,
    history: PropTypes.object
  }
  static defaultProps = {
    params: {},
    history: {}
  }
  goList = () => {
    this.props.history.push({
      pathname: '/systemManage/quotaSettingManage'
    })
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-search-g--layout">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li onClick={this.goList}><a href="javascript:;">额度设置管理</a></li>
              <li className="active">复核</li>
            </ol>
          </div>
          {
            /**
            * 详情
            */
          }
          <div className="qb-listdesc-g__content">
            <Detail params={this.props.params} />
          </div>
        </div>
        <div className="qb-panel-g qb-search-g--layout">
          <div className="qb-column-header-g">
            业务流程
          </div>
          {
            /**
            * 详情
            */
          }
          <Auditing params={this.props.params} />
        </div>
        <div className="qb-panel-g qb-search-g--layout">
          <div className="qb-column-header-g">
            业务流程
          </div>
          {
            /**
            * 详情
            */
          }
          <Flow params={this.props.params} />
        </div>
      </div>
    )
  }
}


export default connect(state => ({
  s: state
}), dispatch => ({
  d: dispatch
}))(Check)