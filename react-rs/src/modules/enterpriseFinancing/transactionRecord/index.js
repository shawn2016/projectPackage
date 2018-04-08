/**
 * 企业理财查询
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Info from './components/LogList.js'
import Search from './components/Search.js'

export default class TransactionRecord extends PureComponent {
  goHome = () => {
    this.props.history.push('/enterpriseFinancing/enterpriseFinancing')
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-search-g--layout">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li onClick={this.goHome} ><i className="qb-icon-enterprise-financing" style={{ marginRight: '5px' }} />企业理财</li>
              <li className="active">交易记录</li>
            </ol>
          </div>
          <div className="qb-search-g">
            <Search />
          </div>
        </div>
        <div className="qb-panel-g clearfix qb-media-height">
          <div className="qb-list-g">
            <Info history={this.props.history} />
          </div>
        </div>
      </div>
    )
  }
}
TransactionRecord.propTypes = {
  history: PropTypes.object
}
TransactionRecord.defaultProps = {
  history: {}
}