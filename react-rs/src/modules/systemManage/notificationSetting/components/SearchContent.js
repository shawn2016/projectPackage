import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import QBInput from 'components/QBInput'
import QBSelect from 'components/QBSelect'
import QBDatepicker from 'components/QBDatePicker'
import * as action from '../redux/actions'
import '../redux/reducer'
class SearchContent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      noticeInterval: [
        { text: '全部', value: '' },
        { text: '每日', value: '100' },
        { text: '每月', value: '200' },
      ],
      bizList: [
        { text: '全部', value: '' },
        { text: '单笔经办', value: '201000' },
        { text: '批量经办', value: '201500' },
        { text: '代发', value: '251000' }
      ],
      initParams: {
        createTimeFrom: '',
        createTimeTo: '',
        createUser: '',
        noticeType: '50', // 简单通知
        bizType: '',
        interval: ''
        // page: 1,
        // rows: 10
      },
      data: [],
    }
  }
  componentWillMount() {
    // 设置业务类型默认值
    // bizType: this.props.bizList[0].value, interval: this.state.noticeInterval[0].value
    this.setState({
      // bizList: this.props.bizList,
      params: { ...this.state.initParams }
    })
    this.props.getData() //获取简单通知
  }
  componentDidMount() {
    // this.props.getList({ noticeType: '2' }) // 2表示经办预警
  }
  componentWillReceiveProps(nextProps) {
    // 每次切换tab都进性一次查询
    if (nextProps.tabTypeId === '50') {
      this.props.getData()
    } else if (nextProps.tabTypeId !== '50') {
      if (nextProps.tabTypeId === '40') { //经办预警 业务类型 默认为 全部
        this.setState({ params: { ...this.state.initParams, noticeType: `${nextProps.tabTypeId}`, bizType: this.state.bizList[0].value } }, () => {
          this.bizType.setValue({ text: '全部', value: '' })
          this.props.getList(this.state.params)
        })
      } else if (nextProps.tabTypeId === '10') { // 余额通知 通知间隔 默认为 全部
        this.setState({ params: { ...this.state.initParams, noticeType: `${nextProps.tabTypeId}`, interval: this.state.noticeInterval[0].value } }, () => {
          this.interval.setValue(this.state.bizList[0])
          this.props.getList(this.state.params)
        })
      } else {
        this.setState({ params: { ...this.state.initParams, noticeType: `${nextProps.tabTypeId}` } }, () => {
          this.props.getList(this.state.params)
        })
      }
      setTimeout(() => {
        this.clearInfo(nextProps.tabTypeId)
      }, 0)
    }
    // 1、切换tab时如果不是 1、且tab切换了 则 清空查询条件进行列表查询
    // 2、若是分页参数改变 不清空查询参数条件 进性列表查询
    // 注意： 分页组件单独拿出来写
  }

  bizTypeFilter(v) {
    switch (v) {
      case '100':
        return '单笔转账'
      case '400':
        return '出金提现'
      default:
        return v
    }
  }
  /*清空查询条件*/
  clearInfo = (tabTypeId) => {
    if (tabTypeId !== '50') {
      this.applyDate.clearInput('')
      this.applyDate.clearInput1('')
      this.applyDate.setValue({ startDate: '', endDate: '' })
      this.createUser.setValue('')
      if (tabTypeId === '40') {
        this.props.updateSearchInfo({ bizType: this.state.bizList[0].value })
        this.props.updateSearchInfo({ interval: '' }) //时间间隔
        this.bizType.setValue({ text: '全部', value: '' })
      } else if (tabTypeId === '10') {
        this.interval.setValue(this.state.bizList[0])
        this.props.updateSearchInfo({ bizType: '' })
        this.props.updateSearchInfo({ interval: this.state.noticeInterval[0].value }) //时间间隔
      } else {
        this.props.updateSearchInfo({ bizType: '' })
        this.props.updateSearchInfo({ interval: '' })
      }
    }
    this.setState({ params: { ...this.state.initParams, noticeType: `${tabTypeId}` } })
    this.setState({
      isTestRule: true
    })
  }
  getType = (item) => {
    this.setState({ params: { ...this.state.params, bizType: item.value } })
    this.state.params.bizType = item.value
    this.props.updateSearchInfo({ bizType: item.value })
  }
  /**
   * 搜索
   */
  searchManage = () => {
    // 先校验表单 通过则查询
    this.setState({ isTestRule: true }, () => {
      if (this.applyDate.getErrStatus()) {
        return false
      }
      let params = {}
      params.noticeType = this.props.tabTypeId
      // params.page = 1
      // params.rows = 10
      this.props.getList({ ...this.state.params, ...params })
    })
  }
  render() {
    let { tabTypeId = '50' } = this.props
    return (
      <div>
        {
          this.props.tabTypeId !== '50' && this.props.tabTypeId !== '' ? (
            <div id="myTabContent" className="tab-content ">
              <div role="tabpanel" className="tab-pane fade" id="home2" aria-labelledby="home-tab" />
              <div role="tabpanel" className="tab-pane fade active in" id="profile2" aria-labelledby="profile-tab">
                <div className="qb-search-g">
                  <div className="rob-row rob-no-gutters">
                    <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
                      <div className="rob-form-group">
                        <QBDatepicker
                          label="创建日期"
                          labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                          inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                          errDirection="bottom"
                          isTestRule={this.state.isTestRule}
                          handleSelect={val => {
                            this.props.updateSearchInfo({
                              createTimeFrom: val.startDate,
                              createTimeTo: val.endDate
                            })
                            this.setState({ params: { ...this.state.params, createTimeFrom: val.startDate, createTimeTo: val.endDate } })
                          }}
                          ref={(DOM) => { this.applyDate = DOM }}
                        />
                      </div>
                    </div>
                    <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
                      <div className="rob-form-group">
                        <QBInput
                          name="money"
                          type="text"
                          label="创建人"
                          labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                          inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                          errDirection="bottom"
                          containErrorIcon
                          isTestRule={this.state.isTestRule}
                          handleChange={val => {
                            this.props.updateSearchInfo({
                              createUser: val
                            })
                            this.setState({ params: { ...this.state.params, createUser: val } })
                          }
                          }
                          ref={ref => this.createUser = ref}
                        />
                      </div>
                    </div>
                    {
                      this.props.tabTypeId === '40' ? (
                        <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
                          <div className="rob-form-group">
                            <QBSelect
                              name="default"
                              label="业务类型"
                              defaultValue=""
                              errDirection="bottom"
                              options={this.state.bizList}
                              handleSelect={item => {
                                this.getType(item)
                              }}
                              ref={ref => this.bizType = ref}
                            />
                          </div>
                        </div>
                      ) : null
                    }
                    {
                      this.props.tabTypeId === '10' ? (
                        <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24 ">
                          <div className="rob-form-group">
                            <QBSelect
                              name=""
                              type="default"
                              label="通知间隔"
                              errDirection="bottom"
                              options={this.state.noticeInterval}
                              handleSelect={item => {
                                this.props.updateSearchInfo({
                                  interval: item.value
                                })
                                this.setState({
                                  params: { ...this.state.params, interval: item.value }
                                })
                              }}
                              ref={ref => this.interval = ref}
                            />
                          </div>
                        </div>
                      ) : null
                    }
                    <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-12 rob-col-xs-12  column qb-search-g__button ">
                      <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-12 rob-col-xs-12">
                        <button onClick={this.searchManage} className="rob-btn rob-btn-danger rob-btn-circle " type="button">查询</button>
                      </div>
                      <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 qb-search-g__button__item">
                        <button onClick={() => { this.clearInfo(tabTypeId) }} className="rob-btn rob-btn-minor rob-btn-circle " type="button">清空</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        }
      </div>
    )
  }
}
SearchContent.propTypes = {
  updateSearchInfo: PropTypes.func,
  // bizList: PropTypes.array,
  params: PropTypes.object,
  tabTypeId: PropTypes.any,
  getData: PropTypes.func,
  getList: PropTypes.func
}
SearchContent.defaultProps = {
  updateSearchInfo: () => {},
  // bizList: [],
  params: {},
  tabTypeId: '',
  getData: () => { },
  getList: () => { }
}
export default connect(state => ({
  tabTypeId: state.SENG_notificationListDataQuery.SENG_getTypeId
}), dispatch => ({
  getData: bindActionCreators(action.SENG_getData, dispatch), // 获取简单通知信息
  getList: bindActionCreators(action.SENG_getList, dispatch),  // 获取通知列表
  updateSearchInfo: bindActionCreators(action.SENG_updateSearchInfo, dispatch)// 跟新查询信息
}))(SearchContent)
