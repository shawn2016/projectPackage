/*
 * 收款方信息部分
 * （单笔经办）
 */
import React, { PureComponent } from 'react'
import QBInput from 'components/QBInput'
import BankAndAddress from 'components/BankAndAddress'
import Pagination from 'react-robotUI/Pagination'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'react-robotUI/Table'
import { connect } from 'react-redux'
import request from 'utils/getRequest'
import { bindActionCreators } from 'redux'
import * as actions from '../redux/actions'
import '../redux/reducer'
class PayeeInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      alertheight: '0',
      bankInfo: {},
      isSavaPayInfo: false,
      isTestRule: false,
      isShowPayeeList: false,
      searchProvince: '',
      searchCity: '',
      searchAccountName: '',
      selectedPayee: {},
      PaginationConf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        dataCount: 0,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false,
        onChange: (currentPage) => {
          this.setState({ PaginationConf: { ...this.state.PaginationConf, currentPage } })
          let params = {}
          if (this.state.searchAccountName) params.recAccountName = this.state.searchAccountName
          if (this.state.searchCity) params.recAccountCity = this.state.searchCity
          if (this.state.searchProvince) params.recAccountProvince = this.state.searchProvince
          params.page = currentPage
          params.rows = this.state.PaginationConf.pageSize
          this.props.getPayeeList(params)
        }
      }
    }
  }
  componentWillMount() {
    this.props.updateOrderInfo({
      recName: '',
      recTel: '',
      mail: '',
      autosave: 0
    })
  }
  componentDidMount() {
    this.writeBack()
    this.props.getPayeeList().then((res) => {
      if (res.data.respCode === '000000') {
        this.receiverAccountName.setDropData(res.data.body.values || [])
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.payeeList && nextProps.payeeList.pagenation) {
      let _pageParam = nextProps.payeeList.pagenation
      this.setState({ PaginationConf: { ...this.state.PaginationConf, dataCount: _pageParam.itemCount, currentPage: _pageParam.pageNo } })
    }
  }
  // 小B反写
  writeBack = () => {
    let addressData = JSON.parse(sessionStorage.getItem('singleAddressName'))
    let { params = {} } = this.props,
      { reverseData = {} } = params
    if (reverseData.autosave && reverseData.autosave === 1) {
      this.setState({ isSavaPayInfo: true })
      this.props.updateOrderInfo({
        autosave: 1
      })
    }
    if (reverseData.receiverAccountName) {
      this.receiverAccountName.setValue(reverseData.receiverAccountName)
    }
    if (reverseData.receiverAccountNo) {
      this.receiverAccountNo.setValue(reverseData.receiverAccountNo)
    }
    if (reverseData.receiverBankName) {
      let curBankData = {
        bank: { bankCode: reverseData.receiverSettleBankNo, bankName: reverseData.receiverSettleBankName },
        branchBank: { bankCode: reverseData.receiverBankNo, bankName: reverseData.receiverBankName },
        city: { code: reverseData.receiverCity, name: addressData.city },
        province: { code: reverseData.receiverProvince, name: addressData.province }
      }
      this.bankAndAddress1.wrappedInstance.setValue(curBankData)
      let tempBackInfo = {
        branchBank: {
          bankCode: reverseData.receiverBankNo
        }
      }
      this.setState({ bankInfo: tempBackInfo })
    }
    if (reverseData.recName && reverseData.recName !== ' ') {
      this.recName.setValue(reverseData.recName)
    }
    if (reverseData.recTel && reverseData.recTel !== ' ') {
      this.recTel.setValue(reverseData.recTel)
    }
    if (reverseData.mail && reverseData.mail !== ' ') {
      this.mail.setValue(reverseData.mail)
    }
  }
  getError = async () => {
    if (!this.state.selectedPayee.recAcctNo) {
      await this.setState({ isTestRule: true })
      if (!this.receiverAccountName.getErrStatus() &&
        !this.receiverAccountNo.getErrStatus() &&
        !this.mail.getErrStatus() &&
        !this.recTel.getErrStatus() &&
        !this.recName.getErrStatus() &&
        !this.bankAndAddress1.getWrappedInstance().getErrStatus()) return false
    } else {
      return false
    }
    return true
  }
  /* 搜索事件 */
  searchDialogParams = () => {
    this.props.getPayeeList({ recAccountName: this.state.searchAccountName, recAccountProvince: this.state.searchProvince, recAccountCity: this.state.searchCity })
  }
  /* 清楚搜索事件 */
  clearDialogParams = () => {
    this.dialogRecAccountName.setValue('')
    this.dialogBankAndAddress.getWrappedInstance().setValue({})
    this.setState({ searchProvince: '', searchCity: '', searchAccountName: '' })
    this.setState({
      isTestRule: true
    })
  }
  render() {
    return (
      <div className="qb-form-group-g clearfix">
        {
          this.state.selectedPayee.recAcctNo ? this._getSelectedPayeeDom() : this._getCustomDom()
        }
        {
          /**
         * 收款方列表弹窗
           */
          this.state.isShowPayeeList ? this._getAlertDom() : null
        }
      </div>
    )
  }
  /**
   * 选择收款人列表
   */
  _getAlertDom = () => (
    <div>
      <div className="rob-alert-cover " data-dismiss="rob-alert" />
      <div className="qb-alert-g rob-alert-dialog-g">
        <div id="alert2" className="rob-alert content rob-alert-dismissible " style={{ display: 'block', marginTop: `${this.state.alertheight}px` }} ref={dom => this.alerthight = dom}>
          <button
            type="button"
            className="rob-alert-close"
            data-dismiss="rob-alert"
            aria-label="Close"
            onClick={() => {
              this.setState({
                isShowPayeeList: false
              })
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li className="active"><a href="javascript:;">选择收方</a></li>
            </ol>
          </div>
          <div className=" qb-alert-g__content">
            <div className=" qb-search-g--layout">
              <div className="qb-search-g btm0">
                <div className="rob-row rob-no-gutters">
                  <div className="rob-col-lg-8 rob-col-md-8 rob-col-sm-12 rob-col-xs-24">
                    <QBInput
                      name=""
                      type=""
                      label="收款方名称"
                      labelClass="rob-col-lg-8 rob-col-md-8 rob-col-sm-8 rob-col-xs-24"
                      containErrorIcon
                      pattern={/^[\S\s]{1,58}$/}
                      errDirection="bottom"
                      errorMsg="请输入1-58个任意字符"
                      placeholder="请输入收款方名称"
                      isTestRule={this.state.isTestRule}
                      handleChange={(val) => {
                        this.setState({
                          searchAccountName: val
                        })
                      }}
                      ref={(DOM) => { this.dialogRecAccountName = DOM }}
                    />
                  </div>
                  <div className="rob-col-lg-10 rob-col-md-10 rob-col-sm-12 rob-col-xs-24">
                    <BankAndAddress
                      type="independent"
                      mainClass="rob-col-lg-16 rob-col-md-16 rob-col-sm-16 rob-col-xs-24"
                      addressLabel="开户地址"
                      handleSelectProvince={item => {
                        this.setState({
                          searchProvince: item.code
                        })
                      }}
                      handleSelectCity={item => {
                        this.setState({
                          searchCity: item.code
                        })
                      }}
                      ref={(DOM) => { this.dialogBankAndAddress = DOM }}
                    />
                  </div>

                  <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-12 rob-col-xs-24  column qb-search-g__button ">
                    <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-12 rob-col-xs-12">
                      <button className="rob-btn rob-btn-danger rob-btn-circle" onClick={this.searchDialogParams} type="button">搜索</button>
                    </div>
                    <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 qb-search-g__button__item">
                      <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.clearDialogParams} type="button">清除</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" clearfix">
              <div className="qb-list-g">
                <div className="qb-list-g__table">
                  <div className="rob-row clearfix">
                    <div className="rob-col-lg-24 column">
                      <div className="rob-table-responsive qb-alert-g__content__table" style={{ marginTop: '15px' }}>
                        {
                          /* table部分 */
                        }
                        <Table striped hoverEffect checkboxType={'default'}>
                          <TableHeader>
                            <TableHeaderColumn> 收款方编号</TableHeaderColumn>
                            <TableHeaderColumn> 收款方名称</TableHeaderColumn>
                            <TableHeaderColumn> 收款方银行账号</TableHeaderColumn>
                            <TableHeaderColumn> 开户银行名称</TableHeaderColumn>
                            <TableHeaderColumn> 开户地址</TableHeaderColumn>
                          </TableHeader>
                          <TableBody>
                            {
                              this.props.payeeList && this.props.payeeList.values && this.props.payeeList.values.map((item, index) => (
                                <TableRow
                                  key={`info${index + 1}`}
                                  onClick={() => {
                                    this.props.updateOrderInfo({
                                      autosave: 1
                                    })
                                    this.setState({
                                      isShowPayeeList: false
                                    })
                                    this.selectPayee(item.id)
                                  }}
                                >
                                  <TableRowColumn title={item.receiverNo}> {item.receiverNo}</TableRowColumn>
                                  <TableRowColumn title={item.recAccountName}> {item.recAccountName}</TableRowColumn>
                                  <TableRowColumn title={item.recAcctNo}> {item.recAcctNo}</TableRowColumn>
                                  <TableRowColumn title={item.recBankName}> {item.recBankName}</TableRowColumn>
                                  <TableRowColumn> {`${item.recAccountProvinceName ? item.recAccountProvinceName : ''} ${item.recAccountCityName ? item.recAccountCityName : ''}`}</TableRowColumn>
                                </TableRow>
                              ))
                            }
                          </TableBody>
                        </Table>
                      </div>
                    </div>
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
      </div>
    </div>
  )
  /**
   * 选择收款人后只做显示，不允许修改
   */
  _getSelectedPayeeDom = () => (
    <div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            收款方名称：
            </label>
        </div>
        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            {this.state.selectedPayee.recAccountName || ''}
          </label>
        </div>
        <span
          className="qb-form-group-iconbox"
          onClick={
            () => {
              this.setState({
                isShowPayeeList: !this.state.isShowPayeeList
              })
            }
          }
        >
          <i className="qb-icon-add" />
        </span>
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            收款方银行账号：
            </label>
        </div>
        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            {this.state.selectedPayee.recAcctNo || ''}
          </label>
        </div>
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            收款方编号：
            </label>
        </div>
        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            {this.state.selectedPayee.receiverNo || ''}
          </label>
        </div>
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            开户银行：
            </label>
        </div>
        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            {this.state.selectedPayee.recSettleBankName || ''}
          </label>
        </div>
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            所属地区：
            </label>
        </div>
        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            {
              this.state.selectedPayee.recAccountProvinceName ? `${this.state.selectedPayee.recAccountProvinceName}    ` : ''
            }
            {
              this.state.selectedPayee.recAccountCityName ? `${this.state.selectedPayee.recAccountCityName}    ` : ''
            }
          </label>
        </div>
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            支行名称：
            </label>
        </div>
        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            {this.state.selectedPayee.recBankName || ''}
          </label>
        </div>
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            联行号：
            </label>
        </div>
        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
          <label className="rob-input-label "> {this.state.selectedPayee.recBankNo}</label>
        </div>
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        {!this.state.selectedPayee.recName || this.state.selectedPayee.recName === ' ' ? <QBInput
          name="recName"
          type=""
          label="联系人姓名"
          containErrorIcon
          errDirection="bottom"
          inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
          placeholder="请输入联系人姓名（选填）"
          isTestRule={this.state.isTestRule}
          handleChange={val => {
            this.props.updateOrderInfo({
              recName: val
            })
          }}
          ref={ref => this.recTel = ref}
        />
          : <div>
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
              <label className="rob-input-label ">
                联系人姓名：
              </label>
            </div>
            <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
              <label className="rob-input-label "> {this.state.selectedPayee.recName}</label>
            </div>
          </div>}
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        {!this.state.selectedPayee.recTel || this.state.selectedPayee.recTel === ' ' ? <QBInput
          name="recTel"
          type="tel"
          label="联系人移动电话"
          placeholder="请输入移动电话（选填）"
          containErrorIcon
          errDirection="bottom"
          inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
          isTestRule={this.state.isTestRule}
          handleChange={val => {
            this.props.updateOrderInfo({
              recTel: val
            })
          }}
          ref={ref => this.recTel = ref}
        />
          : <div>
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
              <label className="rob-input-label ">
                联系人移动电话：
              </label>
            </div>
            <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
              <label className="rob-input-label "> {this.state.selectedPayee.recTel}</label>
            </div>
          </div>}
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        {!this.state.selectedPayee.recMail || this.state.selectedPayee.recMail === ' ' ? <QBInput
          name="mail"
          type=""
          label="电子邮件"
          placeholder="请输入电子邮件（选填）"
          containErrorIcon
          errDirection="bottom"
          inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
          isTestRule={this.state.isTestRule}
          handleChange={val => {
            this.props.updateOrderInfo({
              mail: val
            })
          }}
          ref={ref => this.mail = ref}
        />
          : <div>
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
              <label className="rob-input-label ">
                电子邮件：
              </label>
            </div>
            <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
              <label className="rob-input-label "> {this.state.selectedPayee.recMail}</label>
            </div>
          </div>}
      </div>
    </div>
  )
  /**
   * 自定义收款人
   */
  _getCustomDom = () => (
    <div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <QBInput
          name="receiverAccountName"
          type=""
          label="收款方名称"
          containErrorIcon
          required
          showDropMenu
          pattern={/^[\S\s]{1,58}$/}
          errDirection="bottom"
          errorMsg="请输入1-58个任意字符"
          inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
          isTestRule={this.state.isTestRule}
          handleChange={val => {
            if (val.id) {
              this.selectPayee(val.id)
              this.props.updateOrderInfo({
                receiverAccountName: val.recAccountName,
                autosave: 1
              })
            } else {
              this.props.updateOrderInfo({
                receiverAccountName: val
              })
            }
          }}
          ref={ref => this.receiverAccountName = ref}
        />
        <span
          className="qb-form-group-iconbox"
          onClick={
            () => {
              this.setState({
                isShowPayeeList: !this.state.isShowPayeeList
              })
            }
          }
        >
          <i className="qb-icon-details" />
        </span>
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <QBInput
          name="receiverAccountNo"
          type=""
          label="收款方银行账号"
          containErrorIcon
          errDirection="bottom"
          required
          pattern={/^[\d\s]{1,36}$/}
          errorMsg="请输入1-36个数字银行账号"
          inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
          isTestRule={this.state.isTestRule}
          handleChange={val => this.props.updateOrderInfo({
            receiverAccountNo: val
          })}
          ref={ref => this.receiverAccountNo = ref}
        />
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <BankAndAddress
          type="bank"
          required
          isTestRule={this.state.isTestRule}
          branchBankLabel="支行名称"
          errorMsg="请输入支行名称"
          emptyMsg="银行信息不能为空"
          errDirection="bottom"
          mainClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
          handleSelect={val => {
            this.props.updateOrderInfo({
              receiverBankName: val.branchBank.bankName,
              receiverBankNo: val.branchBank.bankCode,
              receiverProvince: val.province.code,
              receiverCity: val.city.code,
              receiverSettleBankName: val.bank.bankName,
              receiverSettleBankNo: val.bank.bankCode
            })
            this.setState({
              bankInfo: val
            })
            sessionStorage.setItem('singleAddressName', JSON.stringify({ province: val.province.name, city: val.city.name }))
          }}
          ref={ref => this.bankAndAddress1 = ref}
        />
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
          <label className="rob-input-label ">
            联行号：
            </label>
        </div>
        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
          <label className="rob-input-label "> {this.state.bankInfo.branchBank && this.state.bankInfo.branchBank.bankCode}</label>
        </div>
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <QBInput
          name="recName"
          type=""
          label="联系人姓名"
          containErrorIcon
          pattern={/^[\S\s]{1,58}$/}
          errDirection="bottom"
          errorMsg="请输入1-58个任意字符"
          inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
          placeholder="请输入联系人姓名（选填）"
          isTestRule={this.state.isTestRule}
          handleChange={val => {
            this.props.updateOrderInfo({
              recName: val
            })
          }}
          ref={ref => this.recName = ref}
        />
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <QBInput
          name="recTel"
          type="tel"
          label="联系人移动电话"
          placeholder="请输入移动电话（选填）"
          containErrorIcon
          errDirection="bottom"
          inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
          isTestRule={this.state.isTestRule}
          handleChange={val => {
            this.props.updateOrderInfo({
              recTel: val
            })
          }}
          ref={ref => this.recTel = ref}
        />
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <QBInput
          name="mail"
          type="email"
          label="电子邮件"
          placeholder="请输入电子邮件（选填）"
          containErrorIcon
          errDirection="bottom"
          inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
          isTestRule={this.state.isTestRule}
          handleChange={val => {
            this.props.updateOrderInfo({
              mail: val
            })
          }}
          ref={ref => this.mail = ref}
        />
      </div>
      <div className=" rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
        <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
          <label className="rob-input-label " />
        </div>
        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
          <input
            id="savePayInfo"
            type="checkbox"
            checked={this.state.isSavaPayInfo}
            className="rob-checkbox-filled-in rob-checkbox-bordered"
            onChange={() => this.setState({
              isSavaPayInfo: !this.state.isSavaPayInfo
            }, () => {
              this.props.updateOrderInfo({
                autosave: this.state.isSavaPayInfo ? 1 : 0
              })
            })}
          />
          <label htmlFor="savePayInfo">自动保存新的支付信息</label>
        </div>
      </div>
    </div>
  )
  /**
   * 选择收款人
   * 将选择结果更新到reducer
   * 更改视图显示选中收款人信息
   */
  selectPayee = id => {
    (async () => {
      let resposeData = await request({
        path: '/payee/getInfo',
        method: 'POST',
        param: { id }
      })
      if (resposeData.data.respCode === '000000') {
        let respData = resposeData.data.body
        this.setState({
          selectedPayee: respData
        })
        this.props.updateOrderInfo({
          receiverAccountName: respData.recAccountName || '',
          receiverAccountNo: respData.recAcctNo || '',
          receiverNo: respData.receiverNo || '',
          payeeCode: respData.receiverNo || '',
          recName: respData.recName || '',
          recTel: respData.recTel || '',
          mail: respData.recMail || '',
          receiverBankName: respData.recBankName,
          receiverBankNo: respData.recBankNo,
          receiverProvince: respData.recAccountProvince,
          receiverCity: respData.recAccontCity,
          receiverSettleBankName: respData.recSettleBankName,
          receiverSettleBankNo: respData.recSettleBankNo
        })
        sessionStorage.setItem('singleAddressName', JSON.stringify({ province: respData.recAccountProvinceName, city: respData.recAccountCityName }))
      }
    })()
  }
}

PayeeInfo.propTypes = {
  isTestRule: PropTypes.bool,
  params: PropTypes.object,
  payeeList: PropTypes.object,
  getPayeeList: PropTypes.func,
  updateOrderInfo: PropTypes.func
}
PayeeInfo.defaultProps = {
  isTestRule: false,
  params: {},
  payeeList: {},
  getPayeeList: () => {},
  updateOrderInfo: () => {}
}

export default connect(state => ({
  payeeList: state.singleHandleInfo && state.singleHandleInfo.payeeList
}), dispatch => ({
  getPayeeList: bindActionCreators(actions.getPayeeList, dispatch),
  updateOrderInfo: bindActionCreators(actions.updateOrderInfo, dispatch)
}), null, { withRef: true })(PayeeInfo)

/**
 * receiverAccountName
 */