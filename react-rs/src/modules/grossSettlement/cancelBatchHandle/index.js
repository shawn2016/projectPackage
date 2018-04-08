import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Search from './components/Search'
import Info from './components/Info'

export default class CancelBatchHandle extends PureComponent {
  componentWillMount() {}
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-search-g--layout">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />支付结算</li>
              <li className="active">批量经办撤销</li>
            </ol>
          </div>
          {
            /**
             * 查询条件
             */
          }
          <div>
            <Search history={this.props.history} />
          </div>
        </div>
        {
          /**
           * 表格信息
           */
        }
        <div>
          <Info history={this.props.history} />
        </div>
      </div>
    )
  }
}

CancelBatchHandle.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}
