import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SearchHead from './components/SearchInfo'
import ChargeContent from './components/Content'
export default class chargeQuery extends PureComponent {
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
        {/* POS/扫码交易查询 */}
        <SearchHead />
        {/* POS/扫码交易查询 + 分页 */}
        <ChargeContent history={this.props.history} />
      </div>
    )
  }
}