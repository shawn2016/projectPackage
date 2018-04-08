import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Search from './components/search'
import Content from './components/content'

class LoanIntentionQueryPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.addLoan = this.addLoan.bind(this)
  }
  /* 增加按钮事件 */
  addLoan = () => {
    this.context.router.history.push('/home/loanIntention')
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-search-g--layout">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-credit" style={{ marginRight: '5px' }} />授信管理</li>
              <li className="active">贷款意向查询</li>
            </ol>
            <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.addLoan} type="button">增加</button>
          </div>
          <Search />
        </div>
        <Content />
      </div>
    )
  }
}
LoanIntentionQueryPage.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    staticContext: PropTypes.object
  })
}
export default connect()(LoanIntentionQueryPage)