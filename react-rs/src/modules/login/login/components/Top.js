import React from 'react'
const img1 = require('assets/images/logo.png')
export default () => (
  <div className="header">
    <div className="rob-container">
      <div className="qb-header-g qb-header-g__bgimg">
        <a className="qb-header-g__logo qb-header-g__logo__lg" href="">
          <img src={img1} alt="" />
        </a>
      </div>
    </div>
  </div>
)