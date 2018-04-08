import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { UserManageDetailsStatus, formatDay, isCfcaUser, refUserRoleCode } from 'utils/filterCommon'
import * as action from '../redux/actions'
import '../redux/reducer'
class UserInfoPage extends PureComponent {
  constructor(props) {
    super(props)
    this.resetPasswordMsg = ''
  }
  static propTypes = {
    params: PropTypes.object,
    userInfo: PropTypes.object
  }
  static defaultProps = {
    params: {},
    userInfo: {}
  }
  /* 用户数据 */

  componentDidMount() {
    this.props.getData({ id: this.props.params.id, checkType: this.props.params.checkType })
  }
  render() {
    let userInfo = []
    if (this.props.userListData) {
      userInfo = this.props.userListData
    }
    return (
      <div className="qb-listdesc-g__content">
        <div className="rob-row">
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">创建日期：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {userInfo.createTime ? formatDay(userInfo.createTime) : null}
              </label>
            </div>
          </div>

          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">用户名：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {userInfo.userCode}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">用户姓名：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {userInfo.userName}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">手机号码：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {userInfo.phonenum}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">身份证号码：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {userInfo.identifyNo}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">邮箱地址：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {userInfo.email}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">数字证书用户：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {isCfcaUser(userInfo.isCfcaUser)}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">证书卡卡号：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {userInfo.certCode}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">所属公司：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {userInfo.companyName}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">职务：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {userInfo.userDuty}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">用户类型：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {refUserRoleCode(userInfo.refUserRoleCode)}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">用户状态：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {UserManageDetailsStatus(userInfo.status)}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
              <label className="qb-listdesc-g__content__title">备注：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
              <label className="qb-listdesc-g__content__desc">
                {userInfo.userComment}
              </label>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

UserInfoPage.propTypes = {
  userListData: PropTypes.object,
  getData: PropTypes.func
}
UserInfoPage.defaultProps = {
  userListData: {},
  getData: () => { }
}

export default connect(state => ({
  userListData: state.userInfoDataQuery.userListData,
}), dispatch => ({
  getData: bindActionCreators(action.getUserInfo, dispatch),
}))(UserInfoPage)
