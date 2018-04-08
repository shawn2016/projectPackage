import React, { PureComponent, PropTypes } from 'react'
import propTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Steps from 'react-robotUI/Steps'
import StepOne from './components/one'
import StepTwo from './components/two'
import StepThree from './components/three'
import * as action from './redux/action'
const logoImg = require('assets/images/logo.png')
class Register extends PureComponent {
  constructor(prop) {
    super(prop)
    this.stepNum = 0
    this.isUpdate = true
    this.state = {
      isCheck: 'YES',
      agree: false,
      stepData: [{
        setpName: '基本资料',
        describe: '',
        iconValue: 1,
        isIcon: false,
        isFinish: true
      }, {
        setpName: '附件资料',
        describe: '',
        iconValue: 2,
        isIcon: false,
        isFinish: false
      }, {
        setpName: '注册完成',
        describe: '',
        iconValue: 3,
        isIcon: false,
        isFinish: false
      }]
    }
    this.steps = {}
  }
  componentWillMount() {
    // 如果是修改注册信息 且 不修改企业类型
    if (this.props.location.state && this.props.location.state.companyType === '200') {
      // todo: 获取企业注册信息
      let params = {}
      params.companyLicense = this.props.location.state.companyLicense
      params.companyType = this.props.location.state.companyType
      this.props.handleGetCompanyInfo({ ...params })
    }
  }
  componentWillReceiveProps(nextProps) {
    const { registerState } = nextProps,
      { saveInfo = {} } = registerState
    this.setState({
      finishedData: saveInfo
    })
  }
  /**
   * componentWillUnmount 时清楚掉表单缓存
   */
  componentWillUnmount() {
    // console.log('11111111111111清楚缓存')
  }
  /**
   * 跳转到登陆
  */
  goLogin = () => {
    this.context.router.history.push('/login')
  }
  handleClick = (step) => () => {
    const { stepData } = this.state
    if (step === 0) return
    this.stepNum = step
    if (step === 1 || step === 2) {
      this.isUpdate = false
    }
    stepData.forEach((item, i) => {
      if (i < step) {
        item.isFinish = true // eslint-disable-line
        return
      }
      item.isFinish = false // eslint-disable-line
    })
    this.setState({
      stepData: [...stepData]
    })
  }
  handleSubmit = () => {
    let params = {}
    Object.keys(this.steps).forEach((item) => {
      Object.assign(params, item.state.params)
    })
    this.props.handleCheckSaveInfo(params)
  }
  render() {
    const { stepData } = this.state
    return (
      <div>
        <div className="header">
          <div className="rob-container">
            <div className="qb-header-g qb-header-g__bg">
              <Link className="qb-header-g__logo" to="/login">
                <img src={logoImg} alt="" />
              </Link>
              <span className="qb-greet-g fs16">欢迎注册</span>
              <div className="qb-pull-right-g qb-greet-g mr40">已有账号？去<Link className="qb-red-g fs14" to="/login">登录</Link></div>
            </div>
          </div>
        </div>
        <div>
          <div className="qb-jumbotron-g">
            <div className="rob-container qb-container-g">
              <div className="rob-step-scrollm qb-container-g__pdt62">
                <Steps confData={stepData} />
              </div>
            </div>
          </div>
          <div className="rob-container lightGallery">
            <StepOne handleClick={this.handleClick} isUpdate={this.isUpdate} stepNum={this.stepNum} routerParams={this.props.location.state} />
            <StepTwo handleRadio={this.handleRadio} isUpdate={this.isUpdate} handleClick={this.handleClick} routerParams={this.props.location.state} stepNum={this.stepNum} ref={r => this.steps.systemInfo = r} />
            <StepThree handleClick={this.handleClick} stepNum={this.stepNum} finishedData={this.state.finishedData} />
          </div>
        </div>
      </div>
    )
  }
}
Register.propTypes = {
  handleGetCompanyInfo: PropTypes.func,
  location: PropTypes.object,
  handleCheckSaveInfo: propTypes.func,
  getFileUrl: propTypes.func,
  registerState: propTypes.object,
}
Register.defaultProps = {
  handleGetCompanyInfo: () => {},
  location: {},
  handleCheckSaveInfo: () => { },
  getFileUrl: () => { },
  registerState: {},
}
Register.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    staticContext: PropTypes.object,
  })
}
const mapDispathToProps = (dispatch) => ({
  handleCheckSaveInfo: bindActionCreators(action.handleSaveSmallAllInfo, dispatch), // 保存注册信息
  handleCheckBaseInfo: bindActionCreators(action.handleCheckBaseInfo, dispatch), // 检验基本信息
  handleMessageCode: bindActionCreators(action.smallRegisterSendSmsCode, dispatch), // 获取短信验证码
  handleGetCompanyInfo: bindActionCreators(action.getSmallRegisterCompanyInfo, dispatch) // 获取企业信息
})

export default connect(state => state, mapDispathToProps)(Register)