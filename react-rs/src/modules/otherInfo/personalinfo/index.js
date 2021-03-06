/*
公告信息列表
戴志祥
2017-7-25
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isCfcaUser } from 'utils/filterCommon'
import * as action from './redux/actions'
import './redux/reducer'
class personalInfoPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      data: {}
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const { data = {} } = nextProps,
      { PIQY_personalInfoData = {} } = data,
      { body = {} } = PIQY_personalInfoData
    this.setState({
      data: body
    })
  }
  componentDidMount() {
    this.props.getData().then(() => {
    })
  }
  openImg = (url) => {
    window.open(url, '_blank')
  }
  render() {
    const { data = {} } = this.state
    return (
      <div className="qb-panel-g qb-listdesc-g qb-media-height">
        <div className="qb-listdesc-g__content qb-listdesc-g__content__desc--top">
          <div className="rob-row">
            <div className="rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">姓名:</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">
                  {data.userName}
                </label>
              </div>
            </div>
            <div className="rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">身份证号:</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{data.identifyNo}</label>
              </div>
            </div>
            <div className="rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">手机号码:</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{data.phonenum}</label>
              </div>
            </div>
            <div className="rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">职务:</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{data.userDuty}</label>
              </div>
            </div>
            <div className="rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">所属公司:</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{data.companyName}</label>
              </div>
            </div>
            <div className="rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title">是否申请数字证书:</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <label className="qb-listdesc-g__content__desc">{isCfcaUser(data.isCfcaUser)}</label>
              </div>
            </div>

          </div>
          <div className="rob-row">
            <div className="rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
              <div className="rob-col-lg-8 rob-col-md-7 rob-col-sm-7  rob-col-xs-7 qb-no-padding-rg">
                <label className="qb-listdesc-g__content__title"> 身份证照片:</label>
              </div>
              <div className="rob-col-lg-16 rob-col-md-17 rob-col-sm-17  rob-col-xs-17">
                <div className="qb-listdesc-g__content__img mr10">
                  <img className="" alt="身份证正面" onClick={() => { this.openImg(data.userCertImgUp) }} src={data.userCertImgUp} />
                </div>
                <div className="qb-listdesc-g__content__img">
                  <img className="" alt="身份证反面" onClick={() => { this.openImg(data.userCertImgDown) }} src={data.userCertImgDown} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
personalInfoPage.propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func
}
personalInfoPage.defaultProps = {
  data: {},
  getData: () => { }
}
export default connect(state => ({
  data: state.PIQY_personalInfoQuery
}), dispatch => ({
  getData: bindActionCreators(action.PIQY_getData, dispatch)
}))(personalInfoPage)