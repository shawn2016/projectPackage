/**
 * Created by Administrator on 2017-7-31.
 */
import React, { PureComponent, PropTypes } from 'react'
import {
  formatMoneyYuan,
  enterpriseFinancingType
  } from 'utils/filterCommon'
import timeStamp from 'utils/timeStamp'
import { connect } from 'react-redux'
import '../redux/reducer'
class Infor extends PureComponent {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      containCheckbox: false,
      striped: true,
      hoverEffect: true,
      database: [
        { a: 111, b: 2222, c: 33333, d: 444444 },
        { a: 111, b: 2222, c: 33333, d: 444444 },
        { a: 111, b: 2222, c: 33333, d: 444444 },
        { a: 111, b: 2222, c: 33333, d: 444444 },
        { a: 111, b: 2222, c: 33333, d: 444444 }
      ]
    }
  }
  componentDidMount() {
  }
  delUser = () => {
    this.props.history.push('/enterpriseFinancing/transactionRecord')
  }
  filter = (type, value) => {
    if (type === 'bizType') {
      switch (value) {
        case '100':
          return '支付结算'
        case '200':
          return '批量转账'
        case '300':
          return '入金'
        case '400':
          return '出金'
        case '500':
          return '代付'
        case '600':
          return '代收'
        case '700':
          return '账户验证'
        case '1000':
          return '贷款还款'
        default:
          return value
      }
    }
    if (type === 'dataSource') {
      switch (value) {
        case '1':
          return '前台注册'
        case '2':
          return '后台添加'
        default:
          return value
      }
    }
    if (type === 'amount') {
      if (value) {
        return value / 100
      }
    }
    if (type === 'accountBalance') {
      if (value || value === 0) {
        return value / 100
      }
    }
  }
  render() {
    //const { EFEF_dayTradingData = {} } = this.props.data
    let recentTradeRecordList = []
    if (this.props.data && this.props.data.recentTradeRecordList) {
      recentTradeRecordList = this.props.data.recentTradeRecordList
    }
    console.log(this.props)
    return (
      <div>
        <div className="rob-col-lg-12  column">
          <div className="qb-panel-g qb-chart-g__element clearfix">
            <div className="qb-column-header-g qb-column-header-g--button">
              <ol className="rob-breadcrumb rob-breadcrumb-pointed">
                <li className="active"><a >近期交易记录</a></li>
              </ol>
              <a href="" className="qb-pull-right-g qb-s-more-g" onClick={this.delUser}>更多 &gt;</a>
            </div>
            {recentTradeRecordList.length !== 0 ? <div className="qb-list-g">
              <div className="qb-list-g__table mt30">
                <div className="clearfix">
                  <div className="column">
                    <div className="rob-table-responsive" style={{ overflowX: 'hidden' }}>
                      <table className="rob-table table-deal">
                        <thead>
                          <tr>
                            <th> 金额</th>
                            <th> 类型</th>
                            <th> 时间</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            recentTradeRecordList.map((data, i) => (
                              <tr key={i}>
                                <td>{formatMoneyYuan(data.tradeMoney)}</td>
                                <td>{enterpriseFinancingType(data.tradeType)}</td>
                                <td>{timeStamp(data.createTime, 5, 1)}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div> : <div className="qb-nodate-g__box"><span className="qb-nodate-g bg_icon" /><p>暂无交易记录</p></div> }
          </div>
        </div>
      </div >
    )
  }
}
Infor.propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func,
  history: PropTypes.object,

}
Infor.defaultProps = {
  data: {},
  history: {},
  getData: () => { }
}
export default connect(state => ({
  data: state.listQuery && state.listQuery.EFEF_dayTradingData
}))(Infor)