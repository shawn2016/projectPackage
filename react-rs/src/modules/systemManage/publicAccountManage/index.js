import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './redux/reducer'
import AccountList from './components/AccountList'

export default class publicAccountManagePage extends PureComponent {
  static propTypes = {
    history: PropTypes.object
  }
  static defaultProps = {
    history: {}
  }
  relevancePublicAccount = () => {
    this.props.history.push({
      pathname: '/systemManage/publicAccountDetail',
      state: {}
    })
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-search-g--layout">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li className="active">对公账户管理</li>
            </ol>
            <button className="rob-btn rob-btn-minor rob-btn-circle " type="button" onClick={this.relevancePublicAccount}>关联账户</button>
          </div>
          <div className="qb-column-header-g qb-column-header-g--tabs qb-media-height">
            <div id="myTabContent" className="tab-content ">
              <AccountList history={this.props.history} />
            </div>
          </div>
        </div>
      </div >
    )
  }

}

