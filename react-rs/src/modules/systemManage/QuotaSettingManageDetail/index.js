import React, { PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QBSelect from 'components/QBSelect'
import QBInput from 'components/QBInput'
import QBTextarea from 'components/QBTextarea'
import { Link } from 'react-router-dom'
import { sendData, getAccountList } from './redux/actions'
import './redux/reducer'

let paramObj = {
  accountNo: '001',
  bizType: '1',
  createDesc: null,
  fromToValue: null,
  id: null,
  limitAmount: null,
  limitType: '1'
}

class quotaSettingManageDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isTestRule: false,
      showFromToValue: false, //控制起始Input的显示隐藏
      pattern: /^(1|2|3|4|5|6|7)$/,
      bussinessTypeArr: [
        { text: '支付结算', value: '1' },
        { text: '代发', value: '2' },
        { text: '出金', value: '3' },
      ],
      limitTypeArr: [
        { text: '每日限额', value: '1' },
        { text: '每周限额', value: '2' },
        { text: '每月限额', value: '3' },
        { text: '每年限额', value: '4' },
      ]
    }
  }
  static propTypes = {
    history: PropTypes.object
  }
  static defaultProps = {
    history: {}
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }
  componentDidMount() {
    //获取账户列表
    this.props.getAccountList()
  }
  limitTypeChange = (value) => {
    console.log(value)
    paramObj.limitType = value.value
    //如果是每日限额
    if (value.value === '1') {
      this.setState({
        showFromToValue: false
      })
    } else if (value.value === '2') {
      this.setState({
        pattern: /^(1|2|3|4|5|6|7)$/,
        errorMsg: '起始值输入有误，请输入1-7之间的数字。',
        hintInfo: '起始值必须为1-7，举例：输入“2”则表示从本周二起到下周一止，金额不能超限。'
      })
      this.setState({
        showFromToValue: true
      })
    } else if (value.value === '3') {
      this.setState({
        pattern: /^(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28)$/,
        errorMsg: '起始值输入有误，请输入01-28之间的数字。',
        hintInfo: '起始值必须为01-28，举例：输入“2”则表示从本月2号起到下月1号止，金额不能超限。'
      })
      this.setState({
        showFromToValue: true
      })
    } else if (value.value === '4') {
      this.setState({
        pattern: /^((02)(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29))|((01|03|05|07|08|10)(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|29|30|31))|((04|06|09|11|12)(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|29|30))$/,
        errorMsg: '起始值输入有误，请输入正确的月份及日期。',
        hintInfo: '起始值必须为0101-1231，举例：输入“0707”则表示从本年7月7号起到下年7月6号止，金额不能超限。'
      })
      this.setState({
        showFromToValue: true
      })
    }
  }
  accountTypeChange = (value) => {
    paramObj.accountNo = value.accountNo
  }
  bussinessTypeChange = (value) => {
    paramObj.bizType = value.value
  }
  limitAmonutChange = (value) => {
    paramObj.limitAmount = value
  }
  fromToValueChange = (value) => {
    paramObj.fromToValue = value
  }
  createDescChange = (value) => {
    paramObj.createDesc = value
  }
  confirm = () => {
    console.log(paramObj)
    this.setState({
      isTestRule: true
    }, () => {
      if (paramObj.limitType === '1') {
        if (this.limitAmountDom.getErrStatus()) {
          return
        }
      } else if (this.limitAmountDom.getErrStatus() || this.fromToValueDom.getErrStatus() || this.createDescDom.getErrStatus()) {
        return
      }
      this.props.sendData(paramObj)
    })
  }
  back = () => {
    window.history.back()
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-media-height">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><i className="qb-icon-other1" style={{ marginRight: '5px' }} />系统管理</li>
              <li><Link to={{ pathname: '/systemManage/quotaSettingManage' }}>额度设置管理</Link></li>
              <li className="active">新增设置</li>
            </ol>
          </div>
          <div className="qb-form-group-g clearfix qb-media-height">
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBSelect
                name="default"
                label="账户名称"
                required
                isTestRule={this.state.isTestRule}
                errDirection="right"
                containErrorIcon1
                defaultValue="001"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                options={this.props.accountList.body}
                handleSelect={value => { this.accountTypeChange(value) }}
              />
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBSelect
                name="default"
                label="业务模式"
                required
                isTestRule={this.state.isTestRule}
                errDirection="right"
                containErrorIcon1
                defaultValue="1"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                options={this.state.bussinessTypeArr}
                handleSelect={value => { this.bussinessTypeChange(value) }}
              />
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBSelect
                name="default"
                label="限额类型"
                required
                isTestRule={this.state.isTestRule}
                containErrorIcon1
                errDirection="right"
                defaultValue="1"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                options={this.state.limitTypeArr}
                handleSelect={value => { this.limitTypeChange(value) }}
              />
            </div>
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBInput
                name="default"
                label="限制额度制额度"
                required
                errDirection="right"
                isTestRule={this.state.isTestRule}
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                pattern={/^([1-9]\d{0,12}|0)(\.\d{1,2})?$/}
                errorMsg="整数部分最多为13位，小数部分为2位。"
                placeholder="请输入限制额度"
                handleChange={value => { this.limitAmonutChange(value) }}
                ref={ref => this.limitAmountDom = ref}
              />
            </div>
            {this.state.showFromToValue === true ? <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBInput
                name="default"
                label="起始值"
                hintInfo={this.state.hintInfo}
                required
                isTestRule={this.state.isTestRule}
                errDirection="right"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                pattern={this.state.pattern}
                errorMsg={this.state.errorMsg}
                placeholder="请输入起始值"
                handleChange={value => { this.fromToValueChange(value) }}
                ref={ref => this.fromToValueDom = ref}
              /> </div> : null}
            <div className="rob-col-lg-offset-5 rob-col-lg-19  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <QBTextarea
                name="default"
                rows="3"
                label="摘要"
                required
                isTestRule={this.state.isTestRule}
                errDirection="right"
                labelClass="rob-col-lg-4 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-10 rob-col-md-20 rob-col-sm-24  rob-col-xs-24  qb-no-padding-rg"
                placeholder="请输入摘要"
                handleChange={value => { this.createDescChange(value) }}
                ref={ref => this.createDescDom = ref}
              />
            </div>
            <div className="rob-col-lg-24  rob-col-md-24  rob-col-xs-24  rob-col-sm-24">
              <div className="qb-form-footButton-g clearfix qb-bg-white-g">
                <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
                  <button className="rob-btn rob-btn-minor rob-btn-circle  " type="button" onClick={this.back}>取消</button>
                  <button className="rob-btn rob-btn-danger rob-btn-circle " type="button" onClick={this.confirm}>确定</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

quotaSettingManageDetail.propTypes = {
  sendData: PropTypes.func,
  getAccountList: PropTypes.func,
  accountList: PropTypes.object,
}
quotaSettingManageDetail.defaultProps = {
  sendData: () => { },
  getAccountList: () => { },
  accountList: {},
}

export default connect(state => ({
  accountList: state.reducers.dataList
}), dispatch => ({
  sendData: bindActionCreators(sendData, dispatch),
  getAccountList: bindActionCreators(getAccountList, dispatch)
}))(quotaSettingManageDetail)