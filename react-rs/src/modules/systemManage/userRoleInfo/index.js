import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as action from './redux/actions'
import './redux/reducer'
import MenusList from './components/MenusList'
import BusinessRules from './components/BusinessRules'
class userRoleInfoPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  static propTypes = {
    data: PropTypes.object,
    params: PropTypes.object,
    getData: PropTypes.func,
    history: PropTypes.object,
    getruleList: PropTypes.func
  }
  static defaultProps = {
    data: {},
    params: {},
    history: {},
    getData: () => { },
    getruleList: () => { }
  }
  componentWillMount = () => {
    this.props.getData({ id: this.props.params.id }).then((res) => {
      const { data = {} } = res,
        { body = [] } = data
      this.setState({
        menuList: body
      })
    })
    this.props.getruleList({ id: this.props.params.id }).then((res) => {
      const { data = {} } = res,
        { body = [] } = data
      this.setState({
        ruleList: body
      })
    })
  }

  // 返回
  goBack = () => {
    this.props.history.goBack()
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-listdesc-g" style={{ marginBottom: '-10px', border: 'none' }}>
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li><Link to={{ pathname: '/systemManage/userManage' }}>用户管理</Link></li>
              <li className="active">权限总览</li>
            </ol>
            <button onClick={this.goBack} className="rob-btn rob-btn-minor rob-btn-circle " type="button">返回</button>
          </div>
        </div>
        <div className="qb-panel-g " style={{ border: 'none' }}>
          <MenusList dataList={this.state.menuList} />
        </div>
        <div className="qb-panel-g ">
          <BusinessRules dataList={this.state.ruleList} />
        </div>
      </div >
    )
  }
}
export default connect(roleMenuQuery => ({
  getDataMenu: roleMenuQuery.getRoleMenuList,
  getruleListData: roleMenuQuery.getBizRuleInfo
}), dispatch => ({
  getData: bindActionCreators(action.getRoleMenu, dispatch),
  getruleList: bindActionCreators(action.getBizRuleInfo, dispatch)
}))(userRoleInfoPage)