/**
 * 业务流程
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import QBTextarea from 'components/QBTextarea'
import Dialog from 'react-robotUI/dialog'
import getRequest from 'utils/getRequest'
import '../redux/reducer'

class Examine extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      auditOpinion: null,
      description: '',
      isTestRule: false,
      isShowErrorWindow: false,
      errMsg: '',
      showAlert: false
    }
  }
  handleCloseErrMsg = () => {
    this.setState({ isShowErrorWindow: false }, () => {
      if (this.state.respCode === '000000') {
        this.props.history.push({
          pathname: '/issuing/undertakesHandleExamine',
        })
      }
    })
  }
  submit = () => {
    if (this.state.auditOpinion === null) {
      this.setState({
        approveStatusDesc: '请选择审核意见'
      })
      return
    }
    this.setState({
      isTestRule: true
    }, () => {
      if (this.reason.getErrStatus()) {
        return
      }
      (async () => {
        this.auditOpinion = ''
        let data = await getRequest({
          path: '/payment/agency/approveOrder',
          method: 'POST',
          param: {
            auditOpinion: this.state.auditOpinion,
            description: this.state.description,
            approveList: [{ actInstanceId: this.props.data.actInstanceId, serialNo: this.props.data.serialNo }]
          }
        })
        if (data.data.respCode === '000000') {
          this.setState({
            isShowErrorWindow: true,
            errMsg: data.data.respMsg,
            respCode: data.data.respCode
          })
        } else if (data.data.respCode === '500001') {
          this.setState({
            alertContent: `很抱歉，有${data.data.body.failureCount}笔审批失败，请稍后重试。`,
            alertBtns: [{
              label: '查看详情',
              className: 'rob-btn-minor rob-btn rob-btn-circle',
              state: 'goFailDetail'
            }, {
              label: '确定',
              className: 'rob-btn rob-btn-danger rob-btn-circle',
              state: false
            }],
            alertBtnsClass: 'rob-alert-button-color rob-alert-button-45',
            alertType: '',
            showAlert: true
          })
          if (data.data.body && data.data.body.failureList) {
            this.setState({ detail: data.data.body.failureList })
          }
        }
      })()
    })
  }
  /* 关闭弹出框事件 */
  alertClose = (type) => {
    this.setState({ showAlert: false })
    if (type === 'goFailDetail') {
      sessionStorage.setItem('failureDataList', JSON.stringify({ list: this.state.detail, type: 'Approve', from: 'agency' }))
      window.open('/otherInfo/batchFailDetailList')
    }
  }
  goBack = () => {
    this.props.history.push({
      pathname: '/issuing/undertakesHandleExamine'
    })
  }
  render() {
    return (
      <div className="qb-time-line-g rob-row">
        <div className="rob-form-group">
          <div className="rob-form-group rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
              <label className="rob-input-label">审核意见：</label>
            </div>
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24">
              <input
                className="rob-radio-with-gap"
                name="group2"
                checked={this.state.auditOpinion === '700007'}
                type="radio"
                id="test4"
                onChange={() => {
                  this.setState({
                    auditOpinion: '700007',
                    isReject: false,
                    approveStatusDesc: false
                  })
                }}
              />
              <label htmlFor="test4">同意</label>
              <input
                className="rob-radio-with-gap"
                name="group2"
                checked={this.state.auditOpinion === '700005'}
                type="radio"
                id="test5"
                onChange={() => {
                  this.setState({
                    auditOpinion: '700005',
                    isReject: true,
                    approveStatusDesc: false
                  })
                }}
              />
              <label htmlFor="test5">拒绝</label>
              {this.state.approveStatusDesc ? <div style={{ color: '#cc1612' }}><i className="qb-icon-report1" />{this.state.approveStatusDesc}</div> : null}
            </div>
          </div>
          <div className="rob-form-group rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <div className="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24">
              <QBTextarea
                name="username"
                type="text"
                rows="6"
                label="备注"
                labelClass="rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg"
                inputClass="rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24"
                emptyMsg="审核意见为拒绝时，备注不能为空"
                containErrorIcon
                errorMsg="请输入1-140个字的备注"
                pattern={/^[\S\s]{1,140}$/}
                required={this.state.isReject}
                isTestRule={this.state.isTestRule}
                errDirection="bottom"
                handleChange={value => {
                  this.setState({
                    description: value
                  })
                }}
                ref={ref => this.reason = ref}
              />
            </div>
          </div>
        </div>
        <div className="qb-form-footButton-g clearfix qb-bg-white-g">
          <div className=" rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
            <button className="rob-btn rob-btn-minor rob-btn-circle" onClick={this.goBack} type="button">取消</button>
            <button
              className="rob-btn rob-btn-danger rob-btn-circle"
              onClick={() => {
                this.submit()
              }}
            >提交</button>
          </div>
        </div>
        <Dialog
          //showCloseBtn
          showCover
          open={this.state.isShowErrorWindow}
          content={{ content: this.state.errMsg, icon: 'bg_icon qb-icon-active' }}
          actions={[{
            label: '确定',
            className: 'rob-btn rob-btn-danger rob-btn-circle'
          }]}
          onRequestClose={this.handleCloseErrMsg}
          actionClassName="rob-alert-button-color"
        />
        <Dialog
          showCover
          open={this.state.showAlert}
          content={{ content: this.state.alertContent, icon: this.state.alertType }}
          onRequestClose={(state) => this.alertClose(state)}
          actions={this.state.alertBtns}
          actionClassName={this.state.alertBtnsClass}
        />
      </div>
    )
  }
  _handleInput = text => {
    this.setState({
      description: text
    })
  }
}

Examine.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
}
Examine.defaultProps = {
  data: {},
  history: {}
}

export default Examine