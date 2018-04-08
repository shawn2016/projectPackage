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
          let realParams = Object.assign({}, this.props.searchInfo, { page: curIndex, rows: this.state.paginationConf.pageSize })
          this.props.getTableList(realParams)
        }
      },
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.setCurrentTigger) {
      this.pagination.setCurrentPage(1)
      this.props.setCurrentPageOne()
    }

    if (nextProps.tableList.body.pagenation) {
      this.setState({
        paginationConf: { ...this.state.paginationConf, currentPage: nextProps.tableList.body.pagenation.pageNo }
      })
    }
    console.log('检测 props 属性的改变', nextProps)
  }
  stateFilter = (state) => {
    switch (state) {
      case '000000':
        return '普通行为日志'
      case '100001':
        return '登录记录'
      case '200001':
        return '首页'
      case '300001':
        return '财务查询'
      case '300002':
        return '支付结算'
      case '400001':
        return '授信管理'
      case '500001':
        return '系统管理'
      case '600001':
        return '客户管理'
      case '700001':
        return '账务管理'
      case '800001':
        return '融资业务'
      case '900001':
        return '结算对账'
      default:
        return ''
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
  }
  // goDetail = (param) => {
  //   console.log(param)
  //   this.props.history.push({
  //     pathname: '/clientManage/clientManageDetailTwo',
  //     //state: { id: obj.id }
  //     state: { id: param }
  //   })
  // }
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
    let { body = {} } = this.props.tableList,
      { values = [] } = body,
      { pagenation = {} } = body,
      { itemCount = 10 } = pagenation
    if (values === null) values = []
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
          <div className="rob-row clearfix mlr0">
            <div className="column">
              <div className="rob-table-responsive">
                <Table containCheckbox={this.state.containCheckbox} striped={this.state.striped} hoverEffect checkboxType={this.state.checkboxType}>
                  <TableHeader>
                    <TableHeaderColumn> 时间</TableHeaderColumn>
                    <TableHeaderColumn> 操作人</TableHeaderColumn>
                    <TableHeaderColumn> 日志类型</TableHeaderColumn>
                    <TableHeaderColumn> 事件</TableHeaderColumn>
                  </TableHeader>
                  <TableBody>
                    {values.map((item, k) => (
                      <TableRow key={k}>
                        <TableRowColumn> {timeStamp(item.createTime, 3, 1)}</TableRowColumn>
                        <TableRowColumn> {item.createName}</TableRowColumn>
                        <TableRowColumn> {this.stateFilter(item.logtype)}</TableRowColumn>
                        <TableRowColumn> {item.contents};{item.respMsg}</TableRowColumn>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="qb-list-g__pagination clearfix">
                  <div className="rob-col-lg-24 qb-active-g__mb40 text-left">记录总计:{itemCount}笔</div>
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
  setCurrentTigger: state.SMSL_clientManage && state.SMSL_clientManage.SMSL_setCurrentTigger,
  searchInfo: state.SMSL_clientManage && state.SMSL_clientManage.SMSL_searchInfo,
  tableList: state.SMSL_clientManage && state.SMSL_clientManage.SMSL_tableList,
}), dispatch => ({
  updateSearchInfo: bindActionCreators(actions.SMSL_updateSearchInfo, dispatch),
  getTableList: bindActionCreators(actions.SMSL_getTableList, dispatch),
  setCurrentPageOne: bindActionCreators(actions.SMSL_setCurrentPageOne, dispatch),
}))(Info)