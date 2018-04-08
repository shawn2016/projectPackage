import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Progress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      percent: 0
    }
  }
  static propTypes = {
    gressType: PropTypes.string,
    color: PropTypes.string,
    iscomplate: PropTypes.bool
  }
  static defaultProps = {
    gressType: '',
    color: '',
    iscomplate: false
  }
  componentWillReceiveProps(props) {
    if (props.iscomplate) {
      clearInterval(this.showProgress)
      this.setState({ percent: 100 })
    }
  }
  componentDidMount() {
    this.showProgress = setInterval(() => {
      if (this.state.percent < 95) {
        this.setState({ percent: this.state.percent + 1 })
      }
    }, 15)
  }
  componentWillUnmount() {
    this.showProgress ? clearInterval(this.showProgress) : null
  }
  render() {
    const {
      gressType,
      color
    } = this.props
    return (
      <div className={`rob-progress ${color} ${gressType === 'innerNumber' ? ' rob-progress--text-inside' : ''}`}>
        <div className="rob-progress-bar">
          <div className="rob-progress-bar-outer">
            <div className="rob-progress-bar-inner" ref={(ele) => { this.styleRef = ele }} style={{ width: `${this.state.percent}%` }}>
              {gressType === 'innerNumber' ?
                <div className="rob-progress-bar-innerText">
                  {this.state.percent}%
                </div> : null
              }
            </div>
          </div>
        </div>
        { gressType !== 'innerNumber' ?
          <div className="rob-progress-text">
            {gressType === 'outerIcon' ? <i className="rob-icon qb-icon-home" /> : `${this.state.percent}%`}
          </div> : null
        }
      </div>
    )
  }
}

export default Progress