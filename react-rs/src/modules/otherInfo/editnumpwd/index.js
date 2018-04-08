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
import Dialog from 'react-robotUI/dialog'
import QBInput from 'components/QBInput'
import * as action from './redux/actions'
// import './redux/reducer'
class EditNumPwdPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      d11: false,
      confirmNewUserPwd: '',
      newUserPwd: '',
      userPwd: '',
      isTestRule: false
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
  isRight = (type, value) => this.setState({ [type]: value })
  // 弹窗
  handleOpen = (type) => {
    let delArray = this.getCheckState()
    if (delArray.length === 0) {
      this.setState({
        contentDom: '请选择需要删除的消息！'
      }, function () {
        this.dialogShow[type]()
      })
    } else if (delArray.length === 1) {
      this.setState({
        contentDom: '确定要删除该条的通知？'
      }, function () {
        this.dialogShow[type]()
      })
    } else {
      this.setState({
        contentDom: '确定要删除选中的通知？'
      }, function () {
        this.dialogShow[type]()
      })
    }
  }
  // 关闭弹窗触发
  handleClose = (name, type) => {
    console.log(name)
    this.setState({ [type]: false })
  }
  dialogShow = {
    d11: () => {
      this.setState({ d11: true })
      this.getContent(
        <div className="rob-alert-content ">
          {this.state.contentDom}
        </div>
      )
      this.getActions([{
        label: '取消',
        className: 'rob-btn-minor rob-btn-circle'
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle'
      }])
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
      params.confirmNewUserPwd = this.state.confirmNewUserPwd
      params.newUserPwd = this.state.newUserPwd
      params.userPwd = this.state.userPwd
      console.log(params)
      this.props.submitForm(params)
    })
  }


  render() {
    return (
      <div>
        {/* 弹窗start */}
        <Dialog
          showCloseBtn
          open={this.state.d11}
          onRequestClose={(name) => this.handleClose(name, 'd11')}
          title="提示"
          titleClassName="rob-alert-title rob-alert-title-color"
          content={this.content}
          actions={this.actions}
          actionClassName="rob-alert-button"
          showCover
        />
        {/* 弹窗end */}
        <div className="qb-panel-g qb-media-height">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><Link to="/otherInfo/security">安全设置</Link></li>
              <li className="active"><a>修改数字证书密码</a></li>
            </ol>
          </div>
          <div className="rob-row qb-form-group-g">
            <div className="rob-form-group">
              <div className="rob-col-lg-4  rob-col-md-4 rob-col-lg-offset-6 rob-col-md-offset-6 rob-col-sm-24 rob-col-xs-24 text-left">
                <label className="rob-input-label">用户名:</label>
              </div>
              <div className="rob-col-lg-8 rob-col-md-8  rob-col-sm-24 rob-col-xs-24 rob-input-has-error">
                <div className="rob-input-item ">
                  <label className="rob-input-label">动画化</label>
                </div>
              </div>
            </div>
            <QBInput
              name="default"
              label="原数字证书密码"
              required
              isTestRule={this.state.isTestRule}
              errDirection="bottom"
              labelClass="rob-col-lg-4  rob-col-md-4 rob-col-lg-offset-6 rob-col-md-offset-6 rob-col-sm-24 rob-col-xs-24 text-left"
              inputClass="rob-col-lg-8 rob-col-md-8  rob-col-sm-24 rob-col-xs-24"
              pattern={/^.{8,12}$/}
              ref={(node) => this.userPwd = node}
              handleChange={(s) => this.isRight('userPwd', s)}
              placeholder="请输入原数字证书密码"
              errorMsg="原数字证书密码为8-12位数字、字母、符号"
              emptyMsg="原数字证书密码不能为空"
            />
            <QBInput
              name="default"
              label="新数字证书密码"
              required
              errDirection="bottom"
              isTestRule={this.state.isTestRule}
              ref={(node) => this.newUserPwd = node}
              handleChange={(s) => this.isRight('newUserPwd', s)}
              labelClass="rob-col-lg-4  rob-col-md-4 rob-col-lg-offset-6 rob-col-md-offset-6 rob-col-sm-24 rob-col-xs-24 text-left"
              inputClass="rob-col-lg-8 rob-col-md-8  rob-col-sm-24 rob-col-xs-24"
              pattern={/^.{8,12}$/}
              placeholder="请输入新数字证书密码"
              errorMsg="新数字证书密码为8-12位数字、字母、符号"
              emptyMsg="新数字证书密码不能为空"
            />
            <QBInput
              name="default"
              label="确认新数字证书密码"
              required
              isTestRule={this.state.isTestRule}
              errDirection="bottom"
              labelClass="rob-col-lg-4  rob-col-md-4 rob-col-lg-offset-6 rob-col-md-offset-6 rob-col-sm-24 rob-col-xs-24 text-left"
              inputClass="rob-col-lg-8 rob-col-md-8  rob-col-sm-24 rob-col-xs-24"
              placeholder="请再次输入新数字证书密码"
              ref={(node) => this.confirmNewUserPwd = node}
              handleChange={(s) => this.isRight('confirmNewUserPwd', s)}
              errorMsg="两次密码输入不一致"
              emptyMsg="确认新数字证书密码不能为空"
            />
          </div>
          <div className="qb-form-footButton-g clearfix qb-bg-white-g">
            <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <button className="rob-btn rob-btn-minor rob-btn-circle " type="button" onClick={this.cancle}>取消</button>
              <button className="rob-btn rob-btn-danger rob-btn-circle" onClick={this.submitForm}>确定</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditNumPwdPage.propTypes = {
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
  submitForm: PropTypes.func,
  cancle: PropTypes.func
}
EditNumPwdPage.defaultProps = {
  handleOpen: () => { },
  handleClose: () => { },
  submitForm: () => { },
  cancle: () => { }
}
export default connect(state => ({
  data: state.EditNumPwdQuery
}), dispatch => ({
  submitForm: bindActionCreators(action.submitForm, dispatch)
}))(EditNumPwdPage)