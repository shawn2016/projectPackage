import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import getRequest from 'utils/getRequest'
import { Link } from 'react-router-dom'
import Info from './components/info'
import DetailList from './components/detailList'
import AmountInfo from './components/amountInfo'

class RepaymentQueryDetailPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.goBackBtn = this.goBackBtn.bind(this)
  }
  /* 获取详情数据 */
  componentWillMount = async () => {
    if (this.props.params.id) {
      (async () => {
        let resData = await getRequest({
          path: '/loans/repay/getAmountInfo',
          method: 'POST',
          param: { loanNo: this.props.params.id }
        })
        this.setState({ repaymentInfo: resData.data.body })
      })()
    } else {
      this.goBackBtn()
    }
  }
  /* 返回按钮事件 */
  goBackBtn = () => {
    this.props.history.push('/creditManagement/repaymentQuery')
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-listdesc-g">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-credit" style={{ marginRight: '5px' }} />授信管理</li>
              <li><Link to={{ pathname: '/creditManagement/repaymentQuery' }}>还款查询</Link></li>
              <li className="active">详情</li>
            </ol>
            <button className="rob-btn rob-btn-minor rob-btn-circle " onClick={this.goBackBtn} type="button">返回</button>
          </div>
          <Info data={this.state.repaymentInfo} />
        </div>
        <AmountInfo data={this.state.repaymentInfo} />
        <DetailList params={this.props.params} />
      </div>
    )
  }
}
RepaymentQueryDetailPage.propTypes = {
  history: PropTypes.object,
  params: PropTypes.object
}
RepaymentQueryDetailPage.defaultProps = {
  history: {},
  params: {}
}
export default connect()(RepaymentQueryDetailPage)