import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Content from './components/Content'
import Search from './components/Search'
class WithdrawListPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      param: {
      }
    }
  }
  static propTypes = {
    history: PropTypes.object
  }
  static defaultProps = {
    history: {}
  }
  // 返回
  goBack = () => {
    this.props.history.goBack()
  }
  changeParams = (param, isCurrent) => {
    console.log(param)
    this.setState({
      param,
      isCurrent
    })
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-search-g--layout">
          <div className="qb-column-header-g  qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><Link to="/home/home"><i className="qb-icon-home" />首页</Link></li>
              <li><Link to="/home/withdraw">出金</Link></li>
              <li className="active"><a>出金记录</a></li>
            </ol>
            <button onClick={this.goBack} className="rob-btn rob-btn-minor rob-btn-circle " type="button">返回</button>
          </div>
          <Search changeParams={this.changeParams} />
        </div>
        <Content paramProps={this.state.param} isCurrent={this.state.isCurrent} />
      </div>
    )
  }
}
export default WithdrawListPage