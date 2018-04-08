import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import md5 from 'md5'
import QBInput from 'components/QBInput'
import Button from 'react-robotUI/Button'
import Dialog from 'react-robotUI/dialog'
import emptyFunc from 'utils/emptyFunc'
import { trimLeftAndRight } from 'utils/filterCommon'
import * as action from '../redux/action'
import '../redux/reducer'

class StepTwo extends PureComponent {
  static propTypes = {
    handleClick: PropTypes.func,
    stepNum: PropTypes.number,
    userInfo: PropTypes.object,
    saveActivateInfo: PropTypes.func
  }
  static defaultProps = {
    handleClick: emptyFunc,
    stepNum: 0,
    userInfo: {},
    saveActivateInfo: emptyFunc
  }
  constructor(prop) {
    super(prop)
    this.state = {
      params: {},
      isShowErrorHint: false,
      oldNameFlag: true
    }
    this.inputs = {}
    this.renderData = [{
      label: '用户名',
      name: 'userCodeNew',
      required: true,
      pattern: /^[\s\S]{1,25}$/,
      errorMsg: '请输入1-25个数字、字母、符号、中文用户名',
      emptyMsg: '请输入姓名'
    }, {
      label: '登录密码',
      name: 'userPass1',
      required: true,
      emptyMsg: '请输入登录密码',
      errorMsg: '请输入8-12位数字、字母或符号',
      pattern: /^[^\u4e00-\u9fa5]{8,12}$/,
    }, {
      label: '确认登录密码',
      name: 'userPass2',
      required: true,
      pattern: /^[^\u4e00-\u9fa5]{8,12}$/,
      errorMsg: '请输入8-12位数字、字母或符号',
      emptyMsg: '请输入登录密码'
    }]
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.userCode && this.state.oldNameFlag) {
      this.state.oldNameFlag = false
      this.state.params.userCodeOld = nextProps.userInfo.userCode
      this.state.params.userCodeNew = nextProps.userInfo.userCode
      this.setState({ params: { ...this.state.params } })
      this.inputs.userCodeNew.setValue(nextProps.userInfo.userCode)
    }
  }
  /* 关闭alert弹出框 */
  alertClose = () => {
    this.setState({ showAlert: false })
  }
  /* 点击确定按钮事件 */
  handleClick = async () => {
    const { params } = this.state
    const isHaveError = await this.handleCheckout()
    if (!isHaveError) {
      return
    }
    if (params.userPass1 !== params.userPass2) {
      this.setState({ alertContent: '两次登录密码输入不一致', alertType: 'bg_icon qb-icon-fail', showAlert: true })
      return
    }
    params.userPass1 = md5(params.userPass1)
    params.userPass2 = md5(params.userPass2)
    let activateTwo = await this.props.saveActivateInfo(this.state.params)
    /* 处理用户状态 */
    if (activateTwo.data.respCode === '000000') {
      this.props.handleClick(3)()
    }
    // if (activateTwo.data.respCode !== '000000') {
    //   this.setState({ alertContent: activateTwo.data.respMsg, alertType: 'bg_icon qb-icon-fail', showAlert: true })
    // } else {
    //   this.props.handleClick(3)()
    // }
  }
  /* 点击确定按钮校验方法 */
  handleCheckout = async () => {
    let filter = []
    return new Promise(resolve => {
      this.setState({
        isShowErrorHint: true
      }, () => {
        const keys = Object.keys(this.inputs)
        for (let i = 0, len = keys.length; i < len; i++) {
          let key = keys[i]
          if (filter.includes(key)) {
            continue // eslint-disable-line
          }
          if (this.inputs[key] && this.inputs[key].getErrStatus()) {
            resolve(false)
            break
          }
        }
        resolve(true)
      })
    })
  }
  /* set params 方法 */
  handleChange = (key) => (value) => {
    this.setState({ params: { ...this.state.params, [key]: trimLeftAndRight(value) } })
  }
  render() {
    const { stepNum } = this.props,
      handleChange = this.handleChange, // 修改
      { params, isShowErrorHint } = this.state
    return (
      <div>
        <form className="rob-form qb-form-g__form qb-form-group-b10-g qb-mg-bt70-g" style={{ display: stepNum === 2 ? 'block' : 'none' }}>
          <div className="qb-form-pd-g qb-form-pd-g__xs-label">
            {this.renderData.map(({ name, label, pattern, required, errorMsg }, index) => (
              <QBInput
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
                inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
                label={label}
                name={name}
                isTestRule={isShowErrorHint}
                errorMsg={errorMsg}
                ref={r => this.inputs[name] = r}
                handleChange={handleChange(name)}
                defaultValue={params[name]}
                pattern={pattern}
                required={required}
                key={index}
              />
            ))}
          </div>
          <div className="">
            <div className="rob-col-lg-24 text-center qb-from-bg-reg-g">
              <Button className="rob-btn rob-btn-danger rob-btn-circle" label="提交" onClick={this.handleClick} />
            </div>
          </div>
        </form>
        <Dialog
          showCover
          showCloseBtn
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={this.alertClose}
          actions={[{
            label: '确定',
            className: 'rob-btn rob-btn rob-btn-danger rob-btn-circle',
            state: true
          }]}
          actionClassName="rob-alert-button-color"
        />
      </div>
    )
  }
}
export default connect(state => ({
  data: state.activateUserState
}), dispatch => ({
  saveActivateInfo: bindActionCreators(action.saveActivateInfo, dispatch)
}))(StepTwo)