/**
 * 单笔经办详情
 */
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import cookieStorage from 'utils/cookieStorage'
import { bindActionCreators } from 'redux'
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
  }
  static defaultProps = {
    params: {},
    history: {},
    getOrderInfo: () => { },
    getOrderFlowInfo: () => { },
  }
  constructor(props) {
    super(props)
    this.state = {
      flowData: [],
      companyType: '01',
    }
  }
  componentWillMount() {
    let userInfo = cookieStorage.getCookie('userInfo')
    if (JSON.stringify('userInfo') !== '{}') {
      this.setState({
        companyType: userInfo.companyType
      })
    }
    this.props.getOrderInfo({ id: this.props.params && this.props.params.id })
    if (userInfo.companyType && userInfo.companyType === '100') {
      this.props.getOrderFlowInfo({ id: this.props.params && this.props.params.id }).then((res) => {
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
  goBack = () => {
    this.props.history.push('/grossSettlement/searchSingleHandle')
  }
  goBack1 = () => {
    this.props.history.push('/grossSettlement/cancelSingleHandle')
  }
  goBack2 = () => {
    this.props.history.push('/grossSettlement/examineSingleHandle')
  }
  goBack3 = () => {
    this.props.history.push('/grossSettlement/singleHandle')
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g  qb-search-g--layout">
          <div className="qb-column-header-g qb-column-header-g--button">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />支付结算</li>
              <li>
                {this.props.params.from === 'searchSingleHandle' ?
                  <Link to={{ pathname: '/grossSettlement/searchSingleHandle' }}>单笔经办查询</Link> :
                  this.props.params.from === 'cancelSingleHandle' ?
                    <Link to={{ pathname: '/grossSettlement/cancelSingleHandle' }}>单笔经办撤销</Link> :
                    this.props.params.from === 'examineSingleHandle' ?
                      <Link to={{ pathname: '/grossSettlement/examineSingleHandle' }}>单笔经办审核</Link> :
                      this.props.params.from === 'singleHandle' ?
                        <Link to={{ pathname: '/grossSettlement/singleHandle' }}>单笔经办</Link> :
                        ''
                }
              </li>
              <li className="active">
                {this.props.params.from === 'singleHandle' ?
                  '确认经办' : '详情'
                }
              </li>
            </ol>
            {this.props.params.from === 'searchSingleHandle' ?
              <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack} type="button">返回</button> :
              this.props.params.from === 'cancelSingleHandle' ?
                <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack1} type="button">返回</button> :
                this.props.params.from === 'examineSingleHandle' ?
                  <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack2} type="button">返回</button> :
                  this.props.params.from === 'singleHandle' ?
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
            <BusinessInfo />
          </div>
          <div className="qb-listdesc-g__header">
            收方信息
          </div>
          {
            /**
             * 收方信息
             */
          }
          <div className="qb-listdesc-g__content">
            <ReceiveInfo />
          </div>
          {
            this.props.params.source === 2 ? (<div><div className="qb-listdesc-g__header">
              审批意见
          </div>
              { /*** 审批 */}
              <div className="qb-listdesc-g__content">
                <Examine id={this.props.params.id} history={this.props.history} />
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
            <BusinessProcess flowData={this.state.flowData} id={this.props.params.id} />
          </div> : null}
          {this.state.companyType === '100' && this.props.params.query ? <div className="qb-listdesc-g__header">
            验证码信息
          </div> : null}
          {
            /**
             *小B企业管理员审核
             */
          }
          {this.state.companyType === '100' && this.props.params.query ? <div className="qb-listdesc-g__content">
            <VerificationInfo params={this.props.params} history={this.props.history} />
          </div> : null}
        </div>
      </div >
    )
  }
}
export default connect(state => ({
  orderFlowInfo: state.GSSHD_singleHandleDetails && state.GSSHD_singleHandleDetails.GSSHD_orderFlowInfo
}), dispatch => ({
  getOrderInfo: bindActionCreators(actions.GSSHD_getOrderInfo, dispatch),
  getOrderFlowInfo: bindActionCreators(actions.GSSHD_getOrderFlowInfo, dispatch)
}))(SingleHandleDetails)