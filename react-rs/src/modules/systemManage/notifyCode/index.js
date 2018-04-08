import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
// import QBDatepicker from 'components/QBDatePicker'
import QBInput from 'components/QBInput'
import Dialog from 'react-robotUI/dialog'
// import Tab from 'react-robotUI/Tab'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import getRequest from 'utils/getRequest'
import Upload from 'rc-upload'
import config from '../../../config'
import * as action from './redux/actions'
import './redux/reducer'
const YES = 'YES'
const NO = 'NO'
const img1 = require('assets/images/logo.png')
const img2 = require('assets/images/pay.png')
const img3 = require('assets/images/WeChat.png')
const img4 = require('assets/images/step01.png')
const img5 = require('assets/images/step02.png')
const img6 = require('assets/images/step03.png')

class addUserPage extends PureComponent {
  static propTypes = {
    QRCodeInfo: PropTypes.object,
    isTestRule: PropTypes.bool,
    params: PropTypes.object,
    history: PropTypes.object
  }
  static defaultProps = {
    QRCodeInfo: {},
    isTestRule: false,
    params: {},
    history: {}
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  constructor(prop) {
    super(prop)
    this.goBackBtn = this.goBackBtn.bind(this)
    this.state = {
      isHasTempalte: 'YES',
      isShowLogo: false,
      params: this.props.params,
      levelOneArr: [],
      optionalArray: [],
      d11: false,
      renderData1: [{
        label: '自定义1',
        name: 'selfDefineo',
        required: false,
        placeholder: '可输入30个字符以内',
        pattern: /^\S{0,30}$/,
        errorMsg: '可输入30个字符以内',
        emptyMsg: '请输入用户姓名'
      }, {
        label: '自定义2',
        name: 'selfDefinet',
        required: false,
        placeholder: '可输入30个字符以内',
        pattern: /^\S{0,30}$/,
        errorMsg: '可输入30个字符以内',
        emptyMsg: '请输入手机号码'
      }],
    }
    this.inputs = {}
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
  }
  componentWillMount() {
    // 获取二维码详情
    this.props.getQRCodeInfo({ id: this.props.params.id }).then((res) => {
      if (res.data.respCode === '000000') {
        this.setState({
          params: { ...this.state.params, ...res.data.body }
        })
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.QRCodeInfo.body) {
      this.setState({
        params: { ...this.state.params,
          fileFullPath: `${nextProps.QRCodeInfo.body.pathPrefix}${nextProps.QRCodeInfo.body.filePath}`,
          filePath: nextProps.QRCodeInfo.body.filePath,
          enableTemplate: nextProps.QRCodeInfo.body.enableTemplate
        }
      })
    }
    if (nextProps.QRCodeInfo.body && nextProps.QRCodeInfo.body.filePath !== ' ') {
      this.setState({ isShowLogo: true })
    }
  }
  // 弹窗
  handleOpen = (type, msg, status) => {
    this.setState({
      contentDom: msg
    }, function () {
      this.dialogShow[type](status)
    })
  }
  // 关闭弹窗触发
  handleClose = (name, type) => {
    this.setState({ [type]: false })
    if (name === 'save') {
      this.context.router.history.push('/systemManage/codeManagement')
    }
  }
  dialogShow = {
    d11: (status) => {
      this.setState({ d11: true })
      this.getContent(
        <div className="rob-alert-content ">
          <i className="bg_icon qb-icon-active" />
          <div className="">
            <div>{this.state.contentDom}</div>
          </div>
        </div>
      )
      this.getActions([{
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle',
        state: status
      }])
    }
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object,
    })
  }
  data = {
    checked: true
  }
  handleRadio = (checked) => () => this.setState({ isWantUkey: checked, params: { ...this.state.params, status: checked === YES ? '100' : '200' } })
  handleChange = (key) => (value) => {
    this.setState({ params: { ...this.state.params, [key]: value } })
  }
  handleSelect = (key) => (item) => {
    // TODO: 选中的项
    this.setState({
      params: { ...this.state.params, [key]: item }
    })
  }
  /**
  * 可选菜单的勾选事件
  */
  commit = async () => {
    if (!this.state.params.status) {
      this.handleOpen('d11', '请选择是否启用禁用')
      return
    }
    const { params } = this.state,
      { status, selfDefineo, selfDefinet, enableTemplate, filePath } = params
    let paramSubmit = {
      status,
      selfDefineo,
      selfDefinet,
      enableTemplate,
      filePath
    }
    if (!paramSubmit.selfDefineo) {
      paramSubmit.selfDefineo = ' '
    }
    if (!paramSubmit.selfDefinet) {
      paramSubmit.selfDefinet = ' '
    }
    if (this.props.params && this.props.params.id) {
      paramSubmit.id = this.props.params.id
    }
    let asyncRequest = async () => {
      let data = await getRequest({
        path: '/qrcode/saveInfo',
        method: 'POST',
        param: paramSubmit
      })
      if (data.data.respCode === '000000') {
        this.setState({
          isShowErrorWindow: true,
          errMsg: data.data.respMsg
        })
        this.handleOpen('d11', '保存成功', 'save')
      }/*else {
        this.handleOpen('d11', '保存成功', 'save')
      }*/
    }

    asyncRequest()
  }
  goBackBtn = () => {
    this.props.history.push('/systemManage/codeManagement')
  }
  /**
   * 单选
   */
  handleRadio = (type) => {
    if (type === 'yes') {
      this.setState({ isHasTempalte: YES, params: { ...this.state.params, enableTemplate: 1 } })
    } else if (type === 'no') {
      this.setState({ isHasTempalte: NO, params: { ...this.state.params, enableTemplate: 0 } })
    } else if (type === 100) {
      this.setState({ params: { ...this.state.params, status: 100 } })
    } else if (type === 200) {
      this.setState({ params: { ...this.state.params, status: 200 } })
    }
  }
  /**
   * 上传logo配置
   */
  attachConfig = () => {
    let _this = this
    return {
      action: config.file(),
      data: config.fileParam,
      multiple: true,
      onStart(file) {
        _this.fileName = file.name
      },
      onSuccess(ret) {
        _this.setState({
          params: { ..._this.state.params, filePath: ret.body.fileId, fileFullPath: ret.body.fileUrl },
          // power: true,
          isShowLogo: true
        })
      },
      onError(err) {
        console.error('上传失败', err)
        _this.setState({
          showContent: '上传失败！',
          power: true
        })
      },
      beforeUpload(file) {
        return new Promise((resolve) => {
          let fileSize = file.size
          if (!(/(?:png)$/i.test(file.name))) {
            _this.content = '只允许上传png格式的图片'
            _this.actions = [{
              label: '确定',
              className: 'rob-btn rob-btn-minor rob-btn-circle'
            }]
            _this.setState({ d11: true })
            return false
          }
          if (fileSize > 1 * 1024 * 1024) {
            _this.content = '文件大小不能超过1M'
            _this.actions = [{
              label: '确定',
              className: 'rob-btn rob-btn-minor rob-btn-circle'
            }]
            _this.setState({ d11: true })
            return false
          }
          resolve(file)
        })
      },
      name: 'walletfile'
    }
  }
  /**
   * 删除logo
   */
  deleteLogo = () => {
    this.setState({
      params: { ...this.state.params, filePath: ' ' },
      isShowLogo: false
    })
  }
  render() {
    let upconfig = this.attachConfig()
    const { params, renderData1, isShowErrorHint } = this.state,
      handleChange = this.handleChange // 修改
    return (
      <div className="qb-panel-g">
        {/* 弹窗start */}
        <Dialog
          //showCloseBtn
          open={this.state.d11}
          onRequestClose={(name) => this.handleClose(name, 'd11')}
          content={this.content}
          actions={this.actions}
          actionClassName="rob-alert-button-color"
          showCover
        />
        {/* 弹窗end */}
        <div className="qb-column-header-g">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
            <li><Link to={{ pathname: '/systemManage/codeManagement' }}>二维码管理</Link></li>
            <li className="active"><a href="">修改二维码</a></li>
          </ol>
        </div>

        <div className="qb-form-group-g clearfix">
          {this.props.params && this.props.params.id && this.props.params.checkType ?
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="rob-form-group ">
                <div className="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg">
                  <label htmlFor="inputEmail3" className="rob-input-label ">自定义1:</label>
                </div>
                <div className="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24">
                  <div className="rob-input-item" style={{ lineHeight: '40px' }}>
                    {this.state.params.selfDefineo}
                  </div>
                </div>
              </div>
            </div> : null
          }
          <div className="qb-form-pd20-g">
            <div className="rob-row text-center qb-form-group-b10-g qb-form-pd-g__xs-label mgside rob-col-lg-offset-4">
              <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-12 rob-col-xs-24 rob-col-lg-offset-2 rob-col-md-offset-2 mgt30">
                {renderData1.map(({ name, label, pattern, required, errorMsg, emptyMsg, placeholder }, index) => (
                  <div key={index} className="rob-form-group" style={{ display: this.props.params && this.props.params.id && this.props.params.checkType && name === 'userName' ? 'none' : 'block' }} >
                    <QBInput
                      labelClass="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left "
                      inputClass="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left"
                      label={label}
                      name={name}
                      placeholder={placeholder}
                      isTestRule={isShowErrorHint}
                      errorMsg={errorMsg}
                      emptyMsg={emptyMsg}
                      errDirection="bottom"
                      ref={r => this.inputs[name] = r}
                      handleChange={handleChange(name)}
                      defaultValue={params[name] === ' ' ? '' : params[name]}
                      pattern={pattern}
                    />
                    <div className="rob-form-group ">
                      <div className="rob-col-lg-6 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg ">
                        <label className="rob-input-label" />
                      </div>
                      <div className="rob-col-lg-13 rob-col-md-20 rob-col-sm-24  rob-col-xs-24 text-left" style={{ marginTop: '8px' }}>
                        *注：用户付款时可见
                      </div>
                    </div>
                  </div>
                ))}
                <div>
                  <div className="rob-form-group">
                    <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
                      <label className="rob-input-label">状态</label>
                    </div>
                    {
                      String(this.state.params.status) === '100' ? (
                        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
                          <input className="rob-radio-with-gap" name="group2" checked={this.state.params.status === 100} type="radio" id="test4" onChange={() => this.handleRadio(100)} />
                          <label className="mt10" htmlFor="test4">启用</label>
                          <input className="rob-radio-with-gap" name="group2" type="radio" checked={this.state.params.status === 200} id="test5" onChange={() => this.handleRadio(200)} />
                          <label className="mt10" htmlFor="test5">禁用</label>
                        </div>
                      ) : (
                        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
                          <input className="rob-radio-with-gap" name="group2" checked={this.state.params.status === 100} type="radio" id="test4" onChange={() => this.handleRadio(100)} />
                          <label className="mt10" htmlFor="test4">启用</label>
                          <input className="rob-radio-with-gap" name="group2" type="radio" checked={this.state.params.status === 200} id="test5" onChange={() => this.handleRadio(200)} />
                          <label className="mt10" htmlFor="test5">禁用</label>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div>
                  <div className="rob-form-group">
                    <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
                      <label className="rob-input-label">二维码模板</label>
                    </div>
                    {
                      String(this.state.params.enableTemplate) === '1' ? (
                        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
                          <input className="rob-radio-with-gap" name="group3" onChange={() => { this.handleRadio('yes') }} checked={params.enableTemplate === 1} type="radio" id="test6" />
                          <label className="mt10" htmlFor="test6">有</label>
                          <input className="rob-radio-with-gap" name="group3" onChange={() => { this.handleRadio('no') }} type="radio" checked={params.enableTemplate === 0} id="test7" />
                          <label className="mt10" htmlFor="test7">无</label>
                        </div>
                      ) : (
                        <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
                          <input className="rob-radio-with-gap" name="group3" onChange={() => { this.handleRadio('yes') }} checked={params.enableTemplate === 1} type="radio" id="test6" />
                          <label className="mt10" htmlFor="test6">有</label>
                          <input className="rob-radio-with-gap" name="group3" onChange={() => { this.handleRadio('no') }} type="radio" checked={params.enableTemplate === 0} id="test7" />
                          <label className="mt10" htmlFor="test7">无</label>
                        </div>
                      )
                    }
                  </div>
                </div>
                <div style={{ background: '#fff', marginTop: '50px' }} className="qb-form-footButton-g clearfix ">
                  <div className="rob-col-lg-24 rob-col-md-24">
                    <button className="rob-btn rob-btn-danger rob-btn-circle pd42" onClick={this.commit}>提交</button>
                    <button className="rob-btn rob-btn-minor rob-btn-circle pd42" type="button" onClick={this.goBackBtn}>取消</button>
                  </div>
                </div>
              </div>
              <div className="rob-col-lg-10 rob-col-md-10 rob-col-sm-10 rob-col-xs-24 ">
                <div className="rob-form-group rob-col-lg-24 mgt30">
                  <label className="rob-input-label text-left">
                    <span className="qb-red-g">*</span> 注：请上传png格式，大小不超过1MB的LOGO
                  </label>
                  {
                    Number(params.enableTemplate) ? (
                      <div className="qb-up_logo2-g mgt30">
                        <div className="qb-alert-g__box__title">
                          <img className="up_logo2_img" src={img1} alt="" />|<span>扫码支付</span>
                        </div>
                        <div className="qb-alert-g__box__code box__code_rs qb-up_logo_con-g">
                          <div className="qb-up_logo_con_bg mgb0">
                            <div style={{ display: this.state.isShowLogo ? 'inline-block' : 'none' }} className="qb-up_logo_box">
                              <img className="img2 img2__sbs3" src={this.state.params.fileFullPath} alt="LOGO" />
                            </div>
                          </div>
                          <p>V2017092700000003</p>
                        </div>
                        <div className="qb-alert-g__box__pay">
                          <div className="qb-alert-g__box__pay__sty">欢迎使用<span className="qb-alert-g__box__pay__col_1">支付宝</span>／<span className="qb-alert-g__box__pay__col_2">微信</span>支付</div>
                          <img src={img2} alt="" />
                          <img src={img3} alt="" />
                        </div>
                        <div className="qb-alert-g__box__step">
                          <ul className="rob-row">
                            <li className="rob-col-md-8 rob-col-sm-8 rob-col-xs-8"><img src={img4} alt="" /><span>打开扫一扫</span></li>
                            <li className="rob-col-md-8 rob-col-sm-8 rob-col-xs-8"><img src={img5} alt="" /><span>扫描二维码</span></li>
                            <li className="rob-col-md-8 rob-col-sm-8 rob-col-xs-8"><img src={img6} alt="" /><span>完成支付</span></li>
                          </ul>
                          <p>客服电话：010-57044877</p>
                        </div>
                      </div>
                    ) : (
                      <div className="qb-up_logo_con-g">
                        <div className="qb-up_logo_con-g__bd qb-up_logo_mgpd-g qb-up_logo_con-g__wd">
                          <div className="qb-up_logo_con_bg">
                            <div style={{ display: this.state.isShowLogo ? 'inline-block' : 'none' }} className="qb-up_logo_box">
                              <img className="img2 img2__sbs3" src={this.state.params.fileFullPath} alt="LOGO" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  <div className="rob-form-group text-left mt40 mb30">
                    <Upload {...upconfig}>
                      <button type="button" className="rob-btn rob-btn-minor rob-btn-circle pd38  mr20">上传 LOGO</button>
                    </Upload>
                    <button onClick={() => { this.deleteLogo() }} className="rob-btn rob-btn-minor rob-btn-circle pd38" type="button">删除 LOGO</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

addUserPage.propTypes = {
  getQRCodeInfo: PropTypes.func,
  data: PropTypes.object,
  getData: PropTypes.func,
  updateUserInfo: PropTypes.func,
  userInfo: PropTypes.object,
  getUserCodeFunc: PropTypes.func,
  getUserInfo2: PropTypes.func,
  getUserInfo2Data: PropTypes.object

}
addUserPage.defaultProps = {
  getQRCodeInfo: () => { },
  data: {},
  getData: () => { },
  updateUserInfo: () => { },
  userInfo: {},
  getUserCodeFunc: () => { },
  getUserInfo2: () => { },
  getUserInfo2Data: {}
}

export default connect(state => ({
  data: state.userDataQuery,
  userInfo: state.userDataQuery.getUserInfo,
  getUserInfo2Data: state.userDataQuery.getUserInfo2,
  QRCodeInfo: state.userDataQuery.QRCodeInfo
}), dispatch => ({
  updateUserInfo: bindActionCreators(action.updateUserInfo, dispatch),
  getData: bindActionCreators(action.getData, dispatch),
  getUserCodeFunc: bindActionCreators(action.getUserCode, dispatch),
  getUserInfo2: bindActionCreators(action.getUserInfo2, dispatch),
  getQRCodeInfo: bindActionCreators(action.getQRCodeInfo, dispatch) // 获取二维码详情
}))(addUserPage)