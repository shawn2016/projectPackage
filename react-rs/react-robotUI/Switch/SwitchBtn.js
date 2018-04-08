import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SwitchInput from './SwitchInput'
import SwitchSpan from './SwitchSpan'

class SwitchBtn extends Component {
  static propTypes = {
    typeInput: PropTypes.bool,
    small: PropTypes.bool,
    text: PropTypes.bool,
    innerIcon: PropTypes.string,
    checked: PropTypes.bool,
    handleClick: PropTypes.func
  }
  static defaultProps = {
    typeInput: false,
    small: false,
    text: false,
    innerIcon: '',
    checked: false,
    handleClick: () => {}
  }
  render() {
    const {
      typeInput,
      small,
      text,
      innerIcon,
      checked,
      handleClick
    } = this.props

    let inputElement = <SwitchInput checked={checked} handleClick={handleClick} />
    let spanElement = <SwitchSpan small={small} innerIcon={innerIcon} text={text} checked={checked} handleClick={handleClick} />
    let element = typeInput ? inputElement : spanElement

    return element
  }
}

export default SwitchBtn
