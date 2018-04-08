import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ChangeAccount from './components/ChangeAccount'


class ActivateCompanyChangePage extends PureComponent {
  componentDidMount() {}
  render() {
    return (
      <div className="qb-panel-g qb-search-g--layout">
        <h1 style={{ marginTop: '65px', textAlign: 'center' }}>关联对公账户结果</h1>
        <div className="rob-container lightGallery">
          <ChangeAccount params={this.props.params} history={this.props.history} />
        </div>
      </div>
    )
  }
}
ActivateCompanyChangePage.propTypes = {
  history: PropTypes.object,
  params: PropTypes.object
}
ActivateCompanyChangePage.defaultProps = {
  history: {},
  params: {}
}

export default connect(state => state)(ActivateCompanyChangePage)