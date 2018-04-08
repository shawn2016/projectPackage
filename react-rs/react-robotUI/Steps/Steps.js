import React, { Component } from 'react'
import PropTypes from 'prop-types'

import StepsHorizontal from './StepsHorizontal'
import StepsVertical from './StepsVertical'
import StepsImg from './StepsImg'

class Steps extends Component {
  static propTypes = {
    confData: PropTypes.array,
    stepType: PropTypes.string
  }
  static defaultProps = {
    confData: [],
    stepType: 'horizenStep'
  }
  render() {
    const {
      confData,
      stepType
    } = this.props
    if (stepType === 'horizenStep') {
      return (
        <div>
          <StepsHorizontal confData={confData} />
        </div>
      )
    } else if (stepType === 'verticalStep') {
      return (
        <div>
          <StepsVertical confData={confData} />
        </div>
      )
    } else if (stepType === 'imgStep') {
      return (
        <div>
          <StepsImg confData={confData} />
        </div>
      )
    }
  }
}

export default Steps