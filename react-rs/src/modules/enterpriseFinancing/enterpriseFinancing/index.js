/**
 * Created by Administrator on 2017-7-31.
 */

import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as action from './redux/actions'
import Board from './components/Board'
import Chart from './components/Chart'
import Infor from './components/Infor'
class balanceHistory extends PureComponent {
  componentDidMount() {
    this.props.getData().then(() => {
      console.log(this.props)
    })
  }
  render() {
    return (
      <div>
        <Board history={this.props.history} />
        <div className="rob-row clearfix qb-chart-g">
          <Chart />
          <Infor history={this.props.history} />
        </div>
      </div >
    )
  }
}
balanceHistory.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
  getData: PropTypes.func,
}
balanceHistory.defaultProps = {
  history: {},
  data: {},
  getData: () => { },
}
export default connect(state => ({
  data: state.listQuery
}), dispatch => ({
  getData: bindActionCreators(action.EFEF_getData, dispatch)
}))(balanceHistory)
//export default connect()(balanceHistory)