/* eslint-disable */
import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import QBInput from 'components/QBInput'
import QBTextarea from 'components/QBTextarea'
import QBSelect from 'components/QBSelect'
import BankAndAddress from 'components/BankAndAddress'
import Button from 'react-robotUI/Button'
import Dialog from 'react-robotUI/dialog'
import emptyFunc from 'utils/emptyFunc'
import * as action from '../redux/action'
import '../redux/reducer'
const YES = 'YES'
const NO = 'NO'

class StepTwo extends PureComponent {
  constructor(prop) {
    super(prop)
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
    this.state = {
      isWantUkey: YES,
      params: {
        isCertCompany: '1',
        identifyNo1: '',
        identifyNo2: '',
      },
      errMsgSFZ: '请输入18位数字或字母身份证号码',
      errMsgZZSFZ: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
      errMsgSJH: '请输入正确的手机号码',
      errMsgZZSJH: /^1(3|4|5|7|8)\d{9}$/,
      errMsgSFZ1: '请输入18位数字或字母身份证号码',
      errMsgZZSFZ1: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
      errMsgSJH1: '请输入正确的手机号码',
      errMsgZZSJH1: /^1(3|4|5|7|8)\d{9}$/,
      isTestRule: false
    }
    this.selectes = [
      { value: '出纳', text: '出纳' },
      { value: '会计', text: '会计' },
      { value: '经理', text: '经理' },
      { value: '总监', text: '总监' },
      { value: '其他', text: '其他' }
    ]
    this.inputs = {}
  }
  componentWillMount() {
    let getOneStepData = sessionStorage.getItem('getTwoStepData')
    if (!getOneStepData) {
      return
    }
    this.setState({
      params: JSON.parse(getOneStepData)
    }, () => {
      if (Number(this.state.params.isCertCompany) === 2) {
        // this.handleRadio(NO)
        this.setState({
          isWantUkey: NO
        })
      }
      if (!this.state.params.bankInfo || !this.state.params.bankInfo.province.code || !this.state.params.bankInfo.city.code || !this.state.params.bankInfo.region.code) {
        return false
      }
      if (this.state.params.bankInfo) {
        this.address.getWrappedInstance().setValue(this.state.params.bankInfo)
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isUpdate) {
      // 如果是修改 且不修改类型 反显
      if (this.props.routerParams && this.props.routerParams.companyType === '100' && nextProps.bigRegisterCompanyInfo.respCode === '000000' && nextProps.bigRegisterCompanyInfo.body) {
        let bankInfo = {}
        let { body = {} } = nextProps.bigRegisterCompanyInfo
        if (Number(body.isCertCompany) === 2) {
          this.setState({
            isWantUkey: NO
          })
        }
        this.userName1.setValue(body.userName1) 
        this.userName2.setValue(body.userName2)
        this.identifyNo1.setValue(body.identifyNo1) 
        this.identifyNo2.setValue(body.identifyNo2)
        this.phoneNum1.setValue(body.phoneNum1) 
        this.phoneNum2.setValue(body.phoneNum2) 
        // 如果有职位信息
        if (body.userDuty1) {
          this.userDuty1.setValue({ value: body.userDuty1, text: body.userDuty1 })
        }
        if (body.userDuty2) {
          this.userDuty2.setValue({ value: body.userDuty2, text: body.userDuty2 })
        }
        // 如果要ukey
        if (nextProps.bigRegisterCompanyInfo.body && nextProps.bigRegisterCompanyInfo.body.madProvince && nextProps.bigRegisterCompanyInfo.body.madCity && nextProps.bigRegisterCompanyInfo.body.madCountry) {
          bankInfo.province = { code: body.madProvince, name: body.madProvinceName }
          bankInfo.city = { code: body.madCity, name: body.madCityName }
          bankInfo.region = { code: body.madCountry, name: body.madCountryName }
          this.address.getWrappedInstance().setValue(bankInfo)
          this.madDetail.setValue(body.madDetail)
        }
        this.setState({
          params: { ...nextProps.bigRegisterCompanyInfo.body, bankInfo }
        })
      }
    }
  }
  static propTypes = {
    handleClick: PropTypes.func,
    stepNum: PropTypes.number,
    getProvince: PropTypes.func,
    getProvinceData: PropTypes.object,
    handleCheckSystemInfo: PropTypes.func
  }
  static defaultProps = {
    handleClick: emptyFunc,
    stepNum: 0,
    getProvince: emptyFunc,
    getProvinceData: {},
    handleCheckSystemInfo: () => { }
  }
  // 弹窗
  handleOpen = (type, msg) => {
    this.setState({
      contentDom: msg
    }, function () {
      this.dialogShow[type]()
    })
  }
  // 关闭弹窗触发
  handleClose = (name, type) => {
    this.setState({ [type]: false })
  }
  dialogShow = {
    d11: () => {
      this.setState({ d11: true })
      this.getContent(
        <div className="rob-alert-content ">
          {this.state.contentDom}
        </div>
      )
      this.getActions([{
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle'
      }])
    }
  }
  /**
   * 下一步
   */
  handleClick = async () => {
    sessionStorage.setItem('getTwoStepData', JSON.stringify(this.state.params))
    let getOneStepData = JSON.parse(sessionStorage.getItem('getOneStepData'))
    if (!getOneStepData) {
      return
    }
    this.setState({ isTestRule: true }, () => {
      if (Number(this.state.params.isCertCompany) === 1) {
        if (this.userName1.getErrStatus() ||
          this.identifyNo1.getErrStatus() ||
          this.phoneNum1.getErrStatus() ||
          this.userName2.getErrStatus() ||
          this.identifyNo2.getErrStatus() ||
          this.phoneNum2.getErrStatus() ||
          this.address.getWrappedInstance().getErrStatus()
        ) {
          return false
        }
        if (!this.state.params.bankInfo || !this.state.params.bankInfo.province.code || !this.state.params.bankInfo.city.code || !this.state.params.bankInfo.region.code) {
          this.handleOpen('d11', '请选择邮寄地址')
          return false
        }
        if (this.madDetail.getErrStatus()) {
          return false
        }
      }
      if (Number(this.state.params.isCertCompany) === 2) {
        if (this.userName1.getErrStatus() ||
          this.identifyNo1.getErrStatus() ||
          this.phoneNum1.getErrStatus() ||
          this.userName2.getErrStatus() ||
          this.identifyNo2.getErrStatus() ||
          this.phoneNum2.getErrStatus()
        ) {
          return false
        }
      }
      if (this.state.params.phoneNum1 === this.state.params.phoneNum2) {
        this.setState({
          isTestRuleNum: true
        })
        this.setState({
          errMsgSJH1: '与管理员2手机号码相同',
          errMsgZZSJH1: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
          errMsgSJH: '与管理员1手机号码相同',
          errMsgZZSJH: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        })
        return
      } else {
        this.setState({
          errMsgSJH1: '请输入正确的手机号码',
          errMsgZZSJH1: /^1(3|4|5|7|8)\d{9}$/,
          errMsgSJH: '请输入正确的手机号码',
          errMsgZZSJH: /^1(3|4|5|7|8)\d{9}$/
        })
      }
      if (this.state.params.identifyNo1 === this.state.params.identifyNo2) {
        this.setState({
          isTestRuleCard: true
        })
        this.setState({
          errMsgSFZ1: '与管理员2身份证号相同',
          errMsgZZSFZ1: /(^\d{55}$)|(^\d{58}$)|(^\d{57}(\d|X|x)$)/,
          errMsgSFZ: '与管理员1身份证号相同',
          errMsgZZSFZ: /(^\d{55}$)|(^\d{58}$)|(^\d{57}(\d|X|x)$)/
        })
        return
      } else {
        this.setState({
          errMsgSFZ1: '请输入18位数字或字母身份证号码',
          errMsgZZSFZ1: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
          errMsgSFZ: '请输入18位数字或字母身份证号码',
          errMsgZZSFZ: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
        })
      }
      const { params } = this.state,
        { identifyNo1, isCertCompany, identifyNo2, phoneNum1, phoneNum2 } = params
      let test = {
        companyLicense: getOneStepData.companyLicense,
        companyType: '100',
        identifyNo1,
        isCertCompany,
        identifyNo2,
        phoneNum1,
        phoneNum2
      }
      // 如果是修改
      if (this.props.routerParams && this.props.routerParams.companyId) {
        test.companyId = this.props.routerParams.companyId
      }
      this.props.handleCheckSystemInfo(test).then((res) => {
        if (res.data.respCode === '000000') {
          this.props.handleClick(3)()
        } else if (res.data.respCode === '500013') {
          this.handleOpen('d11', '管理员信息相同')
        } else if (res.data.respCode === '500014') {
          this.handleOpen('d11', '企业已开通同类账户，请核对')
        } else if (res.data.respCode === '500011' || res.data.respCode === '500012') {
          this.handleOpen('d11', res.data.respMsg)
        }
      })
    })
  }
  handleSelect = (key) => (item) => {
    this.setState({
      params: { ...this.state.params, [key]: item.value }
    })
  }
  handleChange = (key) => (value) => {
    this.setState({ params: { ...this.state.params, [key]: value } })
  }
  handleRadio = (checked) => () => this.setState({ isWantUkey: checked, params: { ...this.state.params, isCertCompany: checked === YES ? 1 : 2 } })
  render() {
    const { stepNum, handleClick } = this.props,
      handleChange = this.handleChange, // 修改
      { params, isTestRule, isWantUkey } = this.state
    return (
      <form className="rob-form qb-form-g__form qb-form-group-b10-g qb-mg-bt70-g" style={{ display: stepNum === 2 ? 'block' : 'none' }}>
        <div className="qb-form-pd-g qb-form-pd-g__xs-label">
          <QBInput
            labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
            inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
            label="系统管理员1姓名"
            name="userName1"
            placeholder="请输入姓名"
            isTestRule={isTestRule}
            errorMsg="请输入1-58个字的姓名"
            emptyMsg="请输入姓名"
            ref={r => this.userName1 = r}
            handleChange={handleChange('userName1')}
            defaultValue={params.userName1}
            pattern={/^.{1,58}$/}
            required
          />
          <QBInput
            name="default"
            label="身份证号"
            required
            errDirection="right"
            defaultValue={params.identifyNo1}
            isTestRule={this.state.isTestRule || this.state.isTestRuleCard}
            labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
            inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
            pattern={this.state.errMsgZZSFZ1}
            errorMsg={this.state.errMsgSFZ1}
            placeholder="请输入身份证号"
            emptyMsg="请输入身份证号"
            ref={ref => this.identifyNo1 = ref}
            handleChange={value => {
              this.setState({
                params: { ...this.state.params, identifyNo1: value }
              })
              if (this.state.params.identifyNo2) {
                this.setState({
                  isTestRuleCard: true
                })
              }
              if (value.toLowerCase() === this.state.params.identifyNo2.toLowerCase()) {
                this.setState({
                  errMsgSFZ1: '与管理员2身份证号相同',
                  errMsgZZSFZ1: /(^\d{55}$)|(^\d{58}$)|(^\d{57}(\d|X|x)$)/,
                  errMsgSFZ: '与管理员1身份证号相同',
                  errMsgZZSFZ: /(^\d{55}$)|(^\d{58}$)|(^\d{57}(\d|X|x)$)/
                })
              } else {
                this.setState({
                  errMsgSFZ1: '请输入18位数字或字母身份证号码',
                  errMsgZZSFZ1: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                  errMsgSFZ: '请输入18位数字或字母身份证号码',
                  errMsgZZSFZ: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                })
              }
            }}
          />
          <QBInput
            name="default"
            label="手机号码"
            required
            errDirection="right"
            isTestRule={this.state.isTestRule || this.state.isTestRuleNum}
            labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
            inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
            pattern={this.state.errMsgZZSJH1}
            errorMsg={this.state.errMsgSJH1}
            placeholder="请输入手机号码"
            emptyMsg="请输入手机号码"
            defaultValue={params.phoneNum1}
            handleChange={value => {
              setTimeout(() => {
                this.setState({
                  params: { ...this.state.params, phoneNum1: value }
                })
                if (this.state.params.phoneNum2) {
                  this.setState({
                    isTestRuleNum: true
                  })
                }
                if (value === this.state.params.phoneNum2) {
                  this.setState({
                    errMsgSJH1: '与管理员2手机号码相同',
                    errMsgZZSJH1: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    errMsgSJH: '与管理员1手机号码相同',
                    errMsgZZSJH: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                  })
                } else {
                  this.setState({
                    errMsgSJH1: '请输入正确的手机号码',
                    errMsgZZSJH1: /^1(3|4|5|7|8)\d{9}$/,
                    errMsgSJH: '请输入正确的手机号码',
                    errMsgZZSJH: /^1(3|4|5|7|8)\d{9}$/
                  })
                }
              }, 0)
            }}
            ref={ref => this.phoneNum1 = ref}
          />
          <QBSelect
            label="职务"
            defaultValue={params.userDuty1}
            labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
            inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
            errDirection="bottom"
            isTestRule={this.state.isTestRule}
            options={this.selectes}
            handleSelect={this.handleSelect('userDuty1')}
            ref={r => this.userDuty1 = r}
          />
          <QBInput
            name="default"
            label="系统管理员2姓名"
            required
            errDirection="right"
            isTestRule={this.state.isTestRule}
            labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
            inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
            pattern={/^.{1,58}$/}
            errorMsg="请输入1-58个字的姓名"
            emptyMsg="请输入姓名"
            placeholder="请输入姓名"
            defaultValue={params.userName2}
            ref={ref => this.userName2 = ref}
            handleChange={handleChange('userName2')}
          />
          <QBInput
            name="default"
            label="身份证号"
            required
            errDirection="right"
            isTestRule={this.state.isTestRule || this.state.isTestRuleCard}
            labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
            inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
            pattern={this.state.errMsgZZSFZ}
            errorMsg={this.state.errMsgSFZ}
            placeholder="请输入身份证号"
            emptyMsg="请输入身份证号"
            defaultValue={params.identifyNo2}
            handleChange={value => {
              this.setState({
                params: { ...this.state.params, identifyNo2: value }
              })
              if (this.state.params.identifyNo1) {
                this.setState({
                  isTestRuleCard: true
                })
              }
              if (value.toLowerCase() === this.state.params.identifyNo1.toLowerCase()) {
                this.setState({
                  errMsgSFZ1: '与管理员2身份证号相同',
                  errMsgZZSFZ1: /(^\d{55}$)|(^\d{58}$)|(^\d{57}(\d|X|x)$)/,
                  errMsgSFZ: '与管理员1身份证号相同',
                  errMsgZZSFZ: /(^\d{55}$)|(^\d{58}$)|(^\d{57}(\d|X|x)$)/
                })
              } else {
                this.setState({
                  errMsgSFZ1: '请输入18位数字或字母身份证号码',
                  errMsgZZSFZ1: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                  errMsgSFZ: '请输入18位数字或字母身份证号码',
                  errMsgZZSFZ: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
                })
              }
            }}
            ref={ref => this.identifyNo2 = ref}
          />
          <QBInput
            name="default"
            label="手机号码"
            required
            errDirection="right"
            isTestRule={this.state.isTestRule || this.state.isTestRuleNum}
            labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
            inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
            pattern={this.state.errMsgZZSJH}
            errorMsg={this.state.errMsgSJH}
            placeholder="请输入手机号码"
            emptyMsg="请输入手机号码"
            defaultValue={params.phoneNum2}
            handleChange={value => {
              setTimeout(() => {
                this.setState({
                  params: { ...this.state.params, phoneNum2: value }
                })
                if (this.state.params.phoneNum1) {
                  this.setState({
                    isTestRuleNum: true
                  })
                }
                if (value === this.state.params.phoneNum1) {
                  this.setState({
                    errMsgSJH: '与管理员1手机号码相同',
                    errMsgZZSJH: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    errMsgSJH1: '与管理员2手机号码相同',
                    errMsgZZSJH1: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
                  }, () => {
                    this.phoneNum1.getErrStatus()
                    this.phoneNum2.getErrStatus()
                  })
                } else {
                  this.setState({
                    errMsgSJH: '请输入正确的手机号码',
                    errMsgZZSJH: /^1(3|4|5|7|8)\d{9}$/,
                    errMsgSJH1: '请输入正确的手机号码',
                    errMsgZZSJH1: /^1(3|4|5|7|8)\d{9}$/
                  }, () => {
                    this.phoneNum1.getErrStatus()
                    this.phoneNum2.getErrStatus()
                  })
                }
              }, 0)
            }}
            ref={ref => this.phoneNum2 = ref}
          />
          <QBSelect
            label="职务"
            defaultValue={params.userDuty2}
            labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
            inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
            errDirection="bottom"
            isTestRule={this.state.isTestRule}
            options={this.selectes}
            handleSelect={this.handleSelect('userDuty2')}
            ref={r => this.userDuty2 = r}
          />
          <div className="rob-form-group">
            <div className="rob-form-group">
              <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left">
                <label className="rob-input-label">是否申请数字证书</label>
              </div>
              <div className="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xis-24 text-left">
                <input className="rob-radio-with-gap" name="group2" type="radio" checked={isWantUkey === YES} id="test4" onChange={this.handleRadio(YES)} />
                <label htmlFor="test4">是</label>
                <input className="rob-radio-with-gap" name="group2" type="radio" checked={isWantUkey === NO} id="test5" onChange={this.handleRadio(NO)} />
                <label htmlFor="test5">否</label>
                <p className="qb-l40-g">
                  <span className="qb-red-g">*</span>
                  如不申请数字证书，仅可进行账户查询操作
                </p>
              </div>
            </div>
          </div>
          <div style={{ display: isWantUkey === YES ? 'block' : 'none' }}>
            <BankAndAddress
              isTestRule={this.state.isTestRule}
              required
              handleSelect={(val) => { this.setState({ params: { ...this.state.params, bankInfo: val } }) }}
              labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
              type="address"
              mainClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
              addressLabel="邮寄地址"
              emptyMsg="请选择地址"
              ref={r => this.address = r}
            />
            <QBTextarea
              labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-4 rob-col-xs-24 text-left"
              inputClass="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24"
              name={'madDetail'}
              label="详细地址"
              isTestRule={isTestRule}
              errorMsg="请输入1-58个字的详细地址"
              emptyMsg="请输入详细地址"
              ref={r => this.madDetail = r}
              handleChange={handleChange('madDetail')}
              defaultValue={params.madDetail}
              pattern={/^.{1,58}$/}
              required
              isShowEmptyMsg
              placeholder="请输入详细地址"
            />
          </div>
        </div>
        <div className="">
          <div className="rob-col-lg-24 text-center qb-from-bg-reg-g">
            <Button className="rob-btn rob-btn-minor rob-btn-circle" label="上一步" onClick={handleClick(1)} />
            <Button className="rob-btn rob-btn-danger rob-btn-circle" label="下一步" onClick={this.handleClick} />
          </div>
        </div>
        {/* 弹窗start */}
        <Dialog
          open={this.state.d11}
          onRequestClose={(name) => this.handleClose(name, 'd11')}
          titleClassName="rob-alert-title rob-alert-title-color"
          content={this.content}
          actions={this.actions}
          actionClassName="rob-alert-button rob-alert-button-color rob-alert-button-45"
          showCover
        />
        {/* 弹窗end */}
      </form>
    )
  }
}
export default connect(({ registerState = {} }) => ({
  getOneStepData: registerState.getOneStep,
  getProvinceData: registerState.provinces,
  bigRegisterCompanyInfo: registerState.bigRegisterCompanyInfo
}), dispatch => ({
  getOneStep: bindActionCreators(action.getOneStep, dispatch),
  getProvince: bindActionCreators(action.getProvince, dispatch),
  handleCheckSystemInfo: bindActionCreators(action.handleCheckSystemInfo, dispatch)
}))(StepTwo)