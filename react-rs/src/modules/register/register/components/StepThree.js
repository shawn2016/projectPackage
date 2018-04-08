/* eslint-disable */
import React, { PureComponent, PropTypes } from 'react'
import Button from 'react-robotUI/Button'
import { bindActionCreators } from 'redux'
import Upload from 'rc-upload'
import { connect } from 'react-redux'
import emptyFunc from 'utils/emptyFunc'
import { trimLeftAndRight } from 'utils/filterCommon'
import config from '../../../../config'
import Dialog from 'react-robotUI/dialog'
import * as action from '../redux/action'
import '../redux/reducer'
const img1 = require('assets/images/document.png')
const img2 = require('assets/images/face.png')
const img3 = require('assets/images/reverse.png')
class StepThree extends PureComponent {
  static propTypes = {
    handleClick: PropTypes.func,
    stepNum: PropTypes.number,
    getFileUrl: PropTypes.func,
    finishedData: PropTypes.object,
    getFileUrl: PropTypes.func,
    saveInfo: PropTypes.object
  }
  static defaultProps = {
    handleClick: emptyFunc,
    stepNum: 0,
    getFileUrl: () => { },
    finishedData: {},
    getFileUrl: () => { },
    saveInfo: {}
  }
  constructor(prop) {
    super(prop)
    this.state = {
      imgFinish: false,
      uploadConfig: [],
      fileListKey: {},
      uploadFileNameListCopy: {},
      uploadFileNameList: {},
      uploadFileNameList: {
        businessCard: { label: '营业执照照片', listFile: [{ imgUrl: '', imgFullUrl: '', fileName: 'licenseImg' }] },
        openAccount: { label: '开户许可证', listFile: [{ imgUrl: '', imgFullUrl: '', fileName: 'openPermitImg' }] },
        card1: { label: '法人身份证照片', listFile: [{ imgUrl: '', imgFullUrl: '', fileName: 'legalIdCardImgUp', footer: '身份证正面' }, { imgUrl: '', imgFullUrl: '', fileName: 'legalIdCardImgDown', footer: '身份证反面' }] },
        card2: { label: '系统管理员1身份证照片', listFile: [{ imgUrl: '', imgFullUrl: '', fileName: 'userCertImgUp1', footer: '身份证正面' }, { imgUrl: '', imgFullUrl: '', fileName: 'userCertImgDo1', footer: '身份证反面' }] },
        card3: { label: '系统管理员2身份证照片', listFile: [{ imgUrl: '', imgFullUrl: '', fileName: 'userCertImgUp2', footer: '身份证正面' }, { imgUrl: '', imgFullUrl: '', fileName: 'userCertImgDo2', footer: '身份证反面' }] }
      }
    }
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
    this.openImg = (url) => {
      window.open(url, "_blank")
    }
    this.saveAs = () => {
      sessionStorage.setItem('getThreeStepData', JSON.stringify(this.state.uploadFileNameList))
      let getOneStepData = JSON.parse(sessionStorage.getItem('getOneStepData'))
      let getTwoStepData = JSON.parse(sessionStorage.getItem('getTwoStepData'))
      let getThreeStepData = JSON.parse(sessionStorage.getItem('getThreeStepData'))
      let all = Object.assign({}, { ...getOneStepData, ...getTwoStepData, ...this.state.uploadFileNameList })
      const { card1 = {}, card2 = {}, card3 = {}, openAccount = {}, businessCard = {}, bankInfo = {} } = all,
        { listFile: openAccountListFile = [] } = openAccount,
        { listFile: businessCardListFile = [] } = businessCard,
        { listFile: card1ListFile = [] } = card1,
        { listFile: card2ListFile = [] } = card2,
        { listFile: card3ListFile = [] } = card3,
        { province = {}, region = {}, city = {} } = bankInfo
      // 步骤一
      if (!all.companyLicense) {
        this.handleOpen('d11', '营业执照号不能为空')
        return
      }
      if (!all.companyName) {
        this.handleOpen('d11', '企业名称不能为空')
        return
      }
      if (!all.contactName) {
        this.handleOpen('d11', '联系人姓名不能为空')
        return
      }
      if (!all.contactPhone) {
        this.handleOpen('d11', '联系方式不能为空')
        return
      }
      // 步骤二 表单
      if (!all.userName1) {
        this.handleOpen('d11', '系统管理员1姓名不能为空')
        return
      }
      if (!all.userName2) {
        this.handleOpen('d11', '系统管理员2姓名不能为空')
        return
      }
      if (!all.identifyNo1) {
        this.handleOpen('d11', '系统管理员1身份证号不能为空')
        return
      }
      if (!all.identifyNo2) {
        this.handleOpen('d11', '系统管理员2身份证号不能为空')
        return
      }
      if (all.identifyNo2 === all.identifyNo1) {
        this.handleOpen('d11', '系统管理员1身份证号不能与系统管理员2身份证号一致')
        return
      }
      if (!all.phoneNum1) {
        this.handleOpen('d11', '系统管理员1手机号码不能为空')
        return
      }
      if (!all.phoneNum2) {
        this.handleOpen('d11', '系统管理员2手机号码不能为空')
        return
      }
      if (all.phoneNum1 === all.phoneNum2) {
        this.handleOpen('d11', '系统管理员1手机号码不能与系统管理员2手机号码一致')
        return
      }
      // 步骤二 地址
      if (!bankInfo || !province.name && Number(all.isCertCompany) === 1) {
        this.handleOpen('d11', '请选择省')
        return
      }
      if (!bankInfo || !city.name && Number(all.isCertCompany) === 1) {
        this.handleOpen('d11', '请选择市')
        return
      }
      if (!bankInfo || !region.name && Number(all.isCertCompany) === 1) {
        this.handleOpen('d11', '请选择区')
        return
      }
      if (!all.madDetail && Number(all.isCertCompany) === 1) {
        this.handleOpen('d11', '请输入详细地址')
        return
      }
      // 步骤三  图片校验
      if (!businessCardListFile || !businessCardListFile[0].imgUrl) {
        this.handleOpen('d11', '请上传营业执照照片')
        return
      }
      if ((!openAccountListFile || !openAccountListFile[0].imgUrl)) {
        this.handleOpen('d11', '请上传开户许可证')
        return
      }
      if (!card1ListFile || !card1ListFile[0].imgUrl) {
        this.handleOpen('d11', '请上传法人身份证照片正面')
        return
      }
      if (!card1ListFile || !card1ListFile[1].imgUrl) {
        this.handleOpen('d11', '请上传法人身份证照片反面')
        return
      }
      if (!card2ListFile || !card2ListFile[0].imgUrl) {
        this.handleOpen('d11', '请上传系统管理员1身份证照片正面')
        return
      }
      if (!card2ListFile || !card2ListFile[1].imgUrl) {
        this.handleOpen('d11', '请上传系统管理员1身份证照片反面')
        return
      }
      if (!card3ListFile || !card3ListFile[0].imgUrl) {
        this.handleOpen('d11', '请上传系统管理员2身份证照片正面')
        return
      }
      if (!card3ListFile[1] || !card3ListFile[1].imgUrl) {
        this.handleOpen('d11', '请上传系统管理员2身份证照片反面')
        return
      }

      let params = {
        companyType: '100', // 大B注册
        companyLicense: all.companyLicense,
        companyName: trimLeftAndRight(all.companyName),
        contactName: trimLeftAndRight(all.contactName),
        contactPhone: all.contactPhone,
        identifyNo1: all.identifyNo1,
        identifyNo2: all.identifyNo2,
        isCertCompany: all.isCertCompany,
        legalIdCardImgDown: all.card1.listFile[1].imgUrl,
        legalIdCardImgUp: all.card1.listFile[0].imgUrl,
        licenseImg: all.businessCard.listFile[0].imgUrl,
        madCity: city.code,
        madCountry: region.code,
        madDetail: all.madDetail,
        madProvince: province.code,
        openPermitImg: all.openAccount.listFile[0].imgUrl,
        phoneNum1: all.phoneNum1,
        phoneNum2: all.phoneNum2,
        userCertImgDo1: all.card2.listFile[1].imgUrl,
        userCertImgDo2: all.card3.listFile[1].imgUrl,
        userCertImgUp1: all.card2.listFile[0].imgUrl,
        userCertImgUp2: all.card3.listFile[0].imgUrl,
        userDuty1: all.userDuty1,
        userDuty2: all.userDuty2,
        userName1: trimLeftAndRight(all.userName1),
        userName2: trimLeftAndRight(all.userName2),
      }
      // 如果是修改
      if (this.props.routerParams && this.props.routerParams.companyId) {
        params.companyId = this.props.routerParams.companyId
      }
      // companyLicense	营业执照号	string	@mock=XXXXXX
      // companyName	企业名称	string	@mock=XXXX
      // contactName	联系人姓名	string	@mock=张三
      // contactPhone	联系方式	string	@mock=121345655
      // identifyNo1	身份证号1	string	@mock=130925167803225212
      // identifyNo2	身份证号2	string	@mock=130925167803225212
      // isCertCompany	是否申请数字证书	string	@mock=1
      // legalIdCardImgDown	法人身份证照片反面	string	@mock=XXXXXXXX
      // legalIdCardImgUp	法人身份证照片正面	string	@mock=XXXXXXXX
      // licenseImg	营业执照照片	string	@mock=XXXXXXXXXXXXXX
      // madCity	邮寄地址_市	string	@mock=廊坊市
      // madCountry	邮寄地址_乡村		
      // madDetail	邮寄地址_详细地址	string	@mock=YYYYYYYYYYYYYYYY
      // madProvince	邮寄地址_省	string	@mock=河北省
      // openPermitImg	开户许可证	string	@mock=YYYYYYYYYYYY
      // phoneNum1	手机号码1	string	@mock=13093278945
      // phoneNum2	手机号码2	string	@mock=13093278945
      // userCertImgDo1	系统管理员1身份证照片反面	string	@mock=XXXXXX
      // userCertImgDo2	系统管理员1身份证照片反面	string	@mock=XXXXXX
      // userCertImgUp1	系统管理员1身份证照片正面	string	@mock=XXXXXX
      // userCertImgUp2	系统管理员2身份证照片正面	string	@mock=XXXXXX
      // userDuty1	职务1	string	@mock=YYYY
      // userDuty2	职务2	string	@mock=YYYY
      // userName1	系统管理员1姓名	string	@mock=李四
      // userName2	系统管理员2姓名	string	@mock=李四
      this.props.handleCheckSaveInfo(params).then((res) => {
        if (res && res.data && res.data.respCode === '000000') {
          this.props.handleClick(4)()
        } else {
          this.handleOpen('d11', res.data.respMsg)
        }
      })
    }
  }
  // 上传配置
  configUpload = () => {
    let _this = this
    for (let items in this.state.uploadFileNameList) {
      for (let item in this.state.uploadFileNameList[items]) {
        if (typeof this.state.uploadFileNameList[items][item] !== 'string') {
          for (let i = 0; i < this.state.uploadFileNameList[items][item].length; i++) {
            let configItem = {
              action: config.file(),
              data: config.fileParam,
              multiple: true,
              onSuccess(ret) {
                if (ret.respCode !== '000000') {
                  _this.handleOpen('d11', ret.respMsg)
                  return
                }
                if (ret.respCode === '000000') {
                  _this.state.uploadFileNameList[items][item][i].imgUrl = ret.body.fileId
                  _this.state.uploadFileNameList[items][item][i].imgFullUrl = ret.body.fileUrl
                  _this.setState({
                    uploadFileNameList: { ..._this.state.uploadFileNameList }
                  }, () => {
                    sessionStorage.setItem('getThreeStepData', JSON.stringify(_this.state.uploadFileNameList))
                  })
                }
              },
              onError(err) {
                // console.error(err)
              },
              beforeUpload(file) {
                return new Promise((resolve) => {
                  let fileSize = file.size
                  if (!(/(?:jpg|png|jpeg)$/i.test(file.name))) {
                    _this.handleOpen('d11', '只允许上传jpg、png、jpeg格式的图片')
                    return false
                  }
                  if (fileSize > 5 * 1024 * 1024) {
                    _this.handleOpen('d11', '图片大小不超过5MB')
                    return false
                  }
                  resolve(file)
                })
              },
              name: 'walletfile'
            }
            this.state.uploadFileNameList[items][item][i] = Object.assign(this.state.uploadFileNameList[items][item][i], configItem)
          }
        }
      }
    }
    this.setState({
      uploadFileNameList: { ...this.state.uploadFileNameList }
    })
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        uploadFileNameList: { ...this.state.uploadFileNameList }
      }, this.configUpload)
    let getTwoStepData = sessionStorage.getItem('getTwoStepData')
    let getThreeStepData = sessionStorage.getItem('getThreeStepData')
    if (nextProps.isUpdate) {
      if (this.props.routerParams && this.props.routerParams.companyType === '100' && nextProps.bigRegisterCompanyInfo.respCode === '000000' && nextProps.bigRegisterCompanyInfo.body) {
        // todo: 返回数据中读取
        let { body = {} } = nextProps.bigRegisterCompanyInfo
        if (body.isCertCompany === '1') {
          this.showOpenImg = true
        } else if (body.isCertCompany === '2') {
          this.showOpenImg = true
        } else if (getTwoStepData) {
          let getTwoStepData2 = JSON.parse(getTwoStepData)
          if (getTwoStepData2.isCertCompany && Number(getTwoStepData2.isCertCompany) === 2) {
          this.showOpenImg = true
          } else if (getTwoStepData2.isCertCompany && Number(getTwoStepData2.isCertCompany) === 1) {
            this.showOpenImg = true
          }
        }
        this.setState({
          uploadFileNameList: {
            businessCard: { label: '营业执照照片', listFile: [{ imgUrl: body.licenseImg, imgFullUrl: `${body.fileUrl}${body.licenseImg}`, name: 'licenseImg' }], isShow: true },
            openAccount: { label: '开户许可证', listFile: [{ imgUrl: body.openPermitImg, imgFullUrl: `${body.fileUrl}${body.openPermitImg}`, name: 'openPermitImg', isShow: this.showOpenImg }], isShow: this.showOpenImg },
            card1: { label: '法人身份证照片', listFile: [{ imgUrl: body.legalIdCardImgUp, imgFullUrl: `${body.fileUrl}${body.legalIdCardImgUp}`, name: 'legalIdCardImgUp', footer: '身份证正面' }, { imgUrl: body.legalIdCardImgDown, imgFullUrl: `${body.fileUrl}${body.openPermitImg}`, name: 'legalIdCardImgDown', footer: '身份证反面' }], isShow: true },
            card2: { label: '系统管理员1身份证照片', listFile: [{ imgUrl: body.userCertImgUp1, imgFullUrl: `${body.fileUrl}${body.userCertImgUp1}`, name: 'userCertImgUp1', footer: '身份证正面' }, { imgUrl: body.userCertImgDo1, imgFullUrl: `${body.fileUrl}${body.openPermitImg}`, name: 'userCertImgDo1', footer: '身份证反面' }], isShow: true },
            card3: { label: '系统管理员2身份证照片', listFile: [{ imgUrl: body.userCertImgUp2, imgFullUrl: `${body.fileUrl}${body.userCertImgUp2}`, name: 'userCertImgUp2', footer: '身份证正面' }, { imgUrl: body.userCertImgDo2, imgFullUrl: `${body.fileUrl}${body.openPermitImg}`, name: 'userCertImgDo2', footer: '身份证反面' }], isShow: true }
          }
        })
      }
    } else {
      if (!getTwoStepData) {
      return
      }
      let getTwoStepData2 = JSON.parse(getTwoStepData)
      if (!getThreeStepData) { // 如果没有第三部缓存
        let uploadFileNameListCopy = this.state.uploadFileNameList
        for (let items in uploadFileNameListCopy) {
          if (getTwoStepData2.isCertCompany && Number(getTwoStepData2.isCertCompany) === 2 && items === 'openAccount') {
            uploadFileNameListCopy[items].isShow = true
          } else {
            uploadFileNameListCopy[items].isShow = true
          }
        }
        this.setState({
          uploadFileNameList: { ...uploadFileNameListCopy }
        })
      } else { // 如果有第三步缓存
        let getThreeStepData2 = JSON.parse(getThreeStepData)
        for (let items in getThreeStepData2) {
          if (getTwoStepData2.isCertCompany && Number(getTwoStepData2.isCertCompany) === 2 && items === 'openAccount') {
            getThreeStepData2[items].isShow = true
          } else {
            getThreeStepData2[items].isShow = true
          }
        }
        this.setState({
          uploadFileNameList: { ...getThreeStepData2 }
        })
      }
    }
  }
  // 弹窗
  handleOpen = (type, msg) => {
    this.setState({
      contentDom: msg
    }, function () {
      this.dialogShow[type]()
    })
  }
  // 关闭弹窗触发
  handleClose = (name, type) => {
    this.setState({ [type]: false })
  }
  dialogShow = {
    d11: () => {
      this.setState({ d11: true })
      this.getContent(
        <div className="rob-alert-content ">
          {this.state.contentDom}
        </div>
      )
      this.getActions([{
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle'
      }])
    }
  }

  render() {
    const { handleClick, stepNum } = this.props
    // debugger
    return (
      <form className="rob-form qb-form-g__form qb-form-group-b10-g qb-mg-bt70-g" style={{ display: stepNum === 3 ? 'block' : 'none' }}>
        <div className="qb-form-pd-g__xs-label pd-form-60">
          <p className="qb-picture-g">
            <span className="qb-red-g">*</span>以下都是必填，请确保上传的照片字迹清晰可见，支持png、jpg、jpeg格式，大小不超过5MB</p>
          <div className="qb-container-g">
            <div className="rob-row rob-form-group">
              <div className="rob-col-md-16 rob-col-sm-16 rob-col-xs-24">
                {Object.values(this.state.uploadFileNameList).map(({ label, listFile = [], isShow }, index) => (
                  <div className="rob-row rob-form-group" key={index} style={{ display: isShow ? 'block' : 'none' }}>
                    <div className="rob-col-md-10 rob-col-sm-10 rol-col-xs-24">
                      <label className="rob-input-label">{label}
                      </label>
                    </div>
                    <div className="rob-col-md-14 rob-col-sm-14 rol-col-xs-24 text-left">
                      <div className="rob-upload qb-container-g__upload-box">
                        {
                          listFile.map(({ footer, name, imgFullUrl = '' }, index2) => (
                            <div className="rob-upload qb-container-g__upload" key={index2}>
                              {imgFullUrl === '' ?
                                <Upload {...listFile[index2]}>
                                  <div className="rob-upload-card">
                                    <div className="rob-upload-card-type qb-icon-rob-icon-plus">
                                  
                                    </div>
                                  </div>
                                </Upload> :
                                <span className="rob-upload-card">
                                  <img onClick={() => { this.openImg(imgFullUrl) }} src={imgFullUrl} className="qb-up_img-g" alt="" />
                                  <Upload {...listFile[index2]}>
                                    <span className="qb-up_img-g__titile">重新上传</span>
                                  </Upload>
                                </span>
                              }
                              {
                                footer ?
                                  <lable className="rob-fileimgtext text-center">
                                    {footer}</lable> : null
                              }
                            </div>

                          ))
                        }

                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* 弹窗start */}
              <Dialog
                open={this.state.d11}
                onRequestClose={(name) => this.handleClose(name, 'd11')}
                titleClassName="rob-alert-title rob-alert-title-color"
                content={this.content}
                actions={this.actions}
                actionClassName="rob-alert-button rob-alert-button-color rob-alert-button-45"
                showCover
              />
              {/* 弹窗end */}
              <div className="rob-col-md-8 rob-col-sm-8 rob-col-xs-24 qb-pd0-g">
                <div className="qb-upload-eg-g">
                  <div className="qb-info">
                    <div className="qb-info-g__title">示例：</div>
                    <div className="qb-info-g__img">
                      <img src={img1} alt="" />
                    </div>
                  </div>
                </div>
                <div className="qb-upload-eg-g">
                  <div className="qb-info">
                    <div className="qb-info-g__title">示例：</div>
                    <div className="qb-info-g__img">
                      <img src={img2} alt="" />
                    </div>
                  </div>
                  <lable className="lable-text font12 text-center mg-b20">
                    身份证正面
                  </lable>
                  <div className="qb-info">
                    <div className="qb-info-g__title">示例：</div>
                    <div className="qb-info-g__img">
                      <img src={img3} alt="" />
                    </div>
                  </div>
                  <lable className="lable-text font12 text-center">
                    身份证反面
                  </lable>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="rob-col-lg-24 text-center qb-from-bg-reg-g">
            <Button className="rob-btn rob-btn-minor rob-btn-circle" label="上一步" onClick={handleClick(2)} />
            <Button className="rob-btn rob-btn-danger rob-btn-circle" label="提交" onClick={() => { this.saveAs() }} />
          </div>
        </div>
      </form>
    )
  }
}
export default connect(({ registerState = {} }) => ({
  data: registerState.getFileUrl,
  saveInfo: registerState.saveInfo,
  bigRegisterCompanyInfo: registerState.bigRegisterCompanyInfo
}), dispatch => ({
  getFileUrl: bindActionCreators(action.getFileUrl, dispatch), // 获取文件地址
  handleCheckSaveInfo: bindActionCreators(action.handleCheckSaveInfo, dispatch), // 保存  
}))(StepThree)