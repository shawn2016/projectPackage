import React, { Component } from 'react'
import PropTypes from 'prop-types'

class StepsVertical extends Component {
  constructor(props) {
    super(props)

    this.state = { }
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
        <div className="rob-steps rob-is-vertical">
          {confData.map((obj, i) => (
            <div className="rob-step rob-is-vertical" key={i} style={{ marginRight: '0px', height: `${i === confData.length - 1 ? null : '100px'}` }}>
              <div className={`rob-step-head ${obj.isIcon ? '' : 'rob-is-text'} ${obj.isFinish ? 'rob-is-finish' : 'rob-is-process'}`}>
                <div className="rob-step-line rob-is-vertical" style={{ marginRight: '0px' }}>
                  <i className="rob-step-line-inner" style={{ transitionDelay: '0ms', borderWidth: '1px', height: `${i === confData.length - 1 ? '0%' : `${confData[i + 1].isFinish ? '100%' : '50%'}`}` }} />
                </div>
                <span className="rob-step-icon">
                  {obj.isIcon ? <i className={obj.iconValue} /> : <div>{obj.iconValue}</div>}
                </span>
              </div>
              <div className="rob-step-main" style={{ marginLeft: '0px' }}>
                <div className={`rob-step-title ${obj.isFinish ? 'rob-is-finish' : 'rob-is-process'}`}>{obj.setpName}</div>
                <div className={`rob-step-description ${obj.isFinish ? 'rob-is-finish' : 'rob-is-process'}`}>{obj.describe}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default StepsVertical
