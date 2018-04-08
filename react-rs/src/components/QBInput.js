import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { trimAll } from '../utils/filterCommon'

export default class QBInput extends Component {
  static robotUIName = 'QBInput'
  static propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    emptyMsg: PropTypes.string,
    errorMsg: PropTypes.string,
    pattern: PropTypes.object,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    showDropMenu: PropTypes.bool,
    containLeftIcon: PropTypes.bool,
    leftIconName: PropTypes.string,
    containRightIcon: PropTypes.bool,
    rightIconName: PropTypes.string,
    containErrorIcon: PropTypes.bool,
    errorIconName: PropTypes.string,
    handleChange: PropTypes.func,
    handleOnFocus: PropTypes.func,
    desc: PropTypes.string,
    /* 修改*/
    isTestRule: PropTypes.bool,
    labelClass: PropTypes.string,
    inputClass: PropTypes.string,
    errDirection: PropTypes.string,
    sizeMsg: PropTypes.string,
    /* 区间输入*/
    isRange: PropTypes.bool,
    /* 提示信息 */
    hintInfo: PropTypes.string,
    handleBlur: PropTypes.func
  }
  static defaultProps = {
    name: '',
    type: 'default',
    label: '',
    required: false,
    emptyMsg: '该选项不能为空',
    errorMsg: '请输入正确格式的数据',
    pattern: null,
    placeholder: '',
    desc: '',
    defaultValue: '',
    disabled: false,
    showDropMenu: false,
    containLeftIcon: false,
    leftIconName: 'qb-icon-calendar',
    containRightIcon: false,
    rightIconName: 'qb-icon-calendar',
    containErrorIcon: true,
    errorIconName: 'qb-icon-report1',
    handleChange: null,
    handleOnFocus: null,
    isTestRule: false,
    labelClass: 'rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left',
    inputClass: 'rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24',
    errDirection: 'right',
    isRange: false,
    sizeMsg: '',
    hintInfo: '',
    handleBlur: () => { }
  }
  constructor(props) {
    super(props)
    const RULES = {
      tel: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])(\*{4}|[0-9]{4})[0-9]{4}$/,
      IDCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
      email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
      postcode: /^[1-9]\d{5}(?!\d)$/
    }
    this.state = {
      value: props.defaultValue || '',
      isShowErrorHint: props.isTestRule,
      isError: false,
      errorInfo: '',
      pattern: null,
      filterDropMenuData: [],
      dropMenuData: []
    }
    props.isRange ? this.state.value = props.defaultValue || {} : this.state.value = props.defaultValue || ''
    if (props.pattern) {
      this.state.pattern = props.pattern
    } else {
      this.state.pattern = RULES[props.type] || /.*/
    }
  }
  componentWillMount() {
    this.state.isShowErrorHint ? this._testRule() : null
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      isShowErrorHint: nextProps.isTestRule
    }, () => {
      nextProps.isTestRule ? this._testRule() : null
    })
    nextProps.pattern ? this.setState({
      pattern: nextProps.pattern
    }) : null
  }
  componentDidMount() {
  }
  componentWillUnmount() {

  }
  render() {
    return (
      <div>
        {
          this.props.errDirection === 'right' ? (
            <div className="rob-form-group ">

              {this.props.label ? <div className={this.props.labelClass}>
                <label className="rob-input-label" title={this.props.label || ''}>{this.props.label ? `${this.props.label}:` : ''}
                </label>
              </div> : null }
              <div className={`${this.props.inputClass} ${this.state.isError ? 'rob-input-has-error' : ''}`}>
                {
                  /**
                   * 区间
                   */
                  this.props.isRange ? this._getRangeInput() : (
                    <div className={`rob-input-item ${this.props.containLeftIcon ? 'rob-has-icon-left' : ''}${this.props.containRightIcon ? ' rob-has-icon-right' : ''}`}>
                      {this.props.containLeftIcon ? <i className={`rob-is-icon-left ${this.props.leftIconName}`} /> : null}
                      {this.props.containRightIcon ? <i className={`rob-is-icon-right ${this.props.rightIconName}`} /> : null}
                      <input
                        type={this.props.type ? this.props.type : 'text'}
                        disabled={this.props.disabled}
                        className="rob-input text-overflow"
                        title={this.state.value}
                        id="inputEmail3"
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        onBlur={this._handleBlur}
                        onFocus={this.props.handleOnFocus}
                        onChange={(e) => {
                          this._handleChange(e.target.value)
                        }}
                      />
                      {this.props.showDropMenu && this.state.dropMenuData.length > 0 ? <div className="rob-select-items" style={{ background: '#fff', zIndex: '9999', display: 'block' }}>
                        {this.state.dropMenuData.map((item, i) => (
                          <div className="rob-select-item " key={`dropMenu${i}`} onClick={() => this._selectDropMune(item)}>{item.recAccountName}</div>
                        ))}
                      </div> : null}
                    </div>
                  )
                }
              </div>
              {this.state.isError && !this.props.isRange ?
                <div className="rob-col-lg-5 rob-col-md-5 rob-col-sm-5 rob-col-xs-24 qb-pd0-g">
                  <div className="qb-red-g rob-input-label text-left " title={this.state.errorInfo}>{this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null} {this.state.errorInfo}</div>
                </div> : null}
            </div>
          ) : (<div className="rob-form-group ">
            { this.props.label ? <div className={this.props.labelClass}>
              <label htmlFor="inputEmail3" className="rob-input-label" title={this.props.label || ''}>{this.props.label ? `${this.props.label}:` : ''}</label>
            </div> : null }
            <div className={`${this.props.inputClass} ${this.state.isError ? 'rob-input-has-error' : ''}`}>
              {
                /**
                 * 区间
                 */
                this.props.isRange ? this._getRangeInput() : (
                  <div className={`rob-input-item rob-select ${this.props.containLeftIcon ? 'rob-has-icon-left' : ''}${this.props.containRightIcon ? ' rob-has-icon-right' : ''}`}>
                    {this.props.containLeftIcon ? <i className={`rob-is-icon-left ${this.props.leftIconName}`} /> : null}
                    {this.props.containRightIcon ? <i className={`rob-is-icon-right ${this.props.rightIconName}`} /> : null}
                    <input
                      type={this.props.type ? this.props.type : 'text'}
                      disabled={this.props.disabled}
                      className="rob-input text-overflow"
                      title={this.state.value}
                      id="inputEmail3"
                      value={this.state.value}
                      placeholder={this.props.placeholder}
                      onBlur={this._handleBlur}
                      onChange={(e) => {
                        this._handleChange(e.target.value)
                      }}
                    />
                    {this.props.showDropMenu && this.state.dropMenuData.length > 0 ? <div className="rob-select-items" style={{ background: '#fff', zIndex: '9999', display: 'block' }}>
                      {this.state.dropMenuData.map((item, i) => (
                        <div className="rob-select-item " key={`dropMenu${i}`} onClick={() => this._selectDropMune(item)}>{item.recAccountName}</div>
                      ))}
                    </div> : null}
                    {this.state.isError ?
                      <div className="rob-error-message">
                        {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null} {this.state.errorInfo} </div> : null}
                  </div>
                )
              }
              {
                this.props.desc ? (
                  <div className="rob-input-item" style={this.state.isError ? { marginTop: '20px' } : {}}>
                    {this.props.desc}
                  </div>
                ) : null
              }
              {
                this.props.hintInfo ? (
                  <div className="rob-error-message text-left">
                    <i className="qb-icon-calendar" />
                    {this.props.hintInfo}
                  </div>
                ) : null
              }

            </div>
          </div>
            )}
      </div>
    )
  }
  _getRangeInput = () => (
    <div>
      <div className="rob-input-date clearfix">
        <div className="rob-input-item rob-has-icon-right">
          <em className="" />
          <input
            type="number"
            disabled={this.props.disabled}
            className="rob-input text-overflow"
            title={this.state.value.startValue}
            id="inputEmail4"
            value={this.state.value.startValue}
            placeholder={this.props.placeholder}
            onBlur={this._handleBlur}
            onChange={(e) => {
              this._handleStartChange(e.target.value)
            }}
            style={{ paddingRight: 0 }}
          />
        </div>
        <div className="rob-input-item rob-has-icon-right" >
          <em className="" />
          <input
            type="number"
            disabled={this.props.disabled}
            className="rob-input text-overflow"
            title={this.state.value.endValue}
            id="inputEmail5"
            value={this.state.value.endValue}
            placeholder={this.props.placeholder}
            onBlur={this._handleBlur}
            onChange={(e) => {
              this._handleEndChange(e.target.value)
            }}
            style={{ paddingRight: 0 }}
          />
        </div>
      </div>
      {this.state.isError ?
        <div className="rob-error-message">
          {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null} {this.state.errorInfo} </div> : null
      }</div >
  )
  _handleBlur = () => {
    this.setState({
      isShowErrorHint: true
    }, () => {
      this.props.handleBlur && this.props.handleBlur()
      this._testRule()
    })
  }
  _handleChange = (text) => {
    let { filterDropMenuData = [] } = this.state
    if (!filterDropMenuData) filterDropMenuData = []
    if (this.props.showDropMenu && filterDropMenuData.length > 0) {
      let getData = []
      filterDropMenuData.forEach((item) => {
        if (item.recAccountName.indexOf(text) !== -1) {
          getData.push(item)
        }
      })
      this.setState({ dropMenuData: getData })
      document.addEventListener('click', () => {
        this.setState({
          dropMenuData: []
        })
      })
    }
    this.setState({
      value: text
    }, () => {
      this.props.handleChange ? this.props.handleChange(text) : null
      this._testRule()
    })
  }
  _selectDropMune = (val) => {
    this.setState({ value: val.recAccountName }, () => {
      this.props.handleChange ? this.props.handleChange(val) : null
      this._testRule()
    })
  }
  _handleStartChange = (text) => {
    let _temp = Object.assign({}, this.state.value)
    _temp.startValue = text
    this.setState({
      value: _temp
    }, () => {
      this.props.handleChange ? this.props.handleChange(this.state.value) : null
      this._testRule()
    })
  }
  _handleEndChange = (text) => {
    let _temp = Object.assign({}, this.state.value)
    _temp.endValue = text
    this.setState({
      value: _temp
    }, () => {
      this.props.handleChange ? this.props.handleChange(this.state.value) : null
      this._testRule()
    })
  }
  _testRule = () => {
    if (typeof (this.state.value) !== 'object' && this.props.required && this.state.value.length) {
      let tempValue = this.state.value
      tempValue = trimAll(tempValue)
      if (tempValue.length === 0) {
        this.setState({
          isError: true,
          errorInfo: this.props.emptyMsg
        })
        return true
      }
    }
    if (this.props.type === 'email' && this.state.value && this.state.value.length > 64) {
      this.setState({
        isError: true,
        errorInfo: '请输入1-64个字符（邮件格式）'
      })
      return true
    }
    if (!this.state.isShowErrorHint) {
      return
    }
    if (!this.props.isRange && this.props.required && !this.state.value) {
      this.setState({
        isError: true,
        errorInfo: this.props.emptyMsg
      })
      return true
    }
    if (this.props.isRange) {
      if (this.props.required && (!this.state.value.startValue || !this.state.value.endValue)) {
        this.setState({
          isError: true,
          errorInfo: this.props.emptyMsg
        })
        return true
      }
      if ((this.state.value.startValue && !this.state.pattern.test(this.state.value.startValue)) || (this.state.value.endValue && !this.state.pattern.test(this.state.value.endValue))) {
        this.setState({
          isError: true,
          errorInfo: this.props.errorMsg
        })
        return true
      }
      if (this.state.value && this.state.value.startValue && this.state.value.endValue && (Number(this.state.value.endValue) < Number(this.state.value.startValue))) {
        console.log(this.state.value)
        this.setState({
          isError: true,
          errorInfo: this.props.errorMsg
        })
        return true
      }
    }
    if (!this.props.isRange && this.state.value && !this.state.pattern.test(this.state.value)) {
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
    }, () => {
      this.props.handleChange(val)
    })
  }
  setDropData = (val) => {
    this.setState({
      filterDropMenuData: val
    })
  }
  getErrStatus = () => this._testRule()
}