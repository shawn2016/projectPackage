/*
公告信息列表
戴志祥
2017-7-25
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
class securityPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {}
    this.editLoginPwd = this.editLoginPwd.bind(this)
    this.editNumPwd = this.editNumPwd.bind(this)
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  editLoginPwd = () => {
    this.context.router.history.push('/otherInfo/editloginpwd')
  }
  editNumPwd = () => {
    this.context.router.history.push('/otherInfo/editnumpwd')
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-media-height clearfix qb-setting-g--panel">
          <div className="qb-setting-g rob-col-md-offset-6  rob-col-lg-offset-6  rob-col-lg-12 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
            <div className="qb-setting-g__item">
              <i className="qb-icon-password" />
              <label>登录密码</label>
              <a className="red" onClick={this.editLoginPwd}>修改</a>
            </div>
            {/* <div className="qb-setting-g__item">
              <i className="qb-icon-credit" />
              <label>数字证书密码</label>
              <a className="red" onClick={this.editNumPwd}>修改</a>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}
securityPage.propTypes = {
  editLoginPwd: PropTypes.func,
  editNumPwd: PropTypes.func,
}
securityPage.defaultProps = {
  editLoginPwd: () => { },
  editNumPwd: () => { }
}
export default securityPage