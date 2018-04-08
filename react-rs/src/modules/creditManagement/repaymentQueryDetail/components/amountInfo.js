import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'react-robotUI/Table'
import { formatMoneyYuan } from 'utils/filterCommon'

class AmountInfo extends PureComponent {
  render() {
    const info = this.props.data
    return (
      <div className="qb-panel-g clearfix">
        <div className="qb-column-header-g">
          还款总计
        </div>
        <div className="qb-list-g">
          <div className="qb-list-g__table">
            <div className="rob-row clearfix">
              <div className="rob-col-lg-24 column">
                <div className="rob-table-responsive">
                  <Table striped hoverEffect checkboxType={'default'}>
                    <TableHeader>
                      <TableHeaderColumn> 计息方式</TableHeaderColumn>
                      <TableHeaderColumn> 贷款期限(天)</TableHeaderColumn>
                      <TableHeaderColumn> 待还本金(元)</TableHeaderColumn>
                      <TableHeaderColumn> 待还手续费(元)</TableHeaderColumn>
                      <TableHeaderColumn> 已还本金(元)</TableHeaderColumn>
                      <TableHeaderColumn> 已还手续费(元)</TableHeaderColumn>
                      <TableHeaderColumn> 逾期天数</TableHeaderColumn>
                      <TableHeaderColumn> 已还期数</TableHeaderColumn>
                      <TableHeaderColumn> 未还期数</TableHeaderColumn>
                      <TableHeaderColumn> 逾期笔数</TableHeaderColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableRowColumn> {info.repayType}</TableRowColumn>
                        <TableRowColumn> {info.loanDays}</TableRowColumn>
                        <TableRowColumn> {info.unrepayPrinciple ? formatMoneyYuan(info.unrepayPrinciple) : '0.00'}</TableRowColumn>
                        <TableRowColumn> {info.unrepayInterest ? formatMoneyYuan(info.unrepayInterest) : '0.00'}</TableRowColumn>
                        <TableRowColumn> {info.repayedPrinciple ? formatMoneyYuan(info.repayedPrinciple) : '0.00'}</TableRowColumn>
                        <TableRowColumn> {info.repayedInterest ? formatMoneyYuan(info.repayedInterest) : '0.00'}</TableRowColumn>
                        <TableRowColumn> {info.overdueDays}</TableRowColumn>
                        <TableRowColumn> {info.repayedPeriod}</TableRowColumn>
                        <TableRowColumn> {info.unrepayPeriod}</TableRowColumn>
                        <TableRowColumn> {info.overdueNum}</TableRowColumn>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
AmountInfo.propTypes = {
  data: PropTypes.object
}
AmountInfo.defaultProps = {
  data: {}
}

export default AmountInfo