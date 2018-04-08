import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    label: PropTypes.string,
    disabled: PropTypes.bool,
  }
  static defaultProps = {
    className: '',
    style: {},
    label: '',
    disabled: false
  }
  render() {
    const {
      className,
      style,
      label,
      disabled,
      ...prop
    } = this.props

    return (
      <button
        type="button"
        className={`rob-btn ${className}`}
        disabled={disabled}
        style={style}
        {...prop}
      >
        {label}
      </button>
    )
  }
}

export default Button
