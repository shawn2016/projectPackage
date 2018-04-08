import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import cookieStorage from 'utils/cookieStorage'
import './redux/reducer'
import UserList from './components/UserList'
class userManagePage extends PureComponent {
  static propTypes = {
    history: PropTypes.object
  }
  static defaultProps = {
    history: {}
  }
  render() {
    return (
      <div>
        {/* <Search changeParams={this.changeParams} status={this.state.status} /> */}
        <UserList history={this.props.history} />
      </div >
    )
  }

}
userManagePage.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    staticContext: PropTypes.object
  })
}
export default userManagePage
