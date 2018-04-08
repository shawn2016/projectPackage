/*eslint-disable */
import React, { PureComponent } from 'react'
import QBInput from 'components/QBInput'
// import QBSelect from 'components/QBSelect'
import BankAndAddress from 'components/BankAndAddress'
import Dialog from 'react-robotUI/dialog'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import cookieStorage from 'utils/cookieStorage'
import * as action from './redux/actions'
import './redux/reducer'
class publicAccountManagePage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bankInfo: {},
      title: '',
      showContent: null,
      actions: null,
      showCover: true,
      autoClose: false,
      power: false,
      btnstyle: 'rob-alert-button rob-alert-button-45',
      accountName: cookieStorage.getCookie('accountInfo').companyName,
      accountNo: null,
      bankCode: null, //支行联行号
      showCloseBtn: false
    }
  }
  static propTypes = {
    params: PropTypes.object,
    isTestRule: PropTypes.bool,
    data: PropTypes.object,
    getData: PropTypes.func,
    saveData: PropTypes.func,
    payTheFees: PropTypes.func,
    history: PropTypes.func
  }
  static defaultProps = {
    params: {},
    isTestRule: false,
    data: {},
    getData: () => { },
    saveData: () => { },
    payTheFees: () => { },
    history: {}
  }
  componentWillMount = () => {
    let accountName = sessionStorage.getItem('companyName')
    this.setState({
      accountName
    })
    // 如果是修改账户
    if (this.props.params.no) {
      this.props.getData({ accountNo: this.props.params.no })
    }
  }
  componentWillReceiveProps = (next) => {
    // 如果是修改账户
    if (this.props.params.no) {
      let realData = next.data
      if (realData) {
        this.accountNo.setValue(this.props.params.no)
        let curObj = {
          bank: { bankName: realData.settleBankName, bankCode: realData.settleBankNo },
          branchBank: { bankName: realData.bankName, bankCode: realData.bankNo },
          province: { name: realData.accountProvince, code: realData.accountProvinceNo },
          city: { name: realData.accountCity, code: realData.accountCityNo }
        }
        this.BankAndAddress.wrappedInstance.setValue(curObj)
        this.setState({
          bankCode: realData.bankNo,
          bankInfo: curObj
        })
      }
    }
  }
  savePublicAccount = () => {
    this.setState({
      isTestRule: true
    })
    if (this.accountNo.getErrStatus() || this.BankAndAddress.wrappedInstance.getErrStatus()) {
      return false
    }
    let param = {
      accountName: this.state.accountName,
      accountNo: this.state.accountNo,
      accountProvince: this.state.bankInfo.province.code,
      accountCity: this.state.bankInfo.city.code,
      settleBankName: this.state.bankInfo.bank.bankName,
      settleBankNo: this.state.bankInfo.bank.bankCode,
      bankName: this.state.bankInfo.branchBank.bankName,
      bankNo: this.state.bankInfo.branchBank.bankCode
    }
    if (this.props.params.id) {
      param.id = this.props.params.id
    }
    this.props.saveData(param).then(res => {
      if (res.data.respCode === '000000') {
        this.setState({
          power: true,
          title: '关联成功',
          showCloseBtn: false,
          showContent: (
            <div className="rob-alert-content">
              已成功关联对公账户，还差一步就能激活。<br />
              请使用对公账户向融数钱包支付一笔金额（0.01元即可）<br />
            </div>),
          actions: [{
            label: '去支付',
            className: 'rob-btn-danger rob-btn-circle',
            state: 'change'
          }]
        })
      }/* else if (res.data.respCode === '900000') {
        this.setState({
          power: true,
          title: '关联失败',
          showContent: (
            <div className="rob-alert-content">
              <i className="bg_icon qb-icon-active" />
              <div className="">
                <div>提交失败！</div>
              </div>
            </div>),
          actions: '',
        })
      }*/
    })
  }
  handleClose = (state) => {
    if (state === 'change') {
      this.setState({
        power: false
      }, () => {
        // 缴费的方法
        this.props.payTheFees({
          accountNo: this.state.accountNo
        }).then((res) => {
          if (res.data.respCode === '000000') {
            if (res.data.body && res.data.body.formFile) {
              let formFile = res.data.body.formFile
              document.getElementById('submit_dom').innerHTML = formFile.substr(0, formFile.length - 7) + '<input type="submit" hidden id="submit_button" value="Submit"></form>'
              document.getElementById('submit_button').click()
            }
            this.setState({
              power: true,
              showCloseBtn: false,
              title: "",
              showContent: (
                <div className="rob-alert-content">
                  <i className="bg_icon qb-icon-active" />
                  <div className="">
                    <div>{res.data.respMsg}</div>
                  </div>
                </div>),
              btnstyle: 'rob-alert-button rob-alert-button-color rob-alert-button-45',
              actions: [{
                label: '确定',
                className: 'rob-btn-danger rob-btn-circle rob-alert-button-color',
                state: 'skip'
              }]
            })
          }
        })
      })
    } else if (state === 'skip') {
      this.setState({
        power: false
      }, () => {
        this.props.history.push({
          pathname: '/home/depositlist'
        })
      })
    } else {
      this.setState({
        power: false
      })
    }
  }
  // setTimeout(() => {
  //               this.props.history.push({
  //                 pathname: '/systemManage/publicAccountManage'
  //               })
  //             }, 3000)
  handlesel = (val) => {
    this.setState({
      bankInfo: { ...val },
      bankCode: val.branchBank.bankCode
    })
  }
  remove = () => {
    this.props.history.push({
      pathname: '/systemManage/publicAccountManage'
    })
  }
  render() {
    return (
      <div>
        <Dialog
          showCloseBtn={this.state.showCloseBtn}
          title={this.state.title}
          titleClassName="rob-alert-title rob-alert-title-color"
          content={this.state.showContent}
          actions={this.state.actions}
          actionClassName={this.state.btnstyle}
          showCover={this.state.showCover}
          autoClose={this.state.autoClose}
          open={this.state.power}
          onRequestClose={(state) => this.handleClose(state)}
        />
        <div id="submit_dom" />
        <div className="qb-panel-g">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li><Link to={{ pathname: '/systemManage/publicAccountManage' }}>对公账户管理</Link></li>
              <li className="active">{this.props.params.no ? '修改对公账户' : '关联对公账户'}</li>
            </ol>
          </div>
          <div className="qb-time-line-g rob-form-group">
            <div className="qb-form-group-g qb-form-group-b10-g clearfix">
              <div className="rob-form-group rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
                  <label htmlFor="inputEmail3" className="rob-input-label" title="对公账号">账户名称:</label>
                </div>
                <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24 ">
                  <div className="rob-input-item ">
                    <label htmlFor="inputEmail3" className="rob-input-label" title="对公账号">{this.state.accountName}</label>
                  </div>
                </div>
              </div>
              <div className="rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                <QBInput
                  name="accountNo"
                  type="text"
                  label="对公账号"
                  placeholder="请输入对公账号"
                  errDirection="bottom"
                  inputClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
                  containErrorIcon
                  required
                  isTestRule={this.state.isTestRule}
                  handleChange={value => this.setState({
                    accountNo: value
                  })}
                  ref={ref => this.accountNo = ref}
                />
              </div>
              <div className="rob-form-group rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                <BankAndAddress
                  handleSelect={(val) => { this.handlesel(val) }}
                  isTestRule={this.state.isTestRule}
                  required
                  ref={ref => this.BankAndAddress = ref}
                  mainClass="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24"
                />
              </div>
              <div className="rob-form-group rob-form-group-has-button rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
                  <label htmlFor="inputEmail3" className="rob-input-label" title="对公账号">联行号:</label>
                </div>
                <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24 ">
                  <div className="rob-input-item ">
                    <label htmlFor="inputEmail3" className="rob-input-label" title="对公账号">{this.state.bankCode}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="qb-form-footButton-g clearfix ">
          <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <button className="rob-btn rob-btn-minor rob-btn-circle " type="button" onClick={this.remove}>取消</button>
            <button className="rob-btn rob-btn-danger rob-btn-circle" onClick={this.savePublicAccount}>确定</button>
          </div>
        </div>
      </div>
    )
  }
}

publicAccountManagePage.propTypes = {
  queryInfo: PropTypes.object,
  data: PropTypes.object,
  updateSearchInfo: PropTypes.func,
  getData: PropTypes.func
}
publicAccountManagePage.defaultProps = {
  queryInfo: {},
  data: {},
  updateSearchInfo: () => { },
  getData: () => { }
}

export default connect(state => ({
  data: state.padpublicAccountDataQuery.padpublicAccountData
}), dispatch => ({
  getData: bindActionCreators(action.padgetData, dispatch),
  saveData: bindActionCreators(action.padsaveData, dispatch),
  payTheFees: bindActionCreators(action.padpayTheFees, dispatch),
}))(publicAccountManagePage)
