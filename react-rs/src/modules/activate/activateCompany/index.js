import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Steps from 'react-robotUI/Steps'
import StepOne from './components/StepOne'


class ActivateCompanyPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.stepNum = 1
    this.state = {
      stepData: [{
        setpName: '关联对公账号',
        describe: '',
        iconValue: 1,
        isIcon: false,
        isFinish: true
      }, {
        setpName: '缴存费用',
        describe: '',
        iconValue: 2,
        isIcon: false,
        isFinish: false
      }, {
        setpName: '等待验证',
        describe: '',
        iconValue: 3,
        isIcon: false,
        isFinish: false
      }]
    }
  }
  componentWillMount() {
  }
  render() {
    const { stepData } = this.state
    return (
      <div className="qb-panel-g qb-search-g--layout">
        <div className="qb-jumbotron-g" style={{ marginTop: '0px' }}>
          <div className="rob-container qb-container-g">
            <div className="rob-step-scrollm qb-container-g__pdt62">
              <Steps confData={stepData} />
            </div>
          </div>
        </div>
        <div className="text-center qb-container-g qb-red-g__line">
          <a className="qb__line col-f83">*为了您能够享用融数钱包的各项服务，请关联贵企业的对公账户。</a>
        </div>
        <div className="rob-container lightGallery">
          <StepOne history={this.props.history} />
        </div>
      </div>
    )
  }
}
ActivateCompanyPage.propTypes = {
  history: PropTypes.object
}
ActivateCompanyPage.defaultProps = {
  history: {}
}

export default connect(state => state)(ActivateCompanyPage)