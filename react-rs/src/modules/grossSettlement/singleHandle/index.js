/**
 * 单笔经办
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dialog from 'react-robotUI/dialog'
import saveRequest from 'utils/getRequest'
import cookieStorage from 'utils/cookieStorage'
import { Ukey } from 'utils'
import { trimAll, trimLeftAndRight } from 'utils/filterCommon'
import BusinessInfo from './components/businessInfo'
import PayeeInfo from './components/payeeInfo'
import VerificationInfo from './components/VerificationInfo'
class SingleHandle extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      companyType: '100'
    }
  }
  userInfo = {}
  componentWillMount() {
    let userInfo = cookieStorage.getCookie('userInfo')
    if (JSON.stringify('userInfo') !== '{}') {
      this.setState({
        companyType: userInfo.companyType
      })
    }
    this.userInfo = cookieStorage.getCookie('userInfo')
  }
  /* check 是否为ukey用户 */
  checkUkey = () => {
    if (this.userInfo.isCfcaUser === '1') {
      let _ukey = new Ukey()
      if (_ukey.isBrowserSupport === false) { // 判断浏览器支持
        this.formatAlertInfo('您的浏览器不支持UKEY', 'bg_icon qb-icon-fail')
        return false
      }
      let cert = _ukey.selectSignCert() // 判断Ukey是否插入
      if (!cert.isSuccess) {
        this.formatAlertInfo('请插入唯一Ukey', 'bg_icon qb-icon-fail')
        return false
      }
    }
    return true
  }
  /* check money */
  submitBtn = async () => {
    // let checkUkey = this.checkUkey()
    // if (!checkUkey) return false
    let getBusinessErr, getPayeeErr, getRuleInfo, getAvailableBalance
    getBusinessErr = await this.getBusinessErr.wrappedInstance.getError()
    getPayeeErr = await this.getPayeeErr.wrappedInstance.getError()
    if (getBusinessErr || getPayeeErr) return false
    getRuleInfo = await this.getBusinessErr.wrappedInstance.getRuleInfo()
    if (getRuleInfo.highLimitAmount && this.props.orderInfo.amount > getRuleInfo.highLimitAmount) {
      this.formatAlertInfo('经办金额不能高于业务规则中的上限，请核对', 'bg_icon qb-icon-fail')
      return false
    }
    if (getRuleInfo.lowLimitAmount && this.props.orderInfo.amount < getRuleInfo.lowLimitAmount) {
      this.formatAlertInfo('经办金额不能低于业务规则中的下限，请核对', 'bg_icon qb-icon-fail')
      return false
    }
    getAvailableBalance = await this.getBusinessErr.wrappedInstance.getAvailableBalance()
    if (this.props.orderInfo.amount > getAvailableBalance) {
      let warnMoneyBtns = [
        { label: '取消', state: 'checkMoneyCancel', className: 'rob-btn-minor rob-btn-circle' },
        { label: '确定', state: 'checkMoneyOk', className: 'rob-btn-danger rob-btn-circle' }
      ]
      this.setState({
        alertTitle: '',
        alertTitleClass: '',
        showAlert: true,
        showCloseBtn: true,
        alertContent: (<div style={{ color: 'red' }}>当前账户余额不足，是否确定经办？</div>),
        alertBtns: warnMoneyBtns,
        alertBtnsClass: 'rob-alert-button-color',
        alertType: ''
      })
    } else {
      this.saveInfo()
    }
  }
  /* 提交按钮事件 */
  saveInfo = () => {
    delete this.props.orderInfo.supplementUrl
    this.props.orderInfo.receiverAccountName = trimLeftAndRight(this.props.orderInfo.receiverAccountName)
    this.props.orderInfo.receiverAccountNo = trimAll(this.props.orderInfo.receiverAccountNo);
    (async () => {
      let resposeData = await saveRequest({
        path: '/payment/single/saveOrder',
        method: 'POST',
        param: this.props.orderInfo
      })
      if (resposeData.data.respCode === '000000') {
        let orderBtns = [
          { label: '确定', state: 'saveOrder', className: 'rob-btn-danger rob-btn-circle' }
        ]
        this.setState({
          alertTitle: '经办成功！',
          alertTitleClass: 'rob-alert-title rob-alert-title-color',
          showAlert: true,
          showCloseBtn: false,
          alertContent: '您的经办申请已提交，请耐心等待审批！',
          alertBtns: orderBtns,
          alertBtnsClass: 'rob-alert-button rob-alert-button-45',
          alertType: 'bg_icon qb-icon-success'
        })
      } else if (resposeData.data.respCode === '500006' || resposeData.data.respCode === '500007' || resposeData.data.respCode === '500008') {
        this.formatAlertInfo(resposeData.data.respMsg, 'bg_icon qb-icon-fail')
      }
    })()
  }
  /* format alert Info */
  formatAlertInfo = (text, type) => {
    this.setState({
      alertTitle: '',
      alertTitleClass: '',
      showAlert: true,
      showCloseBtn: false,
      alertContent: text,
      alertBtns: [
        { label: '确定', state: false, className: 'rob-btn-danger rob-btn-circle' }
      ],
      alertBtnsClass: 'rob-alert-button-color rob-alert-button-45',
      alertType: type
    })
  }
  /* 关闭弹出框事件 */
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'saveOrder') {
      this.props.history.push('/grossSettlement/searchSingleHandle')
    }
    if (type === 'checkMoneyOk') {
      this.saveInfo()
    }
    if (type === 'goTodetailPerson') {
      this.props.history.push({
        pathname: '/grossSettlement/singleDetailPerson',
        state: { query: this.props.params.reverseData || this.props.orderInfo }
      })
    }
  }
  /* 小B企业下一步点击事件 */
  goToSingleDetail = async () => {
    let getBusinessErr = await this.getBusinessErr.wrappedInstance.getError()
    let getPayeeErr = await this.getPayeeErr.wrappedInstance.getError()
    if (getBusinessErr || getPayeeErr) return false
    let getRuleInfo = await this.getBusinessErr.wrappedInstance.getRuleInfo()
    if (getRuleInfo.highLimitAmount && this.props.orderInfo.amount > getRuleInfo.highLimitAmount) {
      this.formatAlertInfo('经办金额不能高于业务规则中的上限，请核对', 'bg_icon qb-icon-fail')
      return false
    }
    if (getRuleInfo.lowLimitAmount && this.props.orderInfo.amount < getRuleInfo.lowLimitAmount) {
      this.formatAlertInfo('经办金额不能低于业务规则中的下限，请核对', 'bg_icon qb-icon-fail')
      return false
    }
    let getAvailableBalance = await this.getBusinessErr.wrappedInstance.getAvailableBalance()
    if (this.props.orderInfo.amount > getAvailableBalance) {
      let warnMoneyBtns = [
        { label: '取消', state: 'checkMoneyCancel', className: 'rob-btn-minor rob-btn-circle' },
        { label: '确定', state: 'goTodetailPerson', className: 'rob-btn-danger rob-btn-circle' }
      ]
      this.setState({
        alertTitle: '',
        alertTitleClass: '',
        showAlert: true,
        showCloseBtn: true,
        alertContent: (<div style={{ color: 'red' }}>当前账户余额不足，是否确定经办？</div>),
        alertBtns: warnMoneyBtns,
        alertBtnsClass: 'rob-alert-button-color',
        alertType: ''
      })
    } else {
      this.props.history.push({
        pathname: '/grossSettlement/singleDetailPerson',
        state: { query: this.props.orderInfo }
      })
    }
  }
  render() {
    return (
      <div className="qb-form-group-b10-g">
        <div className="qb-panel-g qb-media-height">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />支付结算</li>
              <li className="active">单笔经办</li>
            </ol>
          </div>
          {
            /**
            * 业务信息
            */
          }
          <div>
            <div className="qb-listdesc-g__header bd-top0">
              业务信息
            </div>
            <div className="qb-time-line-g rob-form-group">
              <BusinessInfo
                companyType={this.state.companyType}
                history={this.props.history}
                params={this.props.params}
                ref={ref => this.getBusinessErr = ref}
              />
            </div>
          </div>
          {
            /**
              * 收款方信息
              */
          }
          <div>
            <div className="qb-listdesc-g__header">
              收款方信息
            </div>
            <div className="qb-time-line-g rob-form-group" style={{ padding: '0' }}>
              <PayeeInfo
                params={this.props.params}
                ref={ref => this.getPayeeErr = ref}
              />
            </div>
          </div>
          {
            /**
              * 大B非ukey用户
              */
          }
          {this.state.companyType === '100' && this.userInfo.isCfcaUser === '2' ? <div>
            <div className="qb-listdesc-g__header">
              短信验证码
            </div>
            <div className="qb-time-line-g rob-form-group" style={{ padding: '0' }}>
              <VerificationInfo submit={this.submitBtn} />
            </div>
          </div> : <div className="qb-form-footButton-g clearfix " style={{ marginBottom: '-10px' }}>
            <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              {this.state.companyType === '100' && this.userInfo.isCfcaUser === '1' ? <button
                className="rob-btn rob-btn-danger rob-btn-circle"
                type="button"
                onClick={this.submitBtn}
              >
                经办
              </button> : null}
              {this.state.companyType === '200' ? <button
                className="rob-btn rob-btn-danger rob-btn-circle"
                type="button"
                onClick={this.goToSingleDetail}
              >
                下一步
              </button> : null}
            </div>
          </div>}
        </div>
        <Dialog
          showCover
          open={this.state.showAlert}
          showCloseBtn={this.state.showCloseBtn}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={this.alertClose}
          title={this.state.alertTitle}
          titleClassName={this.state.alertTitleClass}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
}
SingleHandle.propTypes = {
  params: PropTypes.object,
  history: PropTypes.object,
  orderInfo: PropTypes.object
}
SingleHandle.defaultProps = {
  params: {},
  history: {},
  orderInfo: {}
}

export default connect(state => ({
  orderInfo: state.singleHandleInfo && state.singleHandleInfo.orderInfo
}))(SingleHandle)