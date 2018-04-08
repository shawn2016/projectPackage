/**
 * 代发经办详情
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cookieStorage from 'utils/cookieStorage'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as actions from './redux/action'
import BusinessInfo from './components/BusinessInfo'
import ReceiveInfo from './components/ReceiveInfo'
import BusinessProcess from './components/BusinessProcess'
import VerificationInfo from './components/VerificationInfo'
import Examine from './components/Examine'
class SingleHandleDetails extends PureComponent {
  static propTypes = {
    params: PropTypes.object.isRequired,
    history: PropTypes.object,
    getOrderInfo: PropTypes.func,
    getOrderFlowInfo: PropTypes.func,
    isReserCurrentPage: PropTypes.number,
    reserCurrentPage: PropTypes.func,
    getOrderList: PropTypes.func,
    dataObj: PropTypes.object,
    queryInfo: PropTypes.object,
  }
  static defaultProps = {
    params: {},
    history: {},
    getOrderInfo: () => { },
    getOrderFlowInfo: () => { },
    isReserCurrentPage: 0,
    reserCurrentPage: () => { },
    getOrderList: () => { },
    dataObj: {},
    queryInfo: {},
  }
  constructor(props) {
    super(props)
    this.state = {
      flowData: [],
      conf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false,
        previousLabel: '',
        onChange: (currentPage) => {
          let param = Object.assign({}, this.props.queryInfo, { page: currentPage })
          this.props.getOrderList(param)
        }
      },
      dataCount: 0,
      data: []
    }
  }
  userInfo = {}
  componentWillMount() {
    let userInfo = cookieStorage.getCookie('userInfo')
    if (JSON.stringify('userInfo') !== '{}') {
      this.setState({
        companyType: userInfo.companyType
      })
    }
    this.userInfo = cookieStorage.getCookie('userInfo')
    let param = Object.assign({}, this.props.queryInfo, { serialNo: this.props.params.data.serialNo })
    this.props.getOrderList(param)
    //this.props.getOrderList()
    this.props.getOrderInfo(this.props.params)
    if (userInfo.companyType && userInfo.companyType === '100') {
      this.props.getOrderFlowInfo({ actInstanceId: this.props.params && this.props.params.data.actInstanceId }).then((res) => {
        let body = []
        if (res.data.respCode === '000000') {
          if (res.data && res.data.body) {
            body = res.data.body
          }
        }
        this.setState({
          flowData: body
        })
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    // 设置分页
    if (nextProps.isReserCurrentPage === 1) {
      this.pagination.setCurrentPage(1)
      this.props.reserCurrentPage()
    }
    if (nextProps.dataObj && nextProps.dataObj.values) {
      this.setState({
        dataCount: nextProps.dataObj.pagenation.itemCount,
        conf: { ...this.state.conf, currentPage: nextProps.dataObj.pagenation.pageNo }
      })
    }
  }
  goBack = () => {
    this.props.history.push('/issuing/undertakesHandleSearch')
  }
  goBack1 = () => {
    this.props.history.push('/issuing/undertakesHandleCancel')
  }
  goBack2 = () => {
    this.props.history.push('/issuing/undertakesHandleExamine')
  }
  goBack3 = () => {
    this.props.history.push({
      pathname: '/issuing/undertakesOrgnaization',
      state: { reverseData: this.props.params.query }
    })
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g  qb-search-g--layout">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />代发</li>
              <li>
                {this.props.params.from === 'undertakesHandleSearch' ?
                  <Link to={{ pathname: '/issuing/undertakesHandleSearch' }}>代发查询</Link> : ''
                }
                {this.props.params.from === 'undertakesHandleCancel' ?
                  <Link to={{ pathname: '/issuing/undertakesHandleCancel' }}>代发撤销</Link> : ''
                }
                {this.props.params.from === 'undertakesHandleExamine' ?
                  <Link to={{ pathname: '/issuing/undertakesHandleExamine' }}>代发审批</Link> : ''
                }
                {this.props.params.from === 'undertakesHandle' ?
                  <Link to={{ pathname: '/issuing/undertakesOrgnaization' }}>代发经办</Link> : ''
                }
              </li>
              <li className="active">
                {this.props.params.from === 'undertakesHandle' ?
                  '确认经办' : '详情'
                }
              </li>
            </ol>
            {this.props.params.from === 'undertakesHandleSearch' ?
              <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack} type="button">返回</button> :
              this.props.params.from === 'undertakesHandleCancel' ?
                <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack1} type="button">返回</button> :
                this.props.params.from === 'undertakesHandleExamine' ?
                  <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack2} type="button">返回</button> :
                  this.props.params.from === 'undertakesHandle' ?
                    <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack3} type="button">返回</button> :
                    ''
            }
          </div>
          <div className="qb-listdesc-g__header bd-top0">
            业务信息
          </div>
          {
            /**
             * 业务信息
             */
          }
          <div className="qb-listdesc-g__content">
            <BusinessInfo params={this.props.params} />
          </div>
          <div className="qb-listdesc-g__header">
            收方列表
          </div>
          {
            /**
             * 收方列表
             */
          }
          <div className="qb-listdesc-g__content">
            <ReceiveInfo params={this.props.params} id={this.props.params.data.serialNo} />
          </div>
          {
            this.props.params.source === 2 ? (<div><div className="qb-listdesc-g__header">
              审批意见
          </div>
              { /*** 审批 */}
              <div className="qb-listdesc-g__content">
                <Examine data={this.props.params.data} history={this.props.history} />
              </div></div>) : null
          }
          {this.state.flowData && this.state.companyType === '100' ? <div className="qb-listdesc-g__header">
            业务流程
          </div> : null}
          {
            /**
             * 业务流程
             */
          }
          {this.state.companyType === '100' ? <div className="qb-listdesc-g__content">
            <BusinessProcess flowData={this.state.flowData} params={this.props.params} />
          </div> : null}
          {this.state.companyType === '200' && this.props.params.query && this.userInfo.isCfcaUser === '1' ?
            <VerificationInfo params={this.props.params} history={this.props.history} cfcaUserInfo /> : null
          }
          {this.state.companyType === '200' && this.props.params.query && this.userInfo.isCfcaUser === '2' ?
            <div className="qb-listdesc-g__header">
              验证码信息
            </div> : null}
          {
            /**
             *小B企业管理员审核
             */
          }
          {this.state.companyType === '200' && this.props.params.query && this.userInfo.isCfcaUser === '2' ?
            <div className="qb-listdesc-g__content">
              <VerificationInfo params={this.props.params} history={this.props.history} />
            </div> : null}
        </div>
      </div >
    )
  }
}
export default connect(state => ({
  orderFlowInfo: state.IUTHD_singleHandleDetails && state.IUTHD_singleHandleDetails.IUTHD_orderFlowInfo,
  dataObj: state.IUTHD_singleHandleDetails && state.IUTHD_singleHandleDetails.IUTHD_orderList,
  queryInfo: state.IUTHD_singleHandleDetails && state.IUTHD_singleHandleDetails.IUTHD_queryInfo,
  isReserCurrentPage: state.IUTHD_singleHandleDetails && state.IUTHD_singleHandleDetails.IUTHD_isReserCurrentPage
}), dispatch => ({
  getOrderInfo: bindActionCreators(actions.IUTHD_getOrderInfo, dispatch),
  getOrderFlowInfo: bindActionCreators(actions.IUTHD_getOrderFlowInfo, dispatch),
  getOrderList: bindActionCreators(actions.IUTHD_getOrderList, dispatch),
  reserCurrentPage: bindActionCreators(actions.IUTHD_resetCurrentPage, dispatch),
  updateSearchInfo: bindActionCreators(actions.IUTHD_updateSearchInfo, dispatch),
}))(SingleHandleDetails)