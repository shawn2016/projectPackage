import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import QBInput from 'components/QBInput'
import QBDatePicker from 'components/QBDatePicker'
import * as action from '../redux/actions'
import '../redux/reducer'

class BeneficiaryEditorPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      params: {},
      isShowErrorHint: false
    }
  }
  /* 初始化获取数据 */
  componentDidMount() {
    // this.props.getBeneficiaryEditorData()
  }
  componentWillUnmount = () => {
    this.clearSearchParams()
  }
  /* 获取查询参数 */
  getSearchDate = () => {
    let { params } = this.state
    this.setState({
      isShowErrorHint: true
    }, () => {
      !this.applyDate.getErrStatus() && !this.recAccountName.getErrStatus() ?
        this.props.beneficiaryEditorSearch(params)
        && this.props.getBeneficiaryEditorData(params) : null
    })
  }
  /* 清空查询参数 */
  clearSearchParams = () => {
    this.recAccountName.setValue('')
    this.applyDate.setValue({ startDate: '', endDate: '' })
    this.props.clearBeneficiaryEditorSearch()
    this.setState({
      isShowErrorHint: true
    })
  }
  render() {
    const dateLabelClass = 'rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg'
    const dateInputClass = 'rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24 rob-input-date'
    const loanLabelClass = 'rob-col-lg-6 rob-col-md-5 rob-col-sm-24 rob-col-xs-24 qb-no-padding-rg'
    const loanInputClass = 'rob-col-lg-18 rob-col-md-19 rob-col-sm-24 rob-col-xs-24'
    return (
      <div className="qb-search-g">
        <div className="rob-row rob-no-gutters">
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
            <QBDatePicker
              label="创建日期"
              labelClass={dateLabelClass}
              inputClass={dateInputClass}
              handleSelect={(val) => {
                this.state.params.createTimeFrom = val.startDate || null
                this.state.params.createTimeTo = val.endDate || null
                this.setState({ params: { ...this.state.params } })
              }}
              isTestRule={this.state.isShowErrorHint}
              ref={(DOM) => { this.applyDate = DOM }}
            />
          </div>
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
            <QBInput
              name="text"
              type="text"
              label="收款方名称"
              pattern={/^[\S\s]{1,58}$/}
              errDirection="bottom"
              errorMsg="请输入1-58个任意字符"
              labelClass={loanLabelClass}
              inputClass={loanInputClass}
              handleChange={(val) => {
                this.setState({ params: { ...this.state.params, recAccountName: val } })
              }}
              isTestRule={this.state.isShowErrorHint}
              ref={(DOM) => { this.recAccountName = DOM }}
            />
          </div>
          {
            /* <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-24 rob-col-xs-24">
              <QBSelect
                label="白名单"
                labelClass="rob-col-lg-6 rob-col-xs-24"
                inputClass="rob-col-lg-18 rob-col-xs-24"
                ref={ref => this.test = ref}
                options={[
                  { text: '全部', value: '1' },
                  { text: '是', value: '2' },
                  { text: '否', value: '3' }
                ]}
                handleSelect={(value) => this.searchParamsChange('orderList', value)}
              />
            </div> */
          }
          <div className="rob-col-lg-8 rob-col-md-12 rob-col-sm-12 rob-col-xs-12 column text-left qb-query-min-g">
            <div className="rob-col-lg-24 rob-col-md-24 rob-col-sm-24 rob-col-xs-24">
              <button className="rob-btn rob-btn-danger rob-btn-circle pd42 mr10" type="button" onClick={this.getSearchDate}>查询</button>
              <button className="rob-btn rob-btn-minor rob-btn-circle pd42" type="button" onClick={this.clearSearchParams}>清空</button>
            </div>
          </div>
          <div className="rob-col-lg-6 column" />
          <div className="rob-col-lg-6 column" />
        </div>
      </div>
    )
  }
}
BeneficiaryEditorPage.propTypes = {
  data: PropTypes.object,
  getBeneficiaryEditorData: PropTypes.func,
  beneficiaryEditorSearch: PropTypes.func,
  clearBeneficiaryEditorSearch: PropTypes.func
}
BeneficiaryEditorPage.defaultProps = {
  data: {},
  getBeneficiaryEditorData: () => {},
  beneficiaryEditorSearch: () => {},
  clearBeneficiaryEditorSearch: () => {}
}

export default connect(state => ({
  data: state.beneficiaryEditor
}), dispatch => ({
  getBeneficiaryEditorData: bindActionCreators(action.getBeneficiaryEditorData, dispatch),
  beneficiaryEditorSearch: bindActionCreators(action.beneficiaryEditorSearch, dispatch),
  clearBeneficiaryEditorSearch: bindActionCreators(action.clearBeneficiaryEditorSearch, dispatch)
}))(BeneficiaryEditorPage)