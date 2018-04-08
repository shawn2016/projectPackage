import React, { PureComponent, PropTypes } from 'react'
import propTypes from 'prop-types'
// import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Steps from 'react-robotUI/Steps'
import StepOne from './components/StepOne'
const logoImg = require('assets/images/logo.png')
class Register extends PureComponent {
  constructor(prop) {
    super(prop)
    this.stepNum = 1
    this.state = {
      isCheck: 'YES',
      agree: false,
      stepData: [{
        setpName: '验证身份',
        describe: '',
        iconValue: 1,
        isIcon: false,
        isFinish: true
      }, {
        setpName: '查看注册结果',
        describe: '',
        iconValue: 2,
        isIcon: false,
        isFinish: false
      }]
    }
    this.steps = {}
  }
  componentWillReceiveProps(nextProps) {
    const { registerState } = nextProps,
      { saveInfo = {} } = registerState
    this.setState({
      finishedData: saveInfo
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
            <StepOne handleClick={this.handleClick} stepNum={this.stepNum} />
            {/*
            */}
          </div>
        </div>
      </div>
    )
  }
}
Register.propTypes = {
  handleCheckSaveInfo: propTypes.func,
  getFileUrl: propTypes.func,
  registerState: propTypes.object,
}
Register.defaultProps = {
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
const mapDispathToProps = () => ({
//   handleCheckSaveInfo: bindActionCreators(action.handleCheckSaveInfo, dispatch), // 保存注册信息
//   handleCheckBaseInfo: bindActionCreators(action.handleCheckBaseInfo, dispatch), // 检验基本信息
//   handleMessageCode: bindActionCreators(action.handleMessageCode, dispatch), // 获取短信验证码
})

export default connect(state => state, mapDispathToProps)(Register)