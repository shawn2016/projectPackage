import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CalenderInput from '../Calender'
export default class FormDatepicker extends Component {
  static robotUIName = 'FormInput'
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    emptyMsg: PropTypes.string,
    defaultValue: PropTypes.any,
    containErrorIcon: PropTypes.bool,
    errorIconName: PropTypes.string,
    dateFormat: PropTypes.string,
    isWorkday: PropTypes.bool,
    multiSelect: PropTypes.bool,
    hasFooter: PropTypes.bool,
    isRange: PropTypes.bool,
    handleSelect: PropTypes.func,
    isTestRule: PropTypes.bool
  }
  static defaultProps = {
    required: false,
    emptyMsg: '请选择该选项',
    errorMsg: '该选项格式错误',
    defaultValue: '',
    containErrorIcon: false,
    errorIconName: 'qb-icon-calendar',
    dateFormat: 'yy-MM-dd',
    isWorkday: true,
    multiSelect: false,
    hasFooter: false,
    isRange: false,
    handleSelect: () => { },
    isTestRule: false
  }
  render() {
    return (
      <div>
        <CalenderInput
          name={this.props.name}
          label={this.props.label}
          content={this.props.dateFormat.length > 5 ? 'd' : 'm'}
          isWorkday={this.props.isWorkday.toString()}
          isRange={this.props.isRange.toString()}
          multiSelect={this.props.multiSelect.toString()}
          hasFooter={this.props.hasFooter.toString()}
          dateFormat={this.props.dateFormat}
          getDate={this.props.handleSelect}
          required={this.props.required}
          emptyMsg={this.props.emptyMsg}
          defaultValue={this.props.defaultValue}
          containErrorIcon={this.props.containErrorIcon}
          errorIconName={this.props.errorIconName}
          isTestRule={this.props.isTestRule}
        />
      </div>
    )
  }
}