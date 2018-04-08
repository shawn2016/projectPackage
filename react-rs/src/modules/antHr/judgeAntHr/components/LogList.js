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
import getRequest from 'utils/getRequest'
import Pagination from 'react-robotUI/Pagination'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import timeStamp from 'utils/timeStamp'
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
  delUser = (t, type) => {
    if (type === 'one') {
      if (t) {
        this.handleOpen('delUser', { id: t, type: 'delUser' })
      }
    }
  }
  handleOpen = (type, obj) => {
    this.dialogShow[type](obj)
  }
  dialogShow = {
    delUser: (obj) => {
      this.content = (
        <div className="rob-alert-content ">
          <span>此笔交易正在受理中，是否确认撤销？</span>
        </div>
      )
      this.actions = ([{
        label: '取消',
        className: 'rob-btn-minor rob-btn rob-btn-circle'
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: obj
      }])
      this.setState({ d11: true })
    },
    resetPassword: () => {
      /* this.content = (
       <div className="rob-alert-content ">
       <span>删除成功</span>
       </div>
       )*/
      this.setState({ d11: false })
      this.actions = ([{
        label: '确定',
        className: 'rob-btn  rob-btn-danger rob-btn-circle',
        state: 'refresh'
      }])
      this.setState({ d6: true })
    },
  }
  handleClose = (state, type) => {
    if (!state) {
      this.setState({ [type]: false })
      //this.state.dialogStatue=false
    }
    if (state && state.type === 'delUser') {
      this.save(state)
      this.setState({ [type]: false })
    } else if (state && state === 'refresh') {
      this.setState({ [type]: false })
      // this.props.getOrderList(this.props.queryInfo)
      this.props.getTableList(this.props.searchInfo)
      //location.reload()
    }
  }
  save = (idArray) => {
    (async () => {
      /*this.auditOpinion = ''
      if (idArray.id) {
        for (let i = 0; i < idsList.length; i++) {
          if (idsList[i] === idArray.id) {
            idsList.splice(i, 1)
          }
        }
      }
      let idParam = []*/
      let idParam = []
      if (idArray.id) {
        idParam = [idArray.id]
      }/*else {
       idParam = idsList
       }*/
      let data = await getRequest({
        path: '/payment/single/revokeOrder',
        method: 'POST',
        param: {
          /*auditOpinion: this.auditOpinion,
          description: this.remark,*/
          ids: idParam
        }
      })
      if (data.data.respCode === '000000') {
        this.resetPasswordMsg = data.data.respMsg
        this.handleOpen('resetPassword')
      }
      // this.props.getOrderList(this.props.queryInfo)
    })()
  }
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
                    <TableHeaderColumn> 订单编号</TableHeaderColumn>
                    <TableHeaderColumn> 金额</TableHeaderColumn>
                    <TableHeaderColumn> 类型</TableHeaderColumn>
                    <TableHeaderColumn> 状态</TableHeaderColumn>
                    <TableHeaderColumn> 操作</TableHeaderColumn>
                  </TableHeader>
                  <TableBody>
                    {values.map((item, k) => (
                      <TableRow key={k}>
                        <TableRowColumn> 2017-10-12 10:23 预计2017-10-13产生份额，10-14收益到账</TableRowColumn>
                        <TableRowColumn> {item.createName}</TableRowColumn>
                        <TableRowColumn> {this.stateFilter(item.logtype)}</TableRowColumn>
                        <TableRowColumn> {this.stateFilter(item.logtype)}</TableRowColumn>
                        <TableRowColumn> {this.stateFilter(item.logtype)}</TableRowColumn>
                        <TableRowColumn>
                          <a
                            className="qb-table-g__handle"
                            onClick={() => { this.delUser(1, 'one') }}
                          >
                            撤销
                          </a>
                        </TableRowColumn>
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
                <Dialog
                  //showCloseBtn
                  showCover
                  open={this.state.d6}
                  onRequestClose={(name) => this.handleClose(name, 'd6')}
                  content={{ content: this.resetPasswordMsg, icon: 'bg_icon qb-icon-active' }}
                  actions={this.actions}
                  actionClassName="rob-alert-button-color"
                />
                <Dialog
                  showCloseBtn
                  showCover
                  open={this.state.d11}
                  onRequestClose={(name) => this.handleClose(name, 'd11')}
                  content={this.content}
                  actions={this.actions}
                  actionClassName="rob-alert-button-color"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  setCurrentTigger: state.EFTR_clientManage && state.EFTR_clientManage.SMSL_setCurrentTigger,
  searchInfo: state.EFTR_clientManage && state.EFTR_clientManage.SMSL_searchInfo,
  tableList: state.EFTR_clientManage && state.EFTR_clientManage.SMSL_tableList,
}), dispatch => ({
  updateSearchInfo: bindActionCreators(actions.EFTR_updateSearchInfo, dispatch),
  getTableList: bindActionCreators(actions.EFTR_getTableList, dispatch),
  setCurrentPageOne: bindActionCreators(actions.EFTR_setCurrentPageOne, dispatch),
}))(Info)