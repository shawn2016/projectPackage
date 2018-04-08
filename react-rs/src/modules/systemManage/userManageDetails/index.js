import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './redux/reducer'
import UserInfo from './components/UserInfo'
import UserProcess from './components/UserProcess'
export default class userManageDetailsPage extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
    userInfo: PropTypes.object,
    params: PropTypes.object
  }
  static defaultProps = {
    params: {},
    history: {},
    userInfo: {}
  }
  componentDidMount() {}
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-listdesc-g">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li><Link to={{ pathname: '/systemManage/userManage' }}>用户管理</Link></li>
              <li className="active">详情</li>
            </ol>
            <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack} type="button">返回</button>
          </div>
          <UserInfo params={this.props.params} />
        </div>
        <UserProcess params={this.props.params} />
      </div>
    )
  }
}
