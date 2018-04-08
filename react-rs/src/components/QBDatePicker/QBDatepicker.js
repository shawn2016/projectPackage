import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calender from './calender'
import Time from './time'
let tempPickDate = {}
class CalenderInput extends Component {
  // static robotUIName = 'Calender'
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    content: PropTypes.string,
    isWorkday: PropTypes.bool,
    isBeforeToday: PropTypes.bool,
    isShowHour: PropTypes.bool,
    /* 日期是否多选*/
    multiSelect: PropTypes.bool,
    hasFooter: PropTypes.bool,
    /* 是否选择区间*/
    isRange: PropTypes.bool,
    handleSelect: PropTypes.func,
    dateFormat: PropTypes.string,
    /**
     * 以下为父组件传递做错误提示
     */
    isError: PropTypes.bool,
    required: PropTypes.bool,
    emptyMsg: PropTypes.string,
    defaultValue: PropTypes.any,
    containErrorIcon: PropTypes.bool,
    errorIconName: PropTypes.string,
    placeholder: PropTypes.string,
    isTestRule: PropTypes.bool,
    labelClass: PropTypes.string,
    inputClass: PropTypes.string,
    isEqual: PropTypes.bool,
    errDirection: PropTypes.string,
    /* 快捷选项*/
    isShortcut: PropTypes.bool,
    shortcutList: PropTypes.array
  }
  static defaultProps = {
    name: '',
    label: '',
    content: 'd',
    isWorkday: false,
    isBeforeToday: false,
    isShowHour: false,
    multiSelect: false,
    hasFooter: false,
    isRange: true,
    handleSelect: () => { },
    dateFormat: '',
    isError: false,
    required: false,
    isEqual: false,
    placeholder: '请选择日期',
    emptyMsg: '结束时间不能小于开始时间',
    defaultValue: '',
    containErrorIcon: true,
    errorIconName: 'qb-icon-report1',
    isTestRule: false,
    labelClass: 'rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left',
    inputClass: 'rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24',
    errDirection: 'right',
    isShortcut: false,
    shortcutList: ['今天', '最近三天', '最近一周', '最近半个月', '最近一个月', '最近两个月', '最近三个月', '最近半年', '最近一年'],
  }
  constructor(props) {
    // 继承React.Component
    super(props)
    // let now = new Date()
    this.state = {
      isShow: false,
      isShow1: false,
      isShowHour: false,
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
      showError: false,
      showShortcut: false,
      currentShortcut: ''
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
  componentWillMount = () => {
  }
  componentDidMount = () => {
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isTestRule) {
      this._testError()
    }
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div className={`${this.state.showError ? 'rob-input-has-error ' : ''}rob-form-group `} >
        {this.props.label ? <div className={this.props.labelClass}>
          <label className={'rob-input-label'} title={this.props.label}>{this.props.label}：</label>
        </div> : null}
        {
          this.props.isRange ? (<div className={`${this.props.inputClass} ${this.props.isShortcut ? 'qb-search-g__re-calendar' : ''}`}>
            <div className={'rob-input-date'} style={{ width: '100%', float: 'left' }}>
              <div className="clearfix">
                <div className={'rob-input-item rob-has-icon-right'}>
                  <div>
                    <i className={'rob-is-icon-right rob-icon qb-icon-calendar'} />
                    <input className={'rob-input'} onClick={this.showCalender} readOnly value={this.state.showDate} type="text" placeholder="开始日期" />
                  </div>
                  {
                    this.state.isShow === true ? <Calender isShow={this.state.isShow} isRange={this.props.isRange} pickedDate={this.pickedDate} pickNow={this.pickNow} showCalender={this.showCalender} clearInput={this.clearInput} content={this.props.content} isWorkday={this.props.isWorkday} isBeforeToday={this.props.isBeforeToday} multiSelect={this.props.multiSelect} hasFooter={this.props.hasFooter} pickedItem={this.state.pickedItem} /> : null
                  }
                </div>
                <div className={'rob-input-item rob-has-icon-right'}>
                  <div>
                    <i className={'rob-is-icon-right rob-icon qb-icon-calendar'} />
                    <input className={'rob-input'} onClick={this.showCalender1} readOnly value={this.state.showDate1} type="text" placeholder="结束日期" />
                  </div>
                  {
                    this.state.isShow1 === true ? <Calender isShow={this.state.isShow} isRange={this.props.isRange} pickedDate={this.pickedDate1} pickNow={this.pickNow1} showCalender={this.showCalender1} clearInput={this.clearInput1} content={this.props.content} isWorkday={this.props.isWorkday} isBeforeToday={this.props.isBeforeToday} multiSelect={this.props.multiSelect} hasFooter={this.props.hasFooter} pickedItem={this.state.pickedItem1} /> : null
                  }
                </div>
                {
                  /* 右侧下拉快捷选择icon */
                  this.props.isShortcut ? (
                    <div className="rob-select-box rob-has-icon-right qb-select-g" onClick={this._showShortcut}>
                      <i className="rob-is-icon-right qb-icon-angle-down" />
                    </div>
                  ) : null
                }
                {
                  /* 右侧下拉快捷选择框选项 */
                  this.props.isShortcut ? (
                    <div className={`rob-select ${this.state.showShortcut ? 'open' : ''}`}>
                      <div className="rob-select-items" style={{ zIndex: '99' }}>
                        {
                          this.props.shortcutList.map((item, index) => (
                            <div
                              className={`rob-select-item ${this.state.currentShortcut === item ? 'active' : ''}`}
                              key={`shortcut${index}`}
                              onClick={() => {
                                this._handleSelectShortcut(item)
                              }}
                            >
                              {item}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ) : null
                }
              </div>
              {
                this.state.showError ? (
                  <div className="rob-error-message">
                    {this.props.containErrorIcon ? <i className={this.props.errorIconName} /> : null}
                    {this.props.emptyMsg}
                  </div>
                ) : null
              }

            </div>
          </div>) : (<div className={this.props.inputClass}><div className={'rob-input-item'}>
            <input className={'rob-input'} onClick={this.showCalender} readOnly value={this.state.showDate} type="text" placeholder={this.props.placeholder} />
          </div>
            <div style={{ position: 'absolute', zIndex: '999', minWidth: '550px' }}>
              {
                this.state.isShow === true ? <Calender isShow={this.state.isShow} isRange={this.props.isRange} pickedDate={this.pickedDate} pickNow={this.pickNow} showCalender={this.showCalender} clearInput={this.clearInput} content={this.props.content} isWorkday={this.props.isWorkday} isBeforeToday={this.props.isBeforeToday} multiSelect={this.props.multiSelect} hasFooter={this.props.hasFooter} pickedItem={this.state.pickedItem} pickedItems={this.state.pickedItems} multiSelectDel={this.multiSelectDel} /> : null
              }
              {this.state.isShowHour ? <Time isShow={this.state.isShow} hourClick={this.pickHour} /> : ''}
            </div>
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
  showCalender = () => {
    if (this.state.isShow === true) {
      this.setState({
        isShow: false,
        isShowHour: false
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
    if (this.props.isShowHour) {
      this.setState({ isShow: false }, () => {
        document.removeEventListener('click', this._handleClick)
      })
      document.addEventListener('click', this._handleClickDemo)
    } else {
      this.setState({ isShow: false }, () => {
        document.removeEventListener('click', this._handleClick)
      })
    }
  }
  _handleClickDemo = () => {
    this.setState({ isShowHour: false }, () => {
      document.removeEventListener('click', this._handleClickDemo)
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
  clearInput = (val) => {
    this.setState({
      showDate: '',
      pickedItem: {
        selYear: '',
        selMonth: '',
        selDay: '',
      },
    }, () => {
      if (val) {
        this.props.handleSelect ? this.props.handleSelect(val) : null
      }
    })
  }
  clearInput1 = (val) => {
    this.setState({
      showDate1: '',
      pickedItem1: {
        selYear: '',
        selMonth: '',
        selDay: '',
      },
    }, () => {
      if (val) {
        this.props.handleSelect ? this.props.handleSelect(val) : null
      }
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
  pickHour = (hour) => {
    this.setState({
      showDate: `${tempPickDate.year}-${tempPickDate.month}-${tempPickDate.day} ${hour}`,
      isShow: false, // 选中之后关闭按钮
      isShowHour: false,
      pickedItem: {
        selYear: tempPickDate.year,
        selMonth: tempPickDate.month,
        selDay: tempPickDate.day,
        selHour: hour
      },
    }, () => { this._handleChange() })
  }
  pickedDate = (year, month, day) => {
    if (this.props.content === 'd') {
      if (this.props.multiSelect) {
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
      } else if (!this.props.hasFooter) {
        if (this.props.isShowHour) {
          tempPickDate.year = year
          tempPickDate.month = month
          tempPickDate.day = day
          this.setState({ isShowHour: true })
        } else {
          this.setState({
            showDate: `${year}-${month}-${day}`,
            isShow: false, // 选中之后关闭按钮
            pickedItem: {
              selYear: year,
              selMonth: month,
              selDay: day,
            },
          }, () => { this._handleChange() })
        }
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
      if (!this.props.hasFooter) {
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
    let _tempSpace = ' '
    /**
     * 区间返回{startDate：'1970-01-01',endDate:'1970-01-01'}
     */
    if (this.props.isRange) {
      let _s = this.state.pickedItem, _e = this.state.pickedItem1
      let startDate = _s.selYear ? `${_s.selYear}${_symbol}${_s.selMonth}${this.props.content === 'm' ? '' : _symbol + _s.selDay}` : null,
        endDate = _e.selYear ? `${_e.selYear}${_symbol}${_e.selMonth}${this.props.content === 'm' ? '' : _symbol + _e.selDay}` : null
      if (endDate) {
        let endDateAdd = Date.parse(endDate) + (1000 * 60 * 60 * 24)
        endDate = `${new Date(endDateAdd).getFullYear()}${_symbol}${new Date(endDateAdd).getMonth() + 1}${_symbol}${new Date(endDateAdd).getDate()}`
      }
      let result = {
        startDate,
        endDate
      }
      this.props.handleSelect(result)
      dontTest ? null : this._updateForm(result)
      return
    }
    /**
     *  多选返回 [1970-01-01,1970-01-01,1970-01-01]
     */
    if (this.props.multiSelect) {
      let _dates = this.state.pickedItems, _arr = []
      for (let i = 0; i < _dates.length; i++) {
        let _date = `${_dates[i].selYear}${_symbol}${_dates[i].selMonth}${this.props.content === 'm' ? '' : _symbol + _dates[i].selDay}`
        _arr.push(_date)
      }
      this.props.handleSelect(_arr)
      dontTest ? null : this._updateForm(_arr)
      return
    }
    /**
     * 单选返回 1970-01-01
     */
    let _date = this.state.pickedItem, result = `${_date.selYear}${_symbol}${_date.selMonth}${this.props.content === 'm' ? '' : _symbol + _date.selDay}${_date.selHour ? _tempSpace + _date.selHour : ''}`
    this.props.handleSelect(result)
    dontTest ? null : this._updateForm(result)
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
  _handleSelectShortcut = item => {
    this.setState({
      currentShortcut: item
    })
    let _date
    switch (item) {
      case '今天':
        _date = {
          startDate: new Date(),
          endDate: new Date()
        }
        break
      case '最近三天':
        _date = {
          startDate: new Date() - (86400000 * 2),
          endDate: new Date()
        }
        break
      case '最近一周':
        _date = {
          startDate: new Date() - (86400000 * 6),
          endDate: new Date()
        }
        break
      case '最近半个月':
        _date = {
          startDate: new Date() - (86400000 * 14),
          endDate: new Date()
        }
        break
      case '最近一个月':
        _date = {
          startDate: new Date() - (86400000 * 29),
          endDate: new Date()
        }
        break
      case '最近两个月':
        _date = {
          startDate: new Date() - (86400000 * 59),
          endDate: new Date()
        }
        break
      case '最近三个月':
        _date = {
          startDate: new Date() - (86400000 * 89),
          endDate: new Date()
        }
        break
      case '最近半年':
        _date = {
          startDate: new Date() - (86400000 * 182),
          endDate: new Date()
        }
        break
      case '最近一年':
        _date = {
          startDate: new Date() - (86400000 * 364),
          endDate: new Date()
        }
        break
      default:
        null
    }
    let _startDate = new Date(_date.startDate), _endDate = new Date(_date.endDate)
    this.pickedDate(
      _startDate.getFullYear(),
      (_startDate.getMonth() + 1) > 9 ? (_startDate.getMonth() + 1) : `0${_startDate.getMonth() + 1}`,
      _startDate.getDate() > 9 ? _startDate.getDate() : `0${_startDate.getDate()}`
    )
    this.pickedDate1(
      _endDate.getFullYear(),
      (_endDate.getMonth() + 1) > 9 ? (_endDate.getMonth() + 1) : `0${_endDate.getMonth() + 1}`,
      _endDate.getDate() > 9 ? _endDate.getDate() : `0${_endDate.getDate()}`
    )
  }
  _showShortcut = () => {
    this.setState({
      showShortcut: true
    }, () => {
      document.addEventListener('click', this._hideShortcut)
    })
  }
  _hideShortcut = () => {
    this.setState({
      showShortcut: false
    }, () => {
      document.removeEventListener('click', this._hideShortcut)
    })
  }
  _updateForm = (result) => {
    this.setState({
      info: result
    }, () => {
      this._testError()
    })
  }
  _testError = () => {
    /* 非必填且无值 */
    if (!this.props.required && !this.state.showDate && !this.state.showDate1) {
      this.setState({
        showError: false
      })
      return false
    }
    /* 必填但无值 */
    if (this.props.required && !this.state.showDate && !this.state.showDate1) {
      this.setState({
        showError: true
      })
      return true
    }
    /* 单个框&&有值 */
    if (!this.props.isRange) {
      this.setState({
        showError: false
      })
      return false
    }
    /* 两个框 */
    if (this.props.isRange && this.props.isEqual) {
      /* 两个都有值 && 结束小于等于开始 */
      if (this.state.showDate && this.state.showDate1 && (new Date(this.state.showDate.replace(/-/g, '/')).getTime() >= new Date(this.state.showDate1.replace(/-/g, '/')).getTime())) {
        this.setState({
          showError: true
        })
        return true
      }
      /* 只有一个有值 */
      this.setState({
        showError: false
      })
      return false
    } else if (this.props.isRange) {
      console.log(this.state.showDate, this.state.showDate1)
      /* 两个都有值 && 结束小于开始 */
      if (this.state.showDate && this.state.showDate1 && (new Date(this.state.showDate.replace(/-/g, '/')).getTime() > new Date(this.state.showDate1.replace(/-/g, '/')).getTime())) {
        this.setState({
          showError: true
        })
        return true
      }
      /* 只有一个有值 */
      this.setState({
        showError: false
      })
      return false
    }

    // if (!this.props.required) {
    //   return
    // }
    // if (this.props.isRange) {
    //   !this.state.info || (!this.state.info.startDate && !this.state.info.endDate) ? this.setState({
    //     showError: true
    //   }) : this.setState({
    //     showError: false
    //   })
    //   return
    // }
    // if (this.props.multiSelect) {
    //   !this.state.info || this.state.info.length < 1 ? this.setState({
    //     showError: true
    //   }) : this.setState({
    //     showError: false
    //   })
    //   return
    // }
    // !this.state.info ? this.setState({
    //   showError: true
    // }) : this.setState({
    //   showError: false
    // })
  }
  _setValue = val => {
    let _date = new Date(val)
    let year = _date.getFullYear(),
      month = (_date.getMonth() + 1) > 9 ? (_date.getMonth() + 1) : `0${_date.getMonth() + 1}`,
      day = _date.getDate() > 9 ? _date.getDate() : `0${_date.getDate()}`
    this.pickedDate(year, month, day)
  }
  _setRangeValue = val => {
    if (val.startDate) {
      let _date = new Date(val.startDate)
      let year = _date.getFullYear(),
        month = (_date.getMonth() + 1) > 9 ? (_date.getMonth() + 1) : `0${_date.getMonth() + 1}`,
        day = _date.getDate() > 9 ? _date.getDate() : `0${_date.getDate()}`
      this.pickedDate(year, month, day)
    } else {
      this.clearInput(val)
    }
    if (!val.endDate) {
      return this.clearInput1(val)
    }
    let _endDate = new Date(val.endDate)
    let endYear = _endDate.getFullYear(),
      endMonth = (_endDate.getMonth() + 1) > 9 ? (_endDate.getMonth() + 1) : `0${_endDate.getMonth() + 1}`,
      endDay = _endDate.getDate() > 9 ? _endDate.getDate() : `0${_endDate.getDate()}`
    this.pickedDate1(endYear, endMonth, endDay)
  }
  setValue = (val) => {
    if (!this.props.isRange && !val) {
      return this.clearInput()
    }
    this.props.isRange ? this._setRangeValue(val) : this._setValue(val)
  }
  setHour = (val) => {
    this.setState({ showDate: val })
  }
  getErrStatus = () => this._testError()
}
export default CalenderInput