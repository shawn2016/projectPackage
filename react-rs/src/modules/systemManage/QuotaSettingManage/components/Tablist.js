/**
 * 收款方信息部分
 * （单笔经办）
 */
import React, { PureComponent } from 'react'
import Tab from 'react-robotUI/Tab'
// import QBLoading from 'components/QBLoading'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as actions from '../redux/actions'
import '../redux/reducer'

class Tablist extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: false
    }
  }
  tabChange = (value) => {
    // this.setState({ showLoading: true }, () => { this.props.getTableList(this.props.searchInfo).then(() => { this.setState({ showLoading: false }) }) })
    this.props.getTableList(this.props.searchInfo)
    this.props.updateSearchInfo({ status: value })
  }
  render() {
    let tabList = [
      {
        title: '复核通过',
        value: '0',
        key: '0'
      },
      {
        title: '复核通过',
        value: '1',
        key: '1'
      },
      {
        title: '复核通过',
        value: '2',
        key: '2'
      }
    ]
    return (
      <div>
        {/* <QBLoading showLoading={this.state.showLoading} loadType="loadingImg" /> */}
        <Tab name="rob-nav rob-nav-tabs2">
          {tabList.map((item) => <div title={item.title} key={item.key} data-func={() => { this.tabChange(item.value) }} />)}
        </Tab>
      </div>
    )
  }
}

Tablist.propTypes = {
  updateSearchInfo: PropTypes.func,
  getTableList: PropTypes.func,
  searchInfo: PropTypes.object,
}
Tablist.defaultProps = {
  updateSearchInfo: () => { },
  getTableList: () => { },
  searchInfo: { },
}

export default connect(state => ({
  searchInfo: state.quotaSettingManage && state.quotaSettingManage.searchInfo
}), dispatch => ({
  updateSearchInfo: bindActionCreators(actions.updateSearchInfo, dispatch),
  getTableList: bindActionCreators(actions.getTableList, dispatch),
}))(Tablist)