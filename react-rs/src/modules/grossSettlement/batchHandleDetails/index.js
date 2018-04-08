/**
 * 批量经办详情
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
    this.props.history.push('/grossSettlement/searchBatchHandle')
  }
  goBack1 = () => {
    this.props.history.push('/grossSettlement/cancelBatchHandle')
  }
  goBack2 = () => {
    this.props.history.push('/grossSettlement/examineBatchHandle')
  }
  goBack3 = () => {
    this.props.history.push({
      pathname: '/grossSettlement/batchHandle',
      state: { reverseData: this.props.params.query }
    })
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g  qb-search-g--layout">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />支付结算</li>
              <li>
                {this.props.params.from === 'searchBatchHandle' ?
                  <Link to={{ pathname: '/grossSettlement/searchBatchHandle' }}>批量经办查询</Link> : ''
                }
                {this.props.params.from === 'cancelBatchHandle' ?
                  <Link to={{ pathname: '/grossSettlement/cancelBatchHandle' }}>批量经办撤销</Link> : ''
                }
                {this.props.params.from === 'examineBatchHandle' ?
                  <Link to={{ pathname: '/grossSettlement/examineBatchHandle' }}>批量经办审核</Link> : ''
                }
                {this.props.params.from === 'batchHandle' ?
                  <Link to={{ pathname: '/grossSettlement/batchHandle' }}>批量经办</Link> : ''
                }
              </li>
              <li className="active">
                {this.props.params.from === 'batchHandle' ?
                  '确认经办' : '详情'
                }
              </li>
            </ol>
            {this.props.params.from === 'searchBatchHandle' ?
              <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack} type="button">返回</button> :
              this.props.params.from === 'cancelBatchHandle' ?
                <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack1} type="button">返回</button> :
                this.props.params.from === 'examineBatchHandle' ?
                  <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack2} type="button">返回</button> :
                  this.props.params.from === 'batchHandle' ?
                    <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack3} type="button">返回</button> :
                    ''
            }
          </div>
          <div className="qb-listdesc-g__header">
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
  orderFlowInfo: state.GSBHD_singleHandleDetails && state.GSBHD_singleHandleDetails.GSBHD_orderFlowInfo,
  dataObj: state.GSBHD_singleHandleDetails && state.GSBHD_singleHandleDetails.GSBHD_orderList,
  queryInfo: state.GSBHD_singleHandleDetails && state.GSBHD_singleHandleDetails.GSBHD_queryInfo,
  isReserCurrentPage: state.GSBHD_singleHandleDetails && state.GSBHD_singleHandleDetails.GSBHD_isReserCurrentPage
}), dispatch => ({
  getOrderInfo: bindActionCreators(actions.GSBHD_getOrderInfo, dispatch),
  getOrderFlowInfo: bindActionCreators(actions.GSBHD_getOrderFlowInfo, dispatch),
  getOrderList: bindActionCreators(actions.GSBHD_getOrderList, dispatch),
  reserCurrentPage: bindActionCreators(actions.GSBHD_resetCurrentPage, dispatch),
  updateSearchInfo: bindActionCreators(actions.GSBHD_updateSearchInfo, dispatch),
  //getOrderList: bindActionCreators(actions.GSSSH_getOrderList, dispatch),
  //resetCurrentPage: bindActionCreators(actions.GSSSH_resetCurrentPage, dispatch),
}))(SingleHandleDetails)