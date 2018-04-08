import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { loadingMap } from './dataMap'

class Loading extends Component {
  static propTypes = {
    loadType: PropTypes.string.isRequired,
    content: PropTypes.any,
    showLoading: PropTypes.bool
  }
  static defaultProps = {
    loadType: '',
    content: '',
    showLoading: false
  }
  render() {
    const {
      loadType,
      content,
      showLoading
    } = this.props
    const loadingElements = loadingMap[loadType](content)
    return (
      <div style={{ display: showLoading ? 'block' : 'none' }}>
        <div className="rob-loading-bg" />
        <div className={`rob-loading ${loadType === 'loadingIconBlue' ? 'rob-loading-four-blue' : null}`}>
          {loadingElements}
        </div>
      </div>
    )
  }
}

export default Loading