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
        <div className="rob-form qb-form-g__form qb-form-group-b10-g qb-mg-bt70-g ">
          <div className="text-center qb-r-success-g">
            <i className="qb-icon-fail " />
            <div className="qb-r-success-g--s_box ">
              <span className="font18 ">很抱歉，您暂无此项业务权限！</span>
              <br />
              <span>若想添加业务权限，请联系管理员！</span>
            </div>
          </div>
          <div className="rob-col-lg-24 text-center qb-from-bg-reg-g ">
            <button type="button " className="rob-btn rob-btn-danger rob-btn-circle ">确定</button>
          </div>
        </div>
      </div >
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