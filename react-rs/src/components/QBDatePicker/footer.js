import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
class Footer extends Component {
  static robotUIName = 'Footer'
  static propTypes = {
    showCalender: PropTypes.func.isRequired,
    clearInput: PropTypes.func.isRequired,
    pickNow: PropTypes.func.isRequired,
  }
  componentWillMount = () => {

  }
  render() {
    return (
      <div className={'rob-calendar-panel-footer'}>
        <div className={'ui-calendar-toolbar'}>
          <a className={'rob-calendar-panel-footer-link'} onClick={this.props.pickNow} >现在</a>
          <a className={'rob-calendar-panel-footer-link'} onClick={this.props.clearInput} >清空</a>
          <a className={'rob-calendar-panel-footer-link'} onClick={this.props.showCalender} >确定</a>
          <a className={'rob-calendar-panel-footer-link'} onClick={this.props.showCalender} >关闭</a>
        </div>
      </div>
    )
  }
}
export default Footer