import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import RegisterDetailTab from './components/RegisterDetailTab'
const logoImg = require('assets/images/logo.png')
export default class RegisterDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
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
            </div>
          </div>
        </div>
        <div className="qb-check-g">
          <div className="rob-container">
            <div className="qb-panel-g clearfix">
              <RegisterDetailTab dataDetail={this.props} history={this.props.history} />
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
RegisterDetail.propTypes = {
  history: PropTypes.object
}
RegisterDetail.defaultProps = {
  history: {}
}
RegisterDetail.contextType = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    staticContext: PropTypes.object,
  })
}