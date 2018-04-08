import React, { Component } from 'react'
export class successful extends Component {
  render() {
    return (
      <div className="pay-box-pd">
        <form className="rob-form qb-form-g__form qb-form-group-b10-g qb-mg-bt70-g text-overflow">
          <div className="text-center qb-r-success-g">
            <i className="bg_icon qb-icon-success" />
            <div className="qb-r-success-g--s_box">
              <p className="font18">支付成功</p>
              <p>您的订单已经成功支付，请关闭窗口</p>
              <p>进入融数企业钱包平台可查看订单信息。</p>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default successful