/**
 * 业务信息部分
 * （单笔经办）
 */
import React, { PureComponent } from 'react'
import QBInput from 'components/QBInput'
import PropTypes from 'prop-types'
import QBSelect from 'components/QBSelect'
import QBDatepicker from 'components/QBDatePicker'
import QBTextarea from 'components/QBTextarea'
import Dialog from 'react-robotUI/dialog'
import Upload from 'rc-upload'
import request from 'utils/getRequest'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { formatMoneyYuan } from 'utils/filterCommon'
import * as actions from '../redux/actions'
import '../redux/reducer'
import config from '../../../../config'

class BusinessInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
    this.openImg = (url) => {
      window.open(url, '_blank')
    }
    this.state = {
      showBalanceInfo: false,
      attachments: '',
      purpose: '',
      fileLoading: false,
      showCover: false,
      tempRuleId: {},
      isTestRule: false,
      isAddPuroseRule: false,
      accBalanceInfo: {},
      expectDate: true
    }
  }
  /* 附件上传 */
  attachConfig = () => {
    let _this = this
    return {
      action: config.file(),
      data: config.fileParam,
      multiple: true,
      onSuccess(ret) {
        _this.state.attachments = ret.body.fileUrl
        _this.setState({
          power: true,
          fileLoading: false,
          attachments: _this.state.attachments
        })
        _this.props.updateOrderInfo({
          supplementCode: ret.body.fileId,
          supplementUrl: ret.body.fileUrl
        })
      },
      onError(err) {
        console.error('上传失败', err)
      },
      beforeUpload(file) {
        return new Promise((resolve) => {
          let fileSize = file.size
          if (!(/(?:jpg|png|jpeg)$/i.test(file.name))) {
            _this.formatAlertInfo('只允许上传jpg、png、jpeg格式的图片', 'bg_icon qb-icon-fail')
            return false
          }
          if (fileSize > 5 * 1024 * 1024) {
            _this.formatAlertInfo('图片大小不超过5MB', 'bg_icon qb-icon-fail')
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
  componentWillMount() {
    this.props.updateOrderInfo({
      bizType: '100',
      expectDate: '',
      summary: '',
      supplementCode: ''
    })
    this.props.getPayerList().then((res) => {
      if (res.data.respCode === '000000') {
        this.payerId.setValue(this.props.payerlist[0])
      }
    })
    if (!this.props.params.reverseData) {
      this.props.getBizRuleType()
      this.props.getPurposeList();
      (async () => {
        let outSerialData = await request({
          path: '/generic/getOutSerialNo',
          method: 'POST',
          param: { bizType: '201000' }
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
    let { params = {} } = this.props,
      { reverseData = {} } = params
    this.props.getBizRuleType().then((res) => {
      if (res.data.respCode === '000000') {
        if (reverseData.refBizRuleName) {
          this.refBizRule.setValue({ text: reverseData.refBizRuleName, value: reverseData.refBizRuleCode })
        }
      }
    })
    this.props.getPurposeList().then((res) => {
      if (res.data.respCode === '000000') {
        if (reverseData.purpose) {
          for (let i = 0; i < res.data.body.length; i++) {
            let curData = res.data.body[i]
            if (reverseData.purpose === curData.text) {
              this.purpose.setValue(curData)
            }
          }
        }
      }
    })
    if (reverseData.outSerialNo) {
      this.outSerialNo.setValue(reverseData.outSerialNo)
    }
    if (reverseData.amount) {
      this.amount.setValue(reverseData.amount / 100)
    }
    if (reverseData.expectDate) {
      this.setState({ expectDate: false }, () => {
        this.expectDate.setHour(reverseData.expectDate)
      })
      this.props.updateOrderInfo({
        expectDate: reverseData.expectDate
      })
    }
    if (reverseData.supplementUrl) {
      this.setState({
        attachments: reverseData.supplementUrl
      })
      this.props.updateOrderInfo({
        supplementCode: reverseData.supplementCode,
        supplementUrl: reverseData.supplementUrl
      })
    }
    if (reverseData.summary) {
      this.summary.setValue(reverseData.summary)
      this.props.updateOrderInfo({
        summary: reverseData.summary
      })
    }
  }
  getError = async () => {
    if (this.state.showAddPurpose) {
      this.setState({
        isAddPuroseRule: true
      }, () => {
        if (!this.receiverAccountName.getErrStatus()) {
          (async () => {
            let resData = await request({
              path: '/purpose/saveInfo',
              method: 'POST',
              param: { useType: this.state.purpose }
            })
            if (resData.data.respCode === '000000') {
              this.props.getPurposeList().then((res) => {
                if (res.data.body) {
                  res.data.body.forEach((item) => {
                    if (item.userType === this.state.purpose) {
                      this.purpose.setValue({ text: item.text, value: item.value })
                      this.props.updateOrderInfo({
                        purpose: item.text
                      })
                    }
                  })
                }
                this.setState({ purpose: '', showAddPurpose: false, isTestRule: true }, () => {
                  if (!this.payerId.getErrStatus() &&
                    (this.props.companyType === '100' ? !this.refBizRule.getErrStatus() : true) &&
                    (!this.state.expectDate ? !this.expectDate.getErrStatus() : true) &&
                    !this.amount.getErrStatus() &&
                    !this.purpose.getErrStatus() &&
                    !this.outSerialNo.getErrStatus() &&
                    !this.summary.getErrStatus()) return false
                })
              })
            }
          })()
        }
      })
    } else {
      await this.setState({ isTestRule: true })
      if (!this.payerId.getErrStatus() &&
        (this.props.companyType === '100' ? !this.refBizRule.getErrStatus() : true) &&
        (!this.state.expectDate ? !this.expectDate.getErrStatus() : true) &&
        !this.amount.getErrStatus() &&
        !this.purpose.getErrStatus() &&
        !this.outSerialNo.getErrStatus() &&
        !this.summary.getErrStatus()) return false
    }
    return true
  }
  getAvailableBalance = () => this.state.accBalanceInfo.availableBalance
  getRuleInfo = () => this.state.tempRuleId
  /* format alert Info */
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
  /* 关闭alert弹出框 */
  alertClose = () => {
    this.setState({ showAlert: false })
  }
  addPurose = () => {
    this.setState({
      isAddPuroseRule: true
    }, () => {
      if (!this.receiverAccountName.getErrStatus()) {
        (async () => {
          let resData = await request({
            path: '/purpose/saveInfo',
            method: 'POST',
            param: { useType: this.state.purpose }
          })
          if (resData.data.respCode === '000000') {
            this.formatAlertInfo('保存成功！', 'bg_icon qb-icon-success')
            this.props.getPurposeList().then((res) => {
              if (res.data.body) {
                res.data.body.forEach((item) => {
                  if (item.userType === this.state.purpose) {
                    this.purpose.setValue({ text: item.text, value: item.value })
                    this.props.updateOrderInfo({
                      purpose: item.text
                    })
                  }
                })
              }
              this.setState({ purpose: '', showAddPurpose: false })
            })
          }
        })()
      }
    })
  }
  render() {
    let upconfig = this.attachConfig(),
      { attachments } = this.state,
      { bizRuleList = [] } = this.props
    return (
      <div className="qb-form-group-g">
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
                payerAccountNo: item.virtualAccountNo
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
            <div className="rob-form-group rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
                <label htmlFor="inputEmail3" className="rob-input-label " />
              </div>
              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24">
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
        {this.props.companyType === '100' ? <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
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
              this.setState({ tempRuleId: item })
              this.props.updateOrderInfo({
                refBizRuleCode: item.ruleCode,
                refBizRuleName: item.ruleName
              })
            }}
            ref={ref => this.refBizRule = ref}
          />
          {this.state.tempRuleId.id ? <span
            className="qb-form-group-buttonbox"
            style={{ right: '0px' }}
            onClick={() => {
              sessionStorage.setItem('ruleId', this.state.tempRuleId.id)
              window.open('/otherInfo/ruleDetails')
            }}
          >
            <i className="qb-icon-details" />
          </span> : ''}
        </div> : null}
        <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
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
        <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
          <QBInput
            name="amount"
            type="money"
            label="金额（元）"
            errDirection="bottom"
            inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
            required
            pattern={/^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}[1-9]{1}$|^0\.{1}[1-9]{1}\d{1}$|^0\.{1}\d{1}[1-9]{1}$/}
            errorMsg="请输入整数不超过10位，小数不超过2位的金额"
            placeholder="请输入整数不超过10位，小数不超过2位的金额"
            isTestRule={this.state.isTestRule}
            handleChange={val => {
              this.props.updateOrderInfo({
                amount: Math.round(val * 100)
              })
            }}
            ref={ref => this.amount = ref}
          />
        </div>
        <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
          <QBSelect
            name="purpose"
            type="default"
            required
            isTestRule={this.state.isTestRule}
            label="用途"
            placeholder="请选择用途"
            errDirection="bottom"
            inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
            options={this.props.purPoseList}
            handleSelect={item => {
              if (item.id) {
                this.setState({ showAddPurpose: false })
                this.props.updateOrderInfo({
                  purpose: item.text
                })
              } else {
                this.setState({ showAddPurpose: true })
              }
            }}
            ref={ref => this.purpose = ref}
          />
        </div>
        {this.state.showAddPurpose ?
          <div className="rob-form-group rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
              <label htmlFor="inputEmail3" className="rob-input-label " />
            </div>
            <QBInput
              name="receiverAccountName"
              type="receiverAccountName"
              label=""
              containErrorIcon
              required
              pattern={/^[\S\s]{1,56}$/}
              errDirection="bottom"
              emptyMsg="请输入用途"
              placeholder="请输入用途"
              errorMsg="请输入1-56个字符"
              inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
              isTestRule={this.state.isAddPuroseRule}
              handleChange={val => {
                this.setState({ purpose: val })
              }}
              ref={ref => this.receiverAccountName = ref}
            />
            <span
              className="qb-form-group-buttonbox"
              style={{ right: '-30px' }}
              onClick={this.addPurose}
            >
              <button className="rob-btn rob-btn-danger rob-btn-circle" style={{ opacity: '1' }} type="button">保存</button>
            </span>
          </div> : ''}
        <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
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
        {!this.state.expectDate ? <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
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
        <div className="rob-form-group rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
            <label htmlFor="inputEmail3" className="rob-input-label ">附件：</label>
          </div>
          <div className="rob-col-md-5 rob-col-sm-5 rol-col-xs-24 text-left">
            <div className="rob-upload qb-container-g__upload">
              <div className="rob-upload qb-container-g__upload">
                {attachments === '' ?
                  <Upload {...upconfig}>
                    <div className="rob-upload-card">
                      <div className="rob-upload-loading" style={{ display: this.state.fileLoading ? 'block' : 'none' }}>
                        上传中<span className="dotting" />
                      </div>
                      <div className="rob-upload-card-type qb-icon-rob-icon-plus" style={{ paddingTop: '18px' }}>
                        {/* <i className="qb-icon-add" /> */}
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
              </div>
            </div>
          </div>
          <div className="rob-col-md-8 rob-col-sm-8 rol-col-xs-24 text-left text-overflow" style={{ lineHeight: '100px' }}>
            * 支持jpg,png,jpeg，大小5MB以内
          </div>
        </div>
        <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
          <QBTextarea
            label="摘要"
            inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
            errDirection="bottom"
            pattern={/^[\S\s]{1,140}$/}
            isTestRule={this.state.isTestRule}
            placeholder="请输入摘要"
            errorMsg="请输入1-140个任意字符"
            ref={ref => this.summary = ref}
            handleChange={val => {
              this.props.updateOrderInfo({
                summary: val
              })
            }}
          />
        </div>
        <Dialog
          showCover
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
}
BusinessInfo.propTypes = {
  history: PropTypes.object,
  companyType: PropTypes.string,
  params: PropTypes.object,
  isTestRule: PropTypes.bool,
  payerlist: PropTypes.array,
  orderInfo: PropTypes.object,
  bizRuleList: PropTypes.array,
  bizTypeList: PropTypes.array,
  purPoseList: PropTypes.array,
  getPayerList: PropTypes.func,
  updateOrderInfo: PropTypes.func,
  getBizRuleType: PropTypes.func,
  getPurposeList: PropTypes.func,
  getPayeeList: PropTypes.func
}
BusinessInfo.defaultProps = {
  history: {},
  companyType: '',
  params: {},
  isTestRule: false,
  payerlist: [],
  orderInfo: {},
  bizRuleList: [],
  bizTypeList: [],
  purPoseList: [],
  getPayerList: () => { },
  updateOrderInfo: () => { },
  getBizRuleType: () => { },
  getPurposeList: () => { },
  getPayeeList: () => { }
}
export default connect(state => ({
  payerlist: state.singleHandleInfo && state.singleHandleInfo.payerlist,
  orderInfo: state.singleHandleInfo && state.singleHandleInfo.orderInfo,
  bizRuleList: state.singleHandleInfo && state.singleHandleInfo.bizRuleList,
  bizTypeList: state.singleHandleInfo && state.singleHandleInfo.bizTypeList,
  purPoseList: state.singleHandleInfo && state.singleHandleInfo.purPoseList
}), dispatch => ({
  getPayerList: bindActionCreators(actions.getPayerList, dispatch),
  updateOrderInfo: bindActionCreators(actions.updateOrderInfo, dispatch),
  getBizRuleType: bindActionCreators(actions.getBizRuleType, dispatch),
  getPurposeList: bindActionCreators(actions.getPurposeList, dispatch),
  getPayeeList: bindActionCreators(actions.getPayeeList, dispatch)
}), null, { withRef: true })(BusinessInfo)

/**
 * payerId
 * refBizRule
 * bizType
 * amount
 * expectDate
 * supplementCode
 * summary
 */