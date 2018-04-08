import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SearchHead from './components/SearchInfo'
import TradeContent from './components/Content'
export default class tradeQuery extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  static propTypes = {
    history: PropTypes.object
  }
  static defaultProps = {
    history: {}
  }
  render() {
    return (
      <div>
        {/* 收费查询search */}
        <SearchHead />
        {/* 收费查询table + 分页 */}
        <TradeContent history={this.props.history} />
      </div>
    )
  }
}