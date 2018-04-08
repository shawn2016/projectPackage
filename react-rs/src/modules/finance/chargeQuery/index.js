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
        {/* 收费查询search */}
        <SearchHead />
        {/* 收费查询table + 分页 */}
        <ChargeContent history={this.props.history} />
      </div>
    )
  }
}