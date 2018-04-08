import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FormSelect extends Component {
  static robotUIName = 'FormInput'
  static propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    options: PropTypes.array,
    handleSelect: PropTypes.func,
    containErrorIcon: PropTypes.bool,
    errorIconName: PropTypes.string,
    emptyMsg: PropTypes.string,
    remarkPattern: PropTypes.object,
    remarkPlaceholder: PropTypes.string,
    remarkIsRequired: PropTypes.bool,
    remarkDefaultValue: PropTypes.string,
    remarkEmptyMsg: PropTypes.string,
    remarkErrMsg: PropTypes.string,
    handleRemarkChange: PropTypes.func,
    handleSearch: PropTypes.func,
    isTestRule: PropTypes.bool,
    labelClass: PropTypes.string,
    inputClass: PropTypes.string,
    errDirection: PropTypes.string
  }
  /**
   * options中的每一个对象需要包含text，value，
   */
  static defaultProps = {
    name: '',
    type: 'default',
    required: false,
    placeholder: '请选择',
    defaultValue: '',
    disabled: false,
    options: [],
    handleSelect: null,
    containErrorIcon: true,
    errorIconName: 'qb-icon-report1',
    emptyMsg: '请先选择该项',
    remarkPattern: null,
    remarkIsRequired: false,
    remarkPlaceholder: '',
    remarkDefaultValue: '',
    remarkEmptyMsg: '请输入补充信息',
    remarkErrMsg: '补充信息格式错误',
    handleRemarkChange: null,
    handleSearch: () => { },
    isTestRule: false,
    labelClass: 'rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left',
    inputClass: 'rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24',
    errDirection: 'right'
  }
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: {},
      isShowErrorHint: props.isTestRule,
      isError: false,
      errorInfo: '出错了啦',
      pattern: null,
      showOptions: false,
      text: '',
      remark: props.remarkDefaultValue || ''
    }
    props.options.forEach(item => {
      if (item.value === props.defaultValue) {
        this.state.selectedOption = item
      }
    })
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.options !== this.props.options || nextProps.defaultValue !== this.props.defaultValue) {
      if (!nextProps.defaultValue) {
        this.setState({
          selectedOption: {}
        })
      } else {
        nextProps.options.forEach(item => {
          if (item.value === nextProps.defaultValue) {
            this.setState({
              selectedOption: item
            })
          }
        })
      }
    }
    this.setState({
      isShowErrorHint: nextProps.isTestRule
    }, () => {
      this._testRule()
    })
  }
  componentWillUnmount() {
  }
  render() {
    let options = []
    if (this.props && this.props.options) {
      options = this.props.options
    }
    return (
      <div className="rob-form-group ">
        {this.props.label ? <div className={this.props.labelClass}>
          <label htmlFor="inputEmail3" className="rob-input-label" title={this.props.label}>
            {`${this.props.label}:`}
          </label>
        </div> : null}
        <div className={this.props.inputClass}>
          {this.props.type !== 'selectAndInput' ? (

            <div className={`rob-select ${this.state.showOptions ? 'open' : ''} ${this.state.isError ? 'rob-input-has-error' : ''}`}>
              <div className="rob-has-icon-right" data-toggle="dropdown" aria-expanded="true">
                <div
                  className={`qb-select-g ${this.props.type === 'default' ? 'rob-select-box ' : ''}rob-has-icon-right ${this.props.disabled ? 'disabled' : ''}`}
                  style={this.state.isError ? { borderColor: '#f95a5a' } : {}}
                  onClick={() => {
                    this.setState({ showOptions: true }, () => {
                      document.addEventListener('click', this._handleClick)
                    })
                  }}
                  title={this.props.type === 'default' ? this.state.selectedOption.text || this.props.placeholder : ''}
                >
                  <i className="rob-is-icon-right qb-icon-angle-down" />
                  {this.props.type === 'default' ? this.state.selectedOption.text || this.props.placeholder : <input
                    type="text"
                    className="rob-input"
                    id="inputEmail3"
                    placeholder="请输入选项"
                    value={this.state.text}
                    onChange={(e) => {
                      this.setState({ text: e.target.value })
                      this._search(e.target.value)
                    }}
                  />}
                </div>
                {(this.state.isError && this.props.errDirection !== 'right') ? <div className="rob-error-message">
                  {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null}
                  {this.state.errorInfo}
                </div> : null}
                <div className="rob-select-items" style={{ background: '#ffffff', zIndex: 99 }}>
                  {
                    options ? options.map((item, index) => (
                      <div
                        className={`rob-select-item ${item.value === this.state.selectedOption.value ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                        key={`${item.name}${index}`}
                        onClick={() => {
                          if (item.disabled) {
                            return
                          }
                          this._handleSelect(item)
                        }}
                        title={item.text}
                      >
                        {item.text}
                      </div>)
                    ) : null
                  }
                </div>
              </div>
            </div>) : this._getSelectAndInputDom()
          }
        </div>
        {
          (this.state.isError && this.props.errDirection === 'right') ? (
            <div className="rob-col-lg-5 rob-col-md-5 rob-col-sm-5 rob-col-xs-24 qb-pd0-g">
              <div className="qb-red-g rob-input-label text-left ">
                {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null}
                {this.state.errorInfo}
              </div>
            </div>
          ) : null
        }
      </div>
    )
  }
  _getSelectAndInputDom = () => (
    <div>
      <div className="rob-input-item rob-input-select-group" style={this.state.isError ? { borderColor: '#f95a5a' } : {}}>
        <div className={`rob-select rob-has-icon-right  ${this.state.showOptions ? 'open' : ''}`} style={{ width: '40%', float: 'left' }}>
          <div
            className="qb-select-g  rob-select-box rob-has-icon-right"
            onClick={() => {
              this.setState({ showOptions: true }, () => {
                document.addEventListener('click', this._handleClick)
              })
            }}
          >
            <i className="rob-is-icon-right qb-icon-angle-down " />
            {this.state.selectedOption.text || this.props.placeholder}
          </div>
          <div className="rob-select-items" style={{ background: '#ffffff', zIndex: 9999 }}>
            {
              this.props.options.map((item, index) => (
                <div
                  className={`rob-select-item ${item.value === this.state.selectedOption.value ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                  key={`${item.name}${index}`}
                  onClick={() => {
                    if (item.disabled) {
                      return
                    }
                    this._handleSelect(item)
                  }}
                >
                  {item.text}
                </div>)
              )
            }
          </div>
        </div>
        <div className="rob-input-select" style={{ width: '60%', float: 'left' }}>
          <input
            type="text"
            className="rob-input rob-input-input"
            id="inputEmail3"
            placeholder={this.props.remarkPlaceholder || ''}
            value={this.state.remark}
            onChange={e => this._handleInput(e.target.value)}
          />
        </div>
      </div>
      {(this.state.isError && this.props.errDirection !== 'right') ? <div className="rob-input-has-error">
        <div className="rob-error-message">
          {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null}
          {this.state.errorInfo}
        </div> </div> : null}
    </div>
  )
  _handleSelect = (item) => {
    console.log(item)
    this.setState({ selectedOption: item, text: item.text }, () => {
      this.props.handleSelect ? this.props.handleSelect(item) : null
      this._testRule()
    })
  }
  _handleClick = () => {
    this.setState({ showOptions: false }, () => {
      document.removeEventListener('click', this._handleClick)
    })
  }
  _testRule = () => {
    if (!this.state.isShowErrorHint) {
      return
    }
    if (Object.keys(this.state.selectedOption).length < 1 && this.props.required) {
      this.setState({
        isError: true,
        errorInfo: this.props.emptyMsg
      })
      return true
    }
    if (this.props.remarkIsRequired && !this.state.selectedOption.remark) {
      this.setState({
        isError: true,
        errorInfo: this.props.remarkEmptyMsg
      })
      return true
    }
    if (this.props.remarkIsRequired && this.props.remarkPattern && !this.props.remarkPattern.test(this.state.selectedOption.remark)) {
      this.setState({
        isError: true,
        errorInfo: this.props.remarkErrMsg
      })
      return true
    }
    this.setState({ isError: false })
    return false
  }
  _handleInput = (text) => {
    let temp = this.state.selectedOption
    temp.remark = text
    this.setState({ selectedOption: temp, remark: text }, () => {
    })
    this.props.handleRemarkChange ? this.props.handleRemarkChange(text) : null
  }
  _search = (text) => {
    this.props.handleSearch(text)
  }
  setValue = (val) => {
    this._handleSelect(val)
  }
  getErrStatus = () => this._testRule()
}