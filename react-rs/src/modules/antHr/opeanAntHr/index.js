import React, { PureComponent } from 'react'
import Dialog from 'react-robotUI/dialog'
import saveRequest from 'utils/getRequest'
import PropTypes from 'prop-types'
import './redux/reducer'
export default class quotaSettingManage extends PureComponent {
  static propTypes = {
    history: PropTypes.object
  }
  static defaultProps = {
    history: {}
  }
  constructor(props) {
    super(props)
    this.openImg = (url) => {
      window.open(url, '_blank')
    }
    this.state = {
      showAlert: false
    }
  }
  goHome = () => {
    this.props.history.push({
      pathname: '/home/home'
    })
  }
  delUser = () => {
    (async () => {
      let resposeData = await saveRequest({
        path: '/anthr/acct/openAccount',
        method: 'POST',
      })
      if (resposeData.data.respCode === '000000' && resposeData.data.body.status && resposeData.data.body.status === 1) {
        /*未开通*/
        let orderBtns = [
          { label: '知道了', state: 'goHome', className: 'rob-btn-danger rob-btn-circle' }
        ]
        let tempContent = (
          <div>
            <div style={{ marginBottom: '20px', fontSize: '17px' }}>开通蚂蚁HR服务</div>
            <div>您已提交开通申请!</div>
            <div>我们将安排客户经理上门进行线下认证</div>
          </div>
        )
        this.setState({
          alertTitle: '提示！',
          alertTitleClass: 'rob-alert-title rob-alert-title-color',
          showAlert: true,
          showCloseBtn: false,
          alertContent: tempContent,
          alertBtns: orderBtns,
          alertBtnsClass: 'rob-alert-button rob-alert-button-45',
          alertType: 'bg_icon'
        })
      }
    })()
  }
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'saveOrder') {
      //this.props.history.push('/grossSettlement/searchSingleHandle')
    }
    if (type === 'checkMoneyOk') {
      this.saveInfo()
    }
    if (type === 'test') {
      this.props.history.push('/antHr/opeanAntHr')
    }
    if (type === 'goHome') {
      this.props.history.push('/home/home')
    }
  }
  render() {
    return (
      <div>
        <div className="">
          <div className="qb-panel-g qb-search-g--layout">
            <div className="qb-eva-g">
              <h5 className=" qb-agreement-g__title">蚂蚁HR</h5>
              <div className="rob-container">
                <div className="qb-agreement-g__ag-content  ">
                  <div className="rob-col-lg-offset-6 rob-col-md-offset-6 rob-col-sm-offset-6">
                    <div className="qb-agreement-g__ag-content--segment ">融数金服凝聚资深人力资源专家经验，提供简洁高效的人力资源SaaS服务及人事代理服务。</div>
                    <div className="qb-agreement-g__ag-content--segment">* 代缴社保业务：包含社保申报、缴纳、帐户合并与转移等；</div>
                    <div className="qb-agreement-g__ag-content--segment">* 公积金代跑腿：包含公积金咨询，代跑腿等；</div>
                    <div className="qb-agreement-g__ag-content--segment">* 代发工资业务：包含代发员工工资，个人所得税申报服务。</div>
                    <div className="qb-agreement-g__ag-content--segment">我们致力于帮助中小企业老板免除繁琐人事流程、轻松缴纳社保公积金、精确快捷计算发放工资，是您企业人事代理的首要选择！</div>
                    <div className="qb-agreement-g__ag-content--segment grayc fs12">该服务由上海蚁众企业管理咨询有限公司公司提供</div>
                  </div>

                </div>

              </div>
              <div className="rob-col-lg-24 text-center qb-from-bg-reg-g ">
                <button type="button" className="rob-btn rob-btn-danger rob-btn-circle " onClick={() => { this.delUser() }}>马上开通</button>
              </div>

            </div>
          </div>

        </div>
        <Dialog
          showCover
          showCloseBtn={this.state.showCloseBtn}
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
}
