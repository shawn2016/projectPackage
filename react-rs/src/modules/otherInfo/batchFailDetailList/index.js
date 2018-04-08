/*
代发经办查看明细列表
by. 刘鹏钢
2017-11-30
 */
import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'react-robotUI/Table'
import * as action from './redux/actions'
import { formatDay, formatMoneyYuan } from '../../../utils/filterCommon'
import './redux/reducer'
class UnderakesOrgnaizationDetailPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      totalMoney: 0
    }
  }
  checkType = ''
  componentWillMount() {
    if (sessionStorage.getItem('failureDataList')) {
      let currentId = JSON.parse(sessionStorage.getItem('failureDataList'))
      this.checkType = currentId.from
      this.props.getData(currentId).then((res) => {
        if (res.data.respCode === '000000') {
          let tempMoney = 0
          if (this.checkType === 'single') {
            this.props.data.body.forEach((item) => {
              tempMoney += item.amount
            })
          } else {
            this.props.data.body.forEach((item) => {
              tempMoney += item.totalAmount
            })
          }
          this.setState({ totalMoney: tempMoney })
        }
      })
    }
  }
  render() {
    let { data } = this.props,
      { body = [] } = data
    return (
      <div>
        <div className="qb-panel-g clearfix qb-media-height">
          <div className="mtb10 text-overflow">
            <div className="rob-col-lg-24 text-left">总笔数：{body.length || 0}笔</div>
            <div className="rob-col-lg-24 text-left">总金额（元）：{formatMoneyYuan(this.state.totalMoney)}</div>
          </div>
          <div className="qb-list-g qb-list-g--red">
            <div className="qb-list-g__table">
              <div className="rob-row clearfix">
                <div className="rob-col-lg-24 column">
                  <div className="rob-table-responsive">
                    <Table striped hoverEffect>
                      <TableHeader>
                        <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
                        <TableHeaderColumn> 创建日期</TableHeaderColumn>
                        <TableHeaderColumn> 业务参考号</TableHeaderColumn>
                        {this.checkType === 'single' ? <TableHeaderColumn> 收款方名称</TableHeaderColumn> : null}
                        {this.checkType === 'single' ? <TableHeaderColumn> 收款方账号</TableHeaderColumn> : null}
                        <TableHeaderColumn> 付款方账户名称</TableHeaderColumn>
                        {this.checkType !== 'single' ? <TableHeaderColumn> 总笔数（笔）</TableHeaderColumn> : null}
                        {this.checkType !== 'single' ? <TableHeaderColumn> 总金额（元）</TableHeaderColumn> : null}
                        {this.checkType === 'single' ? <TableHeaderColumn> 金额（元）</TableHeaderColumn> : null}
                        <TableHeaderColumn> 期望日</TableHeaderColumn>
                      </TableHeader>
                      <TableBody>
                        {body.map((info, i) => (
                          <TableRow key={i}>
                            <TableRowColumn className="text-center">{i + 1}</TableRowColumn>
                            {this.checkType === 'single' ? <TableRowColumn> {info.createTime ? formatDay(info.createTime) : ''}</TableRowColumn> : null}
                            {this.checkType !== 'single' ? <TableRowColumn> {info.createDate ? formatDay(info.createDate) : ''}</TableRowColumn> : null}
                            <TableRowColumn> {info.outSerialNo}</TableRowColumn>
                            {this.checkType === 'single' ? <TableRowColumn> {info.receiverAccountName}</TableRowColumn> : null}
                            {this.checkType === 'single' ? <TableRowColumn> {info.receiverAccountNo}</TableRowColumn> : null}
                            <TableRowColumn> {info.payerAccountName}</TableRowColumn>
                            {this.checkType !== 'single' ? <TableRowColumn> {info.totalCount}</TableRowColumn> : null}
                            {this.checkType !== 'single' ? <TableRowColumn> {formatMoneyYuan(info.totalAmount)}</TableRowColumn> : null}
                            {this.checkType === 'single' ? <TableRowColumn> {formatMoneyYuan(info.amount)}</TableRowColumn> : null}
                            <TableRowColumn> {info.expectDate ? formatDay(info.expectDate) : ''}</TableRowColumn>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UnderakesOrgnaizationDetailPage.propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func
}
UnderakesOrgnaizationDetailPage.defaultProps = {
  data: {},
  getData: () => {}
}
export default connect(state => ({
  data: state.failureDataList.importInfo
}), dispatch => ({
  getData: bindActionCreators(action.getImportInfo, dispatch)
}))(UnderakesOrgnaizationDetailPage)