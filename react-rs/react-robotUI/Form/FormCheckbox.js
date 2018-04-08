import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FormCheckbox extends Component {
  static robotUIName = 'FormInput'
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    required: PropTypes.bool,
    emptyMsg: PropTypes.string,
    handleChange: PropTypes.func,
    containErrorIcon: PropTypes.bool,
    errorIconName: PropTypes.string
  }
  /**
   * options格式为[{
   *    text:'',
   *    value:'',
   *    disabled:false,
   *    checked:false
   * },{
   * }]
   */
  static defaultProps = {
    type: 'default',
    label: '',
    options: [],
    required: false,
    emptyMsg: '请填写该选项',
    handleChange: null,
    containErrorIcon: false,
    errorIconName: 'qb-icon-calendar'
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
      options: JSON.parse(JSON.stringify(this.props.options)),
      checkedOptions: [],
      isError: false
    }
    for (let i = 0, len = this.state.options.length; i < len; i++) {
      if (this.state.options[i].checked) {
        this.state.checkedOptions.push(this.state.options[i])
      }
    }
  }
  componentWillMount() {
    // this.context.creactFormData({
    //   name: this.props.name,
    //   value: this.state.checkedOptions,
    //   required: this.props.required,
    //   containError: this.props.required && this.state.checkedOptions.length === 0
    // })
  }
  componentDidMount() {
    // this.context.ee.addListener('submit', () => {
    //   this.props.required && this.state.checkedOptions.length <= 0 ? this.setState({ isError: true }) : this.setState({ isError: false })
    // })
    // this.context.ee.addListener('clear', () => {
    //   let _arr = []
    //   console.log(this.props.options)
    //   for (let i = 0, len = this.props.options.length; i < len; i++) {
    //     if (this.props.options[i].checked) {
    //       _arr.push(this.state.options[i])
    //     }
    //   }
    //   this.setState({
    //     options: JSON.parse(JSON.stringify(this.props.options)),
    //     checkedOptions: _arr,
    //     isError: false
    //   }, () => {
    //     console.log(this.state.checkedOptions)
    //     this.context.creactFormData({
    //       name: this.props.name,
    //       value: this.state.checkedOptions,
    //       required: this.props.required,
    //       containError: this.props.required && this.state.checkedOptions.length === 0
    //     })
    //   })
    // })
  }
  componentWillUnmount() {
    // this.context.ee.removeEvent('submit')
  }
  render() {
    let _className = `${this.props.type === 'fill' ? 'rob-checkbox-filled-in' : this.props.type === 'circular' ? 'rob-checkbox-filled-in rob-checkbox-bordered' : ''}`
    return (
      <div className={`rob-form-group rob-col-lg-24 ${this.state.isError ? 'rob-input-has-error' : ''}`}>
        <div className="text-right" style={{ width: '25%', float: 'left' }}>
          <label htmlFor="inputEmail3" className="rob-input-label">
            {`${this.props.label}:`}
          </label>
        </div>

        <div className="" style={{ width: '75%', float: 'left' }}>
          {
            this.state.options.map((item, i) => (
              <div style={{ display: 'inline-block', paddingRight: '30px' }} key={`${this.props.name}${i}`}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  disabled={item.disabled}
                  id={`${this.props.name}${i}`}
                  className={_className}
                  onChange={() => this._handleClick(item, i)}
                />
                <label htmlFor={`${this.props.name}${i}`}>
                  {item.text}
                </label>
              </div>
            ))
          }
          {this.state.isError ?
            <div className="rob-error-message">
              {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null}
              {this.props.emptyMsg}
            </div> : null}
        </div>

      </div>
    )
  }

  _handleClick(item, i) {
    let _temp = this.state.options
    _temp[i].checked = !_temp[i].checked
    this.setState({
      options: _temp
    }, () => {
      let _arr = []
      for (let j = 0, len = this.state.options.length; j < len; j++) {
        this.state.options[j].checked ? _arr.push(this.state.options[j]) : null
      }
      this.setState({ checkedOptions: _arr, isError: _arr.length === 0 && this.props.required }, () => {
        this.props.handleChange(this.state.checkedOptions)
        // this.context.updateFormData({
        //   name: this.props.name,
        //   value: this.state.checkedOptions,
        //   required: this.props.required,
        //   containError: _arr.length === 0 && this.props.required
        // })
      })
    })
  }

}