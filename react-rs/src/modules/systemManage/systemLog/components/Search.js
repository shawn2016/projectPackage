import React, { PureComponent } from 'react'
import QBSelect from 'components/QBSelect'
import QBDatepicker from 'components/QBDatePicker'
import QBInput from 'components/QBInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actions from '../redux/actions'
import '../redux/reducer'

class Search extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isTestRule: false,
      logType: [
        { text: '全部', value: '' },
        { text: '普通行为日志', value: '000000' },
        { text: '登录记录', value: '100001' },
        { text: '首页', value: '200001' },
        { text: '财务查询', value: '300001' },
        { text: '支付结算', value: '300002' },
        { text: '授信管理', value: '400001' },
        { text: '系统管理', value: '500001' },
        { text: '客户管理', value: '600001' },
        { text: '账务管理', value: '700001' },
        { text: '融资业务', value: '800001' },
        { text: '结算对账', value: '900001' },
      ],
      createName: [
        { text: '全部', value: '' },
        { text: '管理员1', value: '管理员1' },
        { text: '管理员2', value: '管理员2' },
        { text: '业务员', value: '业务员' },
      ],
      showLoading: true
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log('检测 props 属性的改变', nextProps)
  // }
  getTableList() {
    this.props.setCurrentPageOne()
    this.props.getTableList(this.props.searchInfo)
    /*this.setState({
      isTestRule: true
    }, () => {
      if (this.createTimeFrom.getErrStatus() || this.createTimeTo.getErrStatus() || this.exceptDate.getErrStatus() || this.serialNo.getErrStatus() || this.receiverAccountName.getErrStatus() || this.amount.getErrStatus()) {
        console.log('有错')
      } else {
        this.props.setCurrentPageOne()
        this.props.getTableList(this.props.searchInfo)
      }
    })*/
  }
  componentWillMount() {
    this.props.getTableList(this.props.searchInfo)
    this.props.getTableLists()
  }
  componentWillReceiveProps = (Props) => {
    let { body = [] } = Props.tableLists
    //let log = []
    body.map((val, index) => {
      if (val.desc === undefined) return false
      body[index].text = body[index].desc
      delete (body[index].desc)
      return true
    })
    console.log(body)
    this.state.logType = body
    //this.state.logType.unshift({ text: '全部', value: null })
    //this.props.updateSearchInfo({
    //this.logType.setValue({ text: '全部', value: null })
    //this.logType.setValue({ text: '全部', value: null })
    //}
    //this.logType.setValue({ text: this.state.logType[0].text, value: this.props.accountList1[0].value })
    console.log(this.state.logType)
    console.log(body)
  }
  clear = () => {
    this.props.updateSearchInfo({
      createTimeFrom: null,
      createTimeTo: null,
      logType: null,
      createName: null
    })
    this.exceptDate.clearInput('')
    this.exceptDate.clearInput1('')
    this.createName.setValue('')
    this.logType.setValue({ text: '全部', value: null })
    this.setState({
      isTestRule: true
    })
  }
  render() {
    return (
      <div>
        {/* <QBLoading showLoading={this.state.showLoading} loadType="loadingImg" /> */}
        <div className="rob-row rob-no-gutters">
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
            <div className="rob-form-group">
              <QBDatepicker
                label="日期"
                labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                isTestRule={this.state.isTestRule}
                handleSelect={val => {
                  console.log(val)
                  this.props.updateSearchInfo({
                    createTimeFrom: val.startDate,
                    createTimeTo: val.endDate
                  })
                }}
                ref={ref => this.exceptDate = ref}
              />
            </div>
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
            <div className="rob-form-group">
              <QBSelect
                name="default"
                label="日志种类"
                required
                containErrorIcon1
                defaultValue={this.state.logType[0].value}
                labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                //isTestRule={this.state.isTestRule}
                options={this.state.logType}
                handleSelect={obj =>
                  this.props.updateSearchInfo({
                    logType: obj.value
                  })
                }
                ref={ref => this.logType = ref}
              />
            </div>
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
            <QBInput
              label="操作人"
              labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
              inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
              errDirection="bottom"
              isTestRule={this.state.isTestRule}
              handleChange={value => {
                this.props.updateSearchInfo({
                  createName: value,
                })
              }}
              ref={ref => this.createName = ref}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 qb-pull-right-g column text-left">
            <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24 rob-col-xs-24">
              <button className="rob-btn rob-btn-danger rob-btn-circle mr10 pd42" type="button" onClick={() => { this.getTableList() }} >查询</button>
              <button
                className="rob-btn rob-btn-minor rob-btn-circle pd42"
                type="button"
                onClick={this.clear}
              >清空</button>
            </div>
          </div>
          <div className="rob-col-lg-6 column" />
          <div className="rob-col-lg-6 column" />
        </div>
      </div>
    )
  }
}


Search.propTypes = {
  updateSearchInfo: PropTypes.func,
  getTableList: PropTypes.func,
  getTableLists: PropTypes.func,
  setCurrentPageOne: PropTypes.func,
  searchInfo: PropTypes.object,
  tableLists: PropTypes.object
}
Search.defaultProps = {
  updateSearchInfo: () => { },
  getTableList: () => { },
  getTableLists: () => { },
  setCurrentPageOne: () => { },
  searchInfo: {},
  tableLists: {}
}

export default connect(state => {
  console.log(state.clientManage)
  return {
    searchInfo: state.SMSL_clientManage && state.SMSL_clientManage.SMSL_searchInfo,
    tableLists: state.SMSL_clientManage && state.SMSL_clientManage.SMSL_tableLists,
  }
}, dispatch => ({
  updateSearchInfo: bindActionCreators(actions.SMSL_updateSearchInfo, dispatch),
  getTableList: bindActionCreators(actions.SMSL_getTableList, dispatch),
  getTableLists: bindActionCreators(actions.SMSL_getTableLists, dispatch),
  setCurrentPageOne: bindActionCreators(actions.SMSL_setCurrentPageOne, dispatch),
}))(Search)