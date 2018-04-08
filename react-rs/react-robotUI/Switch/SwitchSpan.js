import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SwitchSpan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btnState: this.props.checked
    }
    this.handleClick = () => {
      this.setState({ btnState: !this.state.btnState })
      this.props.handleClick(!this.state.btnState)
    }
  }
  static propTypes = {
    small: PropTypes.bool,
    text: PropTypes.bool,
    innerIcon: PropTypes.string,
    checked: PropTypes.bool,
    handleClick: PropTypes.func
  }
  static defaultProps = {
    small: false,
    text: false,
    innerIcon: '',
    checked: false,
    handleClick: () => {}
  }
  render() {
    const {
      small,
      text,
      innerIcon
    } = this.props
    return (
      <span
        className={`rob-switch-two
        ${small ? 'rob-switch-two-small' : null}
        ${this.state.btnState ? 'rob-switch-two-checked' : null}`}
        onClick={this.handleClick}
      >
        <span className="rob-switch-two-inner">{text ? this.state.btnState ? '开' : '关' : null}
          <i className={`rob-icon ${innerIcon}`} />
        </span>
      </span>
    )
  }
}

export default SwitchSpan