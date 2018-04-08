import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SwitchInput extends Component {
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
    checked: PropTypes.bool,
    handleClick: PropTypes.func
  }
  static defaultProps = {
    checked: false,
    handleClick: () => {}
  }
  render() {
    return (
      <div className="rob-switch">
        <label>
          关闭
          <input type="checkbox" checked={this.state.btnState} onChange={this.handleClick} />
          <span className="rob-switch-lever" />
          打开
        </label>
      </div>
    )
  }
}

export default SwitchInput