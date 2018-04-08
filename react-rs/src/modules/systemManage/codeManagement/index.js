import React, { PureComponent } from 'react'
import QRCode from 'qrcode.react'
import timeStamp from 'utils/timeStamp'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
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
import Dialog from 'react-robotUI/dialog'
import getRequest from 'utils/getRequest'
import * as action from './redux/actions'
import './redux/reducer'
const img1 = require('assets/images/logo.png')
const img2 = require('assets/images/pay.png')
const img3 = require('assets/images/WeChat.png')
const img4 = require('assets/images/step01.png')
const img5 = require('assets/images/step02.png')
const img6 = require('assets/images/step03.png')
let param = {
  page: 1,
  rows: 10
}
let s = null
class BalanceQuery extends PureComponent {
  constructor(props) {
    super(props)
    this.resetPasswordMsg = ''
    this.state = {
      s: null,
      dataList: [],
      containCheckbox: false,
      striped: true,
      hoverEffect: true,
      divide: true,
      pagination: false,
      paginationConf: {
        type: 'default',
        pageSize: 10,
        maxSize: 8,
        allowJump: true,
        currentPage: 1,
        showPreAndNext: false,
        onChange: (curIndex) => {
          // 改变请求参数的当前页
          param.page = curIndex
          this.props.getList(param)
        }
      },
      dataCount: 0
    }
  }
  static propTypes = {
    dataList: PropTypes.object,
    history: PropTypes.object,
    getList: PropTypes.func,
    delUserList: PropTypes.func,
    lockUserList: PropTypes.func,
    unLockUserList: PropTypes.func,
    //delUserList: PropTypes.func,
  }
  static defaultProps = {
    dataList: {},
    history: {},
    getList: () => { },
    delUserList: () => { },
    lockUserList: () => { },
    unLockUserList: () => { },
    //delUserList: () => { },
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  // 过滤器
  stateFilter = (state) => {
    switch (state) {
      case 100:
        return '启用'
      case 200:
        return '禁用'
      default:
        return 'hh'
    }
  }
  componentWillMount() {
    this.commit3()
    this.props.getList().then((res) => {
      if (res.data.respCode === '000000') {
        this.setState({
          dataList: res.data.body
        })
      }
    })
  }
  componentWillReceiveProps = () => {
  }
  delUser = (t) => {
    this.handleOpen('delUser', { id: t, type: 'delUser' })
  }
  lockUser = (t, type) => {
    if (type === 100) {
      let lockUser = 'lockUser'
      this.handleOpen('lockUser', { id: t, status: type, type: lockUser })
    } else {
      let lockUser = 'unLockUser'
      this.handleOpen('unLockUser', { id: t, status: type, type: lockUser })
    }
  }
  dialogShow = {
    delUser: (obj) => {
      this.content = (
        <div className="rob-alert-content ">
          <span>确定要删除该二维码？删除后该二维码将不能再收款</span>
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
    d11: (status) => {
      this.setState({ d11: true })
      this.getContent(
        <div className="rob-alert-content ">
          {this.state.contentDom}
        </div>
      )
      this.getActions([{
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: status
      }])
    },
    delUser1: () => {
      this.content = (
        <div className="rob-alert-content ">
          <span>当前二维码已到达数量限制，若想申请更多请联系客服人员</span>
        </div>
      )
      this.actions = ([{
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        //state: obj
      }])
      this.setState({ d11: true })
    },
    lockUser: (obj) => {
      this.setState({ d11: true })
      this.content = (
        <div className="rob-alert-content ">
          <span>确定要启用用该二维码吗？</span>
        </div>
      )
      this.actions = ([{
        label: '取消',
        className: 'rob-btn-minor rob-btn-circle',
        state: false
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: obj
      }])
    },
    unLockUser: (obj) => {
      this.setState({ d11: true })
      this.content = (
        <div className="rob-alert-content ">
          <span>确定要禁用该二维码？禁用后该二维码将不能再收款</span>
        </div>
      )
      this.actions = ([{
        label: '取消',
        className: 'rob-btn-minor rob-btn-circle',
        state: false
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: obj
      }])
    },
    approveInfo: (obj) => {
      this.actions = ([{
        label: '取消',
        className: 'rob-btn-minor rob-btn-circle',
        state: false
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: obj
      }])
      this.setState({ d12: true })
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
    preView: (obj) => {
      // const originPath = qr.svgObject(obj.preview).path //  获得二维码的绘制路径 生产中11111 是从后台返回
      // const scaledPath = svgpath(originPath).scale(7.2, 7.2).toString()
      this.setState({
        svgPath: obj.preview
      }, () => {
        if (obj.enableTemplate === 1) {
          this.content = (
            <div className="qb-alert-g__box  clearfix">
              <button onClick={() => { this.handleClose(false, 'dialogStatue') }} type="button" className="rob-alert-close" data-dismiss="rob-alert" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <div className="qb-alert-g__box__title">
                <img src={img1} alt="" />|<span>扫码支付</span>
              </div>
              <div className="qb-alert-g__box__code qb-up_logo_con-g" style={{ paddingTop: '30px' }}>
                {/* <svg width="220" height="220">
                  <path d={this.state.svgPath ? this.state.svgPath : null} />
                </svg> */}
                <QRCode value={this.state.svgPath} size={200} />
                <div style={{ display: obj.filePath && obj.filePath !== ' ' ? 'inline-block' : 'none' }} className="qb-up_logo_box">
                  <img className="img2 img2__sbs3" src={`${obj.pathPrefix}${obj.filePath}`} alt="LOGO" />
                </div>
                <p>{obj.qrcodeId}</p>
              </div>
              <div className="qb-alert-g__box__pay">
                <div className="qb-alert-g__box__pay__sty">欢迎使用<span className="qb-alert-g__box__pay__col_1">支付宝</span>／<span className="qb-alert-g__box__pay__col_2">微信</span>支付</div>
                <img className="alipay" src={img2} alt="" />
                <img className="wechat" src={img3} alt="" />
              </div>
              <div className="qb-alert-g__box__step">
                <ul className="rob-row">
                  <li className="rob-col-md-8 rob-col-sm-8 rob-col-xs-8"><img src={img5} alt="" /><span>打开扫一扫</span></li>
                  <li className="rob-col-md-8 rob-col-sm-8 rob-col-xs-8"><img src={img4} alt="" /><span>扫描二维码</span></li>
                  <li className="rob-col-md-8 rob-col-sm-8 rob-col-xs-8"><img src={img6} alt="" /><span>完成支付</span></li>
                </ul>
                <p>客服电话：010-57044877</p>
              </div>
            </div>
          )
        } else {
          this.content = (
            <div className="qb-alert-g__box  qb-bg-white-g qr-box clearfix">
              <button onClick={() => { this.handleClose(false, 'dialogStatue') }} type="button" className="rob-alert-close" data-dismiss="rob-alert" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <div className="qb-alert-g__box__code qb-up_logo_con-g" style={{ paddingTop: '30px' }}>
                <QRCode value={this.state.svgPath} size={200} />
                <div style={{ display: obj.filePath && obj.filePath !== ' ' ? 'inline-block' : 'none' }} className="qb-up_logo_box">
                  <img className="img2 img2__sbs3" src={`${obj.pathPrefix}${obj.filePath}`} alt="LOGO" />
                </div>
                <p>{obj.qrcodeId}</p>
              </div>
            </div>
          )
        }
        this.setState({ dialogStatue: true, qrCode: obj.id })
      })
      this.actions = []
    }
  }
  handleOpen = (type, obj) => {
    this.dialogShow[type](obj)
  }
  // close Dialog
  handleClose = (state, type) => {
    if (!state) {
      this.setState({ [type]: false })
      //this.state.dialogStatue=false
    }
    if (state && state.type === 'delUser') {
      this.props.delUserList({ id: state.id }).then((res) => {
        if (res.data.respCode === '000000') {
          this.resetPasswordMsg = '删除成功'
          this.handleOpen('resetPassword')
        }/* else {
          this.handleOpen('resetPassword')
          this.resetPasswordMsg = res.data.respMsg
        }*/
      })
    } else if (state === 'refresh') {
      this.setState({ [type]: false })
      this.props.getList().then((res) => {
        if (res.data.respCode === '000000') {
          this.setState({
            dataList: res.data.body
          })
        }
      })
    } else if (state && state.type === 'lockUser') {
      this.props.lockUserList({ id: state.id, status: state.status }).then((res) => {
        if (res.data.respCode === '000000') {
          this.resetPasswordMsg = '启用成功'
          this.handleOpen('resetPassword')
        }/* else {
          this.handleOpen('resetPassword')
          this.resetPasswordMsg = res.data.respMsg
        }*/
      })
    } else if (state && state.type === 'unLockUser') {
      this.props.lockUserList({ id: state.id, status: state.status }).then((res) => {
        if (res.data.respCode === '000000') {
          this.resetPasswordMsg = '禁用成功'
          this.handleOpen('resetPassword')
        }/* else {
          this.handleOpen('resetPassword')
          this.resetPasswordMsg = res.data.respMsg
        }*/
      })
    }
  }
  go = (num) => {
    this.props.history.push({
      pathname: '/finance/balanceHistory',
      state: { virtualAccountNo: num }
    })
  }
  goDetail = (x) => {
    window.open(`${x.pathPrefix}${x.url}`)
  }
  preView = (item) => {
    this.handleOpen('preView', item)
    // this.props.history.push({
    //   pathname: '/clientManage/clientManageDetail',
    //   state: { id: obj.id }
    // })
  }
  commit = async () => {
    let asyncRequest1 = async () => {
      let data = await getRequest({
        path: '/qrcode/getList',
        method: 'POST',
      })
      if (data.data.respCode === '000000' && (!data.data.body || data.data.body.length < s)) {
        this.context.router.history.push('/systemManage/addCode')
      } else {
        this.handleOpen('delUser1', '当前二维码已到达数量限制，若想申请更多请联系客服人员')
      }
    }
    let data = await getRequest({
      path: '/qrcode/getMaxLimit',
      method: 'POST',
    })
    if (data.data.respCode === '000000') {
      s = data.data.body.qrCodeNum
      asyncRequest1()
    }
  }
  commit3 = async () => {
    let data = await getRequest({
      path: '/qrcode/getMaxLimit',
      method: 'POST',
    })
    if (data.data.respCode === '000000') {
      if (data && data.data && data.data.body && data.data.body.qrCodeNum) {
        this.setState({
          s: data.data.body.qrCodeNum
        })
      }
    }
  }
  commit1 = async (num) => {
    this.props.history.push({
      pathname: '/systemManage/notifyCode',
      state: { selfDefineo: num.selfDefineo, selfDefinet: num.selfDefinet, id: num.id, status: num.status }
    })
  }
  commit2 = async () => {

  }

  render() {
    let body = []
    const { dataList = [] } = this.state
    if (dataList) {
      body = dataList
    }
    return (
      <div>
        <div className="qb-panel-g clearfix qb-media-height">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li className="active">二维码管理</li>
              <li className="active" style={{ color: 'red', fontSize: '12px' }} >* 注：允许企业有{this.state.s}个二维码，若想申请更多请联系客服。</li>
            </ol>
            <button className="rob-btn rob-btn-minor rob-btn-circle " onClick={this.commit} type="button">新增二维码</button>
          </div>
          <Table containCheckbox={this.state.containCheckbox} striped={this.state.striped} hoverEffect={this.state.hoverEffect} pagination={this.state.pagination} checkboxType={this.state.checkboxType}>
            <TableHeader>
              <TableHeaderColumn className="text-center">序号</TableHeaderColumn>
              <TableHeaderColumn>创建日期</TableHeaderColumn>
              <TableHeaderColumn>二维码编号</TableHeaderColumn>
              <TableHeaderColumn>自定义1</TableHeaderColumn>
              <TableHeaderColumn>自定义2</TableHeaderColumn>
              <TableHeaderColumn>创建人</TableHeaderColumn>
              <TableHeaderColumn>状态</TableHeaderColumn>
              <TableHeaderColumn>操作</TableHeaderColumn>
            </TableHeader>
            <TableBody>
              {body.map((item, i) => (
                <TableRow key={i}>
                  <TableRowColumn className="text-center"> {(this.state.paginationConf.pageSize * (this.state.paginationConf.currentPage - 1)) + i + 1}</TableRowColumn>
                  <TableRowColumn>{timeStamp(item.createTime, 3, 1)}</TableRowColumn>
                  <TableRowColumn>{item.qrcodeId}</TableRowColumn>
                  <TableRowColumn>{item.selfDefineo}</TableRowColumn>
                  <TableRowColumn>{item.selfDefinet}</TableRowColumn>
                  <TableRowColumn>{item.createName}</TableRowColumn>
                  <TableRowColumn><a >{this.stateFilter(item.status)}</a></TableRowColumn>
                  <TableRowColumn>
                    {item.qrcodeId ? <a className="qb-table-g__handle" onClick={() => { this.preView(item) }}>预览</a> : null}
                    {item.qrcodeId ? <a className="qb-table-g__handle" onClick={this.commit1.bind(this, item)} >修改</a> : null}
                    {item.qrcodeId ? <a className="qb-table-g__handle" onClick={this.lockUser.bind(this, item.id, item.status === 100 ? 200 : 100)} >{item.status === 100 ? '禁用' : '启用'}</a> : null}
                    {item.qrcodeId.split('')[0] === 'V' ? <a className="qb-table-g__handle" onClick={this.delUser.bind(this, item.id)} >删除</a> : null}
                    {item.qrcodeId ? <a className="qb-table-g__handle" onClick={() => { this.goDetail(item) }} >下载</a> : null}
                  </TableRowColumn>
                </TableRow>
              ))
              }
            </TableBody>
          </Table>
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
            //showCloseBtn
            showCover
            onRequestClose={(name) => this.handleClose(name, 'dialogStatue')}
            open={this.state.dialogStatue}
            content={this.content}
          />
          <Dialog
            showCloseBtn
            open={this.state.d11}
            onRequestClose={(name) => this.handleClose(name, 'd11')}
            content={this.content}
            actions={this.actions}
            actionClassName="rob-alert-button-color"
            showCover
          />
          <div className="qb-list-g__pagination clearfix">
            <div className="rob-row clearfix">
              <div className="rob-col-lg-24 column">
                <Pagination {...this.state.paginationConf} dataCount={this.state.dataCount} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  dataList: state.SMCM_userListDataQuery.SMCM_zhenList,
  delUserData: state.SMCM_userListDataQuery.SMCM_delUser,
}), dispatch => ({
  getList: bindActionCreators(action.SMCM_getList, dispatch),
  delUserList: bindActionCreators(action.SMCM_delUser, dispatch),
  lockUserList: bindActionCreators(action.SMCM_lockUser, dispatch),
  unLockUserList: bindActionCreators(action.SMCM_unLockUser, dispatch),
}))(BalanceQuery)