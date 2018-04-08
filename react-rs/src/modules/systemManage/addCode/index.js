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
const img1 = require('assets/images/logo.png')
const img2 = require('assets/images/pay.png')
const img3 = require('assets/images/WeChat.png')
const img4 = require('assets/images/step01.png')
const img5 = require('assets/images/step02.png')
const img6 = require('assets/images/step03.png')
const YES = 'YES'
const NO = 'NO'
let s = null
class addUserPage extends PureComponent {
  static propTypes = {
    isTestRule: PropTypes.bool,
    params: PropTypes.object,
    history: PropTypes.object
  }
  static defaultProps = {
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
      isWantUkey: 'YES',
      isHasTempalte: 'YES',
      levelOneArr: [],
      optionalArray: [],
      d11: false,
      params: {
        status: '100',
        enableTemplate: 1,
        filePath: '',
        fileId: ' '
      },
      renderData1: [{
        label: '自定义1',
        name: 'selfDefineo',
        required: true,
        placeholder: '请输入自定义一内容（选填）',
        pattern: /^\S{0,30}$/,
        errorMsg: '可输入30个字符以内',
        emptyMsg: '请输入用户姓名'
      }, {
        label: '自定义2',
        name: 'selfDefinet',
        required: true,
        placeholder: '请输入自定义二内容（选填）',
        pattern: /^\S{0,30}$/,
        errorMsg: '可输入30个字符以内',
        emptyMsg: '请输入手机号码'
      }],
    }
    this.inputs = {}
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
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
    },
    d12: (status) => {
      this.setState({ d12: true })
      this.getContent(
        <div className="rob-alert-content ">
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
  /**
   * 跳转到登陆
  */
  componentDidMount() {
    // if (this.props.params.id !== null) {
    //   // this.userName.setValue('test')
    //   this.props.getData()
    // } else {
    // }
    if (this.props.params && this.props.params.id && this.props.params.checkType) {
      this.props.getUserInfo2({ checkType: this.props.params.checkType, id: this.props.params.id })
    } else {
      /*this.props.getUserCodeFunc().then((res) => {
        if (res.data.respCode === '000000') {
          this.setState({
            params: { ...this.state.params, userCode: res.data.body.userCode }
          })
        }
      })*/
    }
  }
  /**
   * 是否选择二维码模板
   */
  isHasTempalte = (type) => {
    if (type === 'yes') {
      this.setState({ isHasTempalte: YES, params: { ...this.state.params, enableTemplate: 1 } })
    } else if (type === 'no') {
      this.setState({ isHasTempalte: NO, params: { ...this.state.params, enableTemplate: 0 } })
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
          params: { ..._this.state.params, filePath: ret.body.fileUrl, fileId: ret.body.fileId },
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
  componentWillReceiveProps(nextProps) {
    const { getUserInfo2Data = {} } = nextProps,
      { body = {} } = getUserInfo2Data
    if (nextProps.params && nextProps.params.id) {
      this.setState({
        params: { ...body }
      })
      if (body.status === '100') {
        this.setState({
          isWantUkey: YES
        })
      } else {
        this.setState({
          isWantUkey: NO
        })
      }
      for (let i = 0; i < this.state.renderData1.length; i++) {
        for (let item in body) {
          if (item === this.state.renderData1[i].name) {
            this.inputs[item].setValue(body[item])
            break
          }
        }
      }
      if (body.userComment) {
        this.inputs.userComment.setValue(body.userComment)
      }
      if (body.userDuty) {
        let demoList = { 'text': body.userDuty, 'value': body.userDuty } //eslint-disable-line
        this.inputs.userDuty.setValue(demoList)
      }
      this.isCfcaUserFunc(body.status)
    }
    if (nextProps.data.userData[0] !== this.props.data.userData[0]) {
      let user = this.props.data.userData.body[0]
      this.userName.setValue(user.userName)
    }
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
  handleCheckout = () => {
    let filter = []
    if (!this.state.params.email) {
      filter = ['userComment', 'email']
    }
    return new Promise(resolve => {
      this.setState({
        isShowErrorHint: true
      }, () => {
        const keys = Object.keys(this.inputs)
        for (let i = 0, len = keys.length; i < len; i++) {
          let key = keys[i]
          if (filter.includes(key)) {
            continue // eslint-disable-line
          }
          if (this.inputs[key] && this.inputs[key].getErrStatus()) {
            resolve(false)
            break
          }
        }
        resolve(true)
      })
    })
  }
  commit = async () => {
    console.log(2222, this.state.params)
    if (!this.state.params.status) {
      this.handleOpen('d12', '请选择是否启用禁用')
      return
    }
    const { params } = this.state,
      { selfDefineo, selfDefinet, status, enableTemplate, fileId } = params
    let paramSubmit = {
      status,
      selfDefineo,
      selfDefinet,
      enableTemplate,
      filePath: fileId
    }
    if (this.props.params && this.props.params.id && this.props.params.checkType) {
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
      }/* else {
        this.handleOpen('d11', '保存成功', 'save')
      }*/
    }
    let asyncRequest1 = async () => {
      let data = await getRequest({
        path: '/qrcode/getList',
        method: 'POST',
      })
      if (data.data.respCode === '000000' && (!data.data.body || data.data.body.length < s)) {
        asyncRequest()
      } else {
        this.handleOpen('d12', '当前二维码已到达数量限制，若想申请更多请联系客服人员')
        //asyncRequest()
      }
    }
    let data = await getRequest({
      path: '/qrcode/getMaxLimit',
      method: 'POST',
    })
    //this.handleOpen('delUser', { id: t, type: 'delUser' })
    if (data.data.respCode === '000000') {
      s = data.data.body.qrCodeNum
      asyncRequest1()
    }
  }
  goBackBtn = () => {
    this.props.history.push('/systemManage/codeManagement')
  }
  /**
   * 删除logo
   */
  deleteLogo = () => {
    this.setState({
      params: { ...this.state.params, filePath: '', fileId: ' ' },
      isShowLogo: false
    })
  }
  render() {
    let upconfig = this.attachConfig()
    const { params, renderData1, isShowErrorHint, isWantUkey, isHasTempalte } = this.state,
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
        <Dialog
          showCloseBtn
          open={this.state.d12}
          onRequestClose={(name) => this.handleClose(name, 'd12')}
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
            <li className="active">新增二维码</li>
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
                  <div className="rob-form-group" style={{ display: this.props.params && this.props.params.id && this.props.params.checkType && name === 'userName' ? 'none' : 'block' }} >
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
                      defaultValue={params[name]}
                      pattern={pattern}
                      key={index}
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
                    <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
                      <input className="rob-radio-with-gap" name="group2" onClick={() => { this.isCfcaUserFunc(100) }} checked={isWantUkey === YES} type="radio" id="test4" onChange={this.handleRadio(YES)} />
                      <label className="mt10" htmlFor="test4">启用</label>
                      <input className="rob-radio-with-gap" name="group2" onClick={() => { this.isCfcaUserFunc(200) }} type="radio" checked={isWantUkey === NO} id="test5" onChange={this.handleRadio(NO)} />
                      <label className="mt10" htmlFor="test5">禁用</label>
                      {this.state.params.isCfcaUser === 2 ? <p className="qb-l40-g">
                        <span className="qb-red-g">*</span>
                        如不申请数字证书，仅可进行账户查询操作
                      </p> : null}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="rob-form-group">
                    <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
                      <label className="rob-input-label">二维码模板</label>
                    </div>
                    <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
                      <input className="rob-radio-with-gap" name="group3" defaultChecked onClick={() => { this.isHasTempalte('yes') }} checked={isHasTempalte === YES} type="radio" id="test6" />
                      <label className="mt10" htmlFor="test6">有</label>
                      <input className="rob-radio-with-gap" name="group3" onClick={() => { this.isHasTempalte('no') }} type="radio" checked={isHasTempalte === NO} id="test7" />
                      <label className="mt10" htmlFor="test7">无</label>
                    </div>
                  </div>
                </div>
                <div style={{ background: '#fff', marginTop: '50px' }} className="qb-form-footButton-g clearfix ">
                  <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                    <button className="rob-btn rob-btn-minor rob-btn-circle " type="button" onClick={this.goBackBtn}>取消</button>
                    <button style={{ marginLeft: '50px' }} className="rob-btn rob-btn-danger rob-btn-circle" onClick={this.commit}>提交</button>
                  </div>
                </div>
              </div>
              <div className="rob-col-lg-10 rob-col-md-10 rob-col-sm-10 rob-col-xs-24 ">
                <div className="rob-form-group rob-col-lg-24 mgt30">
                  <label className="rob-input-label text-left">
                    <span className="qb-red-g">*</span> 注：请上传png格式，大小不超过1MB的LOGO
                  </label>
                  {
                    isHasTempalte === 'YES' ? (
                      <div className="qb-up_logo2-g mgt30">
                        <div className="qb-alert-g__box__title">
                          <img className="up_logo2_img" src={img1} alt="" />|<span>扫码支付</span>
                        </div>
                        <div className="qb-alert-g__box__code box__code_rs qb-up_logo_con-g">
                          <div className="qb-up_logo_con_bg mgb0">
                            <div style={{ display: this.state.isShowLogo ? 'inline-block' : 'none' }} className="qb-up_logo_box">
                              <img className="img2 img2__sbs3" src={this.state.params.filePath} alt="LOGO" />
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
                              <img className="img2 img2__sbs3" src={this.state.params.filePath} alt="LOGO" />
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
      </div >
    )
  }

}

addUserPage.propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func,
  updateUserInfo: PropTypes.func,
  userInfo: PropTypes.object,
  getUserCodeFunc: PropTypes.func,
  getUserInfo2: PropTypes.func,
  getUserInfo2Data: PropTypes.object

}
addUserPage.defaultProps = {
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
  getUserInfo2Data: state.userDataQuery.getUserInfo2
}), dispatch => ({
  updateUserInfo: bindActionCreators(action.updateUserInfo, dispatch),
  getData: bindActionCreators(action.getData, dispatch),
  getUserCodeFunc: bindActionCreators(action.getUserCode, dispatch),
  getUserInfo2: bindActionCreators(action.getUserInfo2, dispatch)
}))(addUserPage)