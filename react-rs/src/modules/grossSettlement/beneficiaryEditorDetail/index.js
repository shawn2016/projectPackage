import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { formatDay } from 'utils/filterCommon'
import * as action from './redux/actions'
import './redux/reducer'

class BeneficiaryEditorDetailPage extends PureComponent {
  /* 初始化数据 */
  componentDidMount() {
    this.props.getBeneficiaryEditorDetailData({ id: this.props.params.id })
  }
  /* 返回收款方列表页面事件 */
  goBack = () => {
    this.props.history.push('/grossSettlement/beneficiaryEditor')
  }
  render() {
    const { data } = this.props,
      { beneficiaryEditorDetailData } = data,
      { body } = beneficiaryEditorDetailData
    return (
      <div className="qb-panel-g qb-search-g--layout">
        <div className="qb-column-header-g qb-column-header-g--button">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li><i className="qb-icon-payment" style={{ marginRight: '5px' }} />支付结算</li>
            <li><Link to={{ pathname: '/grossSettlement/beneficiaryEditor' }}>收款方编辑</Link></li>
            <li className="active">详情</li>
          </ol>
          <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack} type="button">返回</button>
        </div>
        <div className="qb-listdesc-g__content qb-media-height">
          <div className="rob-row">
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">创建日期：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {body.createTime ? formatDay(body.createTime) : ''}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">收款方编号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {body.receiverNo}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">收款方名称：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {body.recAccountName}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">收款方银行账号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {body.recAcctNo}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">开户银行：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {body.recSettleBankName}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">所在地区：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {body.recAccountProvinceName} {body.recAccountCityName}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">支行名称：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {body.recBankName}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">联行号：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {body.recBankNo}
                </label>
              </div>
            </div>
            {/* <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">白名单：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {body.createTime}
                </label>
              </div>
            </div> */}
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">联系人姓名：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {body.recName}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">联系人移动电话：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {body.recTel}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">电子邮箱：</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {body.recMail}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
BeneficiaryEditorDetailPage.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
  params: PropTypes.object,
  getBeneficiaryEditorDetailData: PropTypes.func,
}
BeneficiaryEditorDetailPage.defaultProps = {
  data: {},
  history: {},
  params: {},
  getBeneficiaryEditorDetailData: () => {},
}

export default connect(state => ({
  data: state.beneficiaryEditorDetail
}), dispatch => ({
  getBeneficiaryEditorDetailData: bindActionCreators(action.getBeneficiaryEditorDetailData, dispatch)
}))(BeneficiaryEditorDetailPage)