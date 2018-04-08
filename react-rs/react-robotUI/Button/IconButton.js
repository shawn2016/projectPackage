import React, { Component } from 'react'
import PropTypes from 'prop-types'

class IconButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    label: PropTypes.string,
    iconClassName: PropTypes.string.isRequired,
    iconStyle: PropTypes.object
  }
  static defaultProps = {
    className: '',
    style: {},
    label: '',
    iconStyle: {}
  }
  render() {
    const {
      className,
      style,
      label,
      iconClassName,
      iconStyle,
      ...prop
    } = this.props
    return (
      <button
        className={`rob-btn ${className}`}
        style={style}
        {...prop}
      >
        <i className={iconClassName} style={iconStyle} />
        {label}
      </button>
    )
  }
}

export default IconButton
