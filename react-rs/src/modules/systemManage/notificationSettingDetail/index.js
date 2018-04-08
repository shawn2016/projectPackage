import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import NotificationInfo from './components/NotificationInfo'
import './redux/reducer'
export default class NotificationDetailsPage extends PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }
  // static contextTypes = {
  //   router: PropTypes.shape({
  //     history: PropTypes.object.isRequired,
  //     route: PropTypes.object.isRequired,
  //     staticContext: PropTypes.object
  //   })
  // }
  static propTypes = {
    userInfo: PropTypes.object,
    params: PropTypes.object,
    history: PropTypes.object
  }
  static defaultProps = {
    params: {},
    userInfo: {},
    history: {}
  }
  componentDidMount() {
  }
  // 返回
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    let param = this.props.params
    return (
      <div>
        <div className="qb-panel-g qb-listdesc-g qb-media-height">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li><Link to={{ pathname: '/systemManage/notificationSetting' }}>通知设置管理</Link></li>
              <li className="active">详情</li>
            </ol>
            <button onClick={this.goBack} className="rob-btn rob-btn-minor rob-btn-circle " type="button">返回</button>
          </div>
          <NotificationInfo param={param} />
        </div>
      </div>
    )
  }
}
