import React, { Component } from 'react'
import PropTypes from 'prop-types'

class StepsImg extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static propTypes={
    confData: PropTypes.array,
  }
  static defaultProps = {
    confData: [],
  }
  render() {
    const {
      confData
    } = this.props
    return (
      <div className="rob-step-scroll" >
        <div className="rob-steps rob-is-horizontal rob-is-img">
          {confData.map((obj, i) => (
            <div className="rob-step rob-is-horizontal" key={i} style={{ width: `${i === confData.length - 1 ? '0%' : `${100 / (confData.length - 1)}%`}` }}>
              <div className={`rob-step-head ${obj.isFinish ? 'rob-is-success' : 'rob-is-process'}`}>
                <div className="rob-step-line rob-is-horizontal">
                  <div className={`rob-step-line-desc ${obj.isFinish ? 'rob-is-success' : null}`}>
                    哈哈哈哈
                  </div>
                  <i className="rob-step-line-inner" style={{ transitionDelay: '0ms', borderWidth: '1px', background: '#dd0000', height: '1', width: `${i === confData.length - 1 ? '0%' : `${confData[i + 1].isFinish ? '100%' : '50%'}`}` }} />
                </div>
                <span className="rob-step-icon">
                  <span className={obj.iconValue} />
                </span>
              </div>
              <div className="rob-step-main" style={{ marginLeft: '0px' }}>
                <div className={`rob-step-title ${obj.isFinish ? 'rob-is-success' : 'rob-is-process'}`}>{obj.setpName}</div>
                <div className={`rob-step-description ${obj.isFinish ? 'rob-is-success' : 'rob-is-process'}`}>{obj.describe}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default StepsImg
