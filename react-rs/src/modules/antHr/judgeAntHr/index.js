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
  go = (item) => {
    window.open(item, '_blank')
  }
  componentWillMount() {
    this.delUser()
  }
  delUser = () => {
    (async () => {
      let resposeData = await saveRequest({
        path: '/anthr/acct/getInfo',
        method: 'POST',
      })
      //resposeData.data.respCode = '000000'
      //resposeData.data.respCode = '000000'
      //resposeData.data.respCode = '000001'
      if (resposeData.data.respCode === '000000' && resposeData.data.body.acctStatus && resposeData.data.body.acctStatus === 2) {
        /*失败*/
        let orderBtns = [
          { label: '申请开通', state: 'open', className: 'rob-btn-danger rob-btn-circle' }
        ]
        let tempContent = (
          <div>
            <div style={{ marginBottom: '20px', fontSize: '17px' }}>未能开通蚂蚁HR服务</div>
            <div style={{ marginBottom: '20px', fontSize: '17px' }}>您的申请未通过，请重新申请开通</div>
            <div>失败原因：线下材料提交不全</div>
          </div>
        )
        this.setState({
          alertTitle: '提示！',
          alertTitleClass: 'rob-alert-title rob-alert-title-color',
          alertCloseAsFail: true,
          showCloseBtn: true,
          alertContent: tempContent,
          alertBtns: orderBtns,
          alertBtnsClass: 'rob-alert-button rob-alert-button-45',
          alertType: 'bg_icon'
        })
      } else if (resposeData.data.respCode === '000000' && resposeData.data.body.acctStatus && resposeData.data.body.acctStatus === 3) {
        /*开通完成*/
        /*let orderBtns = [
          { label: '正在跳转', state: 'jump', className: 'rob-btn-danger rob-btn-circle' }
        ]*/
        this.setState({
          link: resposeData.data.body.antUrl
        })
        let tempContent = (
          <div>
            <div style={{ marginBottom: '20px', fontSize: '17px' }}>正在为您跳转蚂蚁HR</div>
          </div>
        )
        this.setState({
          alertTitle: '提示！',
          alertTitleClass: 'rob-alert-title rob-alert-title-color',
          alertAutoClose: true,
          showAlerts: true,
          showCloseBtn: false,
          alertContent: tempContent,
          alertBtns: false,
          alertBtnsClass: 'rob-alert-button rob-alert-button-45',
          alertType: 'bg_icon qb-icon-loading'
        })
        /*if (!this.state.showAlert) {
          this.props.history.push('/antHr/opeanAntHr')
        }*/
      } else if (resposeData.data.respCode === '000000' && resposeData.data.body.acctStatus && resposeData.data.body.acctStatus === 4) {
        /*去开通*/
        this.props.history.push('/antHr/opeanAntHr')
      } else if (resposeData.data.respCode === '000000' && resposeData.data.body.acctStatus && resposeData.data.body.acctStatus === 1) {
        //let link = resposeData.data.body.hrUrl
        /*在审核*/
        let orderBtns = [
          { label: '确定', state: 'goHome', className: 'rob-btn-danger rob-btn-circle' }
        ]
        this.setState({
          link: resposeData.data.body.antUrl
        })
        let tempContent = (
          <div>
            <div style={{ marginBottom: '20px', fontSize: '17px' }}>正在开通蚂蚁HR服务</div>
            <div style={{ marginBottom: '20px', fontSize: '17px' }}>请您耐心等待，我们将尽快完成开通</div>
            <div><a onClick={() => { this.go(this.state.link) }}>进入蚂蚁HR</a></div>
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
    //this.setState({ showAlert: false })
    if (type === 'saveOrder') {
      //this.props.history.push('/grossSettlement/searchSingleHandle')
    }
    if (type === 'checkMoneyOk') {
      this.saveInfo()
    }
    if (type === 'goHome') {
      this.props.history.push('/home/home')
    }
    if (type === 'open') {
      this.props.history.push('/antHr/opeanAntHr')
    }
    if (type === 'jump') {
      this.props.history.push('/antHr/opeanAntHr')
    }
  }
  alertCloseAsFail = (type) => {
    //this.setState({ showAlert: false })
    if (!type) {
      this.setState({
        alertCloseAsFail: false
      }, () => {
        this.props.history.push('/home/home')
      })
    }
    if (type === 'open') {
      //this.setState({ alertCloseAsFail: false })
      this.props.history.push('/antHr/opeanAntHr')
    }
  }
  alertCloses = (type) => {
    //this.setState({ showAlert: false })
    this.setState({
      showAlert: false
    }, () => {
      this.props.history.push('/home/home')
      window.open(this.state.link, '_blank')
    })
    if (type === 'saveOrder') {
      //this.props.history.push('/grossSettlement/searchSingleHandle')
    }
    if (type === 'checkMoneyOk') {
      this.saveInfo()
    }
    if (type === 'goHome') {
      this.props.history.push('/home/home')
    }
    if (type === 'open') {
      this.props.history.push('/antHr/opeanAntHr')
    }
    if (type === 'jump') {
      this.props.history.push('/antHr/opeanAntHr')
    }
  }
  render() {
    return (
      <div>
        <Dialog
          showCover
          showCloseBtn={this.state.showCloseBtn}
          autoClose={this.state.alertAutoClose}
          timeout={10}
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
        <Dialog
          showCover
          showCloseBtn={this.state.showCloseBtn}
          autoClose={this.state.alertAutoClose}
          timeout={3}
          open={this.state.showAlerts}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertCloses(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
        <Dialog
          showCover
          showCloseBtn={this.state.showCloseBtn}
          autoClose={this.state.alertAutoClose}
          timeout={10}
          open={this.state.alertCloseAsFail}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertCloseAsFail(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
}
