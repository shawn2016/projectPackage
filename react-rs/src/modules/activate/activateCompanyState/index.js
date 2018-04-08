import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CompanyState from './components/companyState'

class ActivateCompanyStatePage extends PureComponent {
  componentWillMount() {
    if (!this.props.params.id) this.props.history.push('/activate/activateCompany')
  }
  goToChange = () => {
    this.props.history.push({
      pathname: '/activate/activateCompanyChange',
      state: this.props.params
    })
  }
  render() {
    return (
      <div className="qb-panel-g qb-search-g--layout">
        <h1 style={{ marginTop: '65px', textAlign: 'center' }}>关联对公账户结果</h1>
        <div className="rob-container lightGallery">
          <CompanyState history={this.props.history} params={this.props.params} changeAccount={this.goToChange} />
        </div>
      </div>
    )
  }
}
ActivateCompanyStatePage.propTypes = {
  history: PropTypes.object,
  params: PropTypes.object
}
ActivateCompanyStatePage.defaultProps = {
  history: {},
  params: {}
}

export default connect(state => state)(ActivateCompanyStatePage)