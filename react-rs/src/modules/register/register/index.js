import React, { PureComponent, PropTypes } from 'react'
import propTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Steps from 'react-robotUI/Steps'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
import StepFour from './components/StepFour'
import * as action from './redux/action'
const img1 = require('assets/images/logo.png')
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
        setpName: '系统管理员信息',
        describe: '',
        iconValue: 2,
        isIcon: false,
        isFinish: false
      }, {
        setpName: '附件资料',
        describe: '',
        iconValue: 3,
        isIcon: false,
        isFinish: false
      }, {
        setpName: '注册完成',
        describe: '',
        iconValue: 4,
        isIcon: false,
        isFinish: false
      }]
    }
    this.steps = {}
  }
  componentWillMount() {
    let { state = {} } = this.props.location
    // 如果是修改 且不修改企业类型 获取企业注册信息
    if (state.companyType === '100') {
      let params = {}
      params.companyLicense = state.companyLicense
      params.companyType = state.companyType
      this.props.handleGetBIgCompanyInfo(params)
    }
  }
  componentWillReceiveProps(nextProps) {
    const { registerState } = nextProps,
      { saveInfo = {} } = registerState
    this.setState({
      finishedData: saveInfo
    })
  }
  static propTypes = {
    handleGetBIgCompanyInfo: PropTypes.func,
    location: PropTypes.object,
    handleCheckSaveInfo: propTypes.func,
    getFileUrl: propTypes.func,
    registerState: propTypes.object,
  }
  static defaultProps = {
    handleGetBIgCompanyInfo: () => {},
    location: {},
    handleCheckSaveInfo: () => { },
    getFileUrl: () => { },
    registerState: {},
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object,
    })
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
    this.isUpdate = false
    this.stepNum = step
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
  handleRadio = (status) => {
    this.setState({
      isCheck: status
    })
  }
  render() {
    const { stepData } = this.state
    return (
      <div>
        {/*
        <div className="header">
          <div className="rob-container">
            <div className="rob-row qb-header-g qb-header-g__bg">
              <div className="rob-col-xs-12 rob-col-sm-12 rob-col-md-12">
                <Link className="qb-header-g__logo" to="/login">
                  <img src={img1} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        */}
        <div className="header">
          <div className="rob-container">
            <div className="qb-header-g qb-header-g__bg">
              <Link className="qb-header-g__logo" to="/login">
                <img src={img1} alt="" />
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
            {/*
              <div className="text-right qb-container-g qb-red-g__line">
            已有账号？<Link to="/login" className="qb-red-g qb__line">去登录</Link>
            </div>
            */}
            <StepOne isUpdate={this.isUpdate} routerParams={this.props.location.state} handleClick={this.handleClick} stepNum={this.stepNum} ref={r => this.steps.baseInfo = r} />
            <StepTwo isUpdate={this.isUpdate} routerParams={this.props.location.state} handleRadio={this.handleRadio} handleClick={this.handleClick} stepNum={this.stepNum} ref={r => this.steps.systemInfo = r} />
            <StepThree isUpdate={this.isUpdate} routerParams={this.props.location.state} handleClick={this.handleClick} isCheck={this.state.isCheck} stepNum={this.stepNum} ref={r => this.steps.identity = r} />
            <StepFour handleClick={this.handleClick} stepNum={this.stepNum} finishedData={this.state.finishedData} />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispathToProps = (dispatch) => ({
  handleCheckSaveInfo: bindActionCreators(action.handleCheckSaveInfo, dispatch), // 保存注册信息
  handleCheckBaseInfo: bindActionCreators(action.handleCheckBaseInfo, dispatch), // 检验基本信息
  handleCheckSystemInfo: bindActionCreators(action.handleCheckSystemInfo, dispatch), // 校验系统管理员信息
  handleMessageCode: bindActionCreators(action.handleMessageCode, dispatch), // 获取短信验证码
  handleGetBIgCompanyInfo: bindActionCreators(action.getBigCompanyInfo, dispatch)// 修改注册时 获取企业信息
})

export default connect(state => state, mapDispathToProps)(Register)