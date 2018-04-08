/**
 * 单笔经办
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Content from './components/content'
class UndertakesOrgnaization extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="qb-form-group-b10-g">
        <div className="qb-panel-g qb-media-height">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />代发</li>
              <li className="active">代发经办</li>
            </ol>
          </div>
          <div>
            <div className="qb-form-group-g clearfix qb-media-height">
              <Content params={this.props.params} history={this.props.history} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
UndertakesOrgnaization.propTypes = {
  params: PropTypes.object,
  history: PropTypes.object
}
UndertakesOrgnaization.defaultProps = {
  params: {},
  history: {}
}

export default connect()(UndertakesOrgnaization)