import React, { Component } from 'react'
import PropTypes from 'prop-types'
export class Time extends Component {
  static propTypes = {
    hourClick: PropTypes.func,
  }
  static defaultProps = {
    hourClick: () => {}
  }
  render() {
    return (
      <div className="rob-calendar-panel animated" >
        <div className="rob-calendar-body-wrapper">
          <div className="rob-calendar-panel-sidebar calendar-hide-sidebar" />
          <div className="rob-calendar-panel-body">

            <div className="rob-calendar-header">
              <span data-ctrl="true" className="ui-calendar-control rob-calendar-header-label" >日期</span></div>
            <div className="rob-calendar-content">
              <table className="rob-date-table date-table qb-pull-left-g">
                <tbody />
                <tbody id="calendarContainer" className="c_days">
                  <tr>
                    <td className="prev-month">1:00</td>
                    <td className="prev-month">2:00</td>
                    <td className="prev-month">3:00</td>
                    <td className="prev-month">4:00</td>
                  </tr>
                  <tr>
                    <td className="prev-month">5:00</td>
                    <td className="prev-month">6:00</td>
                    <td className="prev-month">7:00</td>
                    <td className="prev-month">8:00</td>
                  </tr><tr>
                    <td className="available" onClick={() => this.props.hourClick('09:00:00')}>9:00</td>
                    <td className="available" onClick={() => this.props.hourClick('10:00:00')}>10:00</td>
                    <td className="available" onClick={() => this.props.hourClick('11:00:00')}>11:00</td>
                    <td className="available" onClick={() => this.props.hourClick('12:00:00')}>12:00</td>
                  </tr><tr>
                    <td className="available" onClick={() => this.props.hourClick('13:00:00')}>13:00</td>
                    <td className="available" onClick={() => this.props.hourClick('14:00:00')}>14:00</td>
                    <td className="available" onClick={() => this.props.hourClick('15:00:00')}>15:00</td>
                    <td className="available" onClick={() => this.props.hourClick('16:00:00')}>16:00</td>
                  </tr><tr>
                    <td className="available" onClick={() => this.props.hourClick('17:00:00')}>17:00</td>
                    <td className="prev-month">18:00</td>
                    <td className="prev-month">19:00</td>
                    <td className="prev-month">20:00</td>
                  </tr><tr>
                    <td className="prev-month">21:00</td>
                    <td className="prev-month">22:00</td>
                    <td className="prev-month">23:00</td>
                    <td className="prev-month">24:00</td>
                  </tr></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Time