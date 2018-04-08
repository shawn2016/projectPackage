import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Steps from 'react-robotUI/Steps'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
const logoImg = require('assets/images/logo.png')

class ActivateUserPage extends PureComponent {
  static propTypes = {
    history: PropTypes.object,
  }
  static defaultProps = {
    history: {},
  }
  constructor(prop) {
    super(prop)
    this.stepNum = 1
    this.isUkey = false
    this.state = {
      stepData: [{
        setpName: '验证身份',
        describe: '',
        iconValue: 1,
        isIcon: false,
        isFinish: true
      }, {
        setpName: '重置账号信息',
        describe: '',
        iconValue: 2,
        isIcon: false,
        isFinish: false
      }, {
        setpName: '激活完成',
        describe: '',
        iconValue: 3,
        isIcon: false,
        isFinish: false
      }]
    }
  }
  handleClick = (step, userInfo) => () => {
    userInfo ? this.userInfo = userInfo : null
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
  componentWillMount() {
  }
  render() {
    const { stepData } = this.state
    return (
      <div>
        <div className="header">
          <div className="rob-container">
            <div className="rob-row qb-header-g qb-header-g__bg">
              <div className="rob-col-xs-12 rob-col-sm-12 rob-col-md-12">
                <Link className="qb-header-g__logo" to="/login">
                  <img src={logoImg} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="qb-jumbotron-g">
          <div className="rob-container qb-container-g">
            <div className="rob-step-scrollm qb-container-g__pdt62">
              <Steps confData={stepData} />
            </div>
          </div>
        </div>
        <div className="rob-container lightGallery">
          <StepOne handleClick={this.handleClick} stepNum={this.stepNum} history={this.props.history} />
          <StepTwo handleClick={this.handleClick} stepNum={this.stepNum} userInfo={this.userInfo} />
          <StepThree handleClick={this.handleClick} stepNum={this.stepNum} history={this.props.history} />
        </div>
      </div>
    )
  }
}


export default connect(state => state)(ActivateUserPage)