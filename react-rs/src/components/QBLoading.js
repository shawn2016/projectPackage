import React, { Component } from 'react'
import PropTypes from 'prop-types'

class QBLoading extends Component {
  static propTypes = {
    showLoading: PropTypes.bool
  }
  static defaultProps = {
    showLoading: false
  }
  render() {
    const {
      showLoading
    } = this.props
    return (
      <div>
        {showLoading ? <div>
          <div className="rob-alert-cover" data-dismiss="rob-alert" >
            <div className="qb-loading-g">
              <div className="qb-loading-g__icon" />
              <div>加载中...</div>
            </div>
          </div>
        </div> : null}
      </div>
    )
  }
}

export default QBLoading