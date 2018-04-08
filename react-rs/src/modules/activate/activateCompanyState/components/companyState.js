import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getRequest from 'utils/getRequest'
import Button from 'react-robotUI/Button'
import Dialog from 'react-robotUI/dialog'

class CompanyState extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      showAlert: false,
      data: {}
    }
  }
  componentWillMount() {
    this.setState({ data: this.props.params })
  }
  changeAccount = () => {
    this.props.changeAccount()
  }
  panyment = () => {
    let paymentParams = {
      accountNo: this.props.params.accountNo
    };
    (async () => {
      let resData = await getRequest({
        path: '/payment/recharge/payTheFees',
        method: 'POST',
        param: paymentParams
      })
      if (resData.data.respCode === '000000') {
        if (resData.data.body && resData.data.body.formFile) {
          const formFile = resData.data.body.formFile
          document.getElementById('submit_dom').innerHTML = formFile.substr(0, formFile.length - 7) + '<input type="submit" id="submit_button" value="Submit"></form>' // eslint-disable-line
          document.getElementById('submit_button').click()
        }
        let paymentActions = [{
          label: '确定',
          className: 'rob-btn rob-btn-danger rob-btn-circle',
          state: 'goActivateDetail'
        }]
        this.setState({
          alertContent: resData.data.respMsg,
          showAlert: true,
          alertBtns: paymentActions,
          alertBtnsClass: 'rob-alert-button-color',
          alertType: 'bg_icon qb-icon-success'
        })
      } else if (resData.data.respCode === '500005') {
        let paymentActionsError = [{
          label: '确定',
          className: 'rob-btn rob-btn-danger rob-btn-circle',
          state: 'goActivateDetail'
        }]
        this.setState({
          alertContent: resData.data.respMsg,
          showAlert: true,
          alertBtns: paymentActionsError,
          alertBtnsClass: 'rob-alert-button-color',
          alertType: 'bg_icon qb-icon-success'
        })
      }
    })()
  }
  /* 关闭弹出框 */
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'goActivateDetail') {
      (async () => {
        let resData = await getRequest({
          path: '/companyAcc/getInfo',
          method: 'POST',
          param: { accountNo: this.props.params.accountNo }
        })
        if (resData.data.body.status === '100') {
          this.props.history.push('/login')
        } else {
          this.state.data = resData.data.body
          this.setState({ ...this.state.data })
        }
      })()
    }
  }
  render() {
    const { data } = this.state,
      dataList = [{
        name: '账户名称',
        value: data.accountName
      }, {
        name: '对公账户',
        value: data.accountNo
      }, {
        name: '开户银行',
        value: data.settleBankName
      }, {
        name: '开户地',
        value: data.accountProvince + data.accountCity
      }, {
        name: '开户支行',
        value: data.bankName
      }, {
        name: '联行号',
        value: data.bankNo
      }]
    return (
      <div>
        <div id="submit_dom" hidden />
        <form className="rob-form qb-form-g__form qb-form-group-b10-g qb-mg-bt70-g">
          <div className="qb-active-g">
            <i className={`bg_icon qb-active-g__mb40 ${data.status === 200 ? 'qb-icon-verify' : data.status === 800 || data.status === 300 ? 'qb-icon-failure' : 'qb-icon-pay'}`} />
            {dataList.map(({ name, value }, index) => (
              <div className="rob-form-group rob-row" key={index}>
                <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 text-right qb-fontColor-g">
                  {name}:
                </div>
                <div className="rob-col-lg-12 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 text-left">
                  {value}
                </div>
              </div>
            ))}
          </div>
          <div className="">
            <div className="rob-col-lg-24 text-center qb-from-bg-reg-g">
              {data.status !== 200 ?
                <div>
                  {data.status === 400 || data.status === 800 || data.status === 300 ?
                    <Button className="rob-btn rob-btn-minor rob-btn-circle" label="修改" onClick={this.changeAccount} /> :
                    ''}
                  {data.status === 400 || data.status === 800 || data.status === 700 ?
                    <Button className="rob-btn rob-btn-minor rob-btn-circle" label="缴费" onClick={this.panyment} /> :
                    ''}
                </div> :
                ''}
            </div>
          </div>
        </form>
        <Dialog
          showCover
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={this.alertClose}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
}
CompanyState.propTypes = {
  history: PropTypes.object,
  params: PropTypes.object,
  changeAccount: PropTypes.func
}
CompanyState.defaultProps = {
  history: {},
  params: {},
  changeAccount: () => { }
}
export default CompanyState