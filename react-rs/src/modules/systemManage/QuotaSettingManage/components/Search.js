import React, { PureComponent } from 'react'
import QBSelect from 'components/QBSelect'
// import QBLoading from 'components/QBLoading'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actions from '../redux/actions'
import '../redux/reducer'

class Search extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      bussinessTypeList: [
        { text: '全部', value: null },
        { text: '支付结算', value: '1' },
        { text: '代发', value: '2' },
      ],
      showLoading: true
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log('检测 props 属性的改变', nextProps)
  // }
  getTableList() {
    // this.setState({ showLoading: true }, () => { this.props.getTableList(this.props.searchInfo).then(() => { this.setState({ showLoading: false }) }) })
    this.props.getTableList(this.props.searchInfo)
  }
  componentWillMount() {
    // Promise.all([this.props.getAccountNameList(this.props.searchInfo), this.props.getTableList(this.props.searchInfo)]).then(() => { this.setState({ showLoading: false }) })
    this.props.getAccountNameList(this.props.searchInfo)
    this.props.getTableList(this.props.searchInfo)
  }
  componentWillUnmount = () => {
    this.clear()
  }
  clear = () => {
    this.props.updateSearchInfo({
      payAccountNo: '1',
      productType: '1'
    })
    this.productType.setValue({ text: '全部', value: '1' })
    this.payAccountNo.setValue({ text: '全部', value: '1' })
  }
  render() {
    console.log('render')
    return (
      <div>
        {/* <QBLoading showLoading={this.state.showLoading} loadType="loadingImg" /> */}
        <div className="rob-row rob-no-gutters">
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
            <div className="rob-form-group">
              <QBSelect
                name="default"
                label="账号名称"
                required
                containErrorIcon1
                defaultValue="1"
                labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                options={this.props.accountNameList}
                handleSelect={value =>
                  this.props.updateSearchInfo({
                    payAccountNo: value.value
                  })
                }
                ref={ref => this.payAccountNo = ref}
              />
            </div>
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
            <div className="rob-form-group">
              <QBSelect
                name="default"
                label="业务模式"
                required
                containErrorIcon1
                defaultValue={null}
                labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                options={this.state.bussinessTypeList}
                handleSelect={obj =>
                  this.props.updateSearchInfo({
                    productType: obj.value
                  })
                }
                ref={ref => this.productType = ref}
              />
            </div>
          </div>
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-12 rob-col-xs-12  column qb-search-g__button ">
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-12 rob-col-xs-12">
              <button className="rob-btn rob-btn-danger rob-btn-circle " type="button" onClick={() => { this.getTableList() }} >搜索</button>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 qb-search-g__button__item">
              <button
                className="rob-btn rob-btn-minor rob-btn-circle"
                type="button"
                onClick={this.clear}
              >清除</button>
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
  getAccountNameList: PropTypes.func,
  updateSearchInfo: PropTypes.func,
  getTableList: PropTypes.func,
  accountNameList: PropTypes.array,
  searchInfo: PropTypes.object
}
Search.defaultProps = {
  updateSearchInfo: () => { },
  getAccountNameList: () => { },
  getTableList: () => { },
  accountNameList: [],
  searchInfo: {}
}

export default connect(state => {
  console.log(state.quotaSettingManage)
  return {
    accountNameList: state.quotaSettingManage && state.quotaSettingManage.accountNameList,
    searchInfo: state.quotaSettingManage && state.quotaSettingManage.searchInfo
  }
}, dispatch => ({
  getAccountNameList: bindActionCreators(actions.getAccountNameList, dispatch),
  updateSearchInfo: bindActionCreators(actions.updateSearchInfo, dispatch),
  getTableList: bindActionCreators(actions.getTableList, dispatch),
}))(Search)