/*
企业理财转入
刘鹏钢
2017-12-7
 */
/* eslint-disable */
import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'react-robotUI/dialog'
import request from 'utils/getRequest'
import Board from '../enterpriseFinancing/components/Board'
import * as action from './redux/actions'
import './redux/reducer'
class RiskAssessmentPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      showAlert: false,
      params: {
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: '',
        answer6: ''
      },
      finishAnswer: false,
      resultData: {}
    }
  }
  componentWillMount() {
    (async () => {
      let resData = await request({
        path: '/fund/getFundsToInfo',
        method: 'POST'
      })
      if (resData.data.respCode === '000000') {
        let status = resData.data.body.ifFundsCanInto
        if (status === '400') {
          this.setState({ finishAnswer: true, resultData: resData.data.body })
        }
      }
    })()
  }
  // 定义显示勾选的对象
  choice = {}
  // 提交表单
  submitForm = () => {
    (async () => {
      let resData = await request({
        path: '/fund/getFundsToInfo',
        method: 'POST'
      })
      if (resData.data.respCode === '000000') {
        let status = resData.data.body.ifFundsCanInto
        if (status === '100') {
          this.boardAlert.wrappedInstance.delUser()
        } else if (status === '200') {
          this.setState({
            showAlert: true,
            alertContent: (<div><p calssName="text-center">您的理财账户正在开通受理中，请耐心等待</p><p calssName="text-center">理财账户开通预计需1个工作日</p></div>),
            alertBtns: [{
              label: '知道了',
              className: 'rob-btn rob-btn-danger rob-btn-circle',
              state: false
            }],
            alertBtnsClass: 'rob-alert-button-color rob-alert-button-45'
          })
        } else if (status === '500') {
          this.setState({
            showAlert: true,
            alertContent: (<div><p calssName="text-center">您的理财账户开通失败，请核对资料并重新提交开户申请</p><p calssName="text-center">理财账户开通预计需1个工作日</p></div>),
            alertBtns: [{
              label: '重新开通',
              className: 'rob-btn rob-btn-danger rob-btn-circle',
              state: 'resetOpen'
            }],
            alertBtnsClass: 'rob-alert-button-color rob-alert-button-45'
          })
        } else {
          let { params } = this.state,
            tempAnswerStr = ''
          for (let key in params) {
            if (!params[key]) {
              this.setState({
                showAlert: true,
                alertContent: '请完成所有评测内容',
                alertBtns: [{
                  label: '确定',
                  className: 'rob-btn rob-btn-danger rob-btn-circle',
                  state: false
                }],
                alertBtnsClass: 'rob-alert-button-color rob-alert-button-45'
              })
              return false
            }
            tempAnswerStr += params[key] + '|'  // eslint-disable-line
          }
          tempAnswerStr = tempAnswerStr.substr(0, tempAnswerStr.length - 1)
          this.props.submitForm({ answer: tempAnswerStr }).then((res) => {
            if (res.data.respCode === '000000') {
              this.setState({ finishAnswer: true, resultData: res.data.body ? res.data.body : {} })
            }
          })
        }
      }
    })()
  }
  // 关闭弹窗
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'resetOpen') {
      console.log('未开通基金账户')
    }
  }
  // 重新测试
  resetTest = () => {
    this.setState({ finishAnswer: false })
  }
  // 去首页
  goToEnterpriseFinancing = () => {
    this.props.history.push('/enterpriseFinancing/enterpriseFinancing')
  }
  render() {
    return (
      <div>
        <div className="qb-panel-g qb-media-height">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li><Link to="/enterpriseFinancing/enterpriseFinancing"><i className="qb-icon-enterprise-financing" />企业理财</Link></li>
              <li className="active"><a>风险评测</a></li>
            </ol>
          </div>
          {!this.state.finishAnswer ? <div className="qb-eva-g">
            <h5 className=" qb-agreement-g__title">风险评测问卷(第A 节附录A)</h5>
            <div className="rob-container">
              <div className="qb-agreement-g__ag-content ">
                <div className="qb-agreement-g__ag-content--segment">
                  <h3>1. 贵公司如何看待投资风险？</h3>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box1A"
                    className="rob-radio-with-gap"
                    checked={this.choice.A1}
                    onChange={() => {
                      this.choice.A1 = true
                      this.choice.B1 = false
                      this.choice.C1 = false
                      this.setState({
                        params: { ...this.state.params, answer1: 'A' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box1A">A、谨慎承担风险—— 在短、中、长期愿意接受稍高于银行存款的投资波
                    动风险。投资人了解此类型投资在中长期有可能获得较好的报酬率， 甚至
                    可能高于通货膨胀率；相反的，投资绩效不佳也有可能导致投资本金的损失。
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box1B"
                    className="rob-radio-with-gap"
                    checked={this.choice.B1}
                    onChange={() => {
                      this.choice.A1 = false
                      this.choice.B1 = true
                      this.choice.C1 = false
                      this.setState({
                        params: { ...this.state.params, answer1: 'B' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box1B">B、稳健承担风险—— 在短、中、长期愿意接受中等程度的投资波动风
                    险，投资人了解此类型投资在中长期有可能获得较高的报酬率，而投资本
                    金也有增值的可能性；相反的，投资绩效不佳也有可能导致投资本金的损失。
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box1C"
                    className="rob-radio-with-gap"
                    checked={this.choice.C1}
                    onChange={() => {
                      this.choice.A1 = false
                      this.choice.B1 = false
                      this.choice.C1 = true
                      this.setState({
                        params: { ...this.state.params, answer1: 'C' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box1C"> C、积极面对风险—— 在短、中、长期均愿意接受高度投资波动风险，以
                    获得享有高额报酬的机会，投资人了解在各个投资期间，投资本金均可能
                    面临大幅的增减变化，因此带来高额的投资利益和损失。
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <h3>2. 贵公司以往的投资经验是？</h3>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box2A"
                    className="rob-radio-with-gap"
                    checked={this.choice.A2}
                    onChange={() => {
                      this.choice.A2 = true
                      this.choice.B2 = false
                      this.choice.C2 = false
                      this.setState({
                        params: { ...this.state.params, answer2: 'A' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box2A">
                    A、经验较少—— 不了解投资讯息与投资产，无投资经历
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box2B"
                    className="rob-radio-with-gap"
                    checked={this.choice.B2}
                    onChange={() => {
                      this.choice.A2 = false
                      this.choice.B2 = true
                      this.choice.C2 = false
                      this.setState({
                        params: { ...this.state.params, answer2: 'B' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box2B">
                    B、稍具经验—— 具有投资基本知识
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box2C"
                    className="rob-radio-with-gap"
                    checked={this.choice.C2}
                    onChange={() => {
                      this.choice.A2 = false
                      this.choice.B2 = false
                      this.choice.C2 = true
                      this.setState({
                        params: { ...this.state.params, answer2: 'C' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box2C">
                    C、经验丰富—— 熟悉投资知识，有投资经历
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <h3>3. 贵公司主要的投资目的是什么？</h3>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box3A"
                    className="rob-radio-with-gap"
                    checked={this.choice.A3}
                    onChange={() => {
                      this.choice.A3 = true
                      this.choice.B3 = false
                      this.choice.C3 = false
                      this.setState({
                        params: { ...this.state.params, answer3: 'A' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box3A">
                    A、可忍受投资本金价值稍微波动以获取收益
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box3B"
                    className="rob-radio-with-gap"
                    checked={this.choice.B3}
                    onChange={() => {
                      this.choice.A3 = false
                      this.choice.B3 = true
                      this.choice.C3 = false
                      this.setState({
                        params: { ...this.state.params, answer3: 'B' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box3B">
                    B、兼顾收益与资本保值
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box3C"
                    className="rob-radio-with-gap"
                    checked={this.choice.C3}
                    onChange={() => {
                      this.choice.A3 = false
                      this.choice.B3 = false
                      this.choice.C3 = true
                      this.setState({
                        params: { ...this.state.params, answer3: 'C' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box3C">
                    C、资本增值为主
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <h3>4. 贵公司偏好投资产品的种类？</h3>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box4A"
                    className="rob-radio-with-gap"
                    checked={this.choice.A4}
                    onChange={() => {
                      this.choice.A4 = true
                      this.choice.B4 = false
                      this.choice.C4 = false
                      this.setState({
                        params: { ...this.state.params, answer4: 'A' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box4A">
                    A、保守型产品：包含货币型工具（国内货币型基金等）
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box4B"
                    className="rob-radio-with-gap"
                    checked={this.choice.B4}
                    onChange={() => {
                      this.choice.A4 = false
                      this.choice.B4 = true
                      this.choice.C4 = false
                      this.setState({
                        params: { ...this.state.params, answer4: 'B' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box4B">
                    B、稳健型产品：包含平衡型产品（混合基金）与固定收益产品（债券、债券基金等）
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box4C"
                    className="rob-radio-with-gap"
                    checked={this.choice.C4}
                    onChange={() => {
                      this.choice.A4 = false
                      this.choice.B4 = false
                      this.choice.C4 = true
                      this.setState({
                        params: { ...this.state.params, answer4: 'C' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box4C">
                    C、积极型产品：包含股票与衍生性金融产品（股票基金等）
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <h3>5. 贵公司最近一年时间的诚信经营记录如何？</h3>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box5A"
                    className="rob-radio-with-gap"
                    checked={this.choice.A5}
                    onChange={() => {
                      this.choice.A5 = true
                      this.choice.B5 = false
                      this.choice.C5 = false
                      this.setState({
                        params: { ...this.state.params, answer5: 'A' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box5A">
                    A、诚信记录较差—— 最近一年有违规或者违约记录
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box5B"
                    className="rob-radio-with-gap"
                    checked={this.choice.B5}
                    onChange={() => {
                      this.choice.A5 = false
                      this.choice.B5 = true
                      this.choice.C5 = false
                      this.setState({
                        params: { ...this.state.params, answer5: 'B' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box5B">
                    B、诚信记录较好—— 最近一年无违规但有较少违约并已解决
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box5C"
                    className="rob-radio-with-gap"
                    checked={this.choice.C5}
                    onChange={() => {
                      this.choice.A5 = false
                      this.choice.B5 = false
                      this.choice.C5 = true
                      this.setState({
                        params: { ...this.state.params, answer5: 'C' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box5C">
                    C、诚信记录良好—— 最近一年无违规和违约记录
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <h3>6. 贵公司最近一年时间的经营状况？</h3>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box6A"
                    className="rob-radio-with-gap"
                    checked={this.choice.A6}
                    onChange={() => {
                      this.choice.A6 = true
                      this.choice.B6 = false
                      this.choice.C6 = false
                      this.setState({
                        params: { ...this.state.params, answer6: 'A' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box6A">
                    A、经营较差—— 收入和利润下降
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box6B"
                    className="rob-radio-with-gap"
                    checked={this.choice.B6}
                    onChange={() => {
                      this.choice.A6 = false
                      this.choice.B6 = true
                      this.choice.C6 = false
                      this.setState({
                        params: { ...this.state.params, answer6: 'B' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box6B">
                    B、经营较好—— 收入和利润较稳定
                  </label>
                </div>
                <div className="qb-agreement-g__ag-content--segment">
                  <input
                    type="radio"
                    id="filled-in-box6C"
                    className="rob-radio-with-gap"
                    checked={this.choice.C6}
                    onChange={() => {
                      this.choice.A6 = false
                      this.choice.B6 = false
                      this.choice.C6 = true
                      this.setState({
                        params: { ...this.state.params, answer6: 'C' }
                      })
                    }}
                  />
                  <label htmlFor="filled-in-box6C">
                    C、经营良好—— 收入和利润有较快增长
                  </label>
                </div>
              </div>
            </div>
            <div className="rob-col-lg-24 text-center qb-from-bg-reg-g ">
              <button type="button" className="rob-btn rob-btn-danger rob-btn-circle" onClick={this.submitForm}>提交</button>
            </div>
          </div> :
          <div className="qb-panel_box-g">
            <p className="text-center pb80">
              <span className="fs16 col-e72">{this.state.resultData.riskResult}</span>
            </p>
            <div className="text-center ">
              <button type="button" onClick={this.resetTest} className="rob-btn rob-btn-minor rob-btn-circle pb50">重新测评</button>
              <button type="button" onClick={this.goToEnterpriseFinancing} className="rob-btn rob-btn-danger rob-btn-circle pb50">去投资</button>
            </div>
          </div>}
        </div>
        <Dialog
          showCover
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
        <Board ref = {s => this.boardAlert = s} hideInfo />
      </div>
    )
  }
}

RiskAssessmentPage.propTypes = {
  history: PropTypes.object,
  submitForm: PropTypes.func
}
RiskAssessmentPage.defaultProps = {
  history: {},
  submitForm: () => { }
}
export default connect(({ }) => ({
}), dispatch => ({
  submitForm: bindActionCreators(action.DESP_submitForm, dispatch)
}))(RiskAssessmentPage)