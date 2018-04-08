/**
 * 批量经办查询
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Search from './components/Search'
import Info from './components/Info'
export default class SearchSingleHandle extends PureComponent {
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g  qb-search-g--layout">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-icon-menu1" style={{ marginRight: '5px' }} />数据统计</li>
              <li className="active">扫码收款统计</li>
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
        <div className="">
          <div>
            <Info {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
SearchSingleHandle.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}