import React, { Component } from 'react'
import PropTypes from 'prop-types'

class StepsHorizontal extends Component {
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
        <div className="rob-steps rob-is-horizontal rob-is-horizontal--mgleft">
          {confData.map((obj, i) => (
            <div className="rob-step rob-is-horizontal" key={i} style={{ width: `${i === confData.length - 1 ? '0%' : `${100 / (confData.length - 1)}%`}` }}>
              <div className={`rob-step-head rob-is-text ${obj.isFinish ? 'rob-is-success' : 'rob-is-process'}`}>
                <div className="rob-step-line rob-is-horizontal" style={{ marginRight: '0px' }}>
                  <i className="rob-step-line-inner" style={{ transitionDelay: '0ms', background: '#dc0000', height: '1px', width: `${i === confData.length - 1 ? '0%' : `${confData[i].isFinish ? '100%' : '0%'}`}` }} />
                </div>
                <span className="rob-step-icon">
                  {obj.isFinish ? <i className="qb-icon-OK" /> : <div>{obj.iconValue}</div>}
                </span>
              </div>
              <div className="rob-step-main " style={{ marginLeft: '-25%', width: '50%', textAlign: 'center', paddingRight: '0', position: 'relative', left: '20px' }}>
                <div className={`rob-step-title ${i === confData.length - 1 ? 'qb-jumbotron-g--transform' : ''} ${obj.isFinish ? 'rob-is-success' : 'rob-is-process'}`}>{obj.setpName}</div>
                <div className={`rob-step-description ${obj.isFinish ? 'rob-is-success' : 'rob-is-process'}`}>{obj.describe}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default StepsHorizontal
