/**
 * 单笔经办详情
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
// import SessionStorage from 'utils/sessionStorage'
import * as actions from './redux/action'
import RuleInfo from './components/RuleInfo'
// const session = new SessionStorage()
class SingleHandleDetails extends PureComponent {
  componentWillMount() {
    if (sessionStorage.getItem('ruleId')) {
      let currentId = sessionStorage.getItem('ruleId')
      this.props.getRuleInfo({ id: currentId })
    }
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g  qb-search-g--layout">
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
        </div>
      </div>
    )
  }
}
SingleHandleDetails.propTypes = {
  params: PropTypes.object,
  getRuleInfo: PropTypes.func
}
SingleHandleDetails.defaultProps = {
  params: {},
  getRuleInfo: () => {}
}

export default connect(null, dispatch => ({
  getRuleInfo: bindActionCreators(actions.getRuleInfo, dispatch)
}))(SingleHandleDetails)