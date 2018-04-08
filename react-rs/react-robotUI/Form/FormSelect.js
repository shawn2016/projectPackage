import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FormSelect extends Component {
  static robotUIName = 'FormInput'
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
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
    isTestRule: PropTypes.bool
  }
  /**
   * options中的每一个对象需要包含text，value，
   */
  static defaultProps = {
    type: 'default',
    required: false,
    placeholder: '',
    defaultValue: '',
    disabled: false,
    options: [],
    handleSelect: null,
    containErrorIcon: false,
    errorIconName: 'qb-icon-calendar',
    emptyMsg: '请先选择该项',
    remarkPattern: null,
    remarkIsRequired: false,
    remarkPlaceholder: '',
    remarkDefaultValue: '',
    remarkEmptyMsg: '请输入补充信息',
    remarkErrMsg: '补充信息格式错误',
    handleRemarkChange: null,
    handleSearch: () => { },
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
    this.state = {
      selectedOption: {},
      isShowErrorHint: false,
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
    // if (context.isTestRule) {
    //   this.state.isShowErrorHint = true
    // }
  }
  componentWillMount() {
    // let _containError = this.props.required && !this.props.defaultValue
    // this.props.type === 'selectAndInput' && this.props.remarkIsRequired && !this.props.remarkDefaultValue ? _containError = true : _containError = false
    // this.context.creactFormData({
    //   name: this.props.name,
    //   value: this.props.defaultValue ? this.state.selectedOption : null,
    //   required: this.props.required,
    //   containError: _containError
    // })
  }
  componentDidMount() {
    // this.context.ee.addListener('submit', () => {
    //   this.state.isShowErrorHint = true
    //   this._testRule()
    // })
    // this.context.ee.addListener('clear', () => {
    //   this.props.defaultValue ? (
    //     this.props.options.forEach(item => {
    //       if (item.value === this.props.defaultValue) {
    //         this.state.selectedOption = item
    //         this.setState({
    //           selectedOption: item,
    //           text: this.props.defaultValue
    //         }, () => {
    //           let _containError = this.props.required && !this.props.defaultValue
    //           this.props.type === 'selectAndInput' && this.props.remarkIsRequired && !this.props.remarkDefaultValue ? _containError = true : _containError = false
    //           this.context.creactFormData({
    //             name: this.props.name,
    //             value: this.state.selectedOption,
    //             required: this.props.required,
    //             containError: _containError
    //           })
    //         })
    //       }
    //     })
    //   ) : (
    //       this.setState({
    //         selectedOption: {},
    //         text: '',
    //         remark: this.props.remarkDefaultValue || '',
    //         isError: false
    //       }, () => {
    //         let _containError = this.props.required && !this.props.defaultValue
    //         this.context.creactFormData({
    //           name: this.props.name,
    //           value: this.state.selectedOption,
    //           required: this.props.required,
    //           containError: _containError
    //         })
    //       })
    //     )
    // })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      isShowErrorHint: nextProps.isTestRule
    })
  }
  componentWillUnmount() {
    // this.context.ee.removeEvent('submit')
  }
  render() {
    return (
      <div className="rob-form-group rob-col-lg-24">
        <div className="text-right" style={{ width: '25%', float: 'left' }}>
          <label htmlFor="inputEmail3" className="rob-input-label">
            {`${this.props.label}:`}
          </label>
        </div>
        <div className="" style={{ width: '75%', float: 'left' }}>
          {this.props.type !== 'selectAndInput' ? (
            <div className={`rob-select ${this.state.showOptions ? 'open' : ''} ${this.state.isError ? 'rob-input-has-error' : ''}`}>
              <div className="rob-has-icon-right" data-toggle="dropdown" aria-expanded="true">
                <div
                  className={`${this.props.type === 'default' ? 'rob-select-box ' : ''}rob-has-icon-right ${this.props.disabled ? 'disabled' : ''}`}
                  style={this.state.isError ? { borderColor: '#f95a5a' } : {}}
                  onClick={() => {
                    this.setState({ showOptions: true }, () => {
                      document.addEventListener('click', this._handleClick)
                    })
                  }}
                >
                  <i className="rob-is-icon-right qb-icon-angle-down" />
                  {this.props.type === 'default' ? this.state.selectedOption.text || '请选择' : <input
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
                {this.state.isError ? <div className="rob-error-message">
                  {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null}
                  {this.state.errorInfo}
                </div> : null}
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
            </div>) : (
              <div>
                <div className="rob-input-item rob-input-select-group" style={this.state.isError ? { borderColor: '#f95a5a' } : {}}>
                  <div className={`rob-select rob-has-icon-right ${this.state.showOptions ? 'open' : ''}`}>
                    <div
                      className="rob-select-box rob-has-icon-right"
                      onClick={() => {
                        this.setState({ showOptions: true }, () => {
                          document.addEventListener('click', this._handleClick)
                        })
                      }}
                    >
                      <i className="rob-is-icon-right qb-icon-angle-down" />
                      {this.state.selectedOption.text || '请选择'}
                    </div>
                    <div className="rob-select-items">
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
                  <div className="rob-input-select" />
                  <input
                    type="text"
                    className="rob-input rob-input-input"
                    id="inputEmail3"
                    placeholder={this.props.remarkPlaceholder || ''}
                    value={this.state.remark}
                    onChange={e => this._handleInput(e.target.value)}
                  />
                </div>
                {this.state.isError ? <div className="rob-input-has-error">
                  <div className="rob-error-message">
                    {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null}
                    {this.state.errorInfo}
                  </div> </div> : null}
              </div>
            )}
        </div>
      </div>
    )
  }
  _handleSelect = (item) => {
    this.setState({ selectedOption: item, text: item.text }, () => {
      // let _containError = this._testRule()
      // this.context.updateFormData({
      //   name: this.props.name,
      //   value: this.state.selectedOption,
      //   required: this.props.required,
      //   containError: _containError
      // })
      this.props.handleSelect ? this.props.handleSelect(item) : null
    })
  }
  _handleClick = () => {
    this.setState({ showOptions: false }, () => {
      document.removeEventListener('click', this._handleClick)
    })
  }
  _testRule = () => {
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
      // let _containError = this._testRule()
      // this.context.updateFormData({
      //   name: this.props.name,
      //   value: this.state.selectedOption,
      //   required: this.props.required,
      //   containError: _containError
      // })
    })
    this.props.handleRemarkChange ? this.props.handleRemarkChange(text) : null
  }
  _search = (text) => {
    this.props.handleSearch(text)
  }
}