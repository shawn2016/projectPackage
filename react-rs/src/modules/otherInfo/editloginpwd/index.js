/*
公告信息列表
戴志祥
2017-7-25
 */
import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import md5 from 'md5'
import Dialog from 'react-robotUI/dialog'
import QBInput from 'components/QBInput'
import cookieStorage from 'utils/cookieStorage'
import * as action from './redux/actions'
// import './redux/reducer'
class EditLoginPwdPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      d11: false,
      confirmNewUserPwd: '',
      newUserPwd: '',
      userPwd: '',
      isTestRule: false,
      isDiff: '确认新登录密码为8-12位数字、字母、符号',
      isNoDiff: /^.{8,12}$/
    }
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.cancle = this.cancle.bind(this)
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  // 取消
  cancle = () => {
    this.context.router.history.push('/otherInfo/security')
  }
  // 获取输入框的值
  isRight = (type, value) => {
    this.setState({
      [type]: value
    })
    if ((type === 'confirmNewUserPwd' && value !== this.state.newUserPwd) || (type === 'newUserPwd' && value !== this.state.confirmNewUserPwd)) {
      this.setState({
        isDiff: '两次密码输入不一致',
        isNoDiff: /^\s{1}$/
      })
      return
    }
    this.setState({
      isDiff: '确认新登录密码为8-12位数字、字母、符号',
      isNoDiff: /^.{8,12}$/
    })
  }
  // 弹窗
  handleOpen = (type, obj) => {
    this.dialogShow[type](obj)
  }
  // 关闭弹窗触发
  handleClose = (state, type) => {
    if (state) {
      // 清除session
      sessionStorage.clear()
      let userCode = cookieStorage.getCookie('userCode')
      // localStorage.clear()
      cookieStorage.setCookie('userCode', userCode)
      this.context.router.history.push('/login')
    }
    this.setState({ [type]: false })
  }
  dialogShow = {
    d6: (obj) => {
      this.getContent(
        <div className="rob-alert-content ">
          {obj.msg}
        </div>
      )
      this.getActions([{
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: obj.status
      }])
      this.setState({ d6: true })
    }
  }
  submitForm = () => {
    this.setState({
      isTestRule: true
    }, () => {
      if (this.userPwd.getErrStatus() || this.newUserPwd.getErrStatus() || this.confirmNewUserPwd.getErrStatus()) {
        return
      }
      let params = {}
      params.confirmNewUserPwd = md5(this.state.confirmNewUserPwd)
      params.newUserPwd = md5(this.state.newUserPwd)
      params.userPwd = md5(this.state.userPwd)
      console.log(params)
      this.props.submitForm(params).then((res) => {
        console.log(res)
        if (res.data.respCode === '000000') {
          this.handleOpen('d6', { msg: '密码重置成功！请重新登录。', status: true })
        }/* else {
          this.handleOpen('d6', { msg: res.data.respMsg, status: false })
        }*/
      })
    })
  }
  componentWillMount() {
    let accountInfoSave = JSON.parse(sessionStorage.getItem('accountInfoSave'))
    this.setState({
      accountInfoSave
    })
  }


  render() {
    return (
      <div>
        <div className="qb-panel-g qb-media-height">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><Link to="/otherInfo/security">安全设置</Link></li>
              <li className="active"><a>修改登录密码</a></li>
            </ol>
          </div>
          <div className="rob-row qb-form-group-g qb-form-group-b10-g">
            <div className="rob-form-group">
              <div className="rob-col-lg-4  rob-col-md-4 rob-col-lg-offset-6 rob-col-md-offset-6 rob-col-sm-24 rob-col-xs-24 text-left">
                <label className="rob-input-label">用户名:</label>
              </div>
              <div className="rob-col-lg-8 rob-col-md-8  rob-col-sm-24 rob-col-xs-24 rob-input-has-error">
                <div className="rob-input-item ">
                  <label className="rob-input-label">{this.state.accountInfoSave.userName}</label>
                </div>
              </div>
            </div>
            <QBInput
              name="default"
              type="password"
              label="原登录密码"
              required
              isTestRule={this.state.isTestRule}
              errDirection="bottom"
              labelClass="rob-col-lg-4  rob-col-md-4 rob-col-lg-offset-6 rob-col-md-offset-6 rob-col-sm-24 rob-col-xs-24 text-left"
              inputClass="rob-col-lg-8 rob-col-md-8  rob-col-sm-24 rob-col-xs-24"
              pattern={/^.{8,12}$/}
              ref={(node) => this.userPwd = node}
              handleChange={(s) => this.isRight('userPwd', s)}
              placeholder="请输入原登录密码"
              errorMsg="原登录密码为8-12位数字、字母、符号"
              emptyMsg="原登录密码不能为空"
            />
            <QBInput
              name="default"
              type="password"
              label="新登录密码"
              required
              errDirection="bottom"
              isTestRule={this.state.isTestRule}
              ref={(node) => this.newUserPwd = node}
              handleChange={(s) => this.isRight('newUserPwd', s)}
              labelClass="rob-col-lg-4  rob-col-md-4 rob-col-lg-offset-6 rob-col-md-offset-6 rob-col-sm-24 rob-col-xs-24 text-left"
              inputClass="rob-col-lg-8 rob-col-md-8  rob-col-sm-24 rob-col-xs-24"
              pattern={/^.{8,12}$/}
              placeholder="请输入新登录密码"
              errorMsg="新登录密码为8-12位数字、字母、符号"
              emptyMsg="新登录密码不能为空"
            />
            <QBInput
              type="password"
              name="default"
              label="确认新登录密码"
              required
              isTestRule={this.state.isTestRule}
              errDirection="bottom"
              labelClass="rob-col-lg-4  rob-col-md-4 rob-col-lg-offset-6 rob-col-md-offset-6 rob-col-sm-24 rob-col-xs-24 text-left"
              inputClass="rob-col-lg-8 rob-col-md-8  rob-col-sm-24 rob-col-xs-24"
              placeholder="请再次输入新登录密码"
              ref={(node) => this.confirmNewUserPwd = node}
              handleChange={(s) => this.isRight('confirmNewUserPwd', s)}
              errorMsg={this.state.isDiff}
              pattern={this.state.isNoDiff}
              emptyMsg="确认新登录密码不能为空"
            />
          </div>
          <div className="qb-form-footButton-g clearfix qb-bg-white-g">
            <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <button className="rob-btn rob-btn-minor rob-btn-circle " type="button" onClick={this.cancle}>取消</button>
              <button className="rob-btn rob-btn-danger rob-btn-circle" onClick={this.submitForm}>确定</button>
            </div>
          </div>
        </div>
        {/* 弹窗start */}
        <Dialog
          open={this.state.d6}
          onRequestClose={(name) => this.handleClose(name, 'd6')}
          titleClassName="rob-alert-title rob-alert-title-color"
          content={this.content}
          actions={this.actions}
          actionClassName="rob-alert-button-color rob-alert-button-45"
          showCover
        />
        {/* 弹窗end */}
      </div>
    )
  }
}

EditLoginPwdPage.propTypes = {
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
  submitForm: PropTypes.func,
  cancle: PropTypes.func
}
EditLoginPwdPage.defaultProps = {
  handleOpen: () => { },
  handleClose: () => { },
  submitForm: () => { },
  cancle: () => { }
}
export default connect(state => ({
  data: state.OIEP_EditLoginPwdQuery
}), dispatch => ({
  submitForm: bindActionCreators(action.OIEP_submitForm, dispatch)
}))(EditLoginPwdPage)