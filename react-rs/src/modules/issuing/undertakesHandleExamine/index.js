/**
 * 单笔经办审批
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Search from './components/Search'
import Info from './components/Info'
export default class UndertakesHandleExamine extends PureComponent {
  componentWillMount() {}
  render() {
    return (
      <div>
        <div className="qb-panel-g  qb-search-g--layout">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />代发</li>
              <li className="active">代发审批</li>
            </ol>
          </div>
          {
            /**
             * 查询条件
             */
          }
          <div>
            <Search />
          </div>
        </div>
        {
          /**
           * 详情
           */
        }
        <div className="qb-panel-g">
          <div>
            <Info history={this.props.history} />
          </div>
        </div>
      </div>
    )
  }
}
UndertakesHandleExamine.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}
