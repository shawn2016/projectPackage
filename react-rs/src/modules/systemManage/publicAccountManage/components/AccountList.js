/* eslint-disable */
import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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
import { publicAccountStatusFilter, timestampFormat } from 'utils/filterCommon'
import * as action from '../redux/actions'
import '../redux/reducer'
class AccountList extends PureComponent {
  constructor(props) {
    super(props)
    this.resetPasswordMsg = ''
    this.state = {
      conf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false,
        previousLabel: '',
        onChange: (currentPage) => {
          this.setState({
            conf: { ...this.state.conf, currentPage }
          })
          let param = {
            page: currentPage,
            rows: 10
          }
          this.props.getData(param)
        }
      },
      data: [],
      delId: null, // 需要删除的id
      power: false,
      power1: false,
      content: null,
      actions: null,
      showCloseBtn: true
    }
  }
  static propTypes = {
    AccountListData: PropTypes.array,
    history: PropTypes.object,
    data: PropTypes.object,
    getData: PropTypes.func,
    delAccount: PropTypes.func,
    payTheFees: PropTypes.func,
  }
  static defaultProps = {
    AccountListData: [],
    history: {},
    data: {},
    getData: () => { },
    delAccount: () => { },
    payTheFees: () => { },
  }
  componentWillMount() {
    let param1 = {
      page: 1,
      rows: 10
    }
    this.props.getData(param1)
  }
  componentWillReceiveProps() {
  }
  /* 修改对公账户 */
  editPublicAccount = (t) => {
    this.props.history.push({
      pathname: '/systemManage/publicAccountDetail',
      state: { id: t.id, no: t.accountNo }
    })
  }
  // 缴费
  payTheFees = (num) => {
    this.props.payTheFees({
      accountNo: num
    }).then((res) => {
      if (res.data.respCode === '000000') {
        if (res.data.body && res.data.body.formFile) {
          let formFile = res.data.body.formFile
          document.getElementById('submit_dom').innerHTML = formFile.substr(0, formFile.length - 7) + '<input type="submit" hidden id="submit_button" value="Submit"></form>'
          document.getElementById('submit_button').click()
        }
        this.content = '您的入金操作已完成'
        this.setState({
          power1: true,
          showCloseBtn: false,
          content: (
            <div className="rob-alert-content ">
              <span>{res.data.respMsg}</span>
            </div>
          ),
          actions: [{
            label: '确定',
            className: 'rob-btn rob-btn-danger rob-btn-circle',
            state: true,
          }]
        })
      }
    })
  }
  //打开删除弹框
  openDialog = (id) => {
    this.setState({
      power: true,
      delId: id,
      content: (
        <div className="rob-alert-content ">
          <span>确定要删除对公账户吗？</span>
        </div>
      ),
      actions: [{
        label: '取消',
        className: 'rob-btn rob-btn-minor rob-btn-circle',
        state: false,
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: true,
      }]
    })
  }
  // close 删除弹框
  handleClose = (state) => {
    if (state) {
      this.setState({
        power: false
      }, () => this.props.delAccount().then(res => {
        if (res.data.respCode === '000000') {
          this.setState({
            showCloseBtn: false,
            power1: true,
            content: (
              <div className="rob-alert-content">
                <i className="bg_icon qb-icon-active" />
                <div className="">
                  <div>{res.data.respMsg}</div>
                </div>
              </div>),
            actions: [{
              label: '确定',
              className: 'rob-btn rob-btn-danger rob-btn-circle',
              state: 'del',
            }]
          }, () => {
            this.props.getData({
              page: 1,
              rows: 10
            })
          })
        }
      }))
    } else {
      this.setState({
        power: false
      })
    }
  }
  handleCloses1 = (state) => {
    if (!state) {
      this.setState({
        power1: false
      })

    } else if (state === 'del') {
      this.props.getData({
        page: 1,
        rows: 10
      })
      this.setState({
        power1: false
      })
    } else {
      this.setState({
        power1: false
      })
      this.props.history.push('/home/depositlist')
    }
  }
  render() {
    let itemCount = 0
    if (this.props.data.pamAccountListData.pagenation && this.props.data.pamAccountListData.pagenation.itemCount) {
      let { pagenation = {} } = this.props.data.pamAccountListData
      itemCount = pagenation.itemCount
    }
    return (
      <div>
        <Dialog
          titleClassName="rob-alert-title rob-alert-title-color"
          showCloseBtn
          showCover
          open={this.state.power}
          content={this.state.content}
          actions={this.state.actions}
          actionClassName="rob-alert-button rob-alert-button-color"
          onRequestClose={state => this.handleClose(state)}
        />
        <Dialog
          showCloseBtn={this.state.showCloseBtn}
          showCover
          title={this.state.alertTitle}
          open={this.state.power1}
          content={this.state.content}
          actions={this.state.actions}
          actionClassName="rob-alert-button-color rob-alert-button-45"
          onRequestClose={state => this.handleCloses1(state)}
        />
        <div id="submit_dom" />
        <Table striped hoverEffect >
          <TableHeader>
            <TableHeaderColumn> 序号</TableHeaderColumn>
            <TableHeaderColumn> 创建日期</TableHeaderColumn>
            <TableHeaderColumn> 账户名称</TableHeaderColumn>
            <TableHeaderColumn> 对公账户</TableHeaderColumn>
            <TableHeaderColumn> 开户行</TableHeaderColumn>
            <TableHeaderColumn> 开户地</TableHeaderColumn>
            <TableHeaderColumn> 开户支行</TableHeaderColumn>
            <TableHeaderColumn> 银联号</TableHeaderColumn>
            <TableHeaderColumn> 状态</TableHeaderColumn>
            <TableHeaderColumn> 操作</TableHeaderColumn>
          </TableHeader>
          <TableBody>
            {this.props.data.pamAccountListData && this.props.data.pamAccountListData.values ? this.props.data.pamAccountListData.values.map((user, k) => (
              <TableRow key={k}>
                <TableRowColumn className="text-center"> {(this.state.conf.pageSize * (this.state.conf.currentPage - 1)) + k + 1}</TableRowColumn>
                <TableRowColumn> {timestampFormat(user.createTime, 3, 1)}</TableRowColumn>
                <TableRowColumn title={user.accountName}> {user.accountName}</TableRowColumn>
                <TableRowColumn> {user.accountNo}</TableRowColumn>
                <TableRowColumn title={user.settleBankName}> {user.settleBankName}</TableRowColumn>
                <TableRowColumn> {user.accountCity}</TableRowColumn>
                <TableRowColumn title={user.bankName}> {user.bankName}</TableRowColumn>
                <TableRowColumn> {user.bankNo}</TableRowColumn>
                <TableRowColumn> {publicAccountStatusFilter(user.status)}</TableRowColumn>
                <TableRowColumn>
                  {
                    (Number(user.status) === 300 || Number(user.status) === 400 || Number(user.status) === 800) ? (<span><a className="qb-table-g__handle" onClick={this.editPublicAccount.bind(this, user)} >修改</a>
                    </span>) : null
                  }
                  {
                    (Number(user.status) === 300) ? (<span><a className="qb-table-g__handle" onClick={this.openDialog.bind(this, user.id)} >删除</a>
                    </span>) : null
                  }
                  {
                    (Number(user.status) === 400 || Number(user.status) === 700 || Number(user.status) === 800) ? (<a className="qb-table-g__handle" onClick={this.payTheFees.bind(this, user.accountNo)} >缴费</a>) : null
                  }
                </TableRowColumn>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
        <div className="qb-list-g__pagination clearfix">
          <div className="rob-row clearfix">
            <div className="rob-col-lg-24 column">
              <Pagination {...this.state.conf} dataCount={itemCount} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  data: state.pamAccountListDataQuery
}), dispatch => ({
  getData: bindActionCreators(action.pamgetData, dispatch),
  delAccount: bindActionCreators(action.pamdelAccount, dispatch),
  payTheFees: bindActionCreators(action.pampayTheFees, dispatch),
}))(AccountList)
