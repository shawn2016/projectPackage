import React, { PureComponent } from 'react'
import Dialog from 'react-robotUI/dialog'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import timeStamp from 'utils/timeStamp'
import getRequest from 'utils/getRequest'
import { formatMoneyYuan } from 'utils/filterCommon'
import cookieStorage from 'utils/cookieStorage'
import Filter from 'utils/filterCommon'
import * as action from './redux/actions'
import './redux/reducer'

class HomePage extends PureComponent {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      power: false,
      companyPower: false
    }
  }
  // handleOpen = () => {
  //   this.setState({ power: true })
  // }
  // handleClose = () => {
  //   this.setState({ power: false })
  // }
  // handleOpenTwo = () => {
  //   this.setState({ companyPower: true })
  // }
  // handleCloseTwo = () => {
  //   this.setState({ companyPower: false })
  // }
  componentDidMount() {
  }
  componentWillMount() {
    this.props.getHomeCreditLimit()
    this.props.getHomeTodoInfo()
    this.props.getHomeRemainingSum()
    this.props.getHomeRecentList()
    this.props.getHomeLoginInfo()
    // this.props.getLoginInfo().then((res) => {
    //   if (res.respCode === '000000') {
    //     localStorage.setItem('getLoginInfo', JSON.stringify(res.body))
    //   } else {
    //   }
    // })
  }
  // 贷款意向
  goLoanIntention = () => {
    this.judgmentAuthority('1102000')
    // this.context.router.history.push('/home/loanIntention')
  }
  // 出金
  goWithdraw = () => {
    this.judgmentAuthority('1101500')
    // this.context.router.history.push('/home/withdraw')
  }
  // 入金
  goDeposit = () => {
    this.judgmentAuthority('1101000')
    // this.context.router.history.push('/home/deposit')
  }

  // 单笔支付经办
  goSingleHandle = () => {
    this.judgmentAuthority('1201000')
  }

  //二维码管理
  goCodeManagement = () => {
    this.judgmentAuthority('1802000')
  }

  //POS/扫码交易查询
  goScancodeQuery = () => {
    this.judgmentAuthority('1151700')
  }

  // 批量支付经办 （二期）
  goDeposit11 = () => {
    // this.context.router.history.push('/grossSettlement/batchHandle')
    this.judgmentAuthority('1203300')
  }

  // 代发经办 （二期）
  goUndertakesOrgnaization = () => {
    this.judgmentAuthority('1211000')
    // this.context.router.history.push('/issuing/undertakesOrgnaization')
  }

  // 支付结算 （单笔经办审批）
  goExamineSingleHandle = () => {
    this.judgmentAuthority('1203000')
    // this.context.router.history.push('/grossSettlement/examineSingleHandle')
  }

  // 批量支付（批发审批 二期）
  goDeposit33 = () => {
    this.context.router.history.push('/issuing/undertakesOrgnaization')
  }

  // 费用代发（代发审批  二期）
  goDeposit44 = () => {
    this.context.router.history.push('/issuing/undertakesOrgnaization')
  }

  // 额度设置
  goQuotaSettingManage = () => {
    this.context.router.history.push('/systemManage/quotaSettingManage')
  }

  // 业务管理
  goRuleManage = () => {
    this.judgmentAuthority('1802500')
    // this.context.router.history.push('/systemManage/ruleManage')
  }

  // 设置用户
  goUserManage = () => {
    this.judgmentAuthority('1801000')
    // this.context.router.history.push('/systemManage/userManage')
  }

  handleClick = (url) => () => {
    if (!url) return
    let jaided
    if (url === '/systemManage/ruleManage') {
      jaided = 1802500
    } else if (url === '/grossSettlement/examineSingleHandle') {
      jaided = 1203000
    } else if (url === '/systemManage/userManage') {
      jaided = 1801000
    } else if (url === '/grossSettlement/examineBatchHandle') {
      jaided = 1204500
    } else if (url === '/issuing/undertakesHandleExamine') {
      jaided = 1212500
    } else if (url === '/systemManage/limit') {
      jaided = 1802100
    }
    (async () => {
      let lockUser1 = await getRequest({
        path: 'user/getOperRuleInfo',
        method: 'POST',
        param: { id: jaided }
      })
      if (lockUser1.data.respCode === '000000') {
        this.context.router.history.push(url)
        //业务规则管理
        if (jaided === '1802500') {
          this.context.router.history.push('/systemManage/ruleManage')
        }
        //单笔经办审批 /grossSettlement/examineSingleHandle
        if (jaided === '1203000') {
          this.context.router.history.push('/grossSettlement/examineSingleHandle')
        }
        //用户管理 /systemManage/userManage
        if (jaided === '1801000') {
          this.context.router.history.push('/systemManage/userManage')
        }
        //额度设置
        if (jaided === '1802100') {
          this.context.router.history.push('/systemManage/limit')
        }
        //费用代发
        if (jaided === '1212500') {
          this.context.router.history.push('/issuing/undertakesHandleExamine')
        }
        //批量支付
        if (jaided === '1204500') {
          this.context.router.history.push('/grossSettlement/examineBatchHandle')
        }
      }
    })()
  }
  //判断权限
  judgmentAuthority = (jaid) => {
    (async () => {
      let lockUser = await getRequest({
        path: 'user/getOperRuleInfo',
        method: 'POST',
        param: { id: jaid }
      })
      if (lockUser.data.respCode === '000000') {
        //入金
        if (jaid === '1101000') {
          this.context.router.history.push('/home/deposit')
        }
        //出金
        if (jaid === '1101500') {
          this.context.router.history.push('/home/withdraw')
        }
        // //单笔经办 /grossSettlement/singleHandle
        if (jaid === '1201000') {
          this.context.router.history.push('/grossSettlement/singleHandle')
        }
        //贷款意向申请
        if (jaid === '1102000') {
          this.context.router.history.push('/home/loanIntention')
        }
        //二维码管理
        if (jaid === '1802000') {
          this.context.router.history.push('/systemManage/codeManagement')
        }
        //POS/扫码交易查询
        if (jaid === '1151700') {
          this.context.router.history.push('/finance/scancodeQuery')
        }
        //代发经办
        if (jaid === '1211000') {
          this.context.router.history.push('/issuing/undertakesOrgnaization')
        }
        //批量经办
        if (jaid === '1203300') {
          this.context.router.history.push('/grossSettlement/batchHandle')
        }
      }
    })()
  }
  go = (item) => {
    window.open(item, '_blank')
  }
  //暂时不上的弹窗
  noShow = () => {
    this.setState({
      alertContent: '敬请期待',
      showAlert: true,
      alertBtns: [{
        label: '确定',
        className: 'rob-btn-danger rob-btn-circle rob-alert-button-color',
        state: 'skip'
      }]
    })
  }
  delUser = () => {
    // let orderBtns = [
    //   { label: '确定', state: 'open1', className: 'rob-btn-danger rob-btn-circle' }
    // ]
    // this.setState({
    //   alertTitle: '提示！',
    //   alertTitleClass: 'rob-alert-title rob-alert-title-color',
    //   showAlert: true,
    //   showCloseBtn: true,
    //   alertContent: '敬请期待！',
    //   alertBtns: orderBtns,
    //   alertBtnsClass: 'rob-alert-button rob-alert-button-45',
    //   alertType: 'bg_icon'
    // })
    (async () => {
      let resposeData = await getRequest({
        path: '/anthr/acct/getInfo',
        method: 'POST',
      })
      //resposeData.data.respCode = '000000'
      //resposeData.data.respCode = '000000'
      //resposeData.data.respCode = '000001'
      if (resposeData.data.respCode === '000000' && resposeData.data.body.acctStatus && resposeData.data.body.acctStatus === 2) {
        /*失败*/
        let orderBtns = [
          { label: '申请开通', state: 'open', className: 'rob-btn-danger rob-btn-circle' }
        ]
        let tempContent = (
          <div>
            <div style={{ marginBottom: '20px', fontSize: '17px' }}>未能开通蚂蚁HR服务</div>
            <div style={{ marginBottom: '20px', fontSize: '17px' }}>您的申请未通过，请重新申请开通</div>
            <div>失败原因：线下材料提交不全</div>
          </div>
        )
        this.setState({
          alertTitle: '提示！',
          alertTitleClass: 'rob-alert-title rob-alert-title-color',
          showAlert: true,
          showCloseBtn: true,
          alertContent: tempContent,
          alertBtns: orderBtns,
          alertBtnsClass: 'rob-alert-button rob-alert-button-45',
          alertType: 'bg_icon'
        })
      } else if (resposeData.data.respCode === '000000' && resposeData.data.body.acctStatus && resposeData.data.body.acctStatus === 3) {
        /*开通完成*/
        /*let orderBtns = [
         { label: '正在跳转', state: 'jump', className: 'rob-btn-danger rob-btn-circle' }
         ]*/
        this.setState({
          link: resposeData.data.body.antUrl
        })
        let tempContent = (
          <div>
            <div style={{ marginBottom: '20px', fontSize: '17px' }}>正在为您跳转蚂蚁HR</div>
          </div>
        )
        this.setState({
          alertTitle: '提示！',
          alertTitleClass: 'rob-alert-title rob-alert-title-color',
          alertAutoClose: true,
          showAlerts: true,
          showCloseBtn: false,
          alertContent: tempContent,
          alertBtns: false,
          alertBtnsClass: 'rob-alert-button rob-alert-button-45',
          alertType: 'bg_icon qb-icon-loading'
        })
        /*if (!this.state.showAlert) {
         this.props.history.push('/antHr/opeanAntHr')
         }*/
      } else if (resposeData.data.respCode === '000000' && resposeData.data.body.acctStatus && resposeData.data.body.acctStatus === 4) {
        /*去开通*/
        this.context.router.history.push('/antHr/opeanAntHr')
      } else if (resposeData.data.respCode === '000000' && resposeData.data.body.acctStatus && resposeData.data.body.acctStatus === 1) {
        //let link = resposeData.data.body.hrUrl
        /*在审核*/
        let orderBtns = [
          { label: '确定', state: 'goHome', className: 'rob-btn-danger rob-btn-circle' }
        ]
        this.setState({
          link: resposeData.data.body.antUrl
        })
        let tempContent = (
          <div>
            <div style={{ marginBottom: '20px', fontSize: '17px' }}>正在开通蚂蚁HR服务</div>
            <div style={{ marginBottom: '20px', fontSize: '17px' }}>请您耐心等待，我们将尽快完成开通</div>
            <div><a onClick={() => { this.go(this.state.link) }}>进入蚂蚁HR</a></div>
          </div>
        )
        this.setState({
          alertTitle: '提示！',
          alertTitleClass: 'rob-alert-title rob-alert-title-color',
          showAlert: true,
          showCloseBtn: false,
          alertContent: tempContent,
          alertBtns: orderBtns,
          alertBtnsClass: 'rob-alert-button rob-alert-button-45',
          alertType: 'bg_icon'
        })
      }
    })()
  }
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'saveOrder') {
      //this.props.history.push('/grossSettlement/searchSingleHandle')
    }
    if (type === 'checkMoneyOk') {
      this.saveInfo()
    }
    if (type === 'goHome') {
      this.setState({ showAlert: false })
      this.context.router.history.push('/home/home')
    }
    if (type === 'open') {
      this.context.router.history.push('/antHr/opeanAntHr')
    }
    if (type === 'jump') {
      this.context.router.history.push('/antHr/opeanAntHr')
    }
  }
  alertCloses = (type) => {
    //this.setState({ showAlert: false })
    this.setState({
      showAlerts: false
    }, () => {
      this.context.router.history.push('/home/home')
      window.open(this.state.link, '_blank')
    })
    if (type === 'saveOrder') {
      //this.props.history.push('/grossSettlement/searchSingleHandle')
    }
    if (type === 'checkMoneyOk') {
      this.saveInfo()
    }
    if (type === 'goHome') {
      this.context.router.history.push('/home/home')
    }
    if (type === 'open') {
      this.context.router.history.push('/antHr/opeanAntHr')
    }
    if (type === 'jump') {
      this.context.router.history.push('/antHr/opeanAntHr')
    }
  }
  render() {
    const limit = this.props.data.hhhomeCreditlimit
    const sum = this.props.data.hhhomeRemainingsum
    let userInfo = cookieStorage.getCookie('userInfo')
    return (
      <div className="">
        <div className="rob-container-fluid qb-dashboard-g">
          <div className="rob-row qb-dashboard-g__row">
            <div className="rob-col-lg-8 rob-col-md-8 rob-col-xs-24 rob-col-sm-24">
              <div className="qb-dashboard-g__item">
                <div className="qb-dashboard-g__money">
                  {sum ? formatMoneyYuan(sum.accountBalance) : '0.00'}
                </div>
                <div className="qb-dashboard-g__desc">
                  账户余额(元)
                    </div>
                <div className="qb-dashboard-g__button">
                  <div className="rob-row ">
                    <button onClick={this.goDeposit} className=" rob-btn rob-btn-danger rob-btn-line rob-btn-circle pd30">入金
                            </button>
                    <button onClick={this.goWithdraw} className="rob-btn rob-btn-danger rob-btn-line rob-btn-circle pd30">出金
                            </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-8 rob-col-xs-24 rob-col-sm-24">
              <div className="qb-dashboard-g__item" style={{ borderRight: userInfo.companyType === '200' ? 'none' : '1px dashed #a10908' }}>
                <div className="qb-dashboard-g__money">
                  {limit ? formatMoneyYuan(limit.creditLine) : '0.00'}
                </div>
                <div className="qb-dashboard-g__desc">
                  可用授信额度
                    </div>
                <div className="qb-dashboard-g__button">
                  <div className="rob-row">
                    <button className="rob-btn rob-btn-danger rob-btn-line rob-btn-circle pd30" onClick={this.goLoanIntention} >贷款意向申请
                            </button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: userInfo.companyType === '200' ? 'none' : 'block' }} className="rob-col-lg-8 rob-col-md-8 rob-col-xs-24 rob-col-sm-24">
              <div className="qb-dashboard-g__item qb-dashboard-g__item--border-none">
                <div className="qb-dolist-g">
                  <div className="qb-dolist-g__title">
                    待办事宜
                        </div>
                  <ul>
                    {this.props.data.hhhomeTodoinfo && this.props.data.hhhomeTodoinfo.length > 0 ? this.props.data.hhhomeTodoinfo.map((data, i) => (
                      <li key={i} onClick={this.handleClick(Filter.schedule(data.bizCode).url)}>
                        <a>
                          <span className="title">{Filter.schedule(data.bizCode).label}</span>
                          <span>待处理笔数：</span>
                          <span className="num">{data.bizMsg}</span>笔</a>
                      </li>
                    )) : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rob-row qb-handle-g rob-no-gutters">
          <div className="rob-col-6">
            <div onClick={this.goSingleHandle} className="qb-handle-g__item">
              <span className="icon-one bg_icon" />
              <label>单笔支付经办</label>
            </div>
          </div>
          <div className="rob-col-6">
            <div onClick={this.goCodeManagement} className="qb-handle-g__item">
              <span className="qb-icon-qrcode bg_icon" />
              <label>二维码管理</label>
            </div>
          </div>
          <div className="rob-col-6" >
            <div onClick={this.goScancodeQuery} className="qb-handle-g__item">
              <span className="qb-icon-qrquery bg_icon" />
              <label>POS/扫码交易查询</label>
            </div>
          </div>
          <div className="rob-col-6">
            <div onClick={this.goDeposit11} className="qb-handle-g__item">
              <span className="icon-two bg_icon" />
              <label>批量支付经办</label>
            </div>
          </div>
          <div className="rob-col-6">
            <div onClick={this.goUndertakesOrgnaization} className="qb-handle-g__item">
              <span className="icon-three bg_icon" />
              <label>代发经办</label>
            </div>
          </div>
          <div className="rob-col-6">
            <div onClick={this.delUser} className="qb-handle-g__item">
              <span className="icon-six bg_icon" />
              <label>蚂蚁HR</label>
            </div>
          </div>
          {
            // <div className="rob-col-lg-5">
            //   <div className="qb-handle-g__item  active" style={{ visibility: 'hidden' }}>
            //     <span className="icon-two bg_icon" />
            //     <label>批量支付经办</label>
            //   </div>
            // </div>
            // <div className="rob-col-lg-5">
            //   <div onClick={this.goUndertakesOrgnaization} style={{ visibility: 'hidden' }} className="qb-handle-g__item">
            //     <span className="icon-three bg_icon" />
            //     <label>代发经办</label>
            //   </div>
            // </div>
          }
        </div>
        <div className="qb-panel-g qb-media-height">
          <div className="qb-column-header-g">
            最近交易
        </div>
          <div className="qb-time-line-g">
            <ul className="rob-ant-timeline">
              {(this.props.data.hhhomeRecentlist && this.props.data.hhhomeRecentlist.values) ? this.props.data.hhhomeRecentlist.values.map((data, i) => (
                <li key={i} className={`rob-ant-timeline-item ${this.props.data.hhhomeRecentlist.values.length - 1 === i ? 'rob-ant-timeline-item-last' : ''}`}>
                  <div className="rob-ant-timeline-item-time">{timeStamp(data.receiveTime, 3, 1)}</div>
                  <div className="rob-ant-timeline-item-tail" />
                  <div className="rob-ant-timeline-item-head rob-ant-timeline-item-head-blue" />
                  <div className="rob-ant-timeline-item-content">
                    <div className="rob-ant-timeline-item-desc right">
                      <div className="arrow" />
                      <div className="rob-row rob-no-gutters">
                        <div className="rob-col-lg-5 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                          <div className="qb-time-line-g__list-item">
                            <span className="qb-time-line-g__list-title">
                              <label>交易金额(元)</label>
                            </span>
                            <span className={`qb-time-line-g__list-icon ${data.payType === '10' ? 'qb-time-line-g__list-icon--enter' : 'qb-time-line-g__list-icon--pay'}`}>
                              <i className="qb-icon-icon-yellow" />
                              {data.payType === '10' ? '收入' : '支出'}
                            </span>
                            <div className="qb-time-line-g__list-money">
                              {data.amount ? formatMoneyYuan(data.amount) : '0.00'}
                            </div>
                          </div>
                        </div>
                        <div className="rob-col-lg-3 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                          <div className="qb-time-line-g__list-item">
                            <span className="qb-time-line-g__list-title">
                              <label>收(付)方名称</label>
                            </span>
                            <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small">
                              {data.accountName}
                            </div>
                          </div>
                        </div>
                        <div className="rob-col-lg-6 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                          <div className="qb-time-line-g__list-item">
                            <span className="qb-time-line-g__list-title">
                              <label>收(付)方账号</label>
                            </span>
                            <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small">
                              {data.accountNo}
                            </div>
                          </div>
                        </div>
                        <div className="rob-col-lg-4 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                          <div className="qb-time-line-g__list-item">
                            <span className="qb-time-line-g__list-title">
                              <label>可用余额(元)</label>
                            </span>
                            <div className="qb-time-line-g__list-money ">
                              {data.accountBalance ? formatMoneyYuan(data.accountBalance) : '0.00'}
                            </div>
                          </div>
                        </div>
                        <div className="rob-col-lg-6 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
                          <div className="qb-time-line-g__list-item">
                            <span className="qb-time-line-g__list-title">
                              <label>交易流水号</label>
                            </span>
                            <div className="qb-time-line-g__list-money qb-time-line-g__list-money--small ">
                              {data.outSerialNo}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )) : <div className="qb-nodate-g__box mb140"><span className="qb-nodate-g bg_icon" /><p>无数据</p></div>
              }
            </ul>
          </div>
        </div>
        <Dialog
          showCover
          open={this.state.showAlert}
          showCloseBtn={this.state.showCloseBtn}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          actions={this.state.alertBtns}
          actionClassName="rob-alert-button-color rob-alert-button-45"
        />
        <Dialog
          showCover
          showCloseBtn={this.state.showCloseBtn}
          autoClose={this.state.alertAutoClose}
          timeout={3}
          open={this.state.showAlerts}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertCloses(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
        {/*<Dialog
          showCloseBtn
          open={this.state.power}
          onRequestClose={(state) => this.handleClose(state)}
          title="提示"
          titleClassName="rob-alert-title rob-alert-title-color"
          content="很抱歉，您暂无此项业务权限！"
          actions={editActions}
          actionClassName="rob-alert-button"
        />
        <Dialog
          showCloseBtn
          open={this.state.companyPower}
          onRequestClose={(state) => this.handleCloseTwo(state)}
          title="提示"
          titleClassName="rob-alert-title rob-alert-title-color"
          content="很抱歉，企业暂无开通此项业务！"
          actions={editActions}
          actionClassName="rob-alert-button"
        />*/}
      </div >
    )
  }
}

HomePage.propTypes = {
  data: PropTypes.object,
  getHomeCreditLimit: PropTypes.func,
  getHomeRemainingSum: PropTypes.func,
  getHomeTodoInfo: PropTypes.func,
  getHomeRecentList: PropTypes.func,
  getHomeLoginInfo: PropTypes.func,
  getLoginInfo: PropTypes.func,
  homeRecentlist: PropTypes.array,
  judgmentAuthority: PropTypes.func
}
HomePage.defaultProps = {
  data: {},
  getHomeCreditLimit: () => { },
  getHomeRemainingSum: () => { },
  getHomeTodoInfo: () => { },
  getHomeRecentList: () => { },
  getHomeLoginInfo: () => { },
  getLoginInfo: () => { },
  homeRecentlist: [],
  judgmentAuthority: () => { }
}

export default connect(state => ({
  data: state.hhhomeData
}), dispatch => ({
  getHomeCreditLimit: bindActionCreators(action.hhgetCreditLimit, dispatch),
  getHomeRemainingSum: bindActionCreators(action.hhgetRemainingSum, dispatch),
  getHomeTodoInfo: bindActionCreators(action.hhgetTodoInfo, dispatch),
  getHomeRecentList: bindActionCreators(action.hhgetRecentList, dispatch),
  getLoginInfo: bindActionCreators(action.hhgetLoginInfo, dispatch),
}))(HomePage)