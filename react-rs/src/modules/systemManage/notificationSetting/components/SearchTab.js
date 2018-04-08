import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Tab from 'react-robotUI/Tab'
import '../redux/reducer'
import * as action from '../redux/actions'

class SearchTab extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      params: {},
      isTestRule: false
    }
  }
  componentWillMount() {
    // 默认显示tab1中的内容
    this.switchState('50')
  }
  componentDidMount() {
  }
  /* 切換tab*/
  switchState = (p) => {
    let params = {}
    params.type = p
    this.props.updateTypeId(p)
  }
  render() {
    return (
      <div className="qb-column-header-g qb-column-header-g--tabs">
        <Tab name="rob-nav rob-nav-tabs2" icon="qb-icon-home">
          <div title="简单通知" data-func={this.switchState.bind(this, '50')} />
          <div title="经办预警" data-func={this.switchState.bind(this, '40')} />
          <div title="余额异常" data-func={this.switchState.bind(this, '30')} />
          <div title="付款通知" data-func={this.switchState.bind(this, '20')} />
          <div title="余额通知" data-func={this.switchState.bind(this, '10')} />
        </Tab>
      </div>
    )
  }
}
SearchTab.propTypes = {
  data: PropTypes.object,
  updateTypeId: PropTypes.func,
  bizList: PropTypes.array,
  isTestRule: PropTypes.bool,
}
SearchTab.defaultProps = {
  data: {},
  updateTypeId: () => { },
  bizList: [],
  isTestRule: false,
}

export default connect(() => ({}), dispatch => ({
  updateTypeId: bindActionCreators(action.SENG_updateTypeId, dispatch),
}))(SearchTab)
