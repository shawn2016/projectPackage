import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'

const styles = {
  noselect: {
    userSelect: 'none'
  }
}
class Header extends Component {
  static robotUIName = 'Header'
  static propTypes = {
    year: PropTypes.number,
    month: PropTypes.number,
    prevYear: PropTypes.func,
    prevMonth: PropTypes.func,
    nextYear: PropTypes.func,
    nextMonth: PropTypes.func,
  }
  static defaultProps = {
    year: 0,
    month: 0,
    prevYear: PropTypes.func,
    prevMonth: PropTypes.func,
    nextYear: PropTypes.func,
    nextMonth: PropTypes.func,
  }
  state = {
  }
  componentWillMount = () => {
  }
  showCalender = () => {
  }
  render() {
    return (
      <div className={'rob-calendar-header'} >
        <span data-ctrl="1" style={styles.noselect} className={'ui-calendar-control rob-calendar-prev rob-calendar-icon'} onClick={this.props.prevYear} >&lt;&lt;</span>
        <span data-ctrl style={styles.noselect} className={'ui-calendar-control rob-calendar-prev rob-calendar-icon'} onClick={this.props.prevMonth}>&lt;</span>
        <span data-ctrl style={styles.noselect} className={'ui-calendar-control rob-calendar-header-label'}> {this.props.year}年</span>
        <span data-ctrl style={styles.noselect} className={'ui-calendar-control rob-calendar-header-label active'} >{this.props.month}月</span>
        <span data-ctrl style={styles.noselect} className={'ui-calendar-control rob-calendar-next rob-calendar-icon'} onClick={this.props.nextYear} >&gt;&gt;</span>
        <span data-ctrl style={styles.noselect} className={'ui-calendar-control rob-calendar-next rob-calendar-icon'} onClick={this.props.nextMonth}>&gt;</span>
      </div>
    )
  }
}
export default Header