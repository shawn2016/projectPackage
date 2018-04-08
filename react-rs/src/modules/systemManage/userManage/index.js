import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cookieStorage from 'utils/cookieStorage'
import './redux/reducer'
import UserList from './components/UserList'
import Search from './components/Search'
import * as action from './redux/actions'
class userManagePage extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
    data: PropTypes.object
  }
  static defaultProps = {
    history: {},
    data: {}
  }
  constructor(prop) {
    super(prop)
    this.state = {
      status: 400
    }
  }
  changeStatus = (status) => {
    this.setState({
      status
    })
  }
  componentWillReceiveProps(nextProps) {
    const { data = {} } = nextProps,
      { SMUS_userListData = {} } = data
    this.setState({
      userListData: SMUS_userListData
    })
  }
  changeParams = (param, isCurrent) => {
    this.setState({
      param,
      isCurrent
    })
  }
  addSetting = () => {
    this.props.history.push({
      pathname: '/systemManage/addUser'
    })
  }
  render() {
    let userInfo = {}
    if (JSON.stringify(cookieStorage.getCookie('userInfo')) && cookieStorage.getCookie('userInfo').token) {
      userInfo = cookieStorage.getCookie('userInfo')
    }
    return (
      <div>
        <div className="qb-panel-g clearfix">
          <div className={userInfo.companyType === '200' ? 'qb-column-header-g qb-column-header-g--button' : 'qb-column-header-g qb-border-bottom'}>
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li className="active">用户管理</li>
            </ol>
            <button style={{ display: userInfo.companyType === '200' ? 'block' : 'none' }} className="rob-btn rob-btn-minor rob-btn-circle " type="button" onClick={this.addSetting}>新增用户</button>
          </div>
          <Search changeParams={this.changeParams} status={this.state.status} />
        </div>
        <div className="qb-panel-g clearfix">
          <div className="qb-column-header-g qb-column-header-g--tabs qb-column-header-g--tab-button">
            <div id="myTabContent" className="tab-content ">
              <UserList paramProps={this.state.param} changeStatus={this.changeStatus} userListData={this.state.userListData} history={this.props.history} />
            </div>
          </div>
        </div>
      </div >
    )
  }

}

export default connect(state => ({
  data: state.SMUS_userListDataQuery
}), dispatch => ({
  getList: bindActionCreators(action.SMUS_getList, dispatch)
}))(userManagePage)
