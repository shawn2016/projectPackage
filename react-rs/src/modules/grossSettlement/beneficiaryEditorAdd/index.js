import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { trimAll, trimLeftAndRight } from 'utils/filterCommon'
import { connect } from 'react-redux'
import QBInput from 'components/QBInput'
import Dialog from 'react-robotUI/dialog'
import BankAndAddress from 'components/BankAndAddress'
import { Link } from 'react-router-dom'
import * as action from './redux/actions'
import './redux/reducer'

class BeneficiaryEditorAddPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      isShowErrorHint: false
    }
  }
  /* 初始化数据 */
  async componentWillMount() {
    if (this.props.params.id) {
      let resData = await this.props.getBeneficiaryEditorData({ id: this.props.params.id })
      const { data } = resData,
        { body } = data
      this.setState({ data: {
        ...this.state.data,
        id: body.id,
        receiverNo: body.receiverNo,
        recAccountName: body.recAccountName,
        recAcctNo: body.recAcctNo,
        recSettleBankName: body.recSettleBankName,
        recSettleBankNo: body.recSettleBankNo,
        recAccountProvince: body.recAccountProvince,
        recAccountCity: body.recAccontCity,
        recBankName: body.recBankName,
        recBankNo: body.recBankNo,
        recName: body.recName,
        recTel: body.recTel,
        recMail: body.recMail
      } })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.beneficiaryEditorData) {
      const { data } = nextProps,
        { beneficiaryEditorData } = data,
        { body } = beneficiaryEditorData
      this.recName.setValue(body.recName)
      this.recTel.setValue(body.recTel)
      this.recMail.setValue(body.recMail)
    }
  }
  /* 取消按钮事件 */
  cancelBtn = () => {
    this.props.history.push('/grossSettlement/beneficiaryEditor')
  }
  /* 保存按钮事件 */
  saveBeneficiaryInfo = async () => {
    const isHaveError = await this.errorCheckout()
    if (!isHaveError) {
      return
    }
    this.state.data.recAccountName = trimLeftAndRight(this.state.data.recAccountName)
    this.state.data.recAcctNo = trimAll(this.state.data.recAcctNo)
    let resData = await this.props.saveBeneficiaryEditorAddData(this.state.data)
    if (resData.data.respCode === '000000') {
      this.setState({
        showAlert: true,
        alertContent: '保存成功！',
        alertType: 'bg_icon qb-icon-success',
        alertStatus: true
      })
    }
  }
  // 关闭弹出框
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type) this.props.history.push('/grossSettlement/beneficiaryEditor')
  }
  /* 表单错误校验方法 */
  errorCheckout = async () => (
    new Promise(resolve => {
      this.setState({
        isShowErrorHint: true
      }, () => {
        if (this.props.params.id) {
          !this.recName.getErrStatus()
            && !this.recTel.getErrStatus()
            && !this.recMail.getErrStatus() ? resolve(true) : resolve(false)
        } else {
          !this.recAccountName.getErrStatus()
            && !this.recAcctNo.getErrStatus()
            && !this.bankAndAddress.getWrappedInstance().getErrStatus()
            && !this.recName.getErrStatus()
            && !this.recTel.getErrStatus()
            && !this.recMail.getErrStatus() ? resolve(true) : resolve(false)
        }
      })
    })
  )
  /* updata input参数事件 */
  handleChange = (key) => (value) => this.setState({ data: { ...this.state.data, [key]: value || ' ' } })
  /* updata select参数事件 */
  handleSelect = (key) => (value) => this.setState({ data: { ...this.state.data, [key]: value } })
  render() {
    const handleChange = this.handleChange
    const { data, params } = this.props,
      { beneficiaryEditorData } = data,
      { body } = beneficiaryEditorData
    return (
      <div>
        <div className="qb-panel-g qb-search-g--layout qb-media-height">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />支付结算</li>
              <li><Link to={{ pathname: '/grossSettlement/beneficiaryEditor' }}>收款方编辑</Link></li>
              <li className="active">{this.props.params.id ? '修改收款方' : '增加收款方'}</li>
            </ol>
          </div>
          <div className="qb-form-group-g clearfix qb-form-group-b10-g">
            {params.id ? <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="rob-form-group">
                <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                  <label className="rob-input-label">收款方编号:</label>
                </div>
                <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                  <div className="rob-input-item ">
                    <label className="rob-input-label">{body.receiverNo}</label>
                  </div>
                </div>
              </div>
            </div> : null}
            {params.id ? <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="rob-form-group">
                <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                  <label className="rob-input-label">收款方名称:</label>
                </div>
                <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                  <div className="rob-input-item ">
                    <label className="rob-input-label">{body.recAccountName}</label>
                  </div>
                </div>
              </div>
            </div> :
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBInput
                name="recAccountName"
                label="收款方名称"
                defaultValue={this.state.data.recAccountName}
                placeholder="请输入收款方名称"
                required
                isTestRule={this.state.isShowErrorHint}
                pattern={/^.{1,58}$/}
                errorMsg="请输入任意字符，长度为1-58字"
                emptyMsg="收款方名称不能为空"
                errDirection="bottom"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                handleChange={handleChange('recAccountName')}
                ref={ref => this.recAccountName = ref}
              />
            </div> }
            {params.id ? <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="rob-form-group">
                <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                  <label className="rob-input-label">收款方银行账号:</label>
                </div>
                <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                  <div className="rob-input-item ">
                    <label className="rob-input-label">{body.recAcctNo}</label>
                  </div>
                </div>
              </div>
            </div> :
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBInput
                name="recAcctNo"
                label="收款方银行账号"
                defaultValue={this.state.data.recAcctNo}
                required
                isTestRule={this.state.isShowErrorHint}
                pattern={/^[\d\s]{1,36}$/}
                errorMsg="请输入1-36个数字银行账号"
                emptyMsg="收款方银行账号不能为空"
                errDirection="bottom"
                placeholder="请输入收款方银行账号"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                handleChange={handleChange('recAcctNo')}
                ref={ref => this.recAcctNo = ref}
              />
            </div> }
            {params.id ? <div>
              <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                <div className="rob-form-group">
                  <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                    <label className="rob-input-label">开户银行:</label>
                  </div>
                  <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                    <div className="rob-input-item ">
                      <label className="rob-input-label">{body.recSettleBankName}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                <div className="rob-form-group">
                  <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                    <label className="rob-input-label">所属地区:</label>
                  </div>
                  <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                    <div className="rob-input-item ">
                      <label className="rob-input-label">{body.recAccountProvinceName}{body.recAccountCityName}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
                <div className="rob-form-group">
                  <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                    <label className="rob-input-label">支行名称:</label>
                  </div>
                  <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                    <div className="rob-input-item ">
                      <label className="rob-input-label">{body.recBankName}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div> :
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <BankAndAddress
                type="bank"
                required
                isTestRule={this.state.isShowErrorHint}
                branchBankLabel="支行名称"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                mainClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                handleSelect={(val) => {
                  this.setState({ data: { ...this.state.data,
                    recSettleBankNo: val.bank.bankCode,
                    recSettleBankName: val.bank.bankName,
                    recBankNo: val.branchBank.bankCode,
                    recBankName: val.branchBank.bankName,
                    recAccountProvince: val.province.code,
                    recAccountCity: val.city.code } })
                }}
                ref={ref => this.bankAndAddress = ref}
              />
            </div> }
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="rob-form-group">
                <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                  <label className="rob-input-label">联行号:</label>
                </div>
                <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg">
                  <div className="rob-input-item ">
                    <label className="rob-input-label">{params.id ? body.recBankNo : this.state.data.recBankNo}</label>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBSelect
                label="白名单"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                ref={ref => this.bankName = ref}
                options={[
                  { text: '北京支行', value: '1' },
                  { text: '朝阳支行', value: '2' },
                  { text: '海淀支行', value: '3' }
                ]}
              />
            </div> */}
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBInput
                name="recName"
                label="联系人姓名"
                defaultValue={this.state.data.recName}
                isTestRule={this.state.isShowErrorHint}
                pattern={/^.{1,58}$/}
                errorMsg="请输入任意字符，长度为1-58字"
                errDirection="bottom"
                placeholder="请输入联系人姓名(选填)"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                handleChange={handleChange('recName')}
                ref={ref => this.recName = ref}
              />
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBInput
                name="recTel"
                type="tel"
                label="联系人移动电话"
                defaultValue={this.state.data.recTel}
                isTestRule={this.state.isShowErrorHint}
                errDirection="bottom"
                placeholder="请输入移动电话(选填)"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                handleChange={handleChange('recTel')}
                ref={ref => this.recTel = ref}
              />
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBInput
                name="recMail"
                type="email"
                label="电子邮件"
                defaultValue={this.state.data.recMail}
                isTestRule={this.state.isShowErrorHint}
                errDirection="bottom"
                placeholder="请输入电子邮件(选填)"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                handleChange={handleChange('recMail')}
                ref={ref => this.recMail = ref}
              />
            </div>
          </div>
          <div className="qb-form-footButton-g clearfix">
            <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <button type="button" className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.cancelBtn}>取消</button>
              <button type="button" className="rob-btn rob-btn-danger rob-btn-circle" onClick={this.saveBeneficiaryInfo}>保存</button>
            </div>
          </div>
        </div>
        <Dialog
          showCover
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={() => this.alertClose(this.state.alertStatus)}
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
BeneficiaryEditorAddPage.propTypes = {
  data: PropTypes.object,
  params: PropTypes.object,
  history: PropTypes.object,
  saveBeneficiaryEditorAddData: PropTypes.func,
  getBeneficiaryEditorData: PropTypes.func
}
BeneficiaryEditorAddPage.defaultProps = {
  data: {},
  params: {},
  history: {},
  saveBeneficiaryEditorAddData: () => {},
  getBeneficiaryEditorData: () => {}
}

export default connect(state => ({
  data: state.beneficiaryEditorAdd
}), dispatch => ({
  saveBeneficiaryEditorAddData: bindActionCreators(action.saveBeneficiaryEditorAddData, dispatch),
  getBeneficiaryEditorData: bindActionCreators(action.getBeneficiaryEditorData, dispatch)
}))(BeneficiaryEditorAddPage)