import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import QBTextarea from 'components/QBTextarea'
import { bindActionCreators } from 'redux'
import * as actions from '../redux/actions'
import '../redux/reducer'

class Auditing extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      params: {
        isConsent: '0'
      },
      isTestRule: false
    }
  }
  static propTypes = {
    params: PropTypes.object
  }
  static defaultProps = {
    params: {}
  }
  radioChange = (type) => {
    if (type) {
      this.setState({ params: { ...this.state.params, isConsent: '0' } })
    } else {
      this.setState({ params: { ...this.state.params, isConsent: '1' } })
    }
  }
  procOperRemarkChange = (value) => {
    this.setState({ params: { ...this.state.params, procOperRemark: value } })
  }
  commitInfo = () => {
    this.state.isTestRule = true
    if (this.procOperRemark.getErrStatus()) {
      return
    }
    console.log(this.state)
    this.props.commitInfo()
  }
  render() {
    return (
      <div className="qb-form-group-g clearfix">
        <div className="rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
          <div className="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
            <label className="rob-input-label">审核意见：
            </label>
          </div>
          <div className="rob-col-lg-15 rob-col-md-15 rob-col-sm-15 rob-col-xs-24 text-left">
            <input className="rob-radio-with-gap" name="group2" defaultChecked type="radio" id="test4" onClick={() => this.radioChange(true)} />
            <label htmlFor="test4">是</label>
            <input className="rob-radio-with-gap" name="group2" type="radio" id="test5" onClick={() => this.radioChange(false)} />
            <label htmlFor="test5">否</label>
          </div>
        </div>
        <div className="rob-form-group rob-col-lg-offset-6 rob-col-lg-12 rob-col-md-offset-6 rob-col-md-12">
          <QBTextarea
            name="default"
            rows="3"
            label="摘要"
            required
            isTestRule={this.state.isTestRule}
            errDirection="right"
            labelClass="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 "
            inputClass="rob-col-lg-13 rob-col-md-13 rob-col-sm-24 rob-col-xs-24"
            handleChange={value => { this.procOperRemarkChange(value) }}
            ref={ref => this.procOperRemark = ref}
          />
        </div>
        <div className="rob-col-lg-24 text-center qb-from-bg-reg-g qb-bg-white-g">
          <button type="button" className="rob-btn rob-btn-minor rob-btn-circle ">取消</button>
          <button type="button" className="rob-btn rob-btn-danger rob-btn-circle " onClick={this.commitInfo}>确认</button>
        </div>
      </div>
    )
  }
}
Auditing.propTypes = {
  callBackInfo: PropTypes.object,
  commitInfo: PropTypes.func
}
Auditing.defaultProps = {
  callBackInfo: {},
  commitInfo: () => {}
}

export default connect(state => ({
  callBackInfo: state.check && state.check.callBackInfo
}), dispatch => ({
  commitInfo: bindActionCreators(actions.commitInfo, dispatch)
}))(Auditing)