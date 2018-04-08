import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'react-robotUI/Table'
import Dialog from 'react-robotUI/dialog'
import Pagination from 'react-robotUI/Pagination'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import timeStamp from 'utils/timeStamp'
import { formatMoneyYuan } from 'utils/filterCommon'
import PropTypes from 'prop-types'
import * as actions from '../redux/actions'

class Info extends Component {
  constructor(props) {
    super(props)
    this.state = {
      containCheckbox: false,
      striped: true,
      hoverEffect: false,
      divide: false,
      checkboxType: 'default',
      dialogStatue: false,
      paginationConf: {
        type: 'default',
        pageSize: 10,
        maxSize: 8,
        allowJump: true,
        currentPage: 1,
        showPreAndNext: false,
        onChange: (curIndex) => {
          // 改变请求参数的当前页
          this.setState({ paginationConf: { ...this.state.paginationConf, currentPage: curIndex } })
          let realParams = Object.assign({}, this.props.searchInfo, { page: curIndex, rows: this.state.paginationConf.pageSize })
          this.props.getTableList(realParams)
        }
      },
    }
  }
  filter = (type, value) => {
    if (type === 'isCertCompany') {
      switch (value) {
        case '100':
          return '活动'
        case '999':
          return '删除'
        case '500':
          return '冻结'
        case '200':
          return '待复核'
        case '300':
          return '复核拒绝'
        case '400':
          return '待缴费'
        case '600':
          return '失效'
        case '700':
          return '代付款'
        case '800':
          return '缴费失败'
        default:
          return value
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.setCurrentTigger) {
      this.pagination.setCurrentPage(1)
      this.props.setCurrentPageOne()
    }
    if (nextProps.tableList && nextProps.tableList.body && nextProps.tableList.body.pagenation) {
      this.setState({
        paginationConf: { ...this.state.paginationConf, currentPage: nextProps.tableList.body.pagenation.pageNo }
      })
    }
  }
  static propTypes = {
    tableList: PropTypes.object,
    searchInfo: PropTypes.object,
    getTableList: PropTypes.func,
    updateSearchInfo: PropTypes.func,
    setCurrentPageOne: PropTypes.func,
    history: PropTypes.object,
    setCurrentTigger: PropTypes.bool,
  }
  static defaultProps = {
    tableList: {},
    searchInfo: {},
    getTableList: () => { },
    setCurrentPageOne: () => { },
    updateSearchInfo: () => { },
    history: {},
    setCurrentTigger: false
  }
  filter = (type, value) => {
    if (type === 'isCertCompany') {
      switch (value) {
        case '1':
          return '是'
        case '2':
          return '否'
        default:
          return value
      }
    }
    if (type === 'balance') {
      if (value) {
        return value / 100
      }
    }
    if (type === 'availableBalance') {
      if (value) {
        return value / 100
      }
    }
    if (type === 'disabledBalance') {
      if (value) {
        return value / 100
      }
    }
  }
  goDetail = (param) => {
    console.log(param)
    this.props.history.push({
      pathname: '/clientManage/clientManageDetailTwo',
      //state: { id: obj.id }
      state: { id: param }
    })
  }
  showDialog = () => {
    this.setState({
      dialogStatue: true
    })
  }
  closeDialog = (flag) => {
    console.log(flag)
    if (flag) {
      // this.props.deleteInfo()
    }
    this.setState({
      dialogStatue: false
    })
  }
  actions = [{
    label: '取消',
    className: 'rob-btn rob-btn-minor rob-btn-circle',
    state: false
  }, {
    label: '确定',
    className: 'rob-btn rob-btn-danger rob-btn-circle',
    state: true
  }]
  content = (
    <div className="rob-alert-content ">
      <span>确定要删除该条额度设置？</span>
    </div>
  )
  render() {
    let values = []
    let itemCount = 10
    if (this.props.tableList.body && this.props.tableList.body.values) {
      values = this.props.tableList.body.values
    }
    if (this.props.tableList.body && this.props.tableList.body.pagenation) {
      itemCount = this.props.tableList.body.pagenation.itemCount
    }
    // let { body = {} } = this.props.tableList,
    //   { values = [] } = body,
    //   { pagenation = {} } = body,
    //   { itemCount = 10 } = pagenation
    return (
      <div>
        <Dialog
          showCloseBtn
          showCover
          open={this.state.dialogStatue}
          onRequestClose={(flag) => { this.closeDialog(flag) }}
          title="提示"
          titleClassName="rob-alert-title rob-alert-title-color"
          content={this.content}
          actions={this.actions}
          actionClassName="rob-alert-button"
        />
        <div className="qb-list-g__table">
          <div className="rob-row clearfix">
            <div className="rob-col-lg-24 column">
              <div className="rob-table-responsive">
                <Table containCheckbox={this.state.containCheckbox} striped={this.state.striped} hoverEffect={this.state.hoverEffect} checkboxType={this.state.checkboxType}>
                  <TableHeader>
                    <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
                    <TableHeaderColumn> 日期</TableHeaderColumn>
                    <TableHeaderColumn> 余额(元)</TableHeaderColumn>
                    <TableHeaderColumn> 可用余额(元)</TableHeaderColumn>
                    <TableHeaderColumn> 冻结余额(元)</TableHeaderColumn>
                  </TableHeader>
                  <TableBody>
                    {values.map((item, k) => (
                      <TableRow key={k}>
                        <TableRowColumn className="text-center">{(this.props.tableList.body.pagenation.pageSize * (this.props.tableList.body.pagenation.pageNo - 1)) + k + 1}</TableRowColumn>
                        <TableRowColumn> {timeStamp(item.balanceTime, 3, 1)}</TableRowColumn>
                        <TableRowColumn> {formatMoneyYuan(item.balance)}</TableRowColumn>
                        <TableRowColumn> {formatMoneyYuan(item.availableBalance)}</TableRowColumn>
                        <TableRowColumn> {formatMoneyYuan(item.disabledBalance)}</TableRowColumn>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="qb-list-g__pagination clearfix">
                  <div className="rob-col-lg-24 column">
                    <Pagination
                      {...this.state.paginationConf}
                      dataCount={itemCount}
                      ref={(DOM) => this.pagination = DOM}
                    />
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

export default connect(state => ({
  setCurrentTigger: state.FBH_clientManage && state.FBH_clientManage.FBH_setCurrentTigger,
  searchInfo: state.FBH_clientManage && state.FBH_clientManage.FBH_searchInfo,
  tableList: state.FBH_clientManage && state.FBH_clientManage.FBH_tableList,
}), dispatch => ({
  updateSearchInfo: bindActionCreators(actions.FBH_updateSearchInfo, dispatch),
  getTableList: bindActionCreators(actions.FBH_getTableList, dispatch),
  setCurrentPageOne: bindActionCreators(actions.FBH_setCurrentPageOne, dispatch),
}))(Info)