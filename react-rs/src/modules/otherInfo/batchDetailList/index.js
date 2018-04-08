/*
批量经办查看明细列表
by. 刘鹏钢
2017-11-27
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
import Pagination from 'react-robotUI/Pagination'
import * as action from './redux/actions'
import { formatMoneyYuan } from '../../../utils/filterCommon'
import './redux/reducer'
class BatchHandleDetailPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      excelDetailCurrentPage: 1,
      dataList: [],
      dataType: ''
    }
  }
  model = ''
  componentWillMount() {
    if (sessionStorage.getItem('excelDetailState')) {
      let _currentId = JSON.parse(sessionStorage.getItem('excelDetailState')).type,
        _serialNo = JSON.parse(sessionStorage.getItem('excelDetailState')).serialNo
      this.model = JSON.parse(sessionStorage.getItem('excelDetailState')).model
      this.setState({ dataType: _currentId })
      this.props.getData({ data: { type: _currentId, serialNo: _serialNo }, model: this.model }).then((res) => {
        if (res.data.respCode === '000000') {
          let tempDataList
          if (res.data.body.values.length > 10) {
            tempDataList = res.data.body.values.slice(0, 10)
          } else {
            tempDataList = res.data.body.values
          }
          this.setState({ dataList: tempDataList })
        }
      })
    }
  }
  render() {
    let { dataList, dataType } = this.state,
      { data } = this.props
    return (
      <div>
        <div className="qb-panel-g clearfix qb-media-height">
          <div className="mtb10 text-overflow">
            <div className="rob-col-lg-24 text-left">{dataType === 20 ? '失败' : '成功'}总笔数：{data.totalCount || 0}笔</div>
            <div className="rob-col-lg-24 text-left">总金额（元）：{formatMoneyYuan(data.totalAmount)}</div>
          </div>
          <div className="qb-list-g qb-list-g--red">
            <div className="qb-list-g__table">
              <div className="rob-row clearfix">
                <div className="rob-col-lg-24 column">
                  <div className="rob-table-responsive">
                    <Table striped hoverEffect>
                      <TableHeader>
                        <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
                        <TableHeaderColumn> 收款方账户名称</TableHeaderColumn>
                        <TableHeaderColumn> 收款方银行账号</TableHeaderColumn>
                        <TableHeaderColumn> 开户银行</TableHeaderColumn>
                        {this.model === 'agency' ? <TableHeaderColumn> 金额（元）</TableHeaderColumn> : null}
                        <TableHeaderColumn> 所属省</TableHeaderColumn>
                        <TableHeaderColumn> 所属市</TableHeaderColumn>
                        <TableHeaderColumn> 支行名称</TableHeaderColumn>
                        {this.model === 'batch' ? <TableHeaderColumn> 金额（元）</TableHeaderColumn> : null}
                        {this.model === 'batch' ? <TableHeaderColumn> 用途</TableHeaderColumn> : null}
                        {this.model === 'batch' ? <TableHeaderColumn> 联系人姓名</TableHeaderColumn> : null}
                        {this.model === 'batch' ? <TableHeaderColumn> 联系人移动电话</TableHeaderColumn> : null}
                        {this.model === 'batch' ? <TableHeaderColumn> 联系人电子邮箱</TableHeaderColumn> : null}
                        {this.model === 'batch' ? <TableHeaderColumn> 摘要</TableHeaderColumn> : null}
                        {dataType === 20 ? <TableHeaderColumn> 备注</TableHeaderColumn> : null}
                      </TableHeader>
                      <TableBody>
                        {dataList.map((info, i) => (
                          <TableRow key={`detail${i + 1}`}>
                            <TableRowColumn className="text-center">{info.rowNum}</TableRowColumn>
                            <TableRowColumn> {info.receiverAccountName}</TableRowColumn>
                            <TableRowColumn> {info.receiverAccountNo}</TableRowColumn>
                            <TableRowColumn> {info.receiverSettleBankName}</TableRowColumn>
                            {this.model === 'agency' ? <TableRowColumn> {info.amount ? formatMoneyYuan(info.amount) : ''}</TableRowColumn> : null}
                            <TableRowColumn> {info.receiverProvince}</TableRowColumn>
                            <TableRowColumn> {info.receiverCity}</TableRowColumn>
                            <TableRowColumn> {info.receiverBankName}</TableRowColumn>
                            {this.model === 'batch' ? <TableRowColumn> {info.amount ? formatMoneyYuan(info.amount) : ''}</TableRowColumn> : null}
                            {this.model === 'batch' ? <TableRowColumn> {info.purpose}</TableRowColumn> : null}
                            {this.model === 'batch' ? <TableRowColumn> {info.recName}</TableRowColumn> : null}
                            {this.model === 'batch' ? <TableRowColumn> {info.recTel}</TableRowColumn> : null}
                            {this.model === 'batch' ? <TableRowColumn> {info.mail}</TableRowColumn> : null}
                            {this.model === 'batch' ? <TableRowColumn> {info.summary}</TableRowColumn> : null}
                            {dataType === 20 ? <TableRowColumn> {info.remark}</TableRowColumn> : null}
                          </TableRow>
                        ))}
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
                    dataCount={this.props.data && this.props.data.totalCount ? this.props.data.totalCount : 0}
                    currentPage={this.state.excelDetailCurrentPage}
                    onChange={pageNum => {
                      this.setState({
                        excelDetailCurrentPage: pageNum
                      }, () => {
                        if (pageNum === '1') {
                          this.setState({ dataList: data.values.slice(0, 10) })
                        } else {
                          this.setState({ dataList: data.values.slice((pageNum - 1) * 10, pageNum * 10) })
                        }
                      })
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

BatchHandleDetailPage.propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func
}
BatchHandleDetailPage.defaultProps = {
  data: {},
  getData: () => {}
}
export default connect(state => ({
  data: state.batchHandleExcelDetail && state.batchHandleExcelDetail.importInfo
}), dispatch => ({
  getData: bindActionCreators(action.getImportInfo, dispatch)
}))(BatchHandleDetailPage)