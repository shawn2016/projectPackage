/**
 * 单笔经办详情
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as actions from './redux/action'
import RuleInfo from './components/RuleInfo'
import RuleProcess from './components/RuleProcess'
class SingleHandleDetails extends PureComponent {
  componentWillMount() {
    this.props.getRuleInfo({ id: this.props.params.id })
  }
  goBack = () => {
    this.props.history.push('/systemManage/ruleManage')
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g  qb-search-g--layout">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li><Link to={{ pathname: '/systemManage/ruleManage' }}>业务规则管理</Link></li>
              <li className="active">详情</li>
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
            <RuleInfo />
          </div>
          <div className="qb-listdesc-g__header">
            业务流程
          </div>
          {
            /**
             * 业务流程
             */
          }
          <div className="qb-listdesc-g__content">
            <RuleProcess id={this.props.params.id} />
          </div>
        </div>
      </div>
    )
  }
}
SingleHandleDetails.propTypes = {
  history: PropTypes.object,
  params: PropTypes.object,
  getRuleInfo: PropTypes.func
}
SingleHandleDetails.defaultProps = {
  history: {},
  params: {},
  getRuleInfo: () => {}
}

export default connect(null, dispatch => ({
  getRuleInfo: bindActionCreators(actions.getRuleInfo, dispatch)
}))(SingleHandleDetails)