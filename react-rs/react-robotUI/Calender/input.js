import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calender from './calender'
class CalenderInput extends Component {
  // static robotUIName = 'Calender'
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    isWorkday: PropTypes.string.isRequired,
    multiSelect: PropTypes.string.isRequired,
    hasFooter: PropTypes.string.isRequired,
    isRange: PropTypes.string.isRequired,
    getDate: PropTypes.func.isRequired,
    dateFormat: PropTypes.string.isRequired,
    /**
     * 以下为父组件传递做错误提示
     */
    isError: PropTypes.bool.isRequired,
    required: PropTypes.bool.isRequired,
    emptyMsg: PropTypes.string.isRequired,
    defaultValue: PropTypes.any.isRequired,
    containErrorIcon: PropTypes.bool.isRequired,
    errorIconName: PropTypes.string.isRequired,
    isTestRule: PropTypes.string.isRequired
  }
  constructor(props) {
    // 继承React.Component
    super(props)
    // let now = new Date()
    this.state = {
      isShow: false,
      isShow1: false,
      showDate: '',
      showDate1: '', // 日期范围第二个
      pickednum: 0,
      pickednum1: 0,
      pickedItem: {
        selYear: '',
        selMonth: '',
        selDay: '',
      },
      pickedItem1: {
        selYear: '',
        selMonth: '',
        selDay: '',
      },
      pickedItems: [],
      info: null,
      showError: false
    }
    if (props.defaultValue) {
      if (props.isRange) {
        let startDateArr = props.defaultValue.startDate.split('-')
        let endDateArr = props.defaultValue.endDate.split('-')
        this.state.pickedItem = {
          selYear: startDateArr[0],
          selMonth: startDateArr[1],
          selDay: startDateArr[2],
        }
        this.state.showDate = props.defaultValue.startDate
        this.state.pickedItem1 = {
          selYear: endDateArr[0],
          selMonth: endDateArr[1],
          selDay: endDateArr[2],
        }
        this.state.showDate1 = props.defaultValue.endDate
      } else if (props.multiSelect) {
        for (let i = 0; i < props.defaultValue.length; i++) {
          this.state.pickedItems.push({
            selYear: props.defaultValue[i].split('-')[0],
            selMonth: props.defaultValue[i].split('-')[1],
            selDay: props.defaultValue[i].split('-')[2],
          })
        }
      } else {
        let _defaultDateArr = props.defaultValue.split('-')
        this.state.pickedItem = {
          selYear: _defaultDateArr[0],
          selMonth: _defaultDateArr[1],
          selDay: _defaultDateArr[2],
        }
        this.state.showDate = props.defaultValue
      }
    }
  }
  // static contextTypes = {
  //   updateFormData: PropTypes.func,
  //   creactFormData: PropTypes.func,
  //   isTestRule: PropTypes.bool,
  //   ee: PropTypes.object
  // }
  componentWillMount = () => {
    // this.context.creactFormData({
    //   name: this.props.name,
    //   value: this.props.defaultValue || null,
    //   required: this.props.required,
    //   containError: this.props.required
    // })
  }
  componentDidMount = () => {
    // this.context.ee.addListener('submit', () => {
    //   this._testError()
    // })
    // this.context.ee.addListener('clear', () => {
    //   this.setState({
    //     pickedItem: {
    //       selYear: '',
    //       selMonth: '',
    //       selDay: '',
    //     },
    //     pickedItem1: {
    //       selYear: '',
    //       selMonth: '',
    //       selDay: '',
    //     },
    //     pickedItems: [],
    //     showDate: '',
    //     showDate1: '',
    //     showError: false,
    //     info: null
    //   }, () => this._handleChange('dontTest'))
    //   this.context.creactFormData({
    //     name: this.props.name,
    //     value: this.props.defaultValue || null,
    //     required: this.props.required,
    //     containError: this.props.required
    //   })
    // })
  }
  componentWillUnmount() {
    // this.context.ee.removeEvent('submit')
  }
  showCalender = () => {
    if (this.state.isShow === true) {
      this.setState({
        isShow: false
      })
    } else {
      this.setState({
        isShow: true
      }, () => {
        document.addEventListener('click', this._handleClick)
      })
    }
  }
  _handleClick = (e) => {
    if (e.target.dataset.ctrl) {
      return
    }
    this.setState({ isShow: false }, () => {
      document.removeEventListener('click', this._handleClick)
    })
  }
  showCalender1 = () => {
    if (this.state.isShow1 === true) {
      this.setState({
        isShow1: false
      })
    } else {
      this.setState({
        isShow1: true
      }, () => {
        document.addEventListener('click', this._handleClick1)
      })
    }
  }
  _handleClick1 = (e) => {
    if (e.target.dataset.ctrl) {
      return
    }
    this.setState({ isShow1: false }, () => {
      document.removeEventListener('click', this._handleClick1)
    })
  }
  // 清除输入框内容
  clearInput = () => {
    this.setState({
      showDate: '',
    })
  }
  clearInput1 = () => {
    this.setState({
      showDate1: '',
    })
  }
  // 用與展示多选日期的格式化数据
  formatFunc = (arr) => {
    let formatString = ''
    if (arr.length > 0) {
      for (let jj = 0; jj < arr.length; jj++) {
        if (jj === 0) {
          formatString = `${arr[jj].selYear}-${arr[jj].selMonth}-${arr[jj].selDay}`
        } else {
          formatString = `${formatString},${arr[jj].selYear}-${arr[jj].selMonth}-${arr[jj].selDay}`
        }
      }
    }
    return formatString
  }
  pickNow = () => {
    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()
    if (this.props.content === 'd') {
      this.setState({
        showDate: `${year}-${month}-${day}`,
        isShow: false, // 选中之后关闭按钮
      })
    } else {
      this.setState({
        showDate: `${year}-${month}`,
        isShow: false, // 选中之后关闭按钮
      })
    }
  }
  pickNow1 = () => {
    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()
    if (this.props.content === 'd') {
      this.setState({
        showDate1: `${year}-${month}-${day}`,
        isShow1: false, // 选中之后关闭按钮
      })
    } else {
      this.setState({
        showDate1: `${year}-${month}`,
        isShow1: false, // 选中之后关闭按钮
      })
    }
  }
  pickedDate = (year, month, day) => {
    if (this.props.content === 'd') {
      if (this.props.multiSelect === 'true') {
        // 多选日期
        if (this.state.pickednum === 5) {
          alert('日期最多选五个')
        } else {
          let newSel1 = {
            selYear: year,
            selMonth: month,
            selDay: day,
          }
          let newSel1Arr = this.state.pickedItems
          newSel1Arr.push(newSel1)
          this.setState({
            showDate: this.formatFunc(newSel1Arr),
            pickednum: this.state.pickednum + 1,
            pickedItems: newSel1Arr
          }, this._handleChange)
        }
        // 单选日期
      } else if (this.props.hasFooter === 'false') {
        this.setState({
          showDate: `${year}-${month}-${day}`,
          isShow: false, // 选中之后关闭按钮
          pickedItem: {
            selYear: year,
            selMonth: month,
            selDay: day,
          },
        }, () => { this._handleChange() })
      } else {
        this.setState({
          showDate: `${year}-${month}-${day}`,
          pickedItem: {
            selYear: year,
            selMonth: month,
            selDay: day,
          },
        }, () => { this._handleChange() })
      }
    } else if (this.props.content === 'm') {
      this.setState({
        showDate: `${year}-${month}`,
        pickedItem: {
          selYear: year,
          selMonth: month,
        },
      }, () => { this._handleChange() })
    }
  }
  pickedDate1 = (year, month, day) => {
    if (this.props.content === 'd') {
      if (this.props.hasFooter === 'false') {
        this.setState({
          showDate1: `${year}-${month}-${day}`,
          isShow1: false, // 选中之后关闭按钮
          pickedItem1: {
            selYear: year,
            selMonth: month,
            selDay: day,
          },
        }, () => { this._handleChange() })
        // 单选日期---有底部
      } else {
        this.setState({
          showDate1: `${year}-${month}-${day}`,
          pickedItem1: {
            selYear: year,
            selMonth: month,
            selDay: day,
          },
        }, () => { this._handleChange() })
      }
    } else if (this.props.content === 'm') {
      this.setState({
        showDate1: `${year}-${month}-${day}`,
        isShow1: false, // 选中之后关闭按钮
        pickedItem1: {
          selYear: year,
          selMonth: month,
        },
      }, () => { this._handleChange() })
    }
  }
  // 格式化日期并传出
  _handleChange = (dontTest) => {
    let _symbol = this.props.dateFormat === 'yyyy-mm-dd' ? '-' : '/'
    /**
     * 区间返回{startDate：'1970-01-01',endDate:'1970-01-01'}
     */
    if (this.props.isRange === 'true') {
      let _s = this.state.pickedItem, _e = this.state.pickedItem1
      let result = {
        startDate: _s.selYear ? `${_s.selYear}${_symbol}${_s.selMonth}${this.props.content === 'm' ? '' : _symbol + _s.selDay}` : null,
        endDate: _e.selYear ? `${_e.selYear}${_symbol}${_e.selMonth}${this.props.content === 'm' ? '' : _symbol + _e.selDay}` : null
      }
      this.props.getDate(result)
      dontTest ? null : this._updateForm(result)
      return
    }
    /**
     *  多选返回 [1970-01-01,1970-01-01,1970-01-01]
     */
    if (this.props.multiSelect === 'true') {
      let _dates = this.state.pickedItems, _arr = []
      for (let i = 0; i < _dates.length; i++) {
        let _date = `${_dates[i].selYear}${_symbol}${_dates[i].selMonth}${this.props.content === 'm' ? '' : _symbol + _dates[i].selDay}`
        _arr.push(_date)
      }
      this.props.getDate(_arr)
      dontTest ? null : this._updateForm(_arr)
      return
    }
    /**
     * 单选返回 1970-01-01
     */
    let _date = this.state.pickedItem, result = `${_date.selYear}${_symbol}${_date.selMonth}${this.props.content === 'm' ? '' : _symbol + _date.selDay}`
    this.props.getDate(result)
    dontTest ? null : this._updateForm(result)
    // if (this.props.dateFormat === 'yyyy-mm-dd') {
    //   if (this.props.multiSelect === 'true') {
    //     source = this.state.pickedItems
    //     let arr = []
    //     for (let z = 0; z < source.length; z++) {
    //       let aaa = `${source[z].selYear}-${source[z].selMonth}-${source[z].selDay}`
    //       arr.push(aaa)
    //     }
    //     finalDate = JSON.stringify(arr)
    //   } else if (this.props.content === 'm') {
    //     source = this.state.pickedItem
    //     finalDate = `${source.selYear}-${source.selMonth}`
    //   } else if (flag === 1) {
    //     source = this.state.pickedItem
    //     finalDate = `${source.selYear}-${source.selMonth}-${source.selDay}`
    //   } else if (flag === 2) {
    //     source = this.state.pickedItem1
    //     finalDate = `${source.selYear}-${source.selMonth}-${source.selDay}`
    //   }
    //   console.log('hadlechange', finalDate)
    //   this.props.getDate(finalDate)
    // } else if (this.props.dateFormat === 'yyyy/mm/dd') {
    //   if (this.props.multiSelect === 'true') {
    //     source = this.state.pickedItems
    //     let arr = []
    //     for (let z = 0; z < source.length; z++) {
    //       let aaa = `${source[z].selYear}/${source[z].selMonth}/${source[z].selDay}`
    //       arr.push(aaa)
    //     }
    //     finalDate = JSON.stringify(arr)
    //   } else if (flag === 1) {
    //     source = this.state.pickedItem
    //     finalDate = `${source.selYear}/${source.selMonth}/${source.selDay}`
    //   } else if (flag === 2) {
    //     source = this.state.pickedItem1
    //     finalDate = `${source.selYear}/${source.selMonth}/${source.selDay}`
    //   }
    //   console.log('hadlechange', finalDate)
    //   this.props.getDate(finalDate)
    // }
  }
  multiSelectDel = (year, month, day) => {
    let newSel = {
      selYear: year,
      selMonth: month,
      selDay: day,
    }
    for (let jj = 0; jj < this.state.pickedItems.length; jj++) {
      if (this.state.pickedItems[jj].selYear === newSel.selYear && this.state.pickedItems[jj].selMonth === newSel.selMonth && this.state.pickedItems[jj].selDay === newSel.selDay) {
        let newArr = this.state.pickedItems
        newArr.splice(jj, 1)
        this.setState({
          showDate: this.formatFunc(newArr),
          pickedItems: newArr,
          pickednum: this.state.pickednum - 1,
        })
      }
    }
  }
  render() {
    return (
      <div className={`${this.state.showError ? 'rob-input-has-error ' : null}rob-form-group rob-col-lg-24`} >
        <div className={'text-right'} style={{ width: '25%', float: 'left' }}>
          <label className={'rob-input-label'}>{this.props.label}</label>
        </div>
        {
          this.props.isRange === 'true' ? (<div className={'rob-input-date'} style={{ width: '25%', float: 'left' }}>
            <div className="clearfix">
              <div className={'rob-input-item rob-has-icon-right'}>
                <div>
                  <i className={'rob-is-icon-right rob-icon qb-icon-home'} />
                  <input className={'rob-input'} onClick={this.showCalender} readOnly value={this.state.showDate} type="text" placeholder="开始日期" />
                </div>
                {
                  this.state.isShow === true ? <Calender isShow={this.state.isShow} isRange={this.props.isRange} pickedDate={this.pickedDate} pickNow={this.pickNow} showCalender={this.showCalender} clearInput={this.clearInput} content={this.props.content} isWorkday={this.props.isWorkday} multiSelect={this.props.multiSelect} hasFooter={this.props.hasFooter} pickedItem={this.state.pickedItem} /> : null
                }
              </div>
              <div className={'rob-input-item rob-has-icon-right'}>
                <div>
                  <i className={'rob-is-icon-right rob-icon qb-icon-home'} />
                  <input className={'rob-input'} onClick={this.showCalender1} readOnly value={this.state.showDate1} type="text" placeholder="结束日期" />
                </div>
                {
                  this.state.isShow1 === true ? <Calender isShow={this.state.isShow} isRange={this.props.isRange} pickedDate={this.pickedDate1} pickNow={this.pickNow1} showCalender={this.showCalender1} clearInput={this.clearInput1} content={this.props.content} isWorkday={this.props.isWorkday} multiSelect={this.props.multiSelect} hasFooter={this.props.hasFooter} pickedItem={this.state.pickedItem1} /> : null
                }
              </div>
            </div>
            {
              this.state.showError ? (
                <div className="rob-error-message">
                  {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null}
                  {this.props.emptyMsg}
                </div>
              ) : null
            }

          </div>) : (<div className={''} style={{ width: '75%', float: 'left' }}><div className={'rob-input-item'}>
            <input className={'rob-input'} onClick={this.showCalender} readOnly value={this.state.showDate} type="text" placeholder="请选择日期" />
          </div>
            {
              this.state.isShow === true ? <Calender isShow={this.state.isShow} isRange={this.props.isRange} pickedDate={this.pickedDate} pickNow={this.pickNow} showCalender={this.showCalender} clearInput={this.clearInput} content={this.props.content} isWorkday={this.props.isWorkday} multiSelect={this.props.multiSelect} hasFooter={this.props.hasFooter} pickedItem={this.state.pickedItem} pickedItems={this.state.pickedItems} multiSelectDel={this.multiSelectDel} /> : null
            }
            {
              this.state.showError ? (
                <div className="rob-error-message">
                  {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null}
                  {this.props.emptyMsg}
                </div>
              ) : null
            }
          </div>
            )
        }
      </div>
    )
  }
  _updateForm = (result) => {
    this.setState({
      info: result
    }, () => {
      this._testError()
      // this.context.updateFormData({
      //   name: this.props.name,
      //   value: result,
      //   required: this.props.required,
      //   containError: this.props.required && !this.state.value
      // })
    })
  }
  _testError = () => {
    if (!this.props.required) {
      return
    }
    if (this.props.isRange === 'true') {
      !this.state.info || (!this.state.info.startDate && !this.state.info.endDate) ? this.setState({
        showError: true
      }) : this.setState({
        showError: false
      })
      return
    }
    if (this.props.multiSelect === 'true') {
      !this.state.info || this.state.info.length < 1 ? this.setState({
        showError: true
      }) : this.setState({
        showError: false
      })
      return
    }
    !this.state.info ? this.setState({
      showError: true
    }) : this.setState({
      showError: false
    })
  }
}
export default CalenderInput