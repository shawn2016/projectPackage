import React, { Component } from 'react'
import PropTypes from 'prop-types'
const now = new Date()
class Content extends Component {
  static robotUIName = 'Content'
  static propTypes = {
    isWorkday: PropTypes.bool.isRequired, // 是否选择工作日
    isBeforeToday: PropTypes.bool.isRequired, // 是否禁用今日之前
    multiSelect: PropTypes.bool.isRequired, // 是否是多选
    pickedItem: PropTypes.object.isRequired, // 已经选择的日期
    pickedItems: PropTypes.array.isRequired, // 已经选择的日期数组
    multiSelectDel: PropTypes.func, // 多選的取消函數
    datePick: PropTypes.func.isRequired,
    prevMonth: PropTypes.func.isRequired,
    nextMonth: PropTypes.func.isRequired,
    thisYear: PropTypes.number,
    thisMonth: PropTypes.number,
    thisDay: PropTypes.number,
    viewData: PropTypes.array,
    year: PropTypes.number,
    month: PropTypes.number,
  }
  static defaultProps = {
    thisYear: now.getFullYear(),
    thisMonth: now.getMonth() + 1,
    thisDay: now.getDate(),
    viewData: [],
    year: 0,
    month: 0,
    multiSelectDel: null
  }
  // 处理日期选择事件，如果是当月，触发日期选择；如果不是当月，切换月份
  handleDatePick = (index, styleName) => {
    let month = this.props.viewData[this.props.month - 1]
    if (styleName === 'available' || styleName === 'available today' || styleName === 'available current') {
      this.props.datePick(month[index])
    } else if (styleName === 'available current' || styleName === 'available today current') {
      this.props.multiSelectDel(this.props.year, this.props.month, month[index])
    } else if (styleName === 'prev-month') {
      this.props.prevMonth()
    } else if (styleName === 'next-month') {
      this.props.nextMonth()
    }
  }
  render() {
    // 确定当前月数据中每一天所属的月份，以此赋予不同className
    let month = this.props.viewData[this.props.month - 1], rowsInMonth = [], i = 0,
      styleOfDays = (() => {
        let ii = month.indexOf(1), j = month.indexOf(1, ii + 1), arr = new Array(42)
        if (this.props.thisYear === this.props.year && this.props.thisMonth === this.props.month) {
          let n = this.props.thisDay
          arr.fill('prev-month', 0, ii)
          arr.fill('available', ii, (ii + n) - 1)
          arr.fill('available today', (ii + n) - 1, ii + n)
          arr.fill('available', ii + n, j)
          arr.fill('next-month', j)
        } else {
          arr.fill('prev-month', 0, ii)
          arr.fill('available', ii, j)
          arr.fill('next-month', j)
        }
        // 根据选择的日期返显选中的日期
        if (!this.props.multiSelect) {
          if (this.props.pickedItem.selYear === this.props.year && this.props.pickedItem.selMonth === this.props.month) {
            let day = this.props.pickedItem.selDay
            for (let m = 0; m < month.length; m++) {
              if (month[m] === day && m >= ii && m < j) {
                arr[m] = arr[m].concat(' current')
              }
            }
          }
        } else {
          for (let iii = 0; iii < this.props.pickedItems.length; iii++) {
            if (this.props.pickedItems[iii].selYear === this.props.year && this.props.pickedItems[iii].selMonth === this.props.month) {
              let day = this.props.pickedItems[iii].selDay
              for (let m = 0; m < month.length; m++) {
                if (month[m] === day && m >= ii && m < j) {
                  arr[m] = arr[m].concat(' current')
                }
              }
            }
          }
        }
        // 根据属性是否选择工作日来决定是否添加disabled
        if (this.props.isWorkday) {
          for (let i1 = 0; i1 < arr.length; i1++) {
            let numArr = [0, 7, 14, 21, 28, 35, 42, 6, 13, 20, 27, 34, 41]
            if (numArr.indexOf(i1) >= 0) {
              arr[i1] = arr[i1].concat(' disabled')
            }
          }
        }
        // 根据属性是否选择今日之前来决定是否添加disabled
        if (this.props.isBeforeToday) {
          if (this.props.thisYear > this.props.year) {
            for (let b2 = 0; b2 < arr.length; b2++) {
              arr[b2] = arr[b2].concat(' prev-month')
            }
          } else if (this.props.thisMonth > this.props.month && this.props.thisYear === this.props.year) {
            for (let b2 = 0; b2 < arr.length; b2++) {
              arr[b2] = arr[b2].concat(' prev-month')
            }
          } else if (this.props.thisMonth === this.props.month && this.props.thisYear === this.props.year) {
            for (let b1 = 0; b1 < this.props.viewData[this.props.thisMonth - 1].length; b1++) {
              if (arr[b1] === 'available today') {
                arr[b1] = arr[b1].concat(' prev-month')
              } else if (arr[b1] === 'available' && this.props.viewData[this.props.thisMonth - 1][b1] < this.props.thisDay) {
                arr[b1] = arr[b1].concat(' prev-month')
              }
            }
          }
        }
        return arr
      })()
    // 把每一个月的显示数据以7天为一组等分
    month.forEach((day, index) => {
      if (index % 7 === 0) {
        rowsInMonth.push(month.slice(index, index + 7))
      }
    })
    return (
      <div className={'rob-calendar-content'} >
        <table className={'rob-date-table date-table'} >
          <tbody >
            <tr className={'calendar-header'}>
              <th> 日 </th>
              <th> 一 </th>
              <th> 二 </th>
              <th> 三 </th>
              <th> 四 </th>
              <th> 五 </th>
              <th> 六 </th>
            </tr>
          </tbody>
          <tbody id="calendarContainer" className={'c_days'} >
            {
              rowsInMonth.map((row, rowIndex) => (
                <tr key={rowIndex}>{
                  row.map((day) => (
                    <td className={styleOfDays[i]} onClick={this.handleDatePick.bind(this, i, styleOfDays[i])} key={i++} > {day} </td>
                  )
                  )
                }</tr>
              )
              )
            }
          </tbody>
        </table >
      </div>
    )
  }
}
export default Content