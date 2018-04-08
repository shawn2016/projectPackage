import React, { PureComponent } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import cookieStorage from 'utils/cookieStorage'
import './redux/reducer'
import NotificationList from './components/NotificationList'
import SearchTab from './components/SearchTab'
import SearchContent from './components/SearchContent'
export default class notificationPage extends PureComponent {
  componentWillMount() {
    // 如果是uke用户 经办预警查询条件显示  ‘单笔经办’ 和 ‘出金’， 如果非ukey只显示 ‘出金’
    // let userInfo = cookieStorage.getCookie('userInfo') || {},
    //   isCfcaUser = userInfo.isCfcaUser
    // switch (isCfcaUser) {
    //   case '1':
    //     setTimeout(this.setState({
    //       bizList: [
    //         { text: '全部', value: '100 400' },
    //         { text: '单笔经办', value: '100' },
    //         { text: '出金', value: '400' }
    //       ]
    //     }), 0)
    //     break
    //   case '2':
    //     setTimeout(this.setState({
    //       bizList: [
    //         { text: '全部', value: '400' },
    //         { text: '出金', value: '400' }
    //       ]
    //     }), 0)
    //     break
    //   default:
    //     return []
    // }
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g clearfix">
          <div className="qb-column-header-g qb-border-bottom">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li className="active">通知设置管理</li>
            </ol>
          </div>
          <SearchTab />
          <SearchContent />
        </div>
        <NotificationList history={this.props.history} />
      </div>
    )
  }
}
notificationPage.propTypes = {
  history: PropTypes.object
}
notificationPage.defaultProps = {
  history: {}
}