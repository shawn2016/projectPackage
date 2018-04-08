import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FormInput extends Component {
  static robotUIName = 'FormInput'
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    emptyMsg: PropTypes.string,
    errorMsg: PropTypes.string,
    pattern: PropTypes.object,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    containLeftIcon: PropTypes.bool,
    leftIconName: PropTypes.string,
    containRightIcon: PropTypes.bool,
    rightIconName: PropTypes.string,
    containErrorIcon: PropTypes.bool,
    errorIconName: PropTypes.string,
    handleChange: PropTypes.func,
    /* 修改*/
    isTestRule: PropTypes.bool
  }
  static defaultProps = {
    type: 'other',
    label: '默认label',
    required: false,
    emptyMsg: '请填写该选项',
    errorMsg: '请输入正确格式的数据',
    pattern: null,
    placeholder: '',
    defaultValue: '',
    disabled: false,
    containLeftIcon: false,
    leftIconName: 'qb-icon-calendar',
    containRightIcon: false,
    rightIconName: 'qb-icon-calendar',
    containErrorIcon: false,
    errorIconName: 'qb-icon-calendar',
    handleChange: null,
    isTestRule: false
  }
  // static contextTypes = {
  //   updateFormData: PropTypes.func,
  //   creactFormData: PropTypes.func,
  //   isTestRule: PropTypes.bool,
  //   ee: PropTypes.object
  // }

  constructor(props) {
    super(props)
    const RULES = {
      tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
      IDCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
      email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
      postcode: /^[1-9]\d{5}(?!\d)$/
    }
    this.state = {
      value: props.defaultValue || '',
      isShowErrorHint: props.isTestRule,
      isError: false,
      errorInfo: '',
      pattern: null
    }
    if (props.pattern) {
      this.state.pattern = props.pattern
    } else {
      this.state.pattern = RULES[props.type] || /.*/
    }
  }
  componentWillMount() {
    // this.context.creactFormData({
    //   name: this.props.name,
    //   value: this.props.defaultValue,
    //   required: this.props.required,
    //   containError: this.props.required
    // })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      isShowErrorHint: nextProps.isTestRule
    })
  }
  componentDidMount() {
    // this.context.ee.addListener('submit', () => {
    //   this.state.isShowErrorHint = true
    //   this._testRule()
    // })
    // this.context.ee.addListener('clear', () => {
    //   this.setState({
    //     value: this.props.defaultValue || '',
    //     isShowErrorHint: false,
    //     isError: false,
    //     errorInfo: ''
    //   })
    //   this.context.creactFormData({
    //     name: this.props.name,
    //     value: this.props.defaultValue,
    //     required: this.props.required,
    //     containError: this.props.required
    //   })
    //   console.log('context')
    // })
  }
  componentWillUnmount() {
    // this.context.ee.removeEvent('submit')
    // this.context.ee.removeEvent('clear')
  }
  render() {
    return (
      <div className={`rob-form-group rob-col-lg-24 ${this.state.isError ? 'rob-input-has-error' : ''}`}>
        <div className="text-right" style={{ width: '25%', float: 'left' }}>
          <label htmlFor="inputEmail3" className="rob-input-label">
            {`${this.props.label}:`}
          </label>
        </div>

        <div className="" style={{ width: '75%', float: 'left' }}>
          <div className={`${this.props.containLeftIcon ? 'rob-has-icon-left' : ''}${this.props.containRightIcon ? ' rob-has-icon-right' : ''}`}>
            {this.props.containLeftIcon ? <i className={`rob-is-icon-left ${this.props.leftIconName}`} /> : null}
            {this.props.containRightIcon ? <i className={`rob-is-icon-right ${this.props.rightIconName}`} /> : null}
            <input
              type="text"
              disabled={this.props.disabled}
              className="rob-input"
              id="inputEmail3"
              value={this.state.value}
              placeholder={this.props.placeholder}
              onBlur={this._handleBlur}
              onChange={(e) => {
                this._handleChange(e.target.value)
              }}
            />
            {this.state.isError ?
              <div className="rob-error-message">
                {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null}
                {this.state.errorInfo}
              </div> : null}
          </div>
        </div>
      </div>
    )
  }
  _handleBlur = () => {
    this.setState({
      isShowErrorHint: true
    })
    this._testRule()
  }
  _handleChange = (text) => {
    this.setState({
      value: text
    }, () => {
      this.props.handleChange ? this.props.handleChange(text) : null
      /**
       * 将当前状态通知给Form组件
       */
      // let _containError = false
      // if (this.props.required && !this.state.value) {
      //   _containError = true
      // }
      // if (this.state.value && !this.state.pattern.test(this.state.value)) {
      //   _containError = true
      // }
      // this.context.updateFormData({
      //   name: this.props.name,
      //   value: this.state.value,
      //   required: this.props.required,
      //   containError: _containError
      // })
      /**
       * end
       */
      // if (!this.state.isShowErrorHint) {
      //   return
      // }
      this._testRule()
    })
  }
  _testRule = () => {
    if (this.props.required && !this.state.value) {
      this.setState({
        isError: true,
        errorInfo: this.props.emptyMsg
      })
      return true
    }
    if (this.state.value && !this.state.pattern.test(this.state.value)) {
      this.setState({
        isError: true,
        errorInfo: this.props.errorMsg
      })
      return true
    }
    this.setState({
      isError: false,
      errorInfo: null
    })
    return false
  }
  setValue = (val) => {
    this.setState({
      value: val
    })
  }
}