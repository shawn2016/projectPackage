import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Search from './components/search'
import Content from './components/content'

class LoanProgressQueryPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-search-g--layout">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-credit" style={{ marginRight: '5px' }} />授信管理</li>
              <li className="active">贷款进度查询</li>
            </ol>
          </div>
          <Search />
        </div>
        <Content />
      </div>
    )
  }
}

export default connect()(LoanProgressQueryPage)