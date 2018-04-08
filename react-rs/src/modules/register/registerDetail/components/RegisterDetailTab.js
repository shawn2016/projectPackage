import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Tab from 'react-robotUI/Tab'
import Filter from '../../../../utils/filterCommon'
import * as action from '../redux/action'
import '../redux/reducer'
class RegisterDetailTab extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      params: {},
    }
  }
  componentWillMount() {
    // this.getType(this.props.bizList[0])
    console.log('this.props.setail', this.props)
    // const { dataDetail = {} } = this.props,
    //   { location = {} } = dataDetail,
    //   { state: params = {} } = location
    // // 获取企业注册信息
    // this.props.getSmallRegisterInfo({ ...params }).then((res) => {
    //   console.log('111', res)
    // })
  }
  componentDidMount() {
    // 默认显示tab1中的内容
  }
  componentWillReceiveProps(nextProps) {
    console.log('next', nextProps)
  }
  /* 切換tab*/
  switchState = (p) => {
    let params = {}
    params.type = p
    this.props.updateTypeId(p)
  }
  /**
   * 跳转到登陆
   */
  gotoLogin = () => {
    this.props.history.push({
      pathname: '/login'
    })
  }
  /**
   * 跳转至注册修改
   */
  gotoEditRegister = () => {
    let { dataDetail = {} } = this.props,
      { location = {} } = dataDetail,
      { state = {} } = location,
      { body: detaileData = {} } = state,
      { companyInfo = {} } = detaileData,
      { companyLicense = '', companyType = '', id = '' } = companyInfo
    let params = {}
    params.companyLicense = companyLicense
    params.companyType = companyType
    params.companyId = id
    this.props.history.push({
      pathname: '/selectRegister',
      state: params
    })
    // todo:小B跳小B注册 大B跳大B注册
    // if (1) {

    // } else if (0) {
    //   this.props.history.push({

    //     pathname: ''
    //   })
    // }
  }
  /**
   * 预览图片
   */
  openImg = (url) => {
    if (url) {
      window.open(url, '_blank')
    }
  }
  render() {
    console.log('子组件', this.props)
    let { dataDetail = {} } = this.props,
      { location = {} } = dataDetail,
      { state = {} } = location,
      { body: detaileData = {} } = state,
      { adminList = [], companyInfo = {}, regResult = {}, fileUrl = '' } = detaileData
    return (
      <div className="qb-column-header-g qb-column-header-g--tabs">
        <button onClick={this.gotoLogin} type="button" className="fr rob-btn rob-btn-danger rob-btn-circle" style={{ marginTop: '15px', marginRight: '20px' }}>返回登陆</button>
        {
          companyInfo.companyType === '100' ? (
            <Tab name="rob-nav rob-nav-tabs2" icon="qb-icon-home">
              <div title="注册结果" data-func={this.switchState.bind(this, 1)}>
                <div className="tab-content ">
                  <div role="tabpanel" className="tab-pane fade active in" aria-labelledby="profile-tab">
                    <div className="pdtb100 text-center">
                      {
                        // 审核通过
                        regResult.result === '500004' ?
                          <i className="bg_icon qb-icon-active" /> : null
                      }
                      {
                        // 审核中
                        regResult.result === '500005' ?
                          <i className="bg_icon qb-icon-checking" /> : null
                      }
                      {
                        // 审核不通过
                        regResult.result === '500006' ?
                          <i className="bg_icon qb-icon-failure" /> : null
                      }
                      <div className="fs16 lh40">{regResult.message}</div>
                      {
                        // 审核不通过
                        regResult.result === '500006' ? (
                          <div>
                            <div className="fs12">不通过原因：<span>{regResult.reason}</span></div>
                            <button style={{ display: companyInfo.dataSource === '1' ? 'inline-block' : 'none' }} onClick={this.gotoEditRegister} type="button" className="rob-btn rob-btn-danger rob-btn-circle pd38 mgt30">修改注册信息</button>
                          </div>
                        ) : null
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div title="企业信息" data-func={this.switchState.bind(this, 2)} >
                <div id="myTabContent" className="tab-content ">
                  <div role="tabpanel" className="tab-pane fade active in" aria-labelledby="profile-tab">
                    <div className="qb-listdesc-g__content">
                      <div className="rob-row">
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">注册时间：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {Filter.formatDay(companyInfo.createTime)}
                            </label>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">企业名称：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {companyInfo.companyName}
                            </label>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">营业执照号：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {companyInfo.companyLicense}
                            </label>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">联系人姓名：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {companyInfo.contactName}
                            </label>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">联系方式：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {companyInfo.contactPhone}
                            </label>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">是否申请数字证书：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {Filter.isCfcaUser(companyInfo.isCertCompany)}
                            </label>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">客户来源：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {Filter.clientSource(companyInfo.dataSource)}
                            </label>
                          </div>
                        </div>
                        {
                          Number(companyInfo.isCertCompany) === 1 ? (
                            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                                <label className="qb-listdesc-g__content__title">邮寄地址：</label>
                              </div>
                              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                                <label className="qb-listdesc-g__content__desc">
                                  {companyInfo.madDetail}
                                </label>
                              </div>
                            </div>
                          ) : null
                        }
                      </div>
                      <div className="rob-row">
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">营业执照照片：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <div className="qb-listdesc-g__content__img">
                              <img onClick={() => { this.openImg(`${fileUrl}${companyInfo.licenseImg}`) }} className="" src={`${fileUrl}${companyInfo.licenseImg}`} alt="" title="点击查看大图" style={{ cursor: 'pointer' }} />
                            </div>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title"> 开户许可证：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <div className="qb-listdesc-g__content__img">
                              <img onClick={() => { this.openImg(`${fileUrl}${companyInfo.openPermitImg}`) }} className="" src={`${fileUrl}${companyInfo.openPermitImg}`} alt="" title="点击查看大图" style={{ cursor: 'pointer' }} />
                            </div>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title"> 法人身份证正面：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <div className="qb-listdesc-g__content__img">
                              <img onClick={() => { this.openImg(`${fileUrl}${companyInfo.legalIdCardImgUp}`) }} className="" src={`${fileUrl}${companyInfo.legalIdCardImgUp}`} alt="" title="点击查看大图" style={{ cursor: 'pointer' }} />
                            </div>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title"> 法人身份证反面：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <div className="qb-listdesc-g__content__img">
                              <img onClick={() => { this.openImg(`${fileUrl}${companyInfo.legalIdCardImgDown}`) }} className="" src={`${fileUrl}${companyInfo.legalIdCardImgDown}`} alt="" title="点击查看大图" style={{ cursor: 'pointer' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*大B显示 小B不显示*/}
              <div title="管理员信息" data-func={this.switchState.bind(this, 2)} >
                <div id="myTabContent" className="tab-content ">
                  <div role="tabpanel" className="tab-pane fade active in" aria-labelledby="profile-tab">
                    <div className="qb-listdesc-g__content">
                      {adminList.map((item, registerDetailIndex) => (
                        <div key={registerDetailIndex}>
                          <div className="rob-row">
                            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                              <div className="rob-col-lg-7 rob-col-md-7 rob-col-sm-7  rob-col-xs-7">
                                <label className="qb-listdesc-g__content__title">系统管理员姓名{registerDetailIndex + 1}：</label>
                              </div>
                              <div className="rob-col-lg-17 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                                <label className="qb-listdesc-g__content__desc">
                                  {item.userName}
                                </label>
                              </div>
                            </div>
                            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                              <div className="rob-col-lg-7 rob-col-md-7 rob-col-sm-7  rob-col-xs-7">
                                <label className="qb-listdesc-g__content__title">身份证号：</label>
                              </div>
                              <div className="rob-col-lg-17 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                                <label className="qb-listdesc-g__content__desc">
                                  {item.identifyNo}
                                </label>
                              </div>
                            </div>
                            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                              <div className="rob-col-lg-7 rob-col-md-7 rob-col-sm-7  rob-col-xs-7">
                                <label className="qb-listdesc-g__content__title">手机号码：</label>
                              </div>
                              <div className="rob-col-lg-17 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                                <label className="qb-listdesc-g__content__desc">
                                  {item.phonenum}
                                </label>
                              </div>
                            </div>
                            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                              <div className="rob-col-lg-7 rob-col-md-7 rob-col-sm-7  rob-col-xs-7">
                                <label className="qb-listdesc-g__content__title">职务：</label>
                              </div>
                              <div className="rob-col-lg-17 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                                <label className="qb-listdesc-g__content__desc">
                                  {item.userDuty}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="rob-row">
                            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                              <div className="rob-col-lg-7 rob-col-md-7 rob-col-sm-7  rob-col-xs-7">
                                <label className="qb-listdesc-g__content__title">身份证照片正面：</label>
                              </div>
                              <div className="rob-col-lg-17 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                                <div className="qb-listdesc-g__content__img">
                                  <img onClick={() => { this.openImg(`${fileUrl}${item.userCertImgUp}`) }} className="" src={`${fileUrl}${item.userCertImgUp}`} alt="" title="点击查看大图" style={{ cursor: 'pointer' }} />
                                  <div className="qb-listdesc-g__content__img--reupload">
                                    {/* 重新上传 */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                              <div className="rob-col-lg-7 rob-col-md-7 rob-col-sm-7  rob-col-xs-7">
                                <label className="qb-listdesc-g__content__title">身份证照片反面：</label>
                              </div>
                              <div className="rob-col-lg-17 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                                <div className="qb-listdesc-g__content__img">
                                  <img onClick={() => { this.openImg(`${fileUrl}${item.userCertImgDo}`) }} className="" src={`${fileUrl}${item.userCertImgDo}`} alt="" title="点击查看大图" style={{ cursor: 'pointer' }} />
                                  <div className="qb-listdesc-g__content__img--reupload">
                                    {/* 重新上传 */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          ) : (
            <Tab name="rob-nav rob-nav-tabs2" icon="qb-icon-home">
              <div title="注册结果" data-func={this.switchState.bind(this, 1)}>
                <div className="tab-content ">
                  <div role="tabpanel" className="tab-pane fade active in" aria-labelledby="profile-tab">
                    <div className="pdtb100 text-center">
                      {
                        // 审核通过
                        regResult.result === '500004' ?
                          <i className="bg_icon qb-icon-active" /> : null
                      }
                      {
                        // 审核中
                        regResult.result === '500005' ?
                          <i className="bg_icon qb-icon-checking" /> : null
                      }
                      {
                        // 审核不通过
                        regResult.result === '500006' ?
                          <i className="bg_icon qb-icon-failure" /> : null
                      }
                      <div className="fs16 lh40">{regResult.message}</div>
                      {
                        // 审核不通过
                        regResult.result === '500006' ? (
                          <div>
                            <div className="fs12">不通过原因：<span>{regResult.reason}</span></div>
                            <button style={{ display: companyInfo.dataSource === '1' ? 'inline-block' : 'none' }} onClick={this.gotoEditRegister} type="button" className="rob-btn rob-btn-danger rob-btn-circle pd38 mgt30">修改注册信息</button>
                          </div>
                        ) : null
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div title="企业信息" data-func={this.switchState.bind(this, 2)} >
                <div id="myTabContent" className="tab-content ">
                  <div role="tabpanel" className="tab-pane fade active in" aria-labelledby="profile-tab">
                    <div className="qb-listdesc-g__content">
                      <div className="rob-row">
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">注册时间：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {Filter.formatDay(companyInfo.createTime)}
                            </label>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">企业名称：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {companyInfo.companyName}
                            </label>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">营业执照号：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {companyInfo.companyLicense}
                            </label>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">联系人姓名：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {companyInfo.contactName}
                            </label>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">联系方式：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {companyInfo.contactPhone}
                            </label>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">是否申请数字证书：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {Filter.isCfcaUser(companyInfo.isCertCompany)}
                            </label>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">客户来源：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <label className="qb-listdesc-g__content__desc">
                              {Filter.clientSource(companyInfo.dataSource)}
                            </label>
                          </div>
                        </div>
                        {
                          Number(companyInfo.isCertCompany) === 1 ? (
                            <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                              <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                                <label className="qb-listdesc-g__content__title">邮寄地址：</label>
                              </div>
                              <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                                <label className="qb-listdesc-g__content__desc">
                                  {companyInfo.madDetail}
                                </label>
                              </div>
                            </div>
                          ) : null
                        }
                      </div>
                      <div className="rob-row">
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title">营业执照照片：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <div className="qb-listdesc-g__content__img">
                              <img onClick={() => { this.openImg(`${fileUrl}${companyInfo.licenseImg}`) }} className="" src={`${fileUrl}${companyInfo.licenseImg}`} alt="" title="点击查看大图" style={{ cursor: 'pointer' }} />
                            </div>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title"> 开户许可证：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <div className="qb-listdesc-g__content__img">
                              <img onClick={() => { this.openImg(`${fileUrl}${companyInfo.openPermitImg}`) }} className="" src={`${fileUrl}${companyInfo.openPermitImg}`} alt="" title="点击查看大图" style={{ cursor: 'pointer' }} />
                            </div>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title"> 法人身份证正面：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <div className="qb-listdesc-g__content__img">
                              <img onClick={() => { this.openImg(`${fileUrl}${companyInfo.legalIdCardImgUp}`) }} className="" src={`${fileUrl}${companyInfo.legalIdCardImgUp}`} alt="" title="点击查看大图" style={{ cursor: 'pointer' }} />
                            </div>
                          </div>
                        </div>
                        <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-24  rob-col-xs-24">
                          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6  rob-col-xs-6">
                            <label className="qb-listdesc-g__content__title"> 法人身份证反面：</label>
                          </div>
                          <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-18  rob-col-xs-18">
                            <div className="qb-listdesc-g__content__img">
                              <img onClick={() => { this.openImg(`${fileUrl}${companyInfo.legalIdCardImgDown}`) }} className="" src={`${fileUrl}${companyInfo.legalIdCardImgDown}`} alt="" title="点击查看大图" style={{ cursor: 'pointer' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          )
        }
      </div>
    )
  }

}
RegisterDetailTab.propTypes = {
  getSmallRegisterInfo: PropTypes.func,
  dataDetail: PropTypes.object,
  updateTypeId: PropTypes.func,
  history: PropTypes.object,
  data: PropTypes.object,
  updateSearchInfo: PropTypes.func,
  adminList: PropTypes.array,
  isTestRule: PropTypes.bool,
  getList: PropTypes.func
}
RegisterDetailTab.defaultProps = {
  getSmallRegisterInfo: () => {},
  dataDetail: {},
  updateTypeId: () => {},
  history: {},
  data: {},
  updateSearchInfo: () => { },
  adminList: [],
  isTestRule: false,
  getList: () => { }
}
RegisterDetailTab.contextType = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    staticContext: PropTypes.object,
  })
}
export default connect(state => {
  console.log('进度详情', state)
  return {
    data: state.smallRegisterInfo
  }
},
  dispatch => ({
    getSmallRegisterInfo: bindActionCreators(action.getSmallRegisterInfo, dispatch)
    // updateSearchInfo: bindActionCreators(action.SENG_updateSearchInfo, dispatch),
    // updateTypeId: bindActionCreators(action.SENG_updateTypeId, dispatch),
    // getList: bindActionCreators(action.SENG_getList, dispatch)
  })
)(RegisterDetailTab)
