import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TableCheckbox extends Component {
  static robotUIName = 'TableCheckbox'
  static propTypes = {
    style: PropTypes.object,
    /* 父组件传递*/
    defaultSelected: PropTypes.bool,
    checkboxDisabled: PropTypes.bool,
    checkboxIdName: PropTypes.string,
    checkboxType: PropTypes.string,
    checkboxLabel: PropTypes.string,
    handleSelect: PropTypes.func

  }

  static defaultProps = {
    style: {},
    defaultSelected: false,
    checkboxDisabled: false,
    checkboxIdName: '',
    checkboxType: 'default',
    checkboxLabel: '',
    handleSelect: null
  }
  render() {
    let _className = `${this.props.checkboxType === 'fill' ? 'rob-checkbox-filled-in' : this.props.checkboxType === 'circular' ? 'rob-checkbox-filled-in rob-checkbox-bordered' : ''}`
    return (
      <th className="text-center">
        <input
          type="checkbox"
          checked={this.props.defaultSelected}
          disabled={this.props.checkboxDisabled}
          id={this.props.checkboxIdName}
          className={_className}
          onClick={this._handleClick}
        />
        <label htmlFor={this.props.checkboxIdName}>
          {this.props.checkboxLabel}
        </label>
      </th>
    )
  }
  _handleClick = () => {
    this.props.handleSelect()
  }
}