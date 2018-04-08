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
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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
      pagination: false,
      checkboxType: 'default',
      dialogStatue: false
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log('检测 props 属性的改变', nextProps)
  // }
  static propTypes = {
    tableList: PropTypes.object,
    getTableList: PropTypes.func,
    history: PropTypes.object,
    deleteInfo: PropTypes.func,
  }
  static defaultProps = {
    tableList: {},
    getTableList: () => { },
    history: {},
    deleteInfo: () => { }
  }
  filter = (type, value) => {
    if (type === 'bussinessType') {
      switch (value) {
        case null:
          return '待复核'
        case '1':
          return '支付结算'
        case '2':
          return '代发'
        default:
          return value
      }
    }
    if (type === 'status') {
      switch (value) {
        case '300':
          return '待复核'
        case '100':
          return '复核通过'
        case '400':
          return '复核拒绝'
        default:
          return value
      }
    }
  }
  goCheck = (obj) => {
    console.log(obj)
    this.props.history.push({
      pathname: '/systemManage/check',
      state: { id: obj.id }
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
      this.props.deleteInfo()
    }
    this.setState({
      dialogStatue: false
    })
  }
  actions = [{
    label: '取消',
    className: 'rob-btn-minor rob-btn-circle',
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
    let { body = [] } = this.props.tableList
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
                <Table containCheckbox={this.state.containCheckbox} striped={this.state.striped} hoverEffect={this.state.hoverEffect} pagination={this.state.pagination} checkboxType={this.state.checkboxType}>
                  <TableHeader>
                    <TableHeaderColumn> 序号</TableHeaderColumn>
                    <TableHeaderColumn> 账号名称</TableHeaderColumn>
                    <TableHeaderColumn> 限额类型</TableHeaderColumn>
                    <TableHeaderColumn> 限额（元）</TableHeaderColumn>
                    <TableHeaderColumn> 说明</TableHeaderColumn>
                    <TableHeaderColumn> 业务模式</TableHeaderColumn>
                    <TableHeaderColumn> 摘要</TableHeaderColumn>
                    <TableHeaderColumn> 状态</TableHeaderColumn>
                    <TableHeaderColumn> 操作</TableHeaderColumn>
                  </TableHeader>
                  <TableBody>
                    {body.map((item, k) => (
                      <TableRow key={k}>
                        <TableRowColumn> {k + 1}</TableRowColumn>
                        <TableRowColumn> {item.accountName}</TableRowColumn>
                        <TableRowColumn> {item.limitType}</TableRowColumn>
                        <TableRowColumn> {item.limitAmount}</TableRowColumn>
                        <TableRowColumn> {item.createDesc}</TableRowColumn>
                        <TableRowColumn> {this.filter('bussinessType', item.bizType)}</TableRowColumn>
                        <TableRowColumn> {item.summary}</TableRowColumn>
                        <TableRowColumn> {this.filter('status', item.status)}</TableRowColumn>
                        <TableRowColumn>{item.status === '300' ? <a className="qb-table-g__handle" onClick={() => { this.goCheck(item) }}>修改</a> : <a className="qb-table-g__handle" onClick={this.showDialog} >删除</a>} </TableRowColumn>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  tableList: state.quotaSettingManage && state.quotaSettingManage.tableList,
  searchInfo: state.quotaSettingManage && state.quotaSettingManage.searchInfo
}), dispatch => ({
  getTableList: bindActionCreators(actions.getTableList, dispatch),
  deleteInfo: bindActionCreators(actions.deleteInfo, dispatch)
}))(Info)