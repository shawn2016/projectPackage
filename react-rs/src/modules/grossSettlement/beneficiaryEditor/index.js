import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Search from './components/search'
import Content from './components/content'

class BeneficiaryEditorPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  /**
   * 增加收款方跳转事件
   */
  addBeneficiary = () => {
    this.props.history.push('/grossSettlement/beneficiaryEditorAdd')
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-search-g--layout">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />支付结算</li>
              <li className="active">收款方编辑</li>
            </ol>
            <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.addBeneficiary} type="button">增加</button>
          </div>
          <Search />
        </div>
        <Content />
      </div>
    )
  }
}
BeneficiaryEditorPage.propTypes = {
  history: PropTypes.object,
}
BeneficiaryEditorPage.defaultProps = {
  history: {},
}

export default connect()(BeneficiaryEditorPage)