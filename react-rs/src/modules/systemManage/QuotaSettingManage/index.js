import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './redux/reducer'
import Info from './components/Info.js'
import Search from './components/Search.js'
import Tablist from './components/Tablist.js'

export default class quotaSettingManage extends PureComponent {
  static propTypes = {
    history: PropTypes.object
  }
  static defaultProps = {
    history: {}
  }
  addSetting = () => {
    this.props.history.push({
      pathname: '/systemManage/QuotaSettingManageDetail'
    })
  }
  goHome = () => {
    this.props.history.push({
      pathname: '/home/home'
    })
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-search-g--layout">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li className="active">额度设置管理</li>
            </ol>
            <button className="rob-btn rob-btn-minor rob-btn-circle " type="button" onClick={this.addSetting}>增加设置</button>
          </div>
          <div className="qb-search-g">
            <Search />
          </div>
        </div>
        <div className="qb-panel-g clearfix qb-media-height">
          <Tablist />
          <div className="qb-list-g">
            <Info history={this.props.history} />
          </div>
        </div>
      </div>
    )
  }
}
