import React, { PureComponent, PropTypes } from 'react'
import cookieStorage from 'utils/cookieStorage'

export default class StepFour extends PureComponent {
  static propTypes = {
    stepNum: PropTypes.number,
    history: PropTypes.any,
    finishedData: PropTypes.object
  }
  static defaultProps = {
    stepNum: 1,
    history: {},
    finishedData: {}
  }
  constructor(prop) {
    super(prop)
    this.state = {
      success: false,
      msg: '',
      isShow: false
    }
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  /**
   * 跳转到登陆
  */
  goLogin = () => {
    sessionStorage.clear()
    let userCode = cookieStorage.getCookie('userCode')
    // localStorage.clear()
    cookieStorage.setCookie('userCode', userCode)
    this.context.router.history.push('/login')
  }
  componentWillReceiveProps(nextProps) {
    const { finishedData = {} } = nextProps
    this.setState({
      isShow: true
    })
    if (finishedData.respCode === '000000') {
      this.setState({
        msg: finishedData.respMsg,
        success: true
      })
    } else if (finishedData.respCode === '500011') {
      this.setState({
        msg: '企业信息已受理在审核中，请联系客服查询审核进度，客服电话:010-57044877',
        success: false
      })
    } else if (finishedData.respCode === '500012') {
      this.setState({
        msg: '企业注册次数已达到上线,请联系客服，客服电话:010-57044877',
        success: false
      })
    } else if (finishedData.respCode === '500013') {
      this.setState({
        msg: '管理员信息相同',
        success: false
      })
    } else if (finishedData.respCode === '500014') {
      this.setState({
        msg: '企业已开通同类账户，请核对',
        success: false
      })
    }/* else {
      this.setState({
        msg: finishedData.respMsg,
        success: false
      })
    }*/
  }
  render() {
    const { stepNum } = this.props,
      { success, msg, isShow } = this.state
    return (
      <div>
        {isShow ?
          <div className="rob-container lightGallery" style={{ display: stepNum === 4 ? 'block' : 'none' }}>
            {success ? <form className="rob-form qb-form-g__form qb-form-group-b10-g qb-mg-bt70-g ">
              <div className="text-center qb-r-success-g">
                <i className="bg_icon qb-icon-success" />
                <div className="qb-r-success-g--s_box">
                  <span className="font18">&nbsp;&nbsp;恭喜您已完成注册！</span><br />
                  <span>&nbsp;&nbsp;&nbsp;请耐心等待审核</span><br />
                  <span>&nbsp;&nbsp;&nbsp;审核结果将以短信形式，发送到您填写的手机上。</span>
                </div>
              </div>
              <div className="">
                <div className="rob-col-lg-24 text-center qb-from-bg-reg-g">
                  <button onClick={this.goLogin} type="button" className="rob-btn rob-btn-danger rob-btn-circle">确定</button>
                </div>
              </div>
            </form>
              : <form className="rob-form qb-form-g__form qb-form-group-b10-g qb-mg-bt70-g ">
                <div className="text-center qb-r-success-g">
                  <i className="bg_icon qb-icon-fail" />
                  <div className="qb-r-fail-g--s_box">
                    <span className="font18">&nbsp;&nbsp;注册失败！</span><br />
                    <span>&nbsp;&nbsp;&nbsp;{msg}</span>
                  </div>
                </div>
                <div className="">
                  <div className="rob-col-lg-24 text-center qb-from-bg-reg-g">
                    <button onClick={this.goLogin} type="button" className="rob-btn rob-btn-danger rob-btn-circle">确定</button>
                  </div>
                </div>
              </form>
            }
          </div> : null
        }
      </div>

    )
  }
}