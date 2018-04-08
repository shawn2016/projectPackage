import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
import QBInput from 'components/QBInput'
import { formatDay } from 'utils/filterCommon'
import * as action from './redux/actions'
import './redux/reducer'

class ApplicationEditorPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      addDialog: false,
      delDialog: false,
      alertDialog: false,
      stateMsg: '',
      params: {
        useType: ''
      },
      isTestRule: false,
      PaginationConf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        dataCount: 0,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false,
        onChange: (page) => {
          this.setState({ PaginationConf: { ...this.state.PaginationConf, currentPage: page } })
          let params = {}
          params.page = page
          params.rows = this.state.PaginationConf.pageSize
          this.props.getApplicationEditorData(params)
        }
      }
    }
  }
  /* 初始化数据 */
  componentWillMount() {
    this.props.getApplicationEditorData()
  }
  /* 获取数据后，设置dataCount */
  componentWillReceiveProps(nextProps) {
    const { applicationEditor = {} } = nextProps.data,
      { body = {} } = applicationEditor
    if (body.pagenation) {
      let _pageParam = body.pagenation
      this.setState({ PaginationConf: { ...this.state.PaginationConf, dataCount: _pageParam.itemCount, currentPage: _pageParam.pageNo } })
    }
  }
  /* 操作用途，包括添加、修改和删除 */
  addApplication = () => {
    this.setState({ params: { ...this.state.params, id: '', useType: '' }, isTestRule: false, addDialog: true })
  }
  changeApplication = (item) => {
    this.setState({ params: { ...this.state.params, useType: item.useType, id: item.id }, isTestRule: false, addDialog: true })
  }
  delApplication = (id) => {
    this.setState({ params: { ...this.state.params = {}, id }, delDialog: true })
  }
  /* 修改input值 */
  changeUseText = (text) => {
    this.setState({ params: { ...this.state.params, useType: text } })
  }
  /* 关闭弹出框 */
  dialogClose = (state, type) => {
    if (!state) {
      this.setState({ addDialog: false, delDialog: false, alertDialog: false })
      return
    }
    if (type === 'edit') {
      this.setState({ isTestRule: true },
        () => {
          if (!this.use.getErrStatus()) {
            this.props.addApplicationEditorData(this.state.params).then(() => {
              if (this.props.data.addApplicationEditor.respCode === '000000') {
                this.setState({ stateMsg: '保存成功！', alertDialog: true })
                this.props.getApplicationEditorData({ page: this.state.PaginationConf.currentPage, rows: this.state.PaginationConf.pageSize })
              }
            })
            this.setState({ addDialog: false })
          }
        })
    } else if (type === 'del') {
      this.props.delApplicationEditorData(this.state.params).then(() => {
        if (this.props.data.delApplicationEditor.respCode === '000000') {
          this.setState({ stateMsg: '删除成功！', alertDialog: true })
          this.props.getApplicationEditorData({ page: this.state.PaginationConf.currentPage, rows: this.state.PaginationConf.pageSize })
        }
      })
      this.setState({ delDialog: false })
    }
  }
  render() {
    let values = []
    if (this.props.data.applicationEditor && this.props.data.applicationEditor.body && this.props.data.applicationEditor.body.values) {
      values = this.props.data.applicationEditor.body.values
    }
    const pagination = this.state.PaginationConf
      // { applicationEditor = {} } = this.props.data,
      // { body = {} } = applicationEditor,
      // { values = [] } = body
    const content = (
      <div className="rob-alert-content">
        <QBInput
          name="text"
          type="text"
          label="用途"
          labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
          inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
          required
          pattern={/^[\S\s]{1,56}$/}
          errDirection="bottom"
          emptyMsg="用途不能为空"
          errorMsg="请输入1-56个字符"
          placeholder="请输入用途"
          isTestRule={this.state.isTestRule}
          handleChange={(value) => this.changeUseText(value)}
          ref={(DOM) => { this.use = DOM }}
          defaultValue={this.state.params.useType}
        />
      </div>
    )
    const editActions = [{
      label: '取消',
      className: 'rob-btn rob-btn-minor rob-btn-circle',
      state: false
    }, {
      label: '保存',
      className: 'rob-btn rob-btn rob-btn-danger rob-btn-circle',
      state: true
    }]
    const delActions = [{
      label: '取消',
      className: 'rob-btn rob-btn-minor rob-btn-circle',
      state: false
    }, {
      label: '确定',
      className: 'rob-btn rob-btn-danger rob-btn-circle',
      state: true
    }]
    return (
      <div>
        <div className="qb-panel-g clearfix qb-media-height">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />支付结算</li>
              <li className="active">用途编辑</li>
            </ol>
            <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.addApplication} type="button">增加</button>
          </div>
          <div className="qb-list-g">
            <div className="qb-list-g__table">
              <div className="rob-row clearfix mlr0">
                <div className="column">
                  <div className="rob-table-responsive">
                    <Table striped hoverEffect checkboxType={'default'}>
                      <TableHeader>
                        <TableHeaderColumn className="text-center"> 序号</TableHeaderColumn>
                        <TableHeaderColumn> 创建日期</TableHeaderColumn>
                        <TableHeaderColumn> 用途</TableHeaderColumn>
                        <TableHeaderColumn> 操作</TableHeaderColumn>
                      </TableHeader>
                      <TableBody>
                        {
                          values.map((item, i) => (
                            <TableRow key={i}>
                              <TableRowColumn className="text-center">{(pagination.pageSize * (pagination.currentPage - 1)) + i + 1}</TableRowColumn>
                              <TableRowColumn> {formatDay(item.createTime)}</TableRowColumn>
                              <TableRowColumn> {item.useType}</TableRowColumn>
                              <TableRowColumn>
                                <a onClick={() => this.changeApplication(item)} className="qb-table-g__handle">修改</a>
                                <a onClick={() => this.delApplication(item.id)} className="qb-table-g__handle">删除</a>
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
        </div>
        <Dialog
          showCover
          showCloseBtn
          open={this.state.addDialog}
          onRequestClose={(state) => this.dialogClose(state, 'edit')}
          title="用途编辑"
          titleClassName="rob-alert-title rob-alert-title-color"
          content={content}
          actions={editActions}
          actionClassName="rob-alert-button rob-alert-button-45"
        />
        <Dialog
          showCover
          showCloseBtn
          open={this.state.delDialog}
          onRequestClose={(state) => this.dialogClose(state, 'del')}
          content="删除后这条记录将不会再被找回！"
          actions={delActions}
          actionClassName="rob-alert-button-color"
        />
        <Dialog
          showCover
          open={this.state.alertDialog}
          content={{ content: this.state.stateMsg, icon: 'bg_icon qb-icon-active' }}
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

ApplicationEditorPage.propTypes = {
  data: PropTypes.object,
  getApplicationEditorData: PropTypes.func,
  addApplicationEditorData: PropTypes.func,
  delApplicationEditorData: PropTypes.func
}
ApplicationEditorPage.defaultProps = {
  data: {},
  getApplicationEditorData: () => { },
  addApplicationEditorData: () => { },
  delApplicationEditorData: () => { }
}
export default connect(state => ({
  data: state.applicationEditor
}), dispatch => ({
  getApplicationEditorData: bindActionCreators(action.getApplicationEditorData, dispatch),
  addApplicationEditorData: bindActionCreators(action.addApplicationEditorData, dispatch),
  delApplicationEditorData: bindActionCreators(action.delApplicationEditorData, dispatch)
}))(ApplicationEditorPage)