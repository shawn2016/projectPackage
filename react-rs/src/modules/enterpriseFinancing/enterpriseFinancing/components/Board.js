/**
 * Created by Administrator on 2017-7-31.
 */
import React, { PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import timeStamp from 'utils/timeStamp'
import { formatMoneyYuan } from 'utils/filterCommon'
import { Link } from 'react-router-dom'
import QBInput from 'components/QBInput'
import Dialog from 'react-robotUI/dialog'
import QBSelect from 'components/QBSelect'
import saveRequest from 'utils/getRequest'
import QBDatepicker from 'components/QBDatePicker'
import cookieStorage from 'utils/cookieStorage'
import Upload from 'rc-upload'
import { connect } from 'react-redux'
import * as action from '../redux/actions'
import '../redux/reducer'
import config from '../../../../config'

class Board extends PureComponent {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  constructor(props) {
    super(props)
    this.openImg = (url) => {
      window.open(url, '_blank')
    }
    this.state = {
      isSavaPayInfo: true,
      isTestRule: false,
      containCheckbox: false,
      attachments: '',
      attachments1: '',
      attachments2: '',
      striped: true,
      hoverEffect: true,
      divide: false,
      fileLoading: false,
      fileLoading1: false,
      fileLoading2: false,
      one: false,
      two: false,
      three: false,
      show: false,
      name: null,
      companyType: '100',
      agree: true,
      agreeCheck: false,
      id: null,
      database: [
        { a: 111, b: 2222, c: 33333, d: 444444 },
        { a: 111, b: 2222, c: 33333, d: 444444 },
        { a: 111, b: 2222, c: 33333, d: 444444 },
        { a: 111, b: 2222, c: 33333, d: 444444 },
        { a: 111, b: 2222, c: 33333, d: 444444 }
      ],
      data: [
        { text: '请选择', value: '' },
        { text: '身份证1', value: '1111' },
        { text: '身份证12', value: '2222' }
      ],
      showDialog: false,

    }
  }
  attachConfig = () => {
    let _this = this
    return {
      action: config.file(),
      data: config.fileParam,
      multiple: true,
      onSuccess(ret) {
        _this.state.attachments = ret.body.fileUrl
        _this.setState({
          one: true,
          resoureId: false,
          power: true,
          fileLoading: false,
          attachments: _this.state.attachments
        })
        _this.props.updateOrderInfo({
          taxRegisterCardImg: ret.body.fileId
        })
      },
      onError(err) {
        console.error('上传失败', err)
      },
      beforeUpload(file) {
        return new Promise((resolve) => {
          let fileSize = file.size
          if (!(/(?:jpg|png|jpeg)$/i.test(file.name))) {
            _this.formatAlertInfo('请上传5M以内格式为jpg/png/jpeg的图片', 'bg_icon qb-icon-fail')
            return false
          }

          if (fileSize > 5 * 1024 * 1024) {
            _this.formatAlertInfo('请上传5M以内格式为jpg/png/jpeg的图片', 'bg_icon qb-icon-fail')
            return false
          }
          _this.setState({
            fileLoading: true
          })
          resolve(file)
        })
      },
      name: 'walletfile'
    }
  }
  attachConfig1 = () => {
    let _this = this
    return {
      action: config.file(),
      data: config.fileParam,
      multiple: true,
      onSuccess(ret) {
        _this.state.attachments1 = ret.body.fileUrl
        _this.setState({
          two: true,
          orginId: false,
          power: true,
          fileLoading1: false,
          attachments1: _this.state.attachments1
        })
        _this.props.updateOrderInfo({
          organizationCodeCardImg: ret.body.fileId
        })
      },
      onError(err) {
        console.error('上传失败', err)
      },
      beforeUpload(file) {
        return new Promise((resolve) => {
          let fileSize = file.size
          if (!(/(?:jpg|png|jpeg)$/i.test(file.name))) {
            _this.formatAlertInfo('请上传5M以内格式为jpg/png/jpeg的图片', 'bg_icon qb-icon-fail')
            return false
          }

          if (fileSize > 5 * 1024 * 1024) {
            _this.formatAlertInfo('请上传5M以内格式为jpg/png/jpeg的图片', 'bg_icon qb-icon-fail')
            return false
          }
          _this.setState({
            fileLoading1: true
          })
          resolve(file)
        })
      },
      name: 'walletfile'
    }
  }
  attachConfig2 = () => {
    let _this = this
    return {
      action: config.file(),
      data: config.fileParam,
      multiple: true,
      onSuccess(ret) {
        _this.state.attachments2 = ret.body.fileUrl
        _this.setState({
          three: true,
          admitId: false,
          power: true,
          fileLoading2: false,
          attachments2: _this.state.attachments2
        })
        _this.props.updateOrderInfo({
          bankProvementImg: ret.body.fileId
        })
      },
      onError(err) {
        console.error('上传失败', err)
      },
      beforeUpload(file) {
        return new Promise((resolve) => {
          let fileSize = file.size
          if (!(/(?:jpg|png|jpeg)$/i.test(file.name))) {
            _this.formatAlertInfo('请上传5M以内格式为jpg/png/jpeg的图片', 'bg_icon qb-icon-fail')
            return false
          }
          if (fileSize > 5 * 1024 * 1024) {
            _this.formatAlertInfo('请上传5M以内格式为jpg/png/jpeg的图片', 'bg_icon qb-icon-fail')
            return false
          }
          _this.setState({
            fileLoading2: true
          })
          resolve(file)
        })
      },
      name: 'walletfile'
    }
  }

  formatAlertInfo = (text, type) => {
    this.setState({
      showAlert: true,
      alertContent: text,
      alertType: type,
      alertBtns: [
        { label: '确定', state: false, className: 'rob-btn-danger rob-btn-circle' }
      ],
      alertBtnsClass: 'rob-alert-button-color rob-alert-button-45'
    })
  }
  delUser = () => {
    (async () => {
      let resposeData = await saveRequest({
        path: '/fund/getFundsToInfo',
        method: 'POST',
      })
      if (resposeData.data.respCode === '000000' && resposeData.data.body && resposeData.data.body.ifFundsCanInto && resposeData.data.body.ifFundsCanInto === '200') {
        /*受理中*/
        let orderBtns = [
          { label: '知道了', state: 'saveOrder', className: 'rob-btn-danger rob-btn-circle' }
        ]
        let tempContent = (
          <div>
            <div style={{ marginBottom: '20px', fontSize: '14px' }}>您的理财账户正在开通受理中，暂不可进行转入，请耐心等待</div>
            <div style={{ marginBottom: '', fontSize: '12px' }}>理财账户开通预计需1个工作日</div>
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
      } else if (resposeData.data.respCode === '000000' && resposeData.data.body && resposeData.data.body.ifFundsCanInto && resposeData.data.body.ifFundsCanInto === '500') {
        let orderBtns = [
          { label: '重新开通', state: 'oneMore', className: 'rob-btn-danger rob-btn-circle' }
        ]
        let tempContent = (
          <div>
            <div style={{ marginBottom: '20px', fontSize: '14px' }}>您的理财账户开通失败，请核对资料并重新提交开户申请</div>
            <div style={{ marginBottom: '', fontSize: '12px' }}>理财账户开通预计需1个工作日</div>
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
      } else if (resposeData.data.respCode === '500000') {
        /*为测评*/
        let orderBtns = [
          { label: '确定', className: 'rob-btn-danger rob-btn-circle' }
        ]
        let content = resposeData.data.respMsg
        this.setState({
          alertTitle: '提示！',
          alertTitleClass: 'rob-alert-title rob-alert-title-color',
          showAlert: true,
          showCloseBtn: true,
          alertContent: content,
          alertBtns: orderBtns,
          alertBtnsClass: 'rob-alert-button rob-alert-button-45',
          alertType: ''
        })
      } else if (resposeData.data.respCode === '500011') {
        /*为测评*/
        let orderBtns = [
          { label: '确定', className: 'rob-btn-danger rob-btn-circle' }
        ]
        let content = resposeData.data.respMsg
        this.setState({
          alertTitle: '提示！',
          alertTitleClass: 'rob-alert-title rob-alert-title-color',
          showAlert: true,
          showCloseBtn: true,
          alertContent: content,
          alertBtns: orderBtns,
          alertBtnsClass: 'rob-alert-button rob-alert-button-45',
          alertType: ''
        })
      } else if (resposeData.data.respCode === '000000' && resposeData.data.body && resposeData.data.body.ifFundsCanInto && resposeData.data.body.ifFundsCanInto === '300') {
        /*为测评*/
        let orderBtns = [
          { label: '进行评测', state: 'test', className: 'rob-btn-danger rob-btn-circle' }
        ]
        this.setState({
          alertTitle: '提示！',
          alertTitleClass: 'rob-alert-title rob-alert-title-color',
          showAlert: true,
          showCloseBtn: true,
          alertContent: '根据监管要求，您需先完成风险评测',
          alertBtns: orderBtns,
          alertBtnsClass: 'rob-alert-button rob-alert-button-45',
          alertType: ''
        })
      } else if (resposeData.data.respCode === '000000' && resposeData.data.body && resposeData.data.body.ifFundsCanInto && resposeData.data.body.ifFundsCanInto === '400') {
        this.props.history.push('/enterpriseFinancing/deposit')
      } else if (resposeData.data.respCode === '000000' && resposeData.data.body && resposeData.data.body.ifFundsCanInto && resposeData.data.body.ifFundsCanInto === '100') {
        /*未开通*/
        this.setState({
          showDialog: true
        })
      }
      if (resposeData.data.body && resposeData.data.body.toOpenAccInfoList && this.state.companyType === '100') {
        let dataArr = resposeData.data.body.toOpenAccInfoList
        for (let i = 0; i < dataArr.length; i++) {
          if (dataArr[i].userName === null) {
            dataArr[i].text = ''
          }
          dataArr[i].value = dataArr[i].id
          dataArr[i].text = dataArr[i].userName
        }
        console.log(dataArr)
        this.setState({
          data: dataArr
        })
      }
      if (resposeData.data.body && resposeData.data.body.toOpenAccInfoList && this.state.companyType === '200') {
        let dataArr = resposeData.data.body.toOpenAccInfoList
        if (dataArr[0]) {
          this.setState({
            name: dataArr[0].userName,
            id: dataArr[0].identityNo
          })
        }
        this.props.updateOrderInfo({
          operaterId: dataArr[0].id,
        })
      }
    })()
  }
  delUsers = () => {
    this.props.history.push('/enterpriseFinancing/withdraw')
  }
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'saveOrder') {
      //this.props.history.push('/grossSettlement/searchSingleHandle')
    }
    if (type === 'oneMore') {
      //this.props.history.push('/grossSettlement/searchSingleHandle')
      this.setState({
        showDialog: true
      })
    }
    if (type === 'test') {
      this.props.history.push('/enterpriseFinancing/riskAssessment')
    }
  }
  actions = ([{
    label: '取消',
    className: 'rob-btn-minor rob-btn rob-btn-circle',
    state: false
  }, {
    label: '确定',
    className: 'rob-btn rob-btn-danger rob-btn-circle',
    state: true
  }])
  componentDidMount() {
    this.props.getNum()
    //this.props.getLoginInfo()
  }
  handleOpen = () => {
    this.setState({ power: true })
  }
  handleClose = (flag, type) => {
    // 关闭弹窗
    if (!flag) {
      this.setState({ [type]: false })
      //this.state.dialogStatue=false
    }
    /*if (flag && flag !== 'refresh') {
      this.setState({
        isTestRule: true
      }, () => {
        if (this.auditOpinion === '') {
          this.setState({
            approveStatusDesc: '请选择审核意见'
          })
          return
        }
        if (this.auditOpinion === '700005') { //拒绝
          if (this.reason.getErrStatus()) {
            return false
          }
        }
        this.setState({
          showDialog: false,
          isTestRule: false
        })
        this.save()
      })
      return
    } else if (flag && flag === 'refresh') {
      this.setState({ [type]: false })
      location.reload()
    }
    this.auditOpinion = ''
    this.setState({
      showDialog: false,
      approveStatusDesc: false,
      isTestRule: false,
      isReject: false
    })*/
  }
  goIntentionQuery = () => {
    this.props.history.push({
      pathname: '/financingBusiness/intentionQuery',
      state: { status: 1 }
    })
  }
  goUserManage = () => {
    this.props.history.push('/clientManage/userManage')
  }
  goClientApprove = () => {
    this.props.history.push('/clientManage/clientApprove')
  }
  goClientAccount = () => {
    this.props.history.push('/clientManage/clientAccount')
  }
  saveInfo = () => {
    /* this.props.setCurrentPageOne()
     this.props.getTableList(this.props.searchInfo)*/
    this.setState({
      isTestRule: true
    }, () => {
      if (this.state.companyType === '100') {
        if (this.companyPeriod.getErrStatus() || this.orgCode.getErrStatus() || this.taxNo.getErrStatus() || this.period.getErrStatus() || this.id.getErrStatus() || this.name.getErrStatus() || this.idType.getErrStatus() || this.idPeriod.getErrStatus()) {
          console.log('有错')
        } else {
          if (!this.state.one) {
            this.setState({
              resoureId: true
            })
            return false
          }
          if (this.state.one) {
            this.setState({
              resoureId: false
            })
          }
          if (!this.state.two) {
            this.setState({
              orginId: true
            })
            return false
          }
          if (this.state.two) {
            this.setState({
              orginId: false
            })
          }
          if (!this.state.three) {
            this.setState({
              admitId: true
            })
            return false
          }
          if (this.state.three) {
            this.setState({
              admitId: false
            })
          }
          if (!this.state.agree) {
            this.setState({
              agreeCheck: true
            })
            return false
          }
          if (this.state.agree) {
            this.setState({
              agreeCheck: false
            })
          }
          this.setState({ isTestRule: false });
          (async () => {
            let resposeData = await saveRequest({
              path: '/fund/openAccount',
              method: 'POST',
              param: this.props.infor
            })
            if (resposeData.data.respCode === '000000') {
              this.setState({ showDialog: false })
              let orderBtns = [
                { label: '知道了', state: 'saveOrder', className: 'rob-btn-danger rob-btn-circle' }
              ]
              let tempContent = (
                <div>
                  <div style={{ marginBottom: '22px', fontSize: '14px' }}>开通申请提交成功</div>
                  <div style={{ marginBottom: '20px', fontSize: '14px' }}>您已成功提交理财账户开通的申请，请耐心等待，预计1个工作日将完成审核</div>
                  <div style={{ marginBottom: '', fontSize: '12px' }}>审核成功后将可以转入资金进行投资</div>
                </div>
              )
              this.setState({
                alertTitle: '开通申请提交成功！',
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
      } else if (this.state.companyType === '200') {
        if (this.companyPeriod.getErrStatus() || this.orgCode.getErrStatus() || this.taxNo.getErrStatus() || this.idPeriod.getErrStatus()) {
          console.log('有错')
        } else {
          if (!this.state.one) {
            this.setState({
              resoureId: true
            })
            return false
          }
          if (this.state.one) {
            this.setState({
              resoureId: false
            })
          }
          if (!this.state.two) {
            this.setState({
              orginId: true
            })
            return false
          }
          if (this.state.two) {
            this.setState({
              orginId: false
            })
          }
          if (!this.state.three) {
            this.setState({
              admitId: true
            })
            return false
          }
          if (this.state.three) {
            this.setState({
              admitId: false
            })
          }
          if (!this.state.agree) {
            this.setState({
              agreeCheck: true
            })
            return false
          }
          if (this.state.agree) {
            this.setState({
              agreeCheck: false
            })
          }
          this.setState({ isTestRule: false });
          (async () => {
            let resposeData = await saveRequest({
              path: '/fund/openAccount',
              method: 'POST',
              param: this.props.infor
            })
            if (resposeData.data.respCode === '000000') {
              this.setState({ showDialog: false })
              let orderBtns = [
                { label: '确定', state: 'saveOrder', className: 'rob-btn-danger rob-btn-circle' }
              ]
              let tempContent = (
                <div>
                  <div style={{ marginBottom: '22px', fontSize: '14px' }}>开通申请提交成功</div>
                  <div style={{ marginBottom: '20px', fontSize: '14px' }}>您已成功提交理财账户开通的申请，请耐心等待，预计1个工作日将完成审核</div>
                  <div style={{ marginBottom: '', fontSize: '12px' }}>审核成功后将可以转入资金进行投资</div>
                </div>
              )
              this.setState({
                alertTitle: '开通申请提交成功！',
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
      }
    })
  }
  componentWillMount() {
    let userInfo = cookieStorage.getCookie('userInfo')
    if (JSON.stringify('userInfo') !== '{}') {
      this.setState({
        companyType: userInfo.companyType
      })
    }
  }
  render() {
    let upconfig = this.attachConfig(),
      { attachments } = this.state
    let upconfig1 = this.attachConfig1(),
      { attachments1 } = this.state
    let upconfig2 = this.attachConfig2(),
      { attachments2 } = this.state
    const { data = {} } = this.props,
      { EFEF_boardData = {} } = data
    return (
      <div>
        {!this.props.hideInfo ? <div>
          <div className="rob-container-fluid qb-dashboard-g qb-box-tit-g">
            <div>* 市场有风险，投资需谨慎</div>
            <p className="fs22 text-center qb-box-tit-g__name"><span>融数宝</span> <span>每日计息</span> <span>灵活存取</span></p>
          </div>
          <div className="qb-listdesc-g__content qb-bg-white-g">
            <div className="qb-income-g">
              <span className="col-f83">昨日收益(元)</span>
              <span className="fs22 col-e72">{EFEF_boardData.yesterdayProfit ? EFEF_boardData.yesterdayProfit : '0.00'}</span>
              <span className="rob-col-lg-offset-4 rob-col-md-offset-4 rob-col-sm-offset-4">
                <button type="button" className="rob-btn rob-btn-danger rob-btn-circle mlr10 pd38" onClick={() => { this.delUser() }} >转入</button>
                <button type="button" className="rob-btn rob-btn-minor rob-btn-circle mlr10 pd38" onClick={() => { this.delUsers() }} >转出</button>
              </span>
            </div>
            <div className="rob-row qb-handle-g rob-no-gutters">
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-12 rob-col-xs-24">
                <div className="money_item">
                  <p>在投金额(元)</p>
                  <div>{EFEF_boardData.moneyInTransit ? formatMoneyYuan(EFEF_boardData.moneyInTransit) : '0.00'}</div>
                </div>
              </div>
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-12 rob-col-xs-24">
                <div className="money_item">
                  <p>累计收益(元)</p>
                  <div>{EFEF_boardData.totalGains ? EFEF_boardData.totalGains : '0.00'}</div>
                </div>
              </div>
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-12 rob-col-xs-24">
                <div className="money_item">
                  <p>万份收益(元)</p>
                  <div>{EFEF_boardData.averageProfit ? EFEF_boardData.averageProfit : '0.00'}</div>
                </div>
              </div>
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-12 rob-col-xs-24">
                <div className="money_item">
                  <p>七日年化收益率</p>
                  <div>{EFEF_boardData.profitInSevenDays ? EFEF_boardData.profitInSevenDays : '0.00'}</div>
                </div>
              </div>
            </div>
            <p style={{ color: '#8f8f8f', fontSize: '12px', marginTop: '20px', display: 'block' }}>注：万份收益、七日年化收益率最新数据统计时间截止至{EFEF_boardData.newTime ? timeStamp(EFEF_boardData.newTime, 3, 1) : null}</p>
          </div>
        </div> : null}
        <Dialog
          showCloseBtn
          showCover
          open={this.state.showDialog}
          onRequestClose={(flag) => this.handleClose(flag, 'showDialog')}
          titleClassName="rob-alert-title rob-alert-title-color"
          content={<div className="rob-alert alert-form rob-alert-dismissible">
            <button type="button" className="rob-alert-close" data-dismiss="rob-alert" aria-label="Close" onClick={() => this.handleClose(false, 'showDialog')} >
              <span aria-hidden="true">×</span>
            </button>
            <div className="rob-alert-title rob-alert-title-color text-center"> 提示</div>
            <div className="rob-alert-content">
              <h4 className="rob-form-group mb30 fs14 text-left plr10">首次购买需先开通理财账户，您还需补充以下资料：</h4>

              <div className="rob-row text-center qb-form-group-b10-g  qb-form-pd-g__xs-label">

                <div className="rob-form-group rob-col-lg-24">
                  <QBDatepicker
                    name="expectDate"
                    label="企业营业执照有效期"
                    required={!this.state.expectDate}
                    emptyMsg="请选择营业执照有效期"
                    placeholder="请选择有效期截止日"
                    errDirection="bottom"
                    inputClass="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24 fr"
                    labelClass="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg"
                    isRange={false}
                    dateFormat={'yyyy-mm-dd'}
                    handleSelect={item => {
                      this.props.updateOrderInfo({
                        licenseValidTime: item
                      })
                    }}
                    isTestRule={this.state.isTestRule}
                    ref={ref => this.companyPeriod = ref}
                  />
                </div>
                <div className="rob-form-group rob-col-lg-24">
                  <QBInput
                    name="amount"
                    type="money"
                    label="企业组织机构代码证"
                    errDirection="bottom"
                    inputClass="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24"
                    labelClass="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg"
                    required
                    pattern={/^[a-zA-Z0-9]{1,20}$/}
                    emptyMsg="请输入组织机构代码证号"
                    errorMsg="请输入正确的证件号码"
                    placeholder="请输入组织机构代码证号"
                    //isTestRule={}
                    isTestRule={this.state.isTestRule}
                    handleChange={val => {
                      this.props.updateOrderInfo({
                        orgCode: val
                      })
                    }}
                    ref={ref => this.orgCode = ref}
                  />
                </div>
                <div className="rob-form-group rob-col-lg-24">
                  <QBInput
                    name="amount"
                    type="money"
                    label="企业税务登记证"
                    errDirection="bottom"
                    inputClass="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24"
                    labelClass="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg"
                    required
                    pattern={/^[a-zA-Z0-9]{1,20}$/}
                    emptyMsg="请输入税务登记证号"
                    errorMsg="请输入正确的证件号码"
                    placeholder="请输入税务登记证号"
                    //isTestRule={}
                    isTestRule={this.state.isTestRule}
                    handleChange={val => {
                      this.props.updateOrderInfo({
                        taxNo: val
                      })
                    }}
                    ref={ref => this.taxNo = ref}
                  />
                </div>
                {this.state.companyType === '100' ? (<div><div className="rob-form-group rob-col-lg-24">
                  <QBInput
                    name="amount"
                    type="money"
                    label="法人姓名"
                    errDirection="bottom"
                    inputClass="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24"
                    labelClass="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg"
                    required
                    pattern={/^([\u4e00-\u9fa5]){2,7}$/}
                    errorMsg="请输入正确的姓名"
                    emptyMsg="请输入法人姓名"
                    placeholder="请输入姓名"
                    //isTestRule={}
                    isTestRule={this.state.isTestRule}
                    handleChange={val => {
                      this.props.updateOrderInfo({
                        legalUserName: val
                      })
                    }}
                    ref={ref => this.name = ref}
                  />
                </div>
                  <div className="rob-form-group rob-col-lg-24">
                    <QBInput
                      name="amount"
                      type="money"
                      label="法人证件"
                      errDirection="bottom"
                      inputClass="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24"
                      labelClass="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg"
                      required
                      pattern={/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/}
                      emptyMsg="请输入证件号码"
                      errorMsg="请输入正确的证件号码"
                      placeholder="请输入身份证号码"
                      //isTestRule={}
                      isTestRule={this.state.isTestRule}
                      handleChange={val => {
                        this.props.updateOrderInfo({
                          legalIdNo: val
                        })
                      }}
                      ref={ref => this.id = ref}
                    />
                  </div>
                  <div className="rob-form-group rob-col-lg-24">
                    <QBDatepicker
                      name="expectDate"
                      label="身份证有效期"
                      placeholder="请选择有效期截止日"
                      required={!this.state.expectDate}
                      emptyMsg="请选择身份证有效期"
                      errDirection="bottom"
                      inputClass="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24 fr"
                      labelClass="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg"
                      isRange={false}
                      dateFormat={'yyyy-mm-dd'}
                      handleSelect={item => {
                        this.props.updateOrderInfo({
                          legalIdValidTime: item // eslint-disable-line
                        })
                      }}
                      isTestRule={this.state.isTestRule}
                      ref={ref => this.period = ref}
                    />
                  </div>
                  <div className="rob-form-group rob-col-lg-24">
                    <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg">
                      <label className="rob-input-label">操作人：
                      </label>
                    </div>
                    <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24">
                      <div className="rob-row">
                        <div className="rob-col-lg-10 rob-col-md-10 rob-col-sm-10 rob-col-xs-10">
                          <QBSelect
                            name="payerId"
                            label=""
                            type="default"
                            isTestRule={this.state.isTestRule}
                            //label="付款方账户名称"
                            required
                            placeholder="请选择操作人"
                            errorMsg="请输入详细地址"
                            isError={!this.state.isTestRule}
                            emptyMsg="请选择操作人"
                            errDirection="bottom"
                            inputClass="rob-col-lg-24 rob-col-md-24 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg qb-no-padding-lf"
                            options={this.state.data}
                            handleSelect={item => {
                              this.props.updateOrderInfo({
                                operaterId: item.value,
                              })
                              this.setState({
                                show: true,
                                name: item.userName,
                                id: item.identityNo
                              })
                            }}
                            ref={ref => this.idType = ref}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.show ?
                    <div className="rob-form-group rob-col-lg-24">
                      <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg" />
                      <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24 fr text-left">
                        <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left qb-no-padding-rg text-left">姓名</div>
                        <div className="rob-col-lg-20 rob-col-md-20 rob-col-sm-20 rob-col-xs-24 fr text-left">{this.state.name}</div>
                      </div>
                    </div> : null}
                  {this.state.show ?
                    <div className="rob-form-group rob-col-lg-24">
                      <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg" />
                      <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24 fr text-left">
                        <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left qb-no-padding-rg text-left">身份证号</div>
                        <div className="rob-col-lg-20 rob-col-md-20 rob-col-sm-20 rob-col-xs-24 fr text-left">{this.state.id}</div>
                      </div>
                    </div> : null }</div>) : null}
                {this.state.companyType === '200' ? <div><div className="rob-form-group rob-col-lg-24">
                  <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg" >操作人：</div>
                  <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24 fr text-left">
                    <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left qb-no-padding-rg text-left">姓名</div>
                    <div className="rob-col-lg-20 rob-col-md-20 rob-col-sm-20 rob-col-xs-24 fr text-left">{this.state.name}</div>
                  </div>
                </div>
                  <div className="rob-form-group rob-col-lg-24">
                    <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg" />
                    <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24 fr text-left">
                      <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left qb-no-padding-rg text-left">身份证号</div>
                      <div className="rob-col-lg-20 rob-col-md-20 rob-col-sm-20 rob-col-xs-24 fr text-left">{this.state.id}</div>
                    </div>
                  </div></div> : null}
                <div className="rob-form-group rob-col-lg-24">
                  <QBDatepicker
                    name="expectDate"
                    label="身份证有效期"
                    placeholder="请选择有效期截止日"
                    required={!this.state.expectDate}
                    emptyMsg="请选择身份证有效期"
                    errDirection="bottom"
                    inputClass="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24 fr"
                    labelClass="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg"
                    isRange={false}
                    dateFormat={'yyyy-mm-dd'}
                    handleSelect={item => {
                      this.props.updateOrderInfo({
                        operaterIdValidTime: item // eslint-disable-line
                      })
                    }}
                    isTestRule={this.state.isTestRule}
                    ref={ref => this.idPeriod = ref}
                  />
                </div>
                <div className="rob-form-group rob-col-lg-24">
                  <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24 text-left qb-no-padding-rg">
                    <label className="rob-input-label">其他附件：
                    </label>
                  </div>
                  <div className="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24">
                    <div className="rob-form-group ">
                      <div className="rob-upload qb-container-g__upload up-lable-center">
                        {attachments === '' ?
                          <Upload {...upconfig}>
                            <div className="rob-upload-card ">
                              <div className="rob-upload-loading" style={{ display: this.state.fileLoading ? 'block' : 'none' }}>
                                上传中<span className="dotting" />
                              </div>
                              <i className="rob-icon-delete rob-upload-close" />
                              <div className="rob-upload-card-type rob-upload-add">
                                <i className="qb-icon-rob-icon-plus" />
                                <div className="fileimg" />
                              </div>
                            </div>
                          </Upload> :
                          <span className="rob-upload-card" style={{ minHeight: '100px' }}>
                            <div className="rob-upload-loading" style={{ display: this.state.fileLoading ? 'block' : 'none' }}>
                              上传中<span className="dotting" />
                            </div>
                            <img onClick={() => { this.openImg(attachments) }} src={attachments} className="qb-up_img-g" alt="" />
                            <Upload {...upconfig}>
                              <span className="qb-up_img-g__titile">重新上传</span>
                            </Upload>
                          </span>
                        }
                        <lable className="rob-fileimgtext text-center lh40">
                            企业税务登记证
                        </lable>
                        {this.state.resoureId ? <div className="qb-red-g text-left">
                          <p>请上传企业税务登记证</p>
                        </div> : null}
                      </div>
                      <div className="rob-upload qb-container-g__upload up-lable-center">
                        {attachments1 === '' ?
                          <Upload {...upconfig1}>
                            <div className="rob-upload-card ">
                              <div className="rob-upload-loading" style={{ display: this.state.fileLoading1 ? 'block' : 'none' }}>
                                上传中<span className="dotting" />
                              </div>
                              <i className="rob-icon-delete rob-upload-close" />
                              <div className="rob-upload-card-type rob-upload-add">
                                <i className="qb-icon-rob-icon-plus" />
                                <div className="fileimg" />
                              </div>
                            </div>
                          </Upload> :
                          <span className="rob-upload-card" style={{ minHeight: '100px' }}>
                            <div className="rob-upload-loading" style={{ display: this.state.fileLoading1 ? 'block' : 'none' }}>
                              上传中<span className="dotting" />
                            </div>
                            <img onClick={() => { this.openImg(attachments1) }} src={attachments1} className="qb-up_img-g" alt="" />
                            <Upload {...upconfig1}>
                              <span className="qb-up_img-g__titile">重新上传</span>
                            </Upload>
                          </span>
                        }
                        <lable className="rob-fileimgtext text-center lh40">
                            企业组织机构代码证
                        </lable>
                        {this.state.orginId ? <div className="qb-red-g text-left">
                          <p>请上传企业组织机构代码证</p>
                        </div> : null}
                      </div>
                      <div className="rob-upload qb-container-g__upload up-lable-center">
                        {attachments2 === '' ?
                          <Upload {...upconfig2}>
                            <div className="rob-upload-card ">
                              <div className="rob-upload-loading" style={{ display: this.state.fileLoading2 ? 'block' : 'none' }}>
                                上传中<span className="dotting" />
                              </div>
                              <i className="rob-icon-delete rob-upload-close" />
                              <div className="rob-upload-card-type rob-upload-add">
                                <i className="qb-icon-rob-icon-plus" />
                                <div className="fileimg" />
                              </div>
                            </div>
                          </Upload> :
                          <span className="rob-upload-card" style={{ minHeight: '100px' }}>
                            <div className="rob-upload-loading" style={{ display: this.state.fileLoading2 ? 'block' : 'none' }}>
                              上传中<span className="dotting" />
                            </div>
                            <img onClick={() => { this.openImg(attachments2) }} src={attachments2} className="qb-up_img-g" alt="" />
                            <Upload {...upconfig2}>
                              <span className="qb-up_img-g__titile">重新上传</span>
                            </Upload>
                          </span>
                        }
                        <lable className="rob-fileimgtext text-center lh40">
                            银行账户证明文件
                        </lable>
                        {this.state.admitId ? <div className="qb-red-g text-left">
                          <p>请上传银行账户证明文件</p>
                        </div> : null}
                      </div>
                    </div>
                    <div className="text-left">
                      <p>{'(请添加清晰的附件图片，格式需为png/jpg/jpeg, 大小<5M)'}</p>
                    </div>
                  </div>
                </div>
                <div className="rob-form-group rob-col-lg-24">
                  <input
                    id="savePayInfo"
                    type="checkbox"
                    checked={this.state.isSavaPayInfo}
                    className="rob-checkbox-filled-in rob-checkbox-bordered"
                    onChange={() => this.setState({
                      isSavaPayInfo: !this.state.isSavaPayInfo
                    }, () => {
                      /*this.props.updateOrderInfo({
                        autosave: this.state.isSavaPayInfo ? 1 : 0
                      })*/
                      if (this.state.isSavaPayInfo) {
                        this.setState({
                          agree: true,
                          agreeCheck: false
                        })
                      } else {
                        this.setState({
                          agree: false,
                          agreeCheck: true
                        })
                      }
                    })}
                  />
                  <label htmlFor="savePayInfo">勾选表示您已阅读并同意<Link to="/otherInfo/agreement" target="_blank">《融数宝服务协议》</Link></label>
                  <div className="qb-red-g">
                    {this.state.agreeCheck ? <p>请先勾选相关协议</p> : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="rob-alert-button rob-alert-button-45">
              <button type="button" className="rob-btn rob-btn-danger rob-btn-circle " onClick={() => { this.setState({ isTestRule: true }, () => this.saveInfo()) }} >提交
              </button>
            </div>
          </div>}
          actionClassName="rob-alert-button-color"
        />
        <Dialog
          showCover
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div >
    )
  }
}
Board.propTypes = {
  data: PropTypes.object,
  infor: PropTypes.object,
  history: PropTypes.object,
  getNum: PropTypes.func,
  getLoginInfo: PropTypes.func,
  updateOrderInfo: PropTypes.func,
  hideInfo: PropTypes.bool
}
Board.defaultProps = {
  data: {},
  infor: {},
  history: {},
  getNum: () => { },
  updateOrderInfo: () => { },
  getLoginInfo: () => { },
  hideInfo: false
}
export default connect(state => ({
  data: state.listQuery,
  infor: state.listQuery && state.listQuery.EFEF_orderInfo,
  //data: state.listQuery
}), dispatch => ({
  updateOrderInfo: bindActionCreators(action.EFEF_updateOrderInfo, dispatch),
  getNum: bindActionCreators(action.EFEF_getNum, dispatch),
  getLoginInfo: bindActionCreators(action.EFEF_getLoginInfo, dispatch)
}), null, { withRef: true })(Board)