import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
const logoImg = require('assets/images/logo.png')
class SelectRegister extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
    }
    this.routerParams = {}
  }
  componentWillMount() {
    // 如果有路由传参则是修改
    if (this.props.location.state && this.props.location.state.companyType) {
      this.routerParams.companyLicense = this.props.location.state.companyLicense
      this.routerParams.companyType = this.props.location.state.companyType
      this.routerParams.companyId = this.props.location.state.companyId
    }
  }
  goRegister = (companyType) => {
    if (companyType === 'bigCompany') {
      /**
       * 不管企业类型是否修改 都要进性路由传参 返回时需要再把参数传回
       *
       */
      // 跳转大B注册
      // 如果是修改 无论是否修改企业类型 路由传参
      if (this.props.location.state && this.props.location.state.companyType) {
        this.props.history.push({
          pathname: '/register',
          state: { ...this.routerParams }
        })
      } else {
        this.props.history.push({
          pathname: '/register'
        })
      }
    } else if (companyType === 'smallCompany') {
      // 跳转小B注册
      // 如果是修改 无论是否修改企业类型 路由传参
      if (this.props.location.state && this.props.location.state.companyType) {
        this.props.history.push({
          pathname: '/smallRegister',
          state: { ...this.routerParams }
        })
      } else {
        this.props.history.push({
          pathname: '/smallRegister'
        })
      }
    }
  }
  render() {
    return (
      <div>
        <div className="header">
          <div className="rob-container">
            <div className="qb-header-g qb-header-g__bg">
              <Link className="qb-header-g__logo" to="/login">
                <img src={logoImg} alt="" />
              </Link>
              <span className="qb-greet-g fs16">欢迎注册</span>
              <div className="qb-pull-right-g qb-greet-g mr40">已有账号？去<Link className="qb-red-g fs14" to="/login">登录</Link></div>
            </div>
          </div>
        </div>
        <div className="qb-enterprise-g qb-enterprise-g__bg text-center">
          <div className="rob-container">
            <div className="rob-row">
              <div className="rob-col-md-12 rob-col-sm-12 rob-col-xs-24">
                <div onClick={() => this.goRegister('bigCompany')} className="qb-btn-cchoose-g pdtb90 fs16">中大型企业</div>
              </div>
              <div className="rob-col-md-12 rob-col-sm-12 rob-col-xs-24">
                <div onClick={() => this.goRegister('smallCompany')} className="qb-btn-cchoose-g pdtb90 fs16">小微企业</div>
              </div>
            </div>
          </div>
        </div>
        <div className="qb-bg-white-g">
          <div className="rob-container text-center">
            <div className="rob-row rob-col-lg-offset-4 rob-col-md-offset-4">
              <div className="rob-col-md-12 rob-col-sm-12 rob-col-xs-24">
                <ul className="qb-con-list-g">
                  <li><a ><span className="qb-start-g">&#9733;</span>适用于正规企业版网银需求客户</a></li>
                  <li><a ><span className="qb-start-g">&#9733;</span>支持移动办公等便捷服务</a></li>
                  <li><a ><span className="qb-start-g">&#9733;</span>对转账、代发工资业务有审批需求客户</a></li>
                  <li><a ><span className="qb-start-g">&#9733;</span>可申请网银Ukey，增加账户资金安全等级</a></li>
                </ul>
              </div>
              <div className="rob-col-md-12 rob-col-sm-12 rob-col-xs-24">
                <ul className="qb-con-list-g">
                  <li><a ><span className="qb-start-g">&#9733;</span>适用于个人版企业网银需求客户</a></li>
                  <li><a ><span className="qb-start-g">&#9733;</span>快速办理转账、代发工资等业务</a></li>
                  <li><a ><span className="qb-start-g">&#9733;</span>支持移动办公等便捷服务</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="qb-footer-g">
          <div className="footerTel">邮箱：wallet-service@rongcapital.cn&nbsp; 客服电话：010-57044877&nbsp;&nbsp; 周一至周五：9:00-17:00</div>
          <div>©2017 北京融数沃雷特科技服务有限公司&nbsp; rswallet.com｜京ICP备16042215号-3</div>
        </div>
      </div>
    )
  }
}
SelectRegister.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
}
SelectRegister.defaultProps = {
  history: {},
  location: {}
}

export default SelectRegister