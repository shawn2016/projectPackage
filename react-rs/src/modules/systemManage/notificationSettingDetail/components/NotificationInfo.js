import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { formatDay, formatMoneyYuan } from 'utils/filterCommon'
import * as action from '../redux/actions'
import '../redux/reducer'
class NotificationInfo extends PureComponent {
  constructor(props) {
    super(props)
    this.resetPasswordMsg = ''
  }
  static propTypes = {
    param: PropTypes.object,
    userInfo: PropTypes.object
  }
  static defaultProps = {
    param: {},
    userInfo: {}
  }
  componentWillMount() {
    let params = {}
    params.id = this.props.param.id
    this.props.getData(params)
  }
  bizTypeFilter(v) {
    let str = String(v)
    switch (str) {
      case '201000':
        return '单笔转账'
      case '201500':
        return '批量经办'
      case '251000':
        return '代发'
      default:
        return str
    }
  }
  noticeTypeFilter(v) {
    let str = String(v)
    switch (str) {
      case '50':
        return '简单通知'
      case '40':
        return '经办预警'
      case '30':
        return '余额异常'
      case '20':
        return '付款通知'
      case '10':
        return '余额通知'
      default:
        return v
    }
  }
  timeIntervalFilter(v) {
    let str = String(v)
    switch (str) {
      case '100':
        return '每日'
      case '200':
        return '每月'
      default:
        return str
    }
  }
  render() {
    let { notificationData, param = {} } = this.props
    let { body } = notificationData
    body ? { body = {} } = notificationData : body = {}
    let { userInfos = [] } = body
    // if (this.props.param.id === 1) {
      //经办预警详情
    return (
      <div className="qb-listdesc-g__content">
        <div className="rob-row">
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">创建日期：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {formatDay(body.createTime)}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">创建人：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {body.createUser}
              </label>
            </div>
          </div>
          <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">通知类型：</label>
            </div>
            <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
              <label className="qb-listdesc-g__content__desc">
                {this.noticeTypeFilter(body.noticeType)}
              </label>
            </div>
          </div>
          {
            param.noticeType === '40' ? (
              <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                  <label className="qb-listdesc-g__content__title">业务类型：</label>
                </div>
                <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                  <label className="qb-listdesc-g__content__desc">
                    {this.bizTypeFilter(body.bizType)}
                  </label>
                </div>
              </div>
            ) : null
          }
          {
            param.noticeType !== '40' ? (
              <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                  <label className="qb-listdesc-g__content__title">需通知账号：</label>
                </div>
                <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                  <label className="qb-listdesc-g__content__desc">
                    {`${body.companyAcctName}${' '}${body.noticeAccount}`}
                  </label>
                </div>
              </div>
            ) : null
          }
          {
            param.noticeType !== '10' ? (
              <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                  <label className="qb-listdesc-g__content__title">最小金额(元)：</label>
                </div>
                <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                  <label className="qb-listdesc-g__content__desc">
                    {formatMoneyYuan(body.minAmt)}
                  </label>
                </div>
              </div>
            ) : null
          }
          {
            param.noticeType === '30' ? (
              <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                  <label className="qb-listdesc-g__content__title">最大金额(元)：</label>
                </div>
                <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                  <label className="qb-listdesc-g__content__desc">
                    {formatMoneyYuan(body.maxAmt)}
                  </label>
                </div>
              </div>
            ) : null
          }
          {
            param.noticeType === '10' ? (
              <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                  <label className="qb-listdesc-g__content__title">通知间隔：</label>
                </div>
                <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                  <label className="qb-listdesc-g__content__desc">
                    {this.timeIntervalFilter(body.interval)}
                  </label>
                </div>
              </div>
            ) : null
          }
          <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24  rob-col-xs-24">
            <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-8  rob-col-xs-8 qb-no-padding-rg">
              <label className="qb-listdesc-g__content__title">通知用户：</label>
            </div>
            <div className="rob-col-lg-20 rob-col-md-20 rob-col-sm-16  rob-col-xs-16">
              <label className="qb-listdesc-g__content__desc">
                {
                  userInfos.map((user, k) => (
                    <span style={{ marginRight: '20px' }} key={k}>{user.userName}</span>
                  ))
                }
              </label>
            </div>
          </div>
        </div>
      </div>

    )
    // }
  }
}


NotificationInfo.propTypes = {
  notificationData: PropTypes.object,
  getData: PropTypes.func,
  params: PropTypes.object
}
NotificationInfo.defaultProps = {
  notificationData: {},
  getData: () => { },
  params: {}
}

export default connect(state => ({
  notificationData: state.SENL_notificationDataQuery.SENL_notificationData,
}), dispatch => ({
  getData: bindActionCreators(action.SENL_getNotificationInfo, dispatch),
}))(NotificationInfo)
/*
       else if (this.props.param.id === 2) {
      //余额异常通知
      return (
        <div className="qb-listdesc-g__content">
          <div className="rob-row">
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">创建日期：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.createTime}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">创建人：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.createUser}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">通知类型：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.noticeType}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">需通知账号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.companyAcct}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">最小金额：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.minAmt}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">最大金额：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.maxAmt}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">通知用户：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.userInfos ? this.props.notificationData.userInfos.map((user, k) => (
                    <span key={k} >{user},</span>
                  )) : null}
                </label>
              </div>
            </div>
          </div>
        </div>

      )
    } else if (this.props.param.id === 3) {
      //付款通知
      return (
        <div className="qb-listdesc-g__content">
          <div className="rob-row">
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">创建日期：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.createTime}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">创建人：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.createUser}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">通知类型：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.noticeType}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">需通知账号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.companyAcct}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">最小金额：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.minAmt}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">通知用户：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.userInfos ? this.props.notificationData.userInfos.map((user, k) => (
                    <span key={k} >{user},</span>
                  )) : null}
                </label>
              </div>
            </div>
          </div>
        </div>

      )
    } else if (this.props.param.id === 4) {
      //余额通知
      return (
        <div className="qb-listdesc-g__content">
          <div className="rob-row">
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">创建日期：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.createTime}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">创建人：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.createUser}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">通知类型：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.noticeType}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">需通知账号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.companyAcct}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">通知间隔：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.interval}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">通知用户：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {this.props.notificationData.userInfos ? this.props.notificationData.userInfos.map((user, k) => (
                    <span key={k} >{user},</span>
                  )) : null}
                </label>
              </div>
            </div>
          </div>
        </div>
      )
    }
    */