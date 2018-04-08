/**
 * 收款方信息
 */
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
import Pagination from 'react-robotUI/Pagination'
import { formatMoneyYuan } from 'utils/filterCommon'
class ReceiveInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      excelDetailCurrentPage: 1,
      dataList: []
    }
  }
  componentWillReceiveProps(nextProps) {
    let tempDataList
    if (nextProps.data && nextProps.data.values) {
      if (nextProps.data.values.length > 10) {
        tempDataList = nextProps.data.values.slice(0, 10)
      } else {
        tempDataList = nextProps.data.values
      }
      this.setState({ dataList: tempDataList })
    }
  }
  render() {
    let { data = {} } = this.props,
      { values = [] } = data
    return (
      <div className="clearfix qb-media-height">
        <div className="qb-list-g">
          <div className="qb-list-g__table">
            <div className="rob-row clearfix ">
              <div className="rob-col-lg-24 column">
                <div className="rob-table-responsive">
                  <Table striped hoverEffect checkboxType={'default'}>
                    <TableHeader>
                      <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
                      <TableHeaderColumn> 收款方账户名称</TableHeaderColumn>
                      <TableHeaderColumn> 收款方银行账号</TableHeaderColumn>
                      <TableHeaderColumn> 开户银行</TableHeaderColumn>
                      <TableHeaderColumn> 所属省</TableHeaderColumn>
                      <TableHeaderColumn> 所属市</TableHeaderColumn>
                      <TableHeaderColumn> 支行名称</TableHeaderColumn>
                      <TableHeaderColumn> 金额（元）</TableHeaderColumn>
                      <TableHeaderColumn> 用途</TableHeaderColumn>
                      <TableHeaderColumn> 联系人姓名</TableHeaderColumn>
                      <TableHeaderColumn> 联系人移动电话</TableHeaderColumn>
                      <TableHeaderColumn> 联系人电子邮件</TableHeaderColumn>
                      <TableHeaderColumn> 摘要</TableHeaderColumn>
                    </TableHeader>
                    <TableBody>
                      {
                        this.state.dataList.map((item, index) => (
                          <TableRow key={`info${index + 1}`}>
                            <TableRowColumn className="text-center"> {((this.state.excelDetailCurrentPage - 1) * 10) + index + 1}</TableRowColumn>
                            <TableRowColumn> {item.receiverAccountName}</TableRowColumn>
                            <TableRowColumn> {item.receiverAccountNo}</TableRowColumn>
                            <TableRowColumn> {item.receiverBankName}</TableRowColumn>
                            <TableRowColumn> {item.receiverProvince}</TableRowColumn>
                            <TableRowColumn> {item.receiverCity}</TableRowColumn>
                            <TableRowColumn> {item.receiverSettleBankName}</TableRowColumn>
                            <TableRowColumn> {formatMoneyYuan(item.amount)}</TableRowColumn>
                            <TableRowColumn> {item.purpose}</TableRowColumn>
                            <TableRowColumn> {item.recName}</TableRowColumn>
                            <TableRowColumn> {item.recTel}</TableRowColumn>
                            <TableRowColumn> {item.mail}</TableRowColumn>
                            <TableRowColumn> {item.summary}</TableRowColumn>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          <div className="qb-list-g__pagination clearfix">
            <div className="rob-row clearfix">
              <div className="rob-col-lg-24 column">
                <Pagination
                  dataCount={values.length ? values.length : 0}
                  currentPage={this.state.excelDetailCurrentPage}
                  onChange={pageNum => {
                    this.setState({
                      excelDetailCurrentPage: pageNum
                    }, () => {
                      if (pageNum === '1') {
                        this.setState({ dataList: values.slice(0, 10) })
                      } else {
                        this.setState({ dataList: values.slice((pageNum - 1) * 10, pageNum * 10) })
                      }
                    })
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReceiveInfo.propTypes = {
  data: PropTypes.object
}
ReceiveInfo.defaultProps = {
  data: {}
}

export default ReceiveInfo