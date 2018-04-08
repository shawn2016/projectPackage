import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormInput from './FormInput'

export default class FormItem extends Component {
  static robotUIName = 'FormItem'
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    lable: PropTypes.string.isRequired,
    required: PropTypes.bool,
    emptyMsg: PropTypes.string,
    errorMsg: PropTypes.string,
    pattern: PropTypes.object,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    containLeftIcon: PropTypes.bool,
    leftIconName: PropTypes.string,
    containRightIcon: PropTypes.bool,
    rightIconName: PropTypes.string
  }
  static defaultProps = {
    required: false,
    emptyMsg: '请填写该选项',
    errorMsg: '请输入正确格式的数据',
    pattern: null,
    defaultValue: '',
    disabled: false,
    containLeftIcon: false,
    leftIconName: '',
    containRightIcon: false,
    rightIconName: ''
  }

  render() {
    return (
      <FormInput {...this.props} />

    )
  }
}