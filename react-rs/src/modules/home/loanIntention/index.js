import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import QBInput from 'components/QBInput'
import QBTextarea from 'components/QBTextarea'
import Dialog from 'react-robotUI/dialog'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './redux/reducer'
import * as action from './redux/actions'


class homePage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      isTestRule: false,
    }
  }
  isRight = (type, value) => {
    this.setState({
      [type]: value
    })
  }
  goHome = () => {
    this.props.history.push('/home/home')
  }
  submitForm = () => {
    this.setState({
      isTestRule: true,
    }, async () => {
      // console.log(this.textareaValueData.value)
      if (this.textareaValueData.getErrStatus() || this.nameValueData.getErrStatus() || this.telValueData.getErrStatus() || this.limitValueData.getErrStatus()) {
        return
      }
      let params = {}
      params.contactName = this.state.contactName
      params.contactPhone = this.state.contactPhone
      params.applyAmount = Math.round(this.state.applyAmount * 100)
      params.loanUsed = this.state.loanUsed

      let resData = await this.props.submitForms(params)
      if (resData.data.respCode === '000000') {
        this.setState({
          showAlert: true,
          alertContent: '您的贷款申请已提交，请耐心等待处理结果！',
          alertType: 'bg_icon qb-icon-success',
          alertStatus: true,
          alertBtns: [{
            label: '确定',
            className: 'rob-btn-danger rob-btn-circle rob-alert-button-color',
            state: 'skip'
          }]
        })
      }/*else {
        this.setState({
          showAlert: true,
          alertContent: resData.data.respMsg,
          alertType: 'bg_icon qb-icon-fail',
          alertStatus: false
        })
      }*/
    })
  }
  /* 关闭弹出框 */
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type) this.props.history.push('/creditManagement/loanIntentionQuery')
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.getNameAndTel) {
      this.nameValueData.setValue(nextProps.data.getNameAndTel.userName)
    }
  }
  componentDidMount() {
    this.props.getNameAndTel()
  }
  render() {
    return (
      <div className="qb-panel-g" >
        <div className="qb-column-header-g">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li onClick={this.goHome}><a ><i className="qb-icon-home" />首页</a></li>
            <li className="active">贷款意向申请</li>
          </ol>
        </div>
        <div className="qb-form-group-g clearfix qb-media-height">
          <div className="rob-form-group qb-form-group-b10-g">
            <div className=" rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBInput
                name="name"
                type="name"
                label="联系人姓名"
                required
                errDirection="bottom"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg "
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                isTestRule={this.state.isTestRule}
                pattern={/^.{1,58}$/}
                emptyMsg="联系人姓名不能为空"
                placeholder="请输入联系人姓名"
                errorMsg="请输入1-58个任意字符"
                ref={(name) => this.nameValueData = name}
                handleChange={(r) => this.isRight('contactName', r)}
              />
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBInput
                name="tel"
                type="tel"
                label="手机号码"
                required
                errDirection="bottom"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg "
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                isTestRule={this.state.isTestRule}
                ref={(tel) => this.telValueData = tel}
                placeholder="请输入手机号码"
                emptyMsg="手机号码不能为空"
                errorMsg="请输入正确的手机号"
                handleChange={(r) => this.isRight('contactPhone', r)}
              />
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBInput
                name="limit"
                type="limit"
                label="期望额度（元）"
                required
                errDirection="bottom"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg "
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                pattern={/^0{1}$|^[1-9]{1}\d{0,12}$|^[1-9]{1}\d{0,12}\.\d{1,2}$|^0\.{1}\d{0,2}$/}
                isTestRule={this.state.isTestRule}
                ref={(limit) => this.limitValueData = limit}
                handleChange={(r) => this.isRight('applyAmount', r)}
                placeholder="请输入期望额度"
                errorMsg="请输入整数不超过13位，小数不超过2位的金额"
                emptyMsg="期望额度不能为空"
              />
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBTextarea
                name="used"
                type="used"
                label="融资用途"
                required
                errDirection="bottom"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg "
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                placeholder="请输入融资用途"
                pattern={/^[\S\s]{1,140}$/}
                isTestRule={this.state.isTestRule}
                handleChange={(r) => { this.isRight('loanUsed', r) }}
                ref={(used) => this.textareaValueData = used}
                emptyMsg="融资用途不能为空"
                errorMsg="请输入1-140个任意字符"
              />
            </div>
          </div>
          <div className="qb-form-footButton-g clearfix qb-bg-white-g">
            <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <button style={{ width: '40%' }} onClick={this.submitForm} className="rob-btn rob-btn-danger rob-btn-circle" type="button">提交</button>
            </div>
          </div>
        </div>
        <Dialog
          showCover
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={() => this.alertClose(this.state.alertStatus)}
          actions={this.state.alertBtns}
          actionClassName="rob-alert-button rob-alert-button-color"
        />
      </div >
    )
  }
}

homePage.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
  submitForms: PropTypes.func,
  getNameAndTel: PropTypes.func

}
homePage.defaultProps = {
  data: {},
  history: {},
  submitForms: () => { },
  getNameAndTel: () => { }
}

export default connect(state => ({
  data: state.HELN_sebmitformvalue
}), dispatch => ({
  submitForms: bindActionCreators(action.sebmitFormsData, dispatch),
  getNameAndTel: bindActionCreators(action.getNameAndTelData, dispatch)
}))(homePage)