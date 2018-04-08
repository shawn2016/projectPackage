/* eslint-disable*/ 
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import QBInput from 'components/QBInput'
import QBSelect from 'components/QBSelect'
import Dialog from 'react-robotUI/dialog'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cookieStorage from 'utils/cookieStorage'
import PropTypes from 'prop-types'
import getRequest from 'utils/getRequest'
import { noticeTypeFliter } from 'utils/filterCommon'
import * as action from './redux/actions'
import './redux/reducer'

class AddNotificationPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      params: {},
      isTestCompare: false,
      errorMin: /^0{1}$|^[1-9]{1}\d{0,12}$|^[1-9]{1}\d{0,12}\.\d{0,2}$|^0\.{1}\d{0,2}$/,
      errorMax: /^0{1}$|^[1-9]{1}\d{0,12}$|^[1-9]{1}\d{0,12}\.\d{0,2}$|^0\.{1}\d{0,2}$/,
      minErrorMsg: '请输入整数不超过10位，小数不超过2位的金额',
      maxErrorMsg: '请输入整数不超过10位，小数不超过2位的金额',
      isTestRule: false,
      accountData: {},
      users: [],
      parameters: {},
      noticeInterval: [
        { text: '请选择时间间隔', value: '' },
        { text: '每日', value: '100' },
        { text: '每月', value: '200' },
      ],
      bizList: [
        { text: '单笔经办', value: '201000' },
        { text: '批量经办', value: '201500' },
        { text: '代发', value: '251000' }
      ]
    }
  }
  static propTypes = {
    isTestRule: PropTypes.bool,
    history: PropTypes.object,
    params: PropTypes.object,
    notificationDataQuery: PropTypes.object,
  }
  static defaultProps = {
    isTestRule: false,
    history: {},
    params: {},
    notificationDataQuery: {},
  }
  componentWillMount() {
    if (this.props.params && this.props.params.type === 'edit') { // 如果是修改 设置带过来的默认值
      if (this.props.params.noticeType !== '10') { // 余额通知-5 没最小金额
        this.setState({ params: { ...this.state.params, minAmt: `${this.props.params.minAmt}` } })
      }
      if (this.props.params.noticeType === '10') { // 余额通知 通知间隔
        // todo: 回显通知间隔
        let interval
        for (let i = 0; i < this.state.noticeInterval.length; i++) {
          if (this.state.noticeInterval[i].value === `${this.props.params.interval}`) {
            interval = this.state.noticeInterval[i]
            break
          }
        }
        setTimeout(() => {
          this.interval.setValue(interval)
        }, 0)
      }
      if (this.props.params.noticeType === '30') { // 余额异常 最大金额
        this.setState({ params: { ...this.state.params, minAmt: `${this.props.params.minAmt}`, maxAmt: `${this.props.params.maxAmt}` } })
      }
      if (this.props.params.noticeType === '40') { // 经办预警 业务类型
        // todo: 回显业务类型
        let bizType
        for (let i = 0; i < this.state.bizList.length; i++) {
          if (this.state.bizList[i].value === `${this.props.params.bizType}`) {
            bizType = this.state.bizList[i]
            break
          }
        }
        setTimeout(() => {
          this.bizType.setValue(bizType)
        }, 0)
      }
      this.props.getInfo({ id: this.props.params.id }) // 获取已选用户列表
      this.props.getData()  // 获取可选用户列表
    } else { // 如果是新增
      this.props.getData()  // 获取可选用户列表
    }
  }
  componentDidMount() {
     /**
     * 获取账户信息
     */
    this.props.getAccountData().then(() => {
      if (this.props.accountData.body == null) {
        return false
      }
      let accountList = []
      const { accountData } = this.props,
        { body } = accountData,
        { accounts } = body
      let userInfo = {}, userInfoType // eslint-disable-line
      if (JSON.stringify(cookieStorage.getCookie('userInfo')) && cookieStorage.getCookie('userInfo').token) {
        userInfo = cookieStorage.getCookie('userInfo')
      }
      accounts.forEach(function (item) {
        let accountListItem = {}
        accountListItem = item
        if (userInfo && userInfo.isCfcaUser === '1') {
          userInfoType = item.umbrellaAccountNo
          accountListItem.text = userInfoType // eslint-disable-line
        } else {
          userInfoType = item.umbrellaAccountNo
          accountListItem.text = userInfoType
        }
        accountListItem.value = item.virtualAccountNo
        accountList.push(accountListItem)
      })
      this.setState({
        accountData: {
          accountList
        }
      })
    })
  }
  componentWillReceiveProps(nextProps) {
    let { data } = nextProps,
      { SENA_notificationData = [], SENA_getInfo = {} } = data,
      { body = {} } = SENA_getInfo
    body ? { body } : body = {}
    let { userInfos = [] } = body
    for (let i = 0; i < SENA_notificationData.length; i++) {
      if (JSON.stringify(userInfos) !== '{}' && userInfos.length && this.props.params.type === 'edit') {
        for (let j = 0; j < userInfos.length; j++) {
          if (userInfos && SENA_notificationData[i].userCode === userInfos[j].userCode) {
            SENA_notificationData[i].isCheck = true
            break
          }
          SENA_notificationData[i].isCheck = false
        }
      } else {
        SENA_notificationData[i].isCheck = false
        userInfos = []
      }
    }
    let userCodeList = []
    userInfos.forEach((item) => {
      userCodeList.push(item.userCode)
    })
    this.setState({
      notificationData: [...SENA_notificationData],
      userInfos: [...userInfos],
      params: { ...this.state.params, userCodes: [...userCodeList] }
    })
  }
  savePublicAccount = () => {
  }
  goBack = () => {
    this.props.history.push({
      pathname: '/systemManage/NotificationSetting'
    })
  }
  /**
   * 选择通知用户
   */
  pitch = (userCode, type, index) => {
    if (type) {
      for (let i = 0; i < this.state.notificationData.length; i++) {
        if (userCode === this.state.notificationData[i].userCode) {
          this.state.notificationData[i].isCheck = true
          this.state.userInfos.push(this.state.notificationData[i])
          break
        }
      }
      let userCodeList = []
      this.state.userInfos.forEach((item) => {
        userCodeList.push(item.userCode)
      })
      this.setState({
        userInfos: [...this.state.userInfos],
        notificationData: [...this.state.notificationData],
        params: { ...this.state.params, userCodes: [...userCodeList] }
      }, () => {
        if (this.state.userInfos.length) {
          this.setState({ isErr: false })
        }
      })
    } else {
      for (let i = 0; i < this.state.notificationData.length; i++) {
        if (userCode === this.state.notificationData[i].userCode) {
          this.state.notificationData[i].isCheck = false
          this.state.userInfos.splice(index, 1)
          break
        }
      }
      let userCodeList = []
      this.state.userInfos.forEach((item) => {
        userCodeList.push(item.userCode)
      })
      this.setState({
        userInfos: [...this.state.userInfos],
        notificationData: [...this.state.notificationData],
        params: { ...this.state.params, userCodes: [...userCodeList] }
      }, () => {
        if (!this.state.userInfos.length) {
          this.setState({ isErr: true })
        }
      })
    }
  }
  /**
   * 全选
   */
  selectAll = () => {
    // 先清空已选
    this.setState({
      userInfos: []
    }, () => { // 选列表都置为false 更行userInfos
      this.state.notificationData.forEach((item) => {
        item.isCheck = true // eslint-disable-line
        this.state.userInfos.push(item)
      })
      let userCodeList = []
      this.state.userInfos.forEach((item) => {
        userCodeList.push(item.userCode)
      })
      this.setState({
        notificationData: [...this.state.notificationData],
        userInfos: [...this.state.userInfos],
        params: { ...this.state.params, userCodes: [...userCodeList] },
        isErr: false
      })
    })
  }
  param = {}
  // 获取业务类型
  getSelectItem = (name, item) => {
    this.setState({ params: { ...this.state.params, [name]: item.value } })
  }
  // 获取最小金额
  updateSearchInfo = (val) => {
    this.setState({ parameters: { minAmt: val } })
  }
  // 保存
  saveNotification = () => {
    // 先表单校验
    this.setState({ isTestRule: true }, () => {
      // 校验  通知类型不同 校验项不同
      if (this.props.params.noticeType === '40') {
        if (this.bizType.getErrStatus() || this.minAmt.getErrStatus()) {
          return
        }
      }
      if (this.props.params.noticeType === '30') {
        // todo: 最大 不能小于 最小
        if (this.companyAcct.getErrStatus() || this.minAmt.getErrStatus() || this.maxAmt.getErrStatus()) {
          return
        }
      }
      if (this.props.params.noticeType === '20') {
        if (this.companyAcct.getErrStatus() || this.minAmt.getErrStatus()) {
          return
        }
      }
      if (this.props.params.noticeType === '10') {
        if (this.companyAcct.getErrStatus() || this.interval.getErrStatus()) {
          return
        }
      }
      if (this.state.userInfos && !this.state.userInfos.length) {
        this.setState({ isErr: true })
        return
      }
      // todo: 通知类型不同  保存入参不同
      let params = this.state.params
      params.noticeType = this.props.params.noticeType
      // params.bizType = this.param.bizType
      // params.minAmt = this.state.parameters.minAmt
      // params.usernames = []
      // this.state.userInfos.forEach((item) => {
      //   params.usernames.push(item)
      // })
      // 如果非简单通知 非经办预警 添加需通知账号参数
      if (this.props.params.noticeType !== '50' && this.props.params.noticeType !== '40' && this.state.accountData.accountList.length) {
        params.companyAcctName = this.state.accountData.accountList[0].accountName
        params.companyCode = this.state.accountData.accountList[0].value
        params.noticeAccount = this.state.accountData.accountList[0].umbrellaAccountNo
      }
      if (this.props.params && this.props.params.type === 'edit') { // 如果是修改需要传id
        params.id = this.props.params.id
      }
      getRequest({
        path: '/notice/saveInfo',
        method: 'POST',
        param: params
      }).then((res) => {
        if (res.data.respCode === '000000') {
          this.handleOpen('confirmSave')
          this.setState({ isAutoClose: true })
        }
      })
    })
  }
  /* 弹层 */
  dialogShow = {
    confirmSave: () => {
      this.content = (
        <div className="rob-alert-content ">
          <span>保存成功！</span>
        </div>
      )
      this.actions = ([{
        label: '关闭',
        className: 'rob-btn-minor rob-btn-circle',
        state: 'confirmSave'
      }])
      this.setState({ d11: true })
    }
  }
  handleOpen = (type, param) => {
    this.dialogShow[type](param)
  }
  // close Dialog
  handleClose = (name, type) => {
    if (name === 'confirmSave') {
      // 跳转到经办预警列表
      this.props.history.push('/systemManage/NotificationSetting')
    }
    this.setState({ [type]: false })
  }
  /**
   * 金钱数字输入格式是否正确
   */
  isRight = (type, value) => {
    if (Number(value) === 0) {
      this.setState({
        isDiff: '最小金额不能为零',
        isNoDiff: /^\s{1}$/
      })
      return
    }
    this.setState({
      isDiff: '请输入整数不超过10位，小数不超过2位的金额',
      isNoDiff: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{0,2}$|^0\.{1}\d{0,2}$/
    })
  }
  render() {
    const { noticeType = '' } = this.props.params
    const { notificationData = [], userInfos = [], accountData = {} } = this.state,
      operatAble = 'qb-select-menu-g--selectIcon qb-icon-add',
      disOperatAble = 'qb-select-menu-g--selectIcon qb-icon-add qb-select-menu-g--selectIcon__hover',
      { accountList = [] } = accountData,
      defaultValue = accountList[0] || { value: '1', text: '' }
    return (
      <div>
        <Dialog
          showCover
          // showCloseBtn
          open={this.state.d11}
          onRequestClose={(name) => this.handleClose(name, 'd11')}
          title=""
          titleClassName="rob-alert-title rob-alert-title-color"
          content={this.content}
          actions={this.actions}
          actionClassName="rob-alert-button-color"
        />
        <div className="">
          <div className="qb-panel-g qb-media-height">
            <div className="qb-column-header-g">
              <ol className="rob-breadcrumb rob-breadcrumb-pointed">
                <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
                <li><Link to={{ pathname: '/systemManage/notificationSetting' }}>通知设置</Link></li>
                {this.props.params.type === 'addNew' ? (<li className="active">新增通知</li>) : null}
                {this.props.params.type === 'edit' ? (<li className="active">修改通知</li>) : null}
              </ol>
            </div>
            <div className="qb-form-pd20-g">
              <div className="rob-row qb-form-group-b10-g qb-from-padd-g qb-form-pd-g__xs-label">
                <div className="rob-form-group rob-col-lg-24">
                  <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
                    <label className="rob-input-label">通知类型：</label>
                  </div>
                  <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24 text-left">
                    <label className="rob-input-label">{noticeTypeFliter(noticeType)}</label>
                  </div>
                  <div className="rob-col-lg-5 rob-col-md-5 rob-col-sm-5 rob-col-xs-24 qb-pd0-g">
                    <div className="qb-red-g rob-input-label text-left " />
                  </div>
                </div>
                {
                  noticeType === '40' ? (
                    <div className="rob-col-lg-24 text-left">
                      <QBSelect
                        name="bizType"
                        label="业务类型"
                        required
                        isTestRule={this.state.isTestRule}
                        errDirection="bottom"
                        emptyMsg="请选择业务类型"
                        defaultValue={this.props.params.bizType}
                        options={this.state.bizList}
                        handleSelect={item => {
                          this.getSelectItem('bizType', item)
                        }}
                        ref={ref => this.bizType = ref}
                      />
                    </div>
                  ) : null
                }
                {
                  noticeType !== '40' ? (
                    <div className="rob-col-lg-24 text-left">
                      <QBSelect
                        name="companyAcct"
                        label="需通知账号"
                        required
                        isTestRule={this.state.isTestRule}
                        errDirection="bottom"
                        emptyMsg="请选择通知账号"
                        defaultValue={this.props.params.companyAcct || defaultValue.value}
                        handleSelect={item => {
                          this.getSelectItem('companyAcct', item)
                        }}
                        containErrorIcon
                        options={this.state.accountData.accountList}
                        ref={ref => this.companyAcct = ref}
                      />
                    </div>
                  ) : null
                }
                {
                  noticeType !== '30' && noticeType !== '10' ? (
                    <div className="rob-col-lg-24">
                      <QBInput
                        name="minAmt"
                        type="text"
                        label="最小金额"
                        defaultValue={this.state.params.minAmt ? `${this.state.params.minAmt / 100}` : ''}
                        containErrorIcon
                        placeholder="请输入最小金额"
                        required
                        isTestRule={this.state.isTestRule}
                        pattern={/^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/}
                        pattern={this.state.isNoDiff}
                        errorMsg={this.state.isDiff}
                        emptyMsg="最小金额不能为空"
                        errDirection="bottom"
                        handleChange={value => {
                          this.updateSearchInfo(value * 100)
                          this.setState({ params: { ...this.state.params, minAmt: value * 100 } })
                          this.isRight('minAmt', value)
                        }
                        }
                        ref={ref => this.minAmt = ref}
                      />
                    </div>
                  ) : null
                }
                {
                  noticeType === '30' ? (
                    <div>
                      <div className="rob-col-lg-24">
                        <QBInput
                          name="minAmt"
                          type="text"
                          label="最小金额"
                          defaultValue={this.state.params.minAmt ? `${this.state.params.minAmt / 100}` : ''}
                          containErrorIcon
                          placeholder="请输入最小金额"
                          required
                          isTestRule={this.state.isTestRule || this.state.isTestCompare}
                          pattern={/^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/}
                          pattern={this.state.errorMin}
                          errorMsg={this.state.minErrorMsg}
                          emptyMsg="最小金额不能为空"
                          errDirection="bottom"
                          handleChange={value => {
                            this.updateSearchInfo(value * 100)
                            // this.isRight('minAmt', value)
                            // this.setState({ params: { ...this.state.params, minAmt: value * 100 } })
                            setTimeout(() => {
                              this.setState({ params: { ...this.state.params, minAmt: value * 100 } }, () => {
                                if (this.state.params.maxAmt) {
                                  this.setState({
                                    isTestCompare: true
                                  })
                                }
                                if (Number(value) === 0) {
                                  if (this.state.params.maxAmt !== 0) {
                                    this.setState({
                                      errorMin: /^\s{1}$/,
                                      errorMax: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/,
                                      minErrorMsg: '最小金额不能为零',
                                      maxErrorMsg: '请输入整数不超过10位，小数不超过2位的金额',
                                    }, () => {
                                      this.minAmt.getErrStatus()
                                      this.maxAmt.getErrStatus()
                                    })
                                    return
                                  }
                                  this.setState({
                                    errorMin: /^\s{1}$/,
                                    errorMax: /^\s{1}$/,
                                    minErrorMsg: '最小金额不能为零',
                                    maxErrorMsg: '最大金额不能为零',
                                  }, () => {
                                    this.minAmt.getErrStatus()
                                    this.maxAmt.getErrStatus()
                                  })
                                } else if (value * 100 >= this.state.params.maxAmt) {
                                  this.setState({
                                    errorMin: /(^\d{55}$)|(^\d{58}$)|(^\d{57}(\d|X|x)$)/,
                                    errorMax: /(^\d{55}$)|(^\d{58}$)|(^\d{57}(\d|X|x)$)/,
                                    minErrorMsg: '最小金额必须小于最大金额',
                                    maxErrorMsg: '最大金额必须大于最小金额',
                                  }, () => {
                                    this.minAmt.getErrStatus()
                                    this.maxAmt.getErrStatus()
                                  })
                                } else {
                                  if (this.state.params.maxAmt !== 0) {
                                    this.setState({
                                      errorMin: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/,
                                      errorMax: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/,
                                      minErrorMsg: '请输入整数不超过10位，小数不超过2位的金额',
                                      maxErrorMsg: '请输入整数不超过10位，小数不超过2位的金额',
                                    }, () => {
                                      this.minAmt.getErrStatus()
                                      this.maxAmt.getErrStatus()
                                    })
                                    return
                                  }
                                  this.setState({
                                    errorMin: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/,
                                    // errorMax: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/,
                                    minErrorMsg: '请输入整数不超过10位，小数不超过2位的金额',
                                    // maxErrorMsg: '请输入整数不超过10位，小数不超过2位的金额',
                                  }, () => {
                                    this.minAmt.getErrStatus()
                                    this.maxAmt.getErrStatus()
                                  })
                                }
                              })
                            }, 0)
                          }
                          }
                          ref={ref => this.minAmt = ref}
                        />
                      </div>
                      <div className="rob-col-lg-24">
                        <QBInput
                          name="maxAmt"
                          type="text"
                          label="最大金额"
                          defaultValue={this.state.params.maxAmt ? `${this.state.params.maxAmt / 100}` : ''}
                          containErrorIcon
                          placeholder="请输入最大金额"
                          required
                          isTestRule={this.state.isTestRule || this.state.isTestCompare}
                          pattern={/^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/}
                          pattern={this.state.errorMax}
                          errorMsg={this.state.maxErrorMsg}
                          emptyMsg="最大金额不能为空"
                          errDirection="bottom"
                          handleChange={value => {
                            this.updateSearchInfo(value * 100)
                            setTimeout(() => {
                              this.setState({ params: { ...this.state.params, maxAmt: value * 100 } }, () => {
                                if (this.state.params.minAmt) {
                                  this.setState({
                                    isTestCompare: true
                                  })
                                }
                                if (Number(value) === 0) {
                                  if (this.state.params.minAmt !== 0) {
                                    this.setState({
                                      errorMin: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/,
                                      errorMax: /^\s{1}$/,
                                      minErrorMsg: '请输入整数不超过10位，小数不超过2位的金额',
                                      maxErrorMsg: '最大金额不能为零',
                                    },  () => {
                                      this.minAmt.getErrStatus()
                                      this.maxAmt.getErrStatus()
                                    })
                                  return
                                  }
                                  this.setState({
                                    errorMin: /^\s{1}$/,
                                    errorMax: /^\s{1}$/,
                                    minErrorMsg: '最小金额不能为零',
                                    maxErrorMsg: '最大金额不能为零',
                                  },  () => {
                                    this.minAmt.getErrStatus()
                                    this.maxAmt.getErrStatus()
                                  })
                                  return
                                } else if (value * 100 <= this.state.params.minAmt) {
                                  this.setState({
                                    errorMin: /(^\d{55}$)|(^\d{58}$)|(^\d{57}(\d|X|x)$)/,
                                    errorMax: /(^\d{55}$)|(^\d{58}$)|(^\d{57}(\d|X|x)$)/,
                                    minErrorMsg: '最小金额必须小于最大金额',
                                    maxErrorMsg: '最大金额必须大于最小金额',
                                  }, () => {
                                    this.minAmt.getErrStatus()
                                    this.maxAmt.getErrStatus()
                                  })
                                  return
                                } else {
                                  if (this.state.params.minAmt !== 0) {
                                    this.setState({
                                      errorMin: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/,
                                      errorMax: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/,
                                      minErrorMsg: '请输入整数不超过10位，小数不超过2位的金额',
                                      maxErrorMsg: '请输入整数不超过10位，小数不超过2位的金额',
                                    }, () => {
                                      this.minAmt.getErrStatus()
                                      this.maxAmt.getErrStatus()
                                    })
                                    return
                                  }
                                  this.setState({
                                    // errorMin: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/,
                                    errorMax: /^0{1}$|^[1-9]{1}\d{0,9}$|^[1-9]{1}\d{0,9}\.\d{1,2}$|^0\.{1}\d{0,2}$/,
                                    // minErrorMsg: '请输入整数不超过10位，小数不超过2位的金额',
                                    maxErrorMsg: '请输入整数不超过10位，小数不超过2位的金额',
                                  }, () => {
                                    this.minAmt.getErrStatus()
                                    this.maxAmt.getErrStatus()
                                  })
                                }
                              })
                            }, 0)
                          }
                          }
                          ref={ref => this.maxAmt = ref}
                        />
                      </div>
                    </div>
                    ) : null
                }
                {
                  noticeType === '10' ? (
                    <div className="rob-col-lg-24">
                      <QBSelect
                        name="interval"
                        label="通知间隔"
                        required
                        isTestRule={this.state.isTestRule}
                        errDirection="bottom"
                        emptyMsg="请选择通知间隔"
                        defaultValue={this.props.params.interval}
                        options={this.state.noticeInterval}
                        handleSelect={item => {
                          this.getSelectItem('interval', item)
                        }}
                        ref={ref => this.interval = ref}
                      />
                    </div>
                  ) : null
                }
                <div className="rob-form-group rob-col-lg-24">
                  <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-6 rob-col-xs-24 text-left">
                    <label className="rob-input-label">通知用户：</label>
                  </div>
                  <div className="rob-col-lg-13 rob-col-md-13 rob-col-sm-13 rob-col-xs-24">
                    <div className="qb-select-menu-g text-left">
                      <div className="rob-row">
                        <div className="rob-col-md-12 rol-col-sm-12 rob-col-xs-24 qb-rg-bdsilid-g">
                          <div className="qb-select-box-g">
                            <span onClick={() => { this.selectAll() }} style={{ float: 'right', color: 'blue', cursor: 'pointer' }}>全选</span>
                            <p>可选用户列表：</p>
                            {
                              notificationData ? notificationData.map((item, k) => (
                                <label key={k}>
                                  <span>{item.userName}</span>
                                  {!item.isCheck ? <i onClick={() => { this.pitch(item.userCode, true) }} className={operatAble} /> : <i className={disOperatAble} />}
                                </label>
                              )) : null
                            }
                          </div>
                        </div>
                        <div className="rob-col-md-12 rol-col-sm-12 rob-col-xs-24">
                          <p className="">已选用户列表：</p>
                          {userInfos ?
                            userInfos.map((item, index) => (
                              <label key={index}>{item.userName}<i className="qb-select-menu-g--selectIcon qb-icon-delete" onClick={() => { this.pitch(item.userCode, false, index) }} /></label>
                            )) : null
                          }
                        </div>
                      </div>
                    </div>
                    {
                      this.state.isErr ? (
                        <div className="qb-red-g rob-input-label text-left ">
                          <i className="qb-icon-report1" />请选择通知用户
                        </div>
                      ) : null
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="rob-col-lg-24 text-center qb-from-bg-reg-g">
              <button onClick={this.goBack} type="button" className="rob-btn rob-btn-minor rob-btn-circle ">取消</button>
              <button onClick={this.saveNotification} type="button" className="rob-btn rob-btn-danger rob-btn-circle ">保存</button>
            </div>
          </div>
        </div >
      </div>
    )
  }

}

AddNotificationPage.propTypes = {
  accountData: PropTypes.object,
  getAccountData: PropTypes.func,
  queryInfo: PropTypes.object,
  data: PropTypes.object,
  updateSearchInfo: PropTypes.func,
  getData: PropTypes.func,
  getInfo: PropTypes.func

}
AddNotificationPage.defaultProps = {
  accountData: {},
  getAccountData: () => {},
  queryInfo: {},
  data: {},
  updateSearchInfo: () => { },
  getData: () => { },
  getInfo: () => { },

}

export default connect(state => ({
  // queryInfo: state.notificationDataQuery && state.notificationDataQuery.queryInfo,
  data: state.SENA_notificationDataQuery,
  accountData: state.SENA_notificationDataQuery.SENA_accountData,
}), dispatch => ({
  // updateSearchInfo: bindActionCreators(action.updateSearchInfo, dispatch),
  getAccountData: bindActionCreators(action.SENA_getAccountData, dispatch),
  getData: bindActionCreators(action.SENA_getData, dispatch),
  getInfo: bindActionCreators(action.SENA_getInfo, dispatch),
}))(AddNotificationPage)
