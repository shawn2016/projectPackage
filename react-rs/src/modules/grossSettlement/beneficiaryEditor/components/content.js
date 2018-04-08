import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'react-robotUI/Table'
import Pagination from 'react-robotUI/Pagination'
import Dialog from 'react-robotUI/dialog'
import { formatDay } from 'utils/filterCommon'
import * as action from '../redux/actions'
import '../redux/reducer'

class Content extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      delDialog: false,
      alertDialog: false,
      stateMsg: '',
      orderId: null,
      showLoading: false,
      PaginationConf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        dataCount: 0,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false,
        onChange: (currentPage) => {
          this.props.beneficiaryEditorSearch()
          this.setState({ PaginationConf: { ...this.state.PaginationConf, currentPage } })
          let params = this.props.data.beneficiaryEditorSearch
          params.page = currentPage
          params.rows = this.state.PaginationConf.pageSize
          this.props.getBeneficiaryEditorData(params)
        }
      }
    }
  }
  /* 初始化数据 */
  componentDidMount() {
    this.props.getBeneficiaryEditorData()
  }
  /* 获取数据后，设置dataCount */
  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.beneficiaryEditorData && nextProps.data.beneficiaryEditorData.body && nextProps.data.beneficiaryEditorData.body.pagenation) {
      let _pageParam = nextProps.data.beneficiaryEditorData.body.pagenation
      this.setState({ PaginationConf: { ...this.state.PaginationConf, dataCount: _pageParam.itemCount, currentPage: _pageParam.pageNo } })
    }
  }
  /* 删除收款方点击事件 */
  delBeneficiaryEditor = (id) => {
    this.setState({ orderId: id, delDialog: true })
  }
  /* 关闭弹出框 */
  dialogClose = (state) => {
    if (!state) {
      this.setState({ delDialog: false })
      this.setState({ alertDialog: false })
    } else {
      this.setState({ delDialog: false })
      this.props.delBeneficiaryEditorData({ id: this.state.orderId }).then(() => {
        this.setState({ stateMsg: '删除成功！', alertType: 'bg_icon qb-icon-success', alertDialog: true })
        this.props.getBeneficiaryEditorData()
      })
    }
  }
  render() {
    const pagination = this.state.PaginationConf
    const delActions = [{
      label: '取消',
      className: 'rob-btn rob-btn-minor rob-btn-circle',
      state: false
    }, {
      label: '确定',
      className: 'rob-btn rob-btn-danger rob-btn-circle',
      state: true
    }]
    let values = []
    if (this.props.data && this.props.data.beneficiaryEditorData && this.props.data.beneficiaryEditorData.body && this.props.data.beneficiaryEditorData.body.values) {
      values = this.props.data.beneficiaryEditorData.body.values
    }
    return (
      <div className="qb-panel-g clearfix qb-media-height">
        <div className="qb-list-g">
          <div className="qb-list-g__table">
            <div className="rob-row clearfix mlr0">
              <div className="column">
                <div className="rob-table-responsive">
                  <Table striped hoverEffect checkboxType={'default'}>
                    <TableHeader>
                      <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
                      <TableHeaderColumn> 创建日期</TableHeaderColumn>
                      <TableHeaderColumn> 收款方编号</TableHeaderColumn>
                      <TableHeaderColumn> 收款方名称</TableHeaderColumn>
                      <TableHeaderColumn> 收款方银行账号</TableHeaderColumn>
                      <TableHeaderColumn> 开户银行</TableHeaderColumn>
                      <TableHeaderColumn> 操作</TableHeaderColumn>
                    </TableHeader>
                    <TableBody>
                      {
                        values.map((item, i) => (
                          <TableRow key={i}>
                            <TableRowColumn className="text-center">{(pagination.pageSize * (pagination.currentPage - 1)) + i + 1}</TableRowColumn>
                            <TableRowColumn> {formatDay(item.createTime)}</TableRowColumn>
                            <TableRowColumn> {item.receiverNo}</TableRowColumn>
                            <TableRowColumn title={item.recAccountName}> {item.recAccountName}</TableRowColumn>
                            <TableRowColumn> {item.recAcctNo}</TableRowColumn>
                            <TableRowColumn title={item.recBankName}> {item.recBankName}</TableRowColumn>
                            <TableRowColumn>
                              <Link to={{ pathname: '/grossSettlement/beneficiaryEditorDetail', state: { id: item.id } }} className="qb-table-g__handle">详情</Link>
                              <Link to={{ pathname: '/grossSettlement/beneficiaryEditorAdd', state: { id: item.id } }} className="qb-table-g__handle">修改</Link>
                              <a href="javascript:void(0)" onClick={() => this.delBeneficiaryEditor(item.id)} className="qb-table-g__handle">删除</a>
                            </TableRowColumn>
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
                <Pagination {...this.state.PaginationConf} />
              </div>
            </div>
          </div>
        </div>
        <Dialog
          showCloseBtn
          open={this.state.delDialog}
          onRequestClose={(state) => this.dialogClose(state)}
          showCover
          content="删除后这条记录将不会再被找回！"
          actions={delActions}
          actionClassName="rob-alert-button-color rob-alert-button-45"
        />
        <Dialog
          showCover
          open={this.state.alertDialog}
          content={{ content: this.state.stateMsg, icon: this.state.alertType }}
          onRequestClose={() => this.dialogClose(false)}
          actions={[{
            label: '确定',
            className: 'rob-btn rob-btn rob-btn-danger rob-btn-circle',
            state: true
          }]}
          actionClassName="rob-alert-button-color"
        />
      </div>
    )
  }
}
Content.propTypes = {
  data: PropTypes.object,
  getBeneficiaryEditorData: PropTypes.func,
  delBeneficiaryEditorData: PropTypes.func,
  beneficiaryEditorSearch: PropTypes.func
}
Content.defaultProps = {
  data: {},
  getBeneficiaryEditorData: () => { },
  delBeneficiaryEditorData: () => { },
  beneficiaryEditorSearch: () => { }
}

export default connect(state => ({
  data: state.beneficiaryEditor
}), dispatch => ({
  getBeneficiaryEditorData: bindActionCreators(action.getBeneficiaryEditorData, dispatch),
  beneficiaryEditorSearch: bindActionCreators(action.beneficiaryEditorSearch, dispatch),
  delBeneficiaryEditorData: bindActionCreators(action.delBeneficiaryEditorData, dispatch)
}))(Content)