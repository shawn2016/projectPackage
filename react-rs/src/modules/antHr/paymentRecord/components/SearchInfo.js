import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dialog from 'react-robotUI/dialog'
import saveRequest from 'utils/getRequest'
import QBDatepicker from 'components/QBDatePicker'
import QBInput from 'components/QBInput'
import QBSelect from 'components/QBSelect'
import * as actions from '../redux/actions'
import '../redux/reducer'
let payStatusList = [
  { text: '全部', value: '' },
  { text: '已支付', value: '200' },
  { text: '已退款', value: '300' }
]
let payStatusWillList = [
  { text: '全部', value: '' },
  { text: '缴费中', value: '0' },
  { text: '缴费成功', value: '1' },
  { text: '缴费失败', value: '2' }
]
/*let now = new Date(new Date())
const startDatetext = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() //eslint-disable-line
const startDatetext2 = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() //eslint-disable-line
const startDatetext3 = timestampFormat(Date.parse(new Date()) + (1000 * 60 * 60 * 24), 6, true) //eslint-disable-line*/
class SearchHead extends PureComponent {
  static propTypes = {
    history: PropTypes.object
  }
  static defaultProps = {
    history: {}
  }
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  static propTypes = {
    searchInfo1: PropTypes.object,
    accountList1: PropTypes.array,
    getAccountList: PropTypes.func,
    getList: PropTypes.func,
    upDateSearchInfo: PropTypes.func,
    clearSearchInfo: PropTypes.func,
    resetCurrentPage: PropTypes.func,
    isTestRule: PropTypes.bool
  }
  static defaultProps = {
    searchInfo1: {},
    accountList1: [],
    getAccountList: () => { },
    getList: () => { },
    upDateSearchInfo: () => { },
    clearSearchInfo: () => { },
    resetCurrentPage: () => { },
    isTestRule: false
  }
  componentWillMount = () => {
    /*this.props.getAccountList({ page: 1, rows: 10, receiveTimeFrom: startDatetext2, receiveTimeTo: startDatetext3 }).then(() => {
      if (this.props.accountList1) {
        this.account.setValue({ text: this.props.accountList1[0].text, value: this.props.accountList1[0].value })
        //this.type.setValue({ text: typeList[0].text, value: typeList[0].value })
        this.props.upDateSearchInfo({
          accountNo: this.props.accountList1[0].value,
          receiveTimeFrom: startDatetext2,
          receiveTimeTo: startDatetext3
        })
      }
      //this.props.getList(this.props.searchInfo1)
      this.props.getList({ ...this.props.searchInfo1, page: 1, rows: 10, receiveTimeFrom: startDatetext2, receiveTimeTo: startDatetext3 })
    })*/
    //this.props.getList(this.props.searchInfo1)
    this.delUser()
  }
  componentWillReceiveProps = () => {
  }
  componentWillUnmount = () => {
    this.clear()
  }
  delUser = () => {
    (async () => {
      let resposeData = await saveRequest({
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
          alertCloseAsFail: true,
          showCloseBtn: true,
          alertContent: tempContent,
          alertBtns: orderBtns,
          alertBtnsClass: 'rob-alert-button rob-alert-button-45',
          alertType: 'bg_icon'
        })
      } else if (resposeData.data.respCode === '000000' && resposeData.data.body.acctStatus && resposeData.data.body.acctStatus === 3) {
        /*开通完成*/
        this.props.getList(this.props.searchInfo1)
      } else if (resposeData.data.respCode === '000000' && resposeData.data.body.acctStatus && resposeData.data.body.acctStatus === 4) {
        /*去开通*/
        this.props.history.push('/antHr/opeanAntHr')
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
  go = (item) => {
    window.open(item, '_blank')
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
      this.props.history.push('/home/home')
    }
    if (type === 'open') {
      this.props.history.push('/antHr/opeanAntHr')
    }
    if (type === 'jump') {
      this.props.history.push('/antHr/opeanAntHr')
    }
  }
  search = () => {
    this.props.getList(this.props.searchInfo1)
    this.props.resetCurrentPage()
  }
  clear = () => {
    /* this.account.setValue({ text: '全部', value: '' })
     this.date.clearInput('')
     this.date.clearInput1('')
     this.payName.setValue('')
     this.payNo.setValue('')
     this.amount.setValue({ startValue: '', endValue: '' })
     this.type.setValue({ text: '全部', value: '' })
     this.props.clearSearchInfo()*/
    //this.account.setValue({ text: '全部', value: '' })
    this.date.clearInput('')
    this.date.clearInput1('')
    //this.payName.clearInput('')
    this.date.setValue('')
    //this.date.clearInput1('')
    this.type.setValue('')
    this.payStatusType.setValue({ text: '全部', value: '' })
    this.payStatusWillType.setValue({ text: '全部', value: '' })
    //this.amount.setValue({ startValue: '', endValue: '' })
    this.payName.setValue('')
    //this.payName.clearInput('')
    //this.payName.clearInput1('')
    this.props.clearSearchInfo()
    this.setState({
      isTestRule: true
    })
  }
  alertCloseAsFail = (type) => {
    //this.setState({ showAlert: false })
    if (!type) {
      this.setState({
        alertCloseAsFail: false
      }, () => {
        this.props.history.push('/home/home')
      })
    }
    if (type === 'open') {
      //this.setState({ alertCloseAsFail: false })
      this.props.history.push('/antHr/opeanAntHr')
    }
  }
  render() {
    return (
      <div className="qb-panel-g qb-search-g--layout">
        <div className="qb-column-header-g qb-border-bottom">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li><i className="qb-icon-icon-menu" style={{ marginRight: '5px' }} />缴费记录</li>
          </ol>
        </div>
        <div className="qb-search-g">
          <div className="rob-row rob-no-gutters">
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
              <div className="rob-form-group">
                <QBInput
                  label="员工姓名"
                  containErrorIcon
                  isTestRule={this.props.isTestRule}
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  handleChange={(value) => this.props.upDateSearchInfo({ empName: value })}
                  ref={(DOM) => { this.payName = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
              <div className="rob-form-group">
                <QBDatepicker
                  label="缴纳月份"
                  content="m"
                  isRange={false}
                  labelClass=" rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  handleSelect={value => { this.props.upDateSearchInfo({ paymentMonth: value }) }}
                  ref={(DOM) => { this.date = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
              <div className="rob-form-group">
                <QBInput
                  label="服务类型"
                  containErrorIcon
                  isTestRule={this.props.isTestRule}
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  handleChange={(value) => this.props.upDateSearchInfo({ serviceType: value })}
                  ref={(DOM) => { this.type = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
              <div className="rob-form-group">
                <QBSelect
                  label="缴纳状态"
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  options={payStatusList}
                  defaultValue={''}
                  handleSelect={value => { this.props.upDateSearchInfo({ paymentStatus: value.value }) }}
                  ref={(DOM) => { this.payStatusType = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
              <div className="rob-form-group">
                <QBSelect
                  label="代缴状态"
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  options={payStatusWillList}
                  defaultValue={''}
                  handleSelect={value => { this.props.upDateSearchInfo({ surrenderStatus: value.value }) }}
                  ref={(DOM) => { this.payStatusWillType = DOM }}
                />
              </div>
            </div>
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-12 rob-col-xs-12  column qb-search-g__button ">
              <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-12 rob-col-xs-12">
                <button onClick={this.search} className="rob-btn rob-btn-danger rob-btn-circle " type="button">查询</button>
              </div>
              <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 qb-search-g__button__item">
                <button onClick={this.clear} className="rob-btn rob-btn-minor rob-btn-circle " type="button">清空</button>
              </div>
            </div>
            <div className="rob-col-lg-6 column" />
            <div className="rob-col-lg-6 column" />
          </div>
        </div>
        <Dialog
          showCover
          showCloseBtn={this.state.showCloseBtn}
          autoClose={this.state.alertAutoClose}
          timeout={10}
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
        <Dialog
          showCover
          showCloseBtn={this.state.showCloseBtn}
          autoClose={this.state.alertAutoClose}
          timeout={10}
          open={this.state.alertCloseAsFail}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertCloseAsFail(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
}
export default connect(state => ({
  searchInfo1: state.AHPR_tradeQueryData && state.AHPR_tradeQueryData.AHPR_upDateSearchInfo,
}), dispatch => ({
  clearSearchInfo: bindActionCreators(actions.AHPR_clearSearchInfo, dispatch),
  upDateSearchInfo: bindActionCreators(actions.AHPR_upDateSearchInfo, dispatch),
  getList: bindActionCreators(actions.AHPR_getTqList, dispatch),
  resetCurrentPage: bindActionCreators(actions.AHPR_resetCurrentPage, dispatch),
}))(SearchHead)