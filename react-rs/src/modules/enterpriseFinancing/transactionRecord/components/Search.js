import React, { PureComponent } from 'react'
import QBSelect from 'components/QBSelect'
import QBDatepicker from 'components/QBDatePicker'
import Dialog from 'react-robotUI/dialog'
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
      transferType: [
        { text: '全部', value: '' },
        { text: '转入', value: '0' },
        { text: '转出', value: '1' },
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
   /* this.props.setCurrentPageOne()
    this.props.getTableList(this.props.searchInfo)*/
    this.setState({
      isTestRule: true
    }, () => {
      if (this.exceptDate.getErrStatus()) {
        console.log('有错')
      } else {
        this.props.setCurrentPageOne()
        this.props.getTableList(this.props.searchInfo)
      }
    })
  }
  componentWillMount() {
    this.props.getTableList(this.props.searchInfo).then(res => {
      if (res.data.respCode === '500000') {
        let orderBtns = [
          { label: '知道了', state: 'saveOrder', className: 'rob-btn-danger rob-btn-circle' }
        ]
        let tempContent = (
          <div>
            <div style={{ marginBottom: '20px', fontSize: '14px' }}>账户余额查询异常</div>
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
    })
    //this.props.getTableLists()
  }

  componentWillUnmount = () => {
    this.clear()
  }
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'saveOrder') {
      //this.props.history.push('/grossSettlement/searchSingleHandle')
    }
  }
  clear = () => {
    this.props.updateSearchInfo({
      createTimeFrom: null,
      createTimeTo: null,
      transferType: null,
    })
    this.exceptDate.clearInput('')
    this.exceptDate.clearInput1('')
    this.transferType.setValue({ text: '全部', value: null })
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
                label="类型"
                containErrorIcon1
                defaultValue={this.state.transferType[0].value}
                labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                isTestRule={this.state.isTestRule}
                options={this.state.transferType}
                handleSelect={obj =>
                  this.props.updateSearchInfo({
                    transferType: obj.value
                  })
                }
                ref={ref => this.transferType = ref}
              />
            </div>
          </div>
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-12 rob-col-xs-12  column qb-search-g__button ">
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-12 rob-col-xs-12">
              <button className="rob-btn rob-btn-danger rob-btn-circle " type="button" onClick={() => { this.getTableList() }} >查询</button>
            </div>
          </div>
          <div className="rob-col-lg-6 column" />
          <div className="rob-col-lg-6 column" />
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
    searchInfo: state.EFTR_clientManage && state.EFTR_clientManage.EFTR_searchInfo,
    tableLists: state.EFTR_clientManage && state.EFTR_clientManage.EFTR_tableLists,
  }
}, dispatch => ({
  updateSearchInfo: bindActionCreators(actions.EFTR_updateSearchInfo, dispatch),
  getTableList: bindActionCreators(actions.EFTR_getTableList, dispatch),
  getTableLists: bindActionCreators(actions.EFTR_getTableLists, dispatch),
  setCurrentPageOne: bindActionCreators(actions.EFTR_setCurrentPageOne, dispatch),
}))(Search)