import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import EventEmitter from 'wolfy87-eventemitter'
// const ee = new EventEmitter()
/**
 * 维护formDatas数组，来掌控整个form表单，完成submit拦截，错误判断提示等功能；
 * 最小粒度的formItem在初始化和发生改变时应手动通知该组件来修改formData；
 * @export
 * @class Form
 * @extends {Component}
 */
let stateArr = []
export default class Form extends Component {
  static robotUIName = 'Form'
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  static defaultProps = {
  }
  static childContextTypes = {
    creactFormData: PropTypes.func,
    updateFormData: PropTypes.func,
    isTestRule: PropTypes.bool,
    ee: PropTypes.object,
    formSubmit: PropTypes.func,
    formClear: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      formData: [],
      isTestRule: false
    }
  }
  getChildContext() {
    return {
      creactFormData: this._creactFormData,
      updateFormData: this._updateFormData,
      isTestRule: this.state.isTestRule,
      ee,
      formSubmit: this._formSubmit,
      formClear: this._formClear
    }
  }
  render() {
    return (
      <form
        className="rob-form clearfix"
        onSubmit={(e) => {
          e.preventDefault()
          this.setState({
            isTestRule: true
          })
        }}
      >
        {this.props.children}
      </form>
    )
  }
  _updateFormData = (obj) => {
    let temp = this.state.formData
    for (let i = 0, len = temp.length; i < len; i++) {
      if (temp[i].name === obj.name) {
        temp[i] = obj
      }
    }
    this.setState({ formData: temp }, () => {
    })
  }
  _creactFormData = (obj) => {
    stateArr.push(obj)
    this.setState({ formData: stateArr })
  }
  _formSubmit = (callback) => {
    ee.emitEvent('submit')
    let _result = {}
    for (let i = 0; i < this.state.formData.length; i++) {
      if (this.state.formData[i].containError) {
        return
      }
      _result[this.state.formData[i].name] = this.state.formData[i].value
    }
    callback(_result)
  }
  _formClear = (callback) => {
    this.setState({ formData: [] })
    stateArr = []
    ee.emitEvent('clear')
    callback()
  }
}