import React, { PureComponent } from 'react'
import QBInput from 'components/QBInput'
import PropTypes from 'prop-types'
import QBSelect from 'components/QBSelect'
import QBDatepicker from 'components/QBDatePicker'
import QBLoading from 'components/QBLoading'
import Dialog from 'react-robotUI/dialog'
import cookieStorage from 'utils/cookieStorage'
import { Ukey } from 'utils'
import Upload from 'rc-upload'
import saveRequest from 'utils/getRequest'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formatMoneyYuan } from 'utils/filterCommon'
import VerificationInfo from './VerificationInfo'
import * as actions from '../redux/actions'
import '../redux/reducer'
import config from '../../../../config'

class Content extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showBalanceInfo: false,
      attachments: {
        failureCount: 0,
        successCount: 0,
        totalCount: 0
      },
      fileLoading: false,
      filePath: '',
      tempRule: {},
      isTestRule: false,
      accBalanceInfo: {},
      expectDate: true,
      uploadFileSucc: false,
      companyType: '100'
    }
  }
  userInfo = {}
  componentWillMount() {
    this.props.updateOrderInfo({
      expectDate: ''
    })
    this.props.getPayerList().then((res) => {
      if (res.data.respCode === '000000') {
        this.payerId.setValue(this.props.payerlist[0])
      }
    })
    let userInfo = cookieStorage.getCookie('userInfo')
    if (JSON.stringify('userInfo') !== '{}') {
      this.setState({
        companyType: userInfo.companyType
      })
    }
    this.userInfo = cookieStorage.getCookie('userInfo')
    if (!this.props.params.reverseData) {
      this.props.getBizRuleType();
      (async () => {
        let outSerialData = await saveRequest({
          path: '/generic/getOutSerialNo',
          method: 'POST',
          param: { bizType: '201500' }
        })
        if (outSerialData.data.respCode === '000000') {
          this.outSerialNo.setValue(outSerialData.data.body.outSerialNo)
        }
      })()
    }
  }
  componentDidMount() {
    this.writeBack()
  }
  // 小B反写
  writeBack = () => {
    let supplementCode = JSON.parse(sessionStorage.getItem('supplementCode'))
    let { params = {} } = this.props,
      { reverseData = {} } = params
    this.props.getBizRuleType().then((res) => {
      if (res.data.respCode === '000000') {
        if (reverseData.refBizRuleName) {
          this.refBizRule.setValue({ text: reverseData.refBizRuleName, value: reverseData.refBizRuleCode })
        }
      }
    })
    if (reverseData.outSerialNo) {
      this.outSerialNo.setValue(reverseData.outSerialNo)
    }
    if (reverseData.expectDate) {
      this.setState({ expectDate: false }, () => {
        this.expectDate.setHour(reverseData.expectDate)
      })
      this.props.updateOrderInfo({
        expectDate: reverseData.expectDate
      })
    }
    if (reverseData.payerAccountName && supplementCode) {
      this.setState({
        attachments: supplementCode.data,
        uploadFileSucc: true
      }, () => {
        this.supplementCode.setValue(supplementCode.name)
        this.totalCount.setValue(supplementCode.data.totalCount)
        this.successCount.setValue(supplementCode.data.successCount)
        this.failureCount.setValue(supplementCode.data.failureCount)
      })
    }
  }
  /* check 是否为ukey用户 */
  checkUkey = () => {
    const userInfo = cookieStorage.getCookie('userInfo')
    if (userInfo.isCfcaUser === '1') {
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
  /* 附件上传 */
  attachConfig = () => {
    let _this = this,
      _token = _this.userInfo.token
    return {
      action: config.file('/payment/batch/importInfo'),
      data: Object.assign(config.fileParam, { token: _token }),
      multiple: true,
      onSuccess(ret) {
        if (ret.respCode === '000000') {
          _this.state.attachments = ret.body
          _this.setState({
            power: true,
            attachments: _this.state.attachments,
            uploadFileSucc: true
          })
          _this.supplementCode.setValue(_this.state.filePath)
          _this.totalCount.setValue(ret.body.totalCount)
          _this.successCount.setValue(ret.body.successCount)
          _this.failureCount.setValue(ret.body.failureCount)
          _this.props.updateOrderInfo({
            serialNo: _this.state.attachments.serialNo
          })
          sessionStorage.setItem('supplementCode', JSON.stringify({ data: ret.body, name: _this.state.filePath }))
        } else if (ret.respCode === '500001' || ret.respCode === '500002' || ret.respCode === '500003' || ret.respCode === '500004' || ret.respCode === '500005') {
          _this.formatAlertInfo(ret.respMsg, 'bg_icon qb-icon-fail')
        }
        _this.setState({
          fileLoading: false
        })
      },
      onError(err) {
        console.error('上传失败', err)
      },
      beforeUpload(file) {
        return new Promise((resolve) => {
          let fileSize = file.size
          if (!(/(?:xls|xlsx)$/i.test(file.name))) {
            _this.formatAlertInfo('请上传模板格式附件', 'bg_icon qb-icon-fail')
            return false
          }
          if (fileSize > 1 * 1024 * 1024) {
            _this.formatAlertInfo('导入文件大小不能大于1M，请核对', 'bg_icon qb-icon-fail')
            return false
          }
          _this.setState({
            fileLoading: true,
            filePath: file.name
          })
          resolve(file)
        })
      },
      name: 'walletfile'
    }
  }
  /* format alert Info */
  formatAlertInfo = (text, type) => {
    this.setState({
      showAlert: true,
      alertContent: text,
      alertType: type,
      alertTitle: '',
      alertBtns: [
        { label: '确定', state: false, className: 'rob-btn-danger rob-btn-circle' }
      ],
      alertBtnsClass: 'rob-alert-button-color rob-alert-button-45'
    })
  }
  /* 点击经办按钮事件 */
  submitBtn = () => {
    // let checkUkey = this.checkUkey()
    // if (!checkUkey) return false
    this.setState({
      isTestRule: true
    }, () => {
      !this.payerId.getErrStatus() &&
        !this.refBizRule.getErrStatus() &&
        (!this.state.expectDate ? !this.expectDate.getErrStatus() : true) &&
        !this.outSerialNo.getErrStatus() &&
        !this.supplementCode.getErrStatus() ?
      this.checkMoney() : null
    })
  }
  /* before submit */
  checkMoney = () => {
    if (this.state.companyType === '100' && this.state.tempRule.highLimitAmount && this.state.attachments.successAmount > this.state.tempRule.highLimitAmount) {
      this.formatAlertInfo('经办金额不能高于业务规则中的上限，请核对', 'bg_icon qb-icon-fail')
      return false
    }
    if (this.state.companyType === '100' && this.state.tempRule.lowLimitAmount && this.state.attachments.successAmount < this.state.tempRule.lowLimitAmount) {
      this.formatAlertInfo('经办金额不能低于业务规则中的下限，请核对', 'bg_icon qb-icon-fail')
      return false
    }
    if (this.state.accBalanceInfo.availableBalance < this.state.attachments.successAmount) {
      let warnMoneyBtns = [
        { label: '取消', state: 'checkMoneyCancel', className: 'rob-btn-minor rob-btn-circle' },
        { label: '确定', state: 'checkMoney', className: 'rob-btn-danger rob-btn-circle' }
      ]
      this.setState({
        alertTitle: '',
        alertTitleClass: '',
        showAlert: true,
        alertContent: (<div style={{ color: 'red' }}>当前账户余额不足，是否确定经办？</div>),
        alertBtns: warnMoneyBtns,
        alertBtnsClass: 'rob-alert-button-color',
        alertType: ''
      })
    } else {
      this.checkFailure()
    }
  }
  checkFailure = () => {
    if (this.state.attachments.successCount === 0) {
      let checkBtns = [
        { label: '确定', state: false, className: 'rob-btn-danger rob-btn-circle' }
      ]
      let checkContent = '导入数据无效，请修改后重新导入。'
      this.setState({
        alertTitle: '',
        alertTitleClass: '',
        showAlert: true,
        alertContent: checkContent,
        alertBtns: checkBtns,
        alertBtnsClass: 'rob-alert-button-color rob-alert-button-45',
        alertType: ''
      })
    } else if (this.state.attachments.failureCount > 0) {
      let checkBtns = [
        { label: '取消', state: false, className: 'rob-btn-minor rob-btn-circle' },
        { label: '确定', state: 'checkFailure', className: 'rob-btn-danger rob-btn-circle' }
      ]
      let checkContent = (
        <div>
          有导入失败的数据，确认只经办导入成功的数据吗？<br />
          若想经办所有，请更改失败数据后重新导入
        </div>
      )
      this.setState({
        alertTitle: '确认经办',
        alertTitleClass: 'rob-alert-title rob-alert-title-color',
        showAlert: true,
        alertContent: checkContent,
        alertBtns: checkBtns,
        alertBtnsClass: 'rob-alert-button rob-alert-button-45',
        alertType: ''
      })
    } else if (this.state.companyType === '100') {
      this.saveOrder()
    } else if (this.state.companyType === '200') {
      this.props.history.push({
        pathname: '/grossSettlement/batchDetailPerson',
        state: { query: this.props.orderInfo, serialNo: this.props.orderInfo.serialNo }
      })
    }
  }
  saveOrder = () => {
    delete this.props.orderInfo.umbrellaAccountNo;
    (async () => {
      let resposeData = await saveRequest({
        path: '/payment/batch/saveOrder',
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
  /* 关闭alert弹出框 */
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'saveOrder') this.props.history.push('/grossSettlement/searchBatchHandle')
    if (type === 'checkMoney') {
      this.checkFailure()
    }
    if (type === 'checkFailure') {
      if (this.state.companyType === '100') {
        this.saveOrder()
      } else if (this.state.companyType === '200') {
        this.props.history.push({
          pathname: '/grossSettlement/batchDetailPerson',
          state: { query: this.props.orderInfo, serialNo: this.props.orderInfo.serialNo }
        })
      }
    }
  }
  /* 小B企业下一步点击事件 */
  goToBatchDetail = () => {
    this.setState({
      isTestRule: true
    }, () => {
      !this.payerId.getErrStatus() &&
        (!this.state.expectDate ? !this.expectDate.getErrStatus() : true) &&
        !this.outSerialNo.getErrStatus() &&
        !this.supplementCode.getErrStatus() ?
      this.checkMoney() : null
    })
  }
  /* 下载excel模块 */
  downloadExcel = () => {
    window.open(config.downloadExcel('batch'))
  }
  /* format alert Info */
  formatAlertInfo = (text, type) => {
    this.setState({
      alertTitle: '',
      alertTitleClass: '',
      showAlert: true,
      alertContent: text,
      alertBtns: [
        { label: '确定', state: false, className: 'rob-btn-danger rob-btn-circle' }
      ],
      alertBtnsClass: 'rob-alert-button-color rob-alert-button-45',
      alertType: type
    })
  }
  render() {
    let upconfig = this.attachConfig(),
      { bizRuleList = [] } = this.props
    return (
      <div>
        <div className="rob-form-group">
          <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <QBSelect
              name="payerId"
              type="default"
              isTestRule={this.state.isTestRule}
              label="付款方账户名称"
              required
              errDirection="bottom"
              inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
              options={this.props.payerlist}
              handleSelect={item => {
                this.props.updateOrderInfo({
                  payerAccountName: item.accountName,
                  payerAccountNo: item.virtualAccountNo,
                  umbrellaAccountNo: item.umbrellaAccountNo
                })
                this.setState({ accBalanceInfo: item })
              }}
              ref={ref => this.payerId = ref}
            />
            <span
              className="qb-form-group-buttonbox"
              style={{ right: '0px' }}
              onClick={() => {
                this.setState({
                  showBalanceInfo: !this.state.showBalanceInfo
                })
              }}
            >
              <i className="qb-icon-details" />
            </span>
          </div>
          {
            this.state.showBalanceInfo ? (
              <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
                  <label htmlFor="inputEmail3" className="rob-input-label " />
                </div>
                <div className="rob-form-group rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24">
                  <ul className="qb-money_list-g" style={{ display: 'block' }}>
                    <li>余额(元): {this.state.accBalanceInfo.accountBalance ? formatMoneyYuan(this.state.accBalanceInfo.accountBalance) : '0.00'}</li>
                    <li className="rob-row">
                      <div className="rob-col-md-12 rob-col-sm-12">可用余额(元): {this.state.accBalanceInfo.availableBalance ? formatMoneyYuan(this.state.accBalanceInfo.availableBalance) : '0.00'}</div>
                      <div className="rob-col-md-12 rob-col-sm-12">冻结余额(元): {this.state.accBalanceInfo.disabledBalance ? formatMoneyYuan(this.state.accBalanceInfo.disabledBalance) : '0.00'}</div>
                    </li>
                  </ul>
                </div>
              </div>
            ) : null
          }
          {this.state.companyType === '100' ? <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <QBSelect
              name="refBizRule"
              type="default"
              placeholder="请选择业务规则"
              isTestRule={this.state.isTestRule}
              label="业务规则"
              required
              errDirection="bottom"
              inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
              options={bizRuleList}
              handleOnFocus={() => {
                if (bizRuleList.length === 0) {
                  this.setState({
                    showAlert: true,
                    alertContent: '很抱歉，没有可用的业务规则，请管理员配置业务规则。',
                    alertType: '',
                    alertBtns: [
                      { label: '确定', state: false, className: 'rob-btn-danger rob-btn-circle' }
                    ],
                    alertBtnsClass: 'rob-alert-button-color rob-alert-button-45'
                  })
                }
              }}
              handleSelect={item => {
                this.setState({ tempRule: item })
                this.props.updateOrderInfo({
                  refBizRuleCode: item.ruleCode,
                  refBizRuleName: item.ruleName
                })
              }}
              ref={ref => this.refBizRule = ref}
            />
            {this.state.tempRule.id ? <span
              className="qb-form-group-buttonbox"
              style={{ right: '0px' }}
              onClick={() => {
                sessionStorage.setItem('ruleId', this.state.tempRule.id)
                window.open('/otherInfo/ruleDetails')
              }}
            >
              <i className="qb-icon-details" />
            </span> : ''}
          </div> : null}
          <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <QBInput
              name="outSerialNo"
              type="outSerialNo"
              label="业务参考号"
              errDirection="bottom"
              required
              pattern={/^[a-z,A-Z,\d]{1,21}$/}
              inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
              errorMsg="请输入1-21个数字、字母业务参考号"
              emptyMsg="请输入业务参考号"
              isTestRule={this.state.isTestRule}
              handleChange={val => {
                this.props.updateOrderInfo({
                  outSerialNo: val
                })
              }}
              ref={ref => this.outSerialNo = ref}
            />
          </div>
          <div className="rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
              <label className="rob-input-label">转账时间</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24">
              <input
                className="rob-radio-with-gap"
                name="group2"
                checked={this.state.expectDate}
                type="radio"
                id="test4"
                onChange={() => {
                  this.props.updateOrderInfo({
                    expectDate: ''
                  })
                  this.setState({
                    expectDate: true
                  })
                }}
              />
              <label htmlFor="test4">实时转账</label>
              <input
                className="rob-radio-with-gap"
                name="group2"
                checked={!this.state.expectDate}
                type="radio"
                id="test5"
                onChange={() => {
                  this.setState({
                    expectDate: false
                  })
                }}
              />
              <label htmlFor="test5">计划转账</label>
            </div>
          </div>
          {!this.state.expectDate ? <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <QBDatepicker
              name="expectDate"
              label="期望日"
              required={!this.state.expectDate}
              emptyMsg="期望日不能为空"
              errDirection="bottom"
              inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
              isRange={false}
              isWorkday
              isBeforeToday
              isShowHour
              dateFormat={'yyyy-mm-dd'}
              handleSelect={item => {
                this.props.updateOrderInfo({
                  expectDate: item // eslint-disable-line
                })
              }}
              isTestRule={this.state.isTestRule}
              ref={ref => this.expectDate = ref}
            />
          </div> : ''}
          <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <QBInput
              name="supplementCode"
              type="supplementCode"
              label="批量经办文件"
              disabled
              required
              errDirection="bottom"
              placeholder="请上传附件文件"
              inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
              isTestRule={this.state.isTestRule}
              handleChange={val => {
                console.log(val)
              }}
              ref={ref => this.supplementCode = ref}
            />
            <span
              className="qb-form-group-buttonbox"
              style={{ right: '-55px' }}
            >
              <Upload {...upconfig}>
                <button className="rob-btn rob-btn-danger rob-btn-circle" style={{ opacity: '1' }} type="button">导入文件</button>
              </Upload>
            </span>
            <span
              className="qb-form-group-buttonbox"
              style={{ right: '-165px' }}
              onClick={this.downloadExcel}
            >
              <button className="rob-btn rob-btn-minor rob-btn-circle" style={{ opacity: '1' }} type="button">
                下载导入模板
              </button>
            </span>
          </div>
          {this.state.uploadFileSucc ? <div>
            <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <QBInput
                name="totalCount"
                type="totalCount"
                label="总笔数"
                disabled
                inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
                isTestRule={this.state.isTestRule}
                handleChange={val => {
                  console.log(val)
                }}
                ref={ref => this.totalCount = ref}
              />
            </div>
            <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <QBInput
                name="successCount"
                type="successCount"
                label="成功笔数"
                disabled
                inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
                isTestRule={this.state.isTestRule}
                handleChange={val => {
                  console.log(val)
                }}
                ref={ref => this.successCount = ref}
              />
              {this.state.attachments.successCount > 0 ? <span
                className="qb-form-group-buttonbox"
                style={{ right: '-55px' }}
                onClick={() => {
                  sessionStorage.setItem('excelDetailState', JSON.stringify({ serialNo: this.props.orderInfo.serialNo, type: 10, model: 'batch' }))
                  window.open('/otherInfo/batchDetailList')
                }}
              >
                <button className="rob-btn rob-btn-danger rob-btn-circle" style={{ opacity: '1' }} type="button">查看明细</button>
              </span> : null}
            </div>
            <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <QBInput
                name="failureCount"
                type="failureCount"
                label="失败笔数"
                disabled
                inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
                isTestRule={this.state.isTestRule}
                handleChange={val => {
                  console.log(val)
                }}
                ref={ref => this.failureCount = ref}
              />
              {this.state.attachments.failureCount > 0 ? <span
                className="qb-form-group-buttonbox"
                style={{ right: '-55px' }}
                onClick={() => {
                  sessionStorage.setItem('excelDetailState', JSON.stringify({ serialNo: this.props.orderInfo.serialNo, type: 20, model: 'batch' }))
                  window.open('/otherInfo/batchDetailList')
                }}
              >
                <button className="rob-btn rob-btn-danger rob-btn-circle" style={{ opacity: '1' }} type="button">查看明细</button>
              </span> : null}
            </div>
          </div> : null}
        </div>
        {this.state.companyType === '100' && this.userInfo.isCfcaUser === '2' ?
          <VerificationInfo submit={this.submitBtn} /> :
          <div className="qb-form-footButton-g clearfix " style={{ marginBottom: '-20px' }}>
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
                onClick={this.goToBatchDetail}
              >
                下一步
              </button> : null}
            </div>
          </div>}
        <Dialog
          showCover
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          title={this.state.alertTitle}
          titleClassName={this.state.alertTitleClass}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
        <QBLoading showLoading={this.state.fileLoading} />
      </div>
    )
  }
}
Content.propTypes = {
  history: PropTypes.object,
  params: PropTypes.object,
  isTestRule: PropTypes.bool,
  payerlist: PropTypes.array,
  orderInfo: PropTypes.object,
  bizRuleList: PropTypes.array,
  getPayerList: PropTypes.func,
  updateOrderInfo: PropTypes.func,
  getBizRuleType: PropTypes.func
}
Content.defaultProps = {
  history: {},
  params: {},
  isTestRule: false,
  payerlist: [],
  orderInfo: {},
  bizRuleList: [],
  getPayerList: () => { },
  updateOrderInfo: () => { },
  getBizRuleType: () => { }
}
export default connect(state => ({
  payerlist: state.BatchHandleInfo && state.BatchHandleInfo.payerlist,
  orderInfo: state.BatchHandleInfo && state.BatchHandleInfo.orderInfo,
  bizRuleList: state.BatchHandleInfo && state.BatchHandleInfo.bizRuleList
}), dispatch => ({
  getPayerList: bindActionCreators(actions.getBatchHandlePayerList, dispatch),
  updateOrderInfo: bindActionCreators(actions.updateBatchHandleOrderInfo, dispatch),
  getBizRuleType: bindActionCreators(actions.getBatchHandleBizRuleType, dispatch)
}))(Content)

/**
 * payerId
 * refBizRule
 * bizType
 * amount
 * expectDate
 * supplementCode
 * summary
 */