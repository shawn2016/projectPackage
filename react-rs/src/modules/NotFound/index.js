/* eslint-disable */
import React, { Component } from 'react'
import propTypes from 'prop-types'
import cookieStorage from 'utils/cookieStorage'
// import { Link } from 'react-router-dom'
require('assets/images/qbicon.png')
class NotFound extends Component {
    constructor(prop) {
      super(prop)
    }
  static propTypes = {
    history: propTypes.object,
  }
  static defaultProps = {
    history: {},
  }
  jumpToHome = () => {
    if (JSON.stringify(cookieStorage.getCookie('userInfo')) && cookieStorage.getCookie('userInfo').token) {
      window.location.pathname = '/home/home'
    } else {
      window.location.pathname = '/login'
    }
  }
  render() {
    return (
      <div className="qb-main-box-g qb-main-box-g__pdt200">
        <i className="bg_icon icon404" />
        <p>您访问的页面不存在</p>
        <button type="button" className="rob-btn rob-btn-danger rob-btn-circle " onClick={this.jumpToHome} >返回首页</button>
      </div>
    )
  }
}

export default NotFound