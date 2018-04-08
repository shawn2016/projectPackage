import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import QBDatepicker from 'components/QBDatePicker'
import QBInput from 'components/QBInput'
import QBSelect from 'components/QBSelect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as action from '../redux/actions'
import '../redux/reducer'
class Search extends PureComponent {
  constructor(props) {
    super(props)
    this.resetPasswordMsg = ''
    this.state = {
      isShowErrorHint: false,
      params: {
        isCfcaUser: 'default',
        checkType: 400
      },
      PaginationConf: {
        pageSize: 10
      },
      accountList: [{ value: 1, text: '是' }, { value: 2, text: '否' }],
      idRulue: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    }
    this.statusOptions = [
      { text: '全部', value: 'default' },
      { text: '是', value: '1' },
      { text: '否', value: '2' }
    ]
  }
  static propTypes = {
    isTestRule: PropTypes.bool,
    status: PropTypes.string
  }
  static defaultProps = {
    isTestRule: false,
    status: ''
  }
  _search = () => {
    this.setState({
      isTestRule: true
    }, () => {
      !this.exceptDate.getErrStatus()
        && !this.amount.getErrStatus()
        && !this.userName.getErrStatus()
        && !this.identifyNo.getErrStatus()
        && !this.certificate.getErrStatus() ? console.log('没错', this.amount) : console.log('有错')
      this.exceptDate.setValue({
        startDate: '2017-09-12',
        endDate: '2015-09-09'
      })
    })
  }
  /* 列表数据 */
  componentDidMount() {
    this.props.getData({ checkType: 400, page: 1, rows: 10 })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      params: { ...this.state.params, checkType: nextProps.status }
    })
  }
  componentWillUnmount = () => {
    this.clearSearchParams()
  }
  /* 清空查询参数 */
  clearSearchParams = () => {
    this.userName.setValue('')
    this.identifyNo.setValue('')
    this.exceptDate.clearInput('')
    this.exceptDate.clearInput1('')
    this.isCfcaUser.setValue({ text: '全部', value: 'default' })
    delete (this.state.params.identifyNo)
    delete (this.state.params.createTimeFrom)
    delete (this.state.params.userName)
    delete (this.state.params.createTimeTo)
    // this.props.clearLoanProgressSearch()
    this.setState({
      params: { ...this.state.params, page: 1 }
    })
    this.props.changeParams(this.state.params)
    this.setState({
      isShowErrorHint: true
    })
  }
  getSearchDate = () => {
    const { params } = this.state
    if (params.isCfcaUser === 'default') {
      delete (params.isCfcaUser)
    }
    params.page = 1
    params.rows = this.state.PaginationConf.pageSize
    this.setState({
      isShowErrorHint: true
    }, () => {
      if (this.identifyNo.getErrStatus() || this.exceptDate.getErrStatus()) {
        return
      }
      this.props.getData(params)
    })
    this.setState({
      params: { ...this.state.params, page: 1 }
    })
    this.props.changeParams(this.state.params)
    this.props.resetCurrentPage()
  }
  render() {
    return (
      <div>
        <div className="qb-search-g">
          <div className="rob-row rob-no-gutters">
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
              <div className="rob-form-group">
                <QBDatepicker
                  label="创建日期"
                  isEqual
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  handleSelect={(val) => {
                    this.setState({ params: { ...this.state.params, createTimeFrom: val.startDate, createTimeTo: val.endDate } })
                  }}
                  isTestRule={this.state.isShowErrorHint}
                  ref={ref => this.exceptDate = ref}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
              <div className="rob-form-group">
                <QBInput
                  name="userName"
                  type="text"
                  label="用户姓名"
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  containErrorIcon
                  errDirection="bottom"
                  isTestRule={this.state.isShowErrorHint}
                  handleChange={(val) => {
                    this.setState({ params: { ...this.state.params, userName: val } })
                  }}
                  ref={ref => this.userName = ref}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
              <div className="rob-form-group">
                <QBInput
                  name="identifyNo"
                  type="text"
                  label="身份证号"
                  errorMsg="请输入正确的身份证号"
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  containErrorIcon
                  errDirection="bottom"
                  pattern={this.state.idRulue}
                  isTestRule={this.state.isShowErrorHint}
                  handleChange={(val) => {
                    this.setState({ params: { ...this.state.params, identifyNo: val } })
                  }}
                  ref={ref => this.identifyNo = ref}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
              <div className="rob-form-group">
                <QBSelect
                  name="isCfcaUser"
                  label="数字证书用户"
                  errDirection="bottom"
                  labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                  inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                  containErrorIcon
                  defaultValue="default"
                  isTestRule={this.props.isTestRule}
                  handleSelect={(val) => {
                    this.setState({ params: { ...this.state.params, isCfcaUser: val.value } })
                  }}
                  options={this.statusOptions}
                  ref={ref => this.isCfcaUser = ref}
                />
              </div>
            </div>
            <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 column text-left qb-query-min-g">
              <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24 rob-col-xs-24">
                <button className="rob-btn rob-btn-danger rob-btn-circle pd42 mr10" onClick={this.getSearchDate} type="button">查询</button>
                <button className="rob-btn rob-btn-minor rob-btn-circle pd42" type="button" onClick={this.clearSearchParams}>清除</button>
              </div>
            </div>
            <div className="rob-col-lg-6 column" />
            <div className="rob-col-lg-6 column" />
          </div>
        </div>
      </div>
    )
  }
}


Search.propTypes = {
  queryInfo: PropTypes.object,
  data: PropTypes.object,
  updateSearchInfo: PropTypes.func,
  getData: PropTypes.func,
  changeParams: PropTypes.func,
  resetCurrentPage: PropTypes.func,

}
Search.defaultProps = {
  queryInfo: {},
  data: {},
  updateSearchInfo: () => { },
  getData: () => { },
  changeParams: () => { },
  resetCurrentPage: () => { },


}

export default connect(state => ({
  queryInfo: state.SMUS_userListDataQuery && state.SMUS_userListDataQuery.SMUS_queryInfo,
  data: state.SMUS_userListDataQuery
}), dispatch => ({
  updateSearchInfo: bindActionCreators(action.SMUS_updateSearchInfo, dispatch),
  getData: bindActionCreators(action.SMUS_getList, dispatch),
  resetCurrentPage: bindActionCreators(action.SMUS_reserCurrentPage, dispatch)

}))(Search)
