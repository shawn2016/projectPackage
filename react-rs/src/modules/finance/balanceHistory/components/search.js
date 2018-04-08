import React, { PureComponent } from 'react'
import QBDatepicker from 'components/QBDatePicker'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actions from '../redux/actions'
import '../redux/reducer'
let param = {}
class Search extends PureComponent {
  static propTypes = {
    id: PropTypes.object,
  }
  static defaultProps = {
    id: {},
  }
  constructor(props) {
    super(props)
    this.state = {
      certCompanyList: [
        { text: '全部', value: null },
        { text: '是', value: '1' },
        { text: '否', value: '2' },
      ],
      dataSourceList: [
        { text: '全部', value: null },
        { text: '前台注册', value: '1' },
        { text: '后台注册', value: '2' },
      ],
      showLoading: true,
      isTestRule: false,
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log('检测 props 属性的改变', nextProps)
  // }

  getTableList() {
    this.props.setCurrentPageOne()
    this.props.getTableList(this.props.searchInfo)
  }
  componentWillMount() {
    param = this.props.id
    console.log(this.props)
    //param={accountNo: "0201707000000086"}
    /*this.props.updateSearchInfo({
    accountNo: "0201707000000086",
    })
    this.props.updateSearchInfo({
      accountNo: '0201707000000086',
    })*/
    //Object.assign({}, state, action.value)
    this.props.getTableList(Object.assign(this.props.searchInfo, param))
  }
  componentWillUnmount = () => {
    this.clear()
  }
  clear = () => {
    setTimeout(() => {
      this.props.updateSearchInfo({
        createTimeFrom: '',
        createTimeTo: '',
        // companyName: null,
        // companyLicense: null,
        // isCertCompany: null,
        // dataSource: null
      })
      this.exceptDate.setValue({ startDate: '', endDate: '' })
      this.exceptDate.clearInput('')
      this.exceptDate.clearInput1('')
      this.setState({
        isTestRule: true
      })
    }, 0)
  }
  render() {
    console.log('render')
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
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 column text-left qb-query-min-g">
            <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24 rob-col-xs-24">
              <button className="rob-btn rob-btn-danger rob-btn-circle  pd42 mr10" type="button" onClick={() => { this.getTableList() }} >查询</button>
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
  setCurrentPageOne: PropTypes.func,
  searchInfo: PropTypes.object
}
Search.defaultProps = {
  updateSearchInfo: () => { },
  getTableList: () => { },
  setCurrentPageOne: () => { },
  searchInfo: {}
}

export default connect(state => {
  console.log(state.FBH_clientManage)
  return {
    searchInfo: state.FBH_clientManage && state.FBH_clientManage.FBH_searchInfo
  }
}, dispatch => ({
  updateSearchInfo: bindActionCreators(actions.FBH_updateSearchInfo, dispatch),
  getTableList: bindActionCreators(actions.FBH_getTableList, dispatch),
  setCurrentPageOne: bindActionCreators(actions.FBH_setCurrentPageOne, dispatch),
}))(Search)