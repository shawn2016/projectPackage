import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './redux/reducer'
import Info from './components/content.js'
import Search from './components/search.js'
export default class quotaSettingManage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.goBackBtn = this.goBackBtn.bind(this)
  }
  static propTypes = {
    history: PropTypes.object,
    params: PropTypes.object,
  }
  static defaultProps = {
    history: {},
    params: PropTypes.object
  }
  goHome = () => {
    this.props.history.push({
      pathname: '/home/home'
    })
  }
  /* 返回按钮事件 */
  goBackBtn = () => {
    this.props.history.push('/finance/balanceQuery')
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-search-g--layout">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-account" style={{ marginRight: '5px' }} />财务查询</li>
              <li><Link to={{ pathname: '/finance/balanceQuery' }}>余额查询</Link></li>
              <li className="active">历史余额查询</li>
            </ol>
            <button className="rob-btn rob-btn-minor rob-btn-circle " onClick={this.goBackBtn} type="button">返回</button>
          </div>
          <div className="qb-search-g">
            <Search id={this.props.params} />
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
