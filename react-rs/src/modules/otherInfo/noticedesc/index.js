/*
公告信息列表
戴志祥
2017-7-25
 */
import React, { PureComponent, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as action from './redux/actions'
import { formatDate } from '../../../utils/filterCommon'
import './redux/reducer'

class NoticeDescPage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      data: {}
    }
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  cancle = () => {
    this.context.router.history.push('/otherInfo/notice')
  }
  componentWillReceiveProps(nextProps) {
    const { data = {} } = nextProps,
      { OIND_noticeDescData = {} } = data
    this.setState({
      data: OIND_noticeDescData,
    })
  }
  componentDidMount() {
    let param = {
      id: this.props.params
    }

    this.props.getData(param).then(() => {
      console.log(this.props)
      this.setState({
        data: this.props.data.OIND_noticeDescData.body
      })
    })
  }
  render() {
    const { data = {} } = this.state
    return (
      <div className="qb-panel-g clearfix qb-media-height">
        <div className="qb-column-header-g qb-column-header-g--button">
          <ol className="rob-breadcrumb rob-breadcrumb-pointed">
            <li><Link to="/otherInfo/notice">系统通知</Link></li>
            <li className="active"><a>公告详情</a></li>
          </ol>
          <button className="rob-btn rob-btn-minor rob-btn-circle " type="button" onClick={this.cancle}>返回</button>
        </div>
        <div className="qb-msg-g text-indent">
          {/* <div className="qb-msg-g__title">
            尊敬的北京新东方教育学校机构：
          </div> */}
          <div className="qb-msg-g__content">
            {data.noticeContent}
          </div>
          <div className="qb-msg-g__time">
            {formatDate(data.createTime)}
          </div>
        </div>
      </div>
    )
  }
}
NoticeDescPage.propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func,
  params: PropTypes.string
}
NoticeDescPage.defaultProps = {
  data: {},
  getData: () => { },
  params: ''
}
export default connect(state => ({
  data: state.OIND_noticeDescQuery
}), dispatch => ({
  getData: bindActionCreators(action.OIND_getData, dispatch)
}))(NoticeDescPage)