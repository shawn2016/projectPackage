import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Footer from './footer'
import Content from './content'
import Month from './month'
const displayDaysPerMonth = (year) => {
  //  定义每个月的天数，如果是闰年第二月改为29天
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) { daysInMonth[1] = 29 }
  // 以下为了获取一年中每一个月在日历选择器上显示的数据，
  // 从上个月开始，接着是当月，最后是下个月开头的几天
  // 定义一个数组，保存上一个月的天数

  let daysInPreviousMonth = [].concat(daysInMonth)
  daysInPreviousMonth.unshift(daysInPreviousMonth.pop())
  // 获取每一个月显示数据中需要补足上个月的天数
  let addDaysFromPreMonth = new Array(12)
    .fill(null)
    .map((item, index) => {
      let day = new Date(year, index, 1).getDay() // 获取每月一号是周几
      let aa = 0
      if (day === 0) {
        aa = 7
      } else {
        aa = day
      }
      return aa
    })
  // 已数组形式返回一年中每个月的显示数据,每个数据为6行*7天
  return new Array(12)
    .fill([])
    .map((month, monthIndex) => {
      let addDays = addDaysFromPreMonth[monthIndex], daysCount = daysInMonth[monthIndex], daysCountPrevious = daysInPreviousMonth[monthIndex], monthData = []
      // 补足上一个月
      for (; addDays > 0; addDays--) {
        monthData.unshift(daysCountPrevious--)
      }
      // 添入当前月
      for (let i = 0; i < daysCount;) {
        monthData.push(++i)
      }
      // 补足下一个月
      for (let i = 42 - monthData.length, j = 0; j < i;) {
        monthData.push(++j)
      }
      return monthData
    })
}
// 样式style
const styles = {
  range: {
    position: 'absolute',
    zIndex: 999,
    top: '30px'
  }
}
class Calender extends Component {
  static robotUIName = 'Calender'
  static propTypes = {
    showCalender: PropTypes.func.isRequired,
    clearInput: PropTypes.func.isRequired,
    pickNow: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    pickedDate: PropTypes.func.isRequired,
    isWorkday: PropTypes.bool.isRequired,
    isBeforeToday: PropTypes.bool.isRequired,
    multiSelect: PropTypes.bool.isRequired, // 是否是多选
    hasFooter: PropTypes.bool.isRequired, // 是否有底部
    isRange: PropTypes.bool.isRequired, // 是否是日期范围
    pickedItem: PropTypes.object.isRequired,
    pickedItems: PropTypes.array, // 多選的選擇
    multiSelectDel: PropTypes.func,
  }
  static defaultProps = {
    pickedItems: [], // 多选的日期-选择的数组
    multiSelectDel: null
  }
  constructor(props) {
    // 继承React.Component
    super(props)
    let now = new Date()
    this.state = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      picked: false
    }
  }
  // 切换到下一个月
  nextMonth = () => {
    if (this.state.month === 12) {
      this.setState({
        year: ++this.state.year,
        month: 1
      })
    } else {
      this.setState({
        month: ++this.state.month
      })
    }
  }
  // 切换到上一个月
  prevMonth = () => {
    if (this.state.month === 1) {
      this.setState({
        year: --this.state.year,
        month: 12
      })
    } else {
      this.setState({
        month: --this.state.month
      })
    }
  }
  // 切换到下一年
  nextYear = () => {
    this.setState({
      year: ++this.state.year,
    })
  }
  // 切换到上一年
  prevYear = () => {
    this.setState({
      year: --this.state.year,
    })
  }
  // 选择日期
  datePick = (index) => {
    if (this.props.content === 'd') {
      this.setState({
        day: index
      })
      this.props.pickedDate(this.state.year, this.state.month, index)
    } else if (this.props.content === 'm') {
      this.setState({
        month: index
      })
      this.props.pickedDate(this.state.year, index)
    }
  }
  // 标记日期已经选择
  picked = () => {
    this.state.picked = true
  }
  render() {
    let props = {
      viewData: displayDaysPerMonth(this.state.year),
      datePicked: `${this.state.year} 年${this.state.month + 1} 月${this.state.day} 日`
    }
    return (
      <div id="calendarContainer" style={this.props.isRange ? styles.range : {}} >
        <div className={'rob-calendar-panel animated'}>
          <div className={'rob-calendar-body-wrapper'}>
            <div className={'rob-calendar-panel-sidebar calendar-hide-sidebar'} />
            <div className={'rob-calendar-panel-body'} >
              <Header
                prevMonth={this.prevMonth}
                nextMonth={this.nextMonth}
                prevYear={this.prevYear}
                nextYear={this.nextYear}
                year={this.state.year}
                month={this.state.month}
                day={this.state.day}
              />
              {
                this.props.content === 'm' ? <Month datePick={this.datePick} year={this.state.year} month={this.state.month} /> : <Content {...props} prevMonth={this.prevMonth} nextMonth={this.nextMonth} datePick={this.datePick} year={this.state.year} month={this.state.month} day={this.state.day} isWorkday={this.props.isWorkday} isBeforeToday={this.props.isBeforeToday} multiSelect={this.props.multiSelect} pickedItem={this.props.pickedItem} pickedItems={this.props.pickedItems} multiSelectDel={this.props.multiSelectDel} />
              }
              {
                this.props.hasFooter ? <Footer showCalender={this.props.showCalender} clearInput={this.props.clearInput} pickNow={this.props.pickNow} /> : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Calender