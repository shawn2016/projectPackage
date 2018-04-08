/**
 * 收款方信息
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import QBSelect from 'components/QBSelectSimply'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
 } from 'react-robotUI/Table'
import Pagination from 'react-robotUI/Pagination'
import { formatMoneyYuan, grossReceiverType, formatDate } from 'utils/filterCommon'
import PropTypes from 'prop-types'
import * as actions from '../redux/action'
import '../redux/reducer'
let typeList = [
  { text: '全部', value: '' },
  { text: '成功', value: [800040] },
  { text: '失败 ', value: [800049, 800019] }
]
class ReceiveInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      conf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false,
        previousLabel: '',
        onChange: (index) => {
          this.setState({
            conf: { ...this.state.conf, currentPage: index }
          })
          //let param = Object.assign({}, this.props.queryInfo, { id: this.props.params.id })
          let param = Object.assign({}, this.props.queryInfo, { page: index }, { serialNo: this.props.id }, { rows: 10 })
          this.props.getOrderList(param)
        }
      },
      dataCount: 0,
      data: []
    }
  }
  componentWillMount() {

  }
  componentWillUnmount = () => {
    this.clean()
  }
  clean = () => {
    this.props.updateSearchInfo({
      status: null
    })
  }
  componentWillReceiveProps(nextProps) {
    // 设置分页
    if (nextProps.isReserCurrentPage === 1) {
      this.pagination.setCurrentPage(1)
      this.props.resetCurrentPage()
    }
    if (nextProps.dataObj) {
      this.setState({
        dataCount: nextProps.dataObj.pagenation ? nextProps.dataObj.pagenation.itemCount : 0,
        conf: { ...this.state.conf, currentPage: nextProps.dataObj.pagenation ? nextProps.dataObj.pagenation.pageNo : 0 }
      })
    }
  }
  search = (item) => {
    this.props.updateSearchInfo({
      status: item.value
    })
    let param = Object.assign({}, this.props.queryInfo, { status: item.value }, { serialNo: this.props.id }, { page: 1 }, { rows: 10 })
    this.props.getOrderList(param)
  }
  static propTypes = {
    id: PropTypes.number,
    params: PropTypes.object.isRequired,
    updateSearchInfo: PropTypes.func,
    getOrderList: PropTypes.func,
    resetCurrentPage: PropTypes.func,
    isReserCurrentPage: PropTypes.number,
  }
  static defaultProps = {
    id: 0,
    params: {},
    queryInfo: {},
    updateSearchInfo: () => { },
    getOrderList: () => { },
    resetCurrentPage: () => { },
    isReserCurrentPage: 0,
  }
  render() {
    let mapArray = []
    if (this.props.dataObj && this.props.dataObj.values) {
      mapArray = this.props.dataObj.values
    }
    //let orderInfo = this.props.orderInfo
    return (
      <div className="clearfix qb-media-height">
        {/* 数据列表*/}
        <div className="qb-list-g">
          {/* 表格*/}
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
                      {this.props.params.from === 'searchBatchHandle' ? <TableHeaderColumn> 处理时间</TableHeaderColumn> : null}
                      {this.props.params.from === 'searchBatchHandle' ? <TableHeaderColumn style={{ height: '100px' }}>
                        <QBSelect
                          label=""
                          type="default"
                          labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                          inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                          errDirection="bottom"
                          isTestRule={this.state.isTestRule}
                          options={typeList}
                          ref={ref => this.payerAccountNo = ref}
                          handleSelect={item => {
                            this.search(item)
                          }}
                        />
                      </TableHeaderColumn> : null}
                      {this.props.params.from === 'searchBatchHandle' ? <TableHeaderColumn> 备注</TableHeaderColumn> : null}
                    </TableHeader>
                    <TableBody>
                      {
                        mapArray ? mapArray.map((item, index) => (
                          <TableRow key={`info${index + 1}`}>
                            <TableRowColumn className="text-center"> {(this.props.dataObj.pagenation.pageSize * (this.props.dataObj.pagenation.pageNo - 1)) + index + 1}</TableRowColumn>
                            <TableRowColumn> {item.receiverAccountName}</TableRowColumn>
                            <TableRowColumn> {item.receiverAccountNo}</TableRowColumn>
                            <TableRowColumn> {item.receiverSettleBankName}</TableRowColumn>
                            <TableRowColumn> {item.receiverProvince}</TableRowColumn>
                            <TableRowColumn> {item.receiverCity}</TableRowColumn>
                            <TableRowColumn> {item.receiverBankName}</TableRowColumn>
                            <TableRowColumn> {formatMoneyYuan(item.amount)}</TableRowColumn>
                            <TableRowColumn> {item.purpose}</TableRowColumn>
                            <TableRowColumn> {item.recName}</TableRowColumn>
                            <TableRowColumn> {item.recTel}</TableRowColumn>
                            <TableRowColumn> {item.mail}</TableRowColumn>
                            <TableRowColumn> {item.summary}</TableRowColumn>
                            {this.props.params.from === 'searchBatchHandle' ? <TableRowColumn> {formatDate(item.handleTime)}</TableRowColumn> : null}
                            {this.props.params.from === 'searchBatchHandle' ? <TableRowColumn> {grossReceiverType(item.status)}</TableRowColumn> : null}
                            {this.props.params.from === 'searchBatchHandle' ? <TableRowColumn> {item.remark}</TableRowColumn> : null}
                          </TableRow>
                        )) : null
                      }
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          {/* 分页*/}
          <div className="qb-list-g__pagination clearfix">
            <div className="rob-row clearfix">
              <div className="rob-col-lg-24 column">
                <Pagination
                  {...this.state.conf}
                  dataCount={this.state.dataCount}
                  ref={(DOM) => this.pagination = DOM}
                />
              </div>
            </div>
          </div>
        </div>
        {/* 暂无数据*/}
      </div>
    )
  }
}

ReceiveInfo.propTypes = {
  //orderInfo: PropTypes.object
  dataObj: PropTypes.object,
  queryInfo: PropTypes.object,
}
ReceiveInfo.defaultProps = {
  //orderInfo: {},
  dataObj: {},
  queryInfo: {},
}

export default connect(state => ({
  dataObj: state.GSBHD_singleHandleDetails && state.GSBHD_singleHandleDetails.GSBHD_orderList,
  queryInfo: state.GSBHD_singleHandleDetails && state.GSBHD_singleHandleDetails.GSBSH_queryInfo,
  isReserCurrentPage: state.GSBHD_singleHandleDetails && state.GSBHD_singleHandleDetails.GSBHD_isReserCurrentPage
}), dispatch => ({
  updateSearchInfo: bindActionCreators(actions.GSBHD_updateSearchInfo, dispatch),
  getOrderList: bindActionCreators(actions.GSBHD_getOrderList, dispatch),
  resetCurrentPage: bindActionCreators(actions.GSBHD_resetCurrentPage, dispatch),
}))(ReceiveInfo)