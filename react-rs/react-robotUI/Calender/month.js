import React, {
    Component
} from 'react'
import PropTypes from 'prop-types'

class Month extends Component {
  static robotUIName = 'Content'
  static propTypes = {
    datePick: PropTypes.func.isRequired,
  }
  static defaultProps = {
  }
  handleDatePick =(i) => {
    this.props.datePick(i)
  }
  // 绑定颜色改变事件
  componentDidMount = () => {
    let changeColor = this.changeColor()
    document.getElementById('calendarContainer').addEventListener('click', changeColor, false)
  }
  changeColor = () => {
    let previousEl = null
    return function (event) {
      let name = event.target.nodeName.toLocaleLowerCase()
      if (previousEl && (name === 'span' || name === 'a')) {
        previousEl.style = ''
      }
      if (event.target.className === 'cell') {
        let targetEvent = event
        targetEvent.target.style = 'background:#20a0ff !important;color:white'
        previousEl = event.target
      }
    }
  }
  render() {
    let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let rowsInMonth = []
    let i = 0
    // 把每一个月的显示数据以7天为一组等分
    month.forEach((day, index) => {
      if (index % 4 === 0) {
        rowsInMonth.push(month.slice(index, index + 4))
      }
    })
    return (
      <div className={'rob-calendar-content'}>
        <table className={'month-table rob-month-table'}>
          <tbody>
            {
              rowsInMonth.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {
                    row.map((month1) => (
                      <td key={i++} className={'currnent'} onClick={this.handleDatePick.bind(this, i)}>
                        <a className={'cell'}>{month1} 月</a>
                      </td>
                      )
                    )
                  }
                </tr>
                )
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}
export default Month