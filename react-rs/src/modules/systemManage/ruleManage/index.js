import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Info from './components/Info'
export default class RuleManage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount() {

  }
  render() {
    return (
      <div>
        <div className="qb-panel-g  qb-search-g--layout">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li className="active">业务规则管理</li>
            </ol>
          </div>
          <div>
            <Info history={this.props.history} />
          </div>
        </div>
      </div>
    )
  }
}
RuleManage.propTypes = {
  history: PropTypes.object
}
RuleManage.defaultProps = {
  history: {}
}