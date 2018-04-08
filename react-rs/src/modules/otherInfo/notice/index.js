/*
公告信息列表
戴志祥
2017-7-25
 */
import React, { PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Pagination from 'react-robotUI/Pagination'
import Dialog from 'react-robotUI/dialog'
import * as action from './redux/actions'
import { formatDay } from '../../../utils/filterCommon'
import './redux/reducer'
class NoticePage extends PureComponent {
  constructor(prop) {
    super(prop)
    this.state = {
      data: {},
      items: [],
      PaginationConf: {
        type: 'default',
        pageSize: 10,
        currentPage: 1,
        dataCount: 1,
        maxSize: 8,
        allowJump: true,
        showPreAndNext: false,
        onChange: (currentPage) => {
          console.log(currentPage)
          let params = this.state.searchParams
          params.page = currentPage
          params.rows = this.state.PaginationConf.pageSize
          this.props.getData(params)
        }
      },
      searchParams: {},
      isAllcheck: false,
      checkCount: 0,
      contentDom: ''
    }
    this.getContent = (re) => { this.content = re }
    this.getActions = (re) => { this.actions = re }
    this.AllCheckFunc = this.AllCheckFunc.bind(this)
    this.checkedFunc = this.checkedFunc.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.compareLength = this.compareLength.bind(this)
    this.lookFunc = this.lookFunc.bind(this)
    this.delMsg = this.delMsg.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.getCheckState = this.getCheckState.bind(this)
  }
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      staticContext: PropTypes.object
    })
  }
  componentWillReceiveProps(nextProps) {
    let values = []
    const { data = {} } = nextProps
    if (data && data.OIOT_noticeData && data.OIOT_noticeData.body && data.OIOT_noticeData.body.values) {
      values = data.OIOT_noticeData.body.values
      this.setState({
        PaginationConf: {
          ...this.state.PaginationConf,
          dataCount: nextProps.data.OIOT_noticeData.body.pagenation.itemCount,
          currentPage: nextProps.data.OIOT_noticeData.body.pagenation.pageNo,
          pageSize: nextProps.data.OIOT_noticeData.body.pagenation.pageSize,
        }
      })
    }
    this.setState({
      items: values
    })
  }
  componentDidMount() {
    this.props.getData({ page: 1, rows: this.state.PaginationConf.pageSize })
  }

  // 全选
  AllCheckFunc = () => {
    const { items } = this.state
    this.setState({
      isAllcheck: !this.state.isAllcheck
    })
    this.state.data.noticeData.body.values.forEach(function (item, index) {
      if (!this.state.isAllcheck) {
        items[index].isCheck = true
        this.setState({
          items: [...this.state.items]
        })
      } else {
        items[index].isCheck = false
        this.setState({
          items: [...this.state.items]
        })
      }
    }, this)
  }
  // 单选
  checkedFunc = (index) => {
    const { items } = this.state
    if (this.state.isAllcheck) {
      this.setState({
        checkCount: items.length
      })
    }
    if (!items[index].isCheck) {
      items[index].isCheck = true
      this.setState({
        checkCount: this.state.checkCount + 1,
        items: [...this.state.items]
      }, function () {
        this.compareLength()
      })
    } else {
      items[index].isCheck = false
      this.setState({
        checkCount: this.state.checkCount - 1,
        items: [...this.state.items]
      }, function () {
        this.compareLength()
      })
    }
  }
  // 单选后是否相当于全选
  compareLength = () => {
    if (this.state.checkCount === this.state.items.length) {
      this.setState({
        isAllcheck: true
      })
    } else {
      this.setState({
        isAllcheck: false
      })
    }
  }
  // 查看详情
  lookFunc = (id) => {
    this.context.router.history.push('/otherInfo/noticedesc', id)
  }
  // 弹窗
  handleOpen = (type, id) => {
    let delArray = this.getCheckState()
    if (id) {
      delArray = []
      delArray.push(id)
    }
    console.log(delArray)
    if (delArray.length === 0) {
      this.setState({
        contentDom: '请选择需要删除的消息！'
      }, function () {
        this.dialogShow[type]()
      })
    } else if (delArray.length === 1) {
      this.setState({
        contentDom: '确定要删除该条的通知？'
      }, function () {
        this.dialogShow[type]()
      })
    } else {
      this.setState({
        contentDom: '确定要删除选中的通知？'
      }, function () {
        this.dialogShow[type]()
      })
    }
  }
  // 关闭弹窗触发
  handleClose = (name, type) => {
    console.log(name)
    this.setState({ [type]: false })
  }
  dialogShow = {
    d11: () => {
      this.setState({ d11: true })
      this.getContent(
        <div className="rob-alert-content ">
          {this.state.contentDom}
        </div>
      )
      this.getActions([{
        label: '取消',
        className: 'rob-btn-minor rob-btn-circle'
      }, {
        label: '确定',
        className: 'rob-btn rob-btn-danger rob-btn-circle'
      }])
    }
  }
  // 确认删除
  delMsg = () => {
    let delArray = this.getCheckState()
    console.log('删除信息')
    this.props.delData(delArray)
    console.log(delArray)
  }
  // 获取选中状态
  getCheckState = () => {
    let delArray = []
    const { items } = this.state
    items.forEach(function (item) {
      if (item.isCheck) {
        delArray.push(item.id)
      }
    }, this)
    console.log('获取选中状态')
    return delArray
  }
  render() {
    const { items = [] } = this.state
    return (
      <div>
        {/* 弹窗start */}
        <Dialog
          showCloseBtn
          open={this.state.d11}
          onRequestClose={(name) => this.handleClose(name, 'd11')}
          title="提示"
          titleClassName="rob-alert-title rob-alert-title-color"
          content={this.content}
          actions={this.actions}
          actionClassName="rob-alert-button"
          showCover
        />
        {/* 弹窗end */}
        <div className="qb-panel-g clearfix qb-media-height">
          <div className="qb-column-header-g">
            <ol className="rob-breadcrumb rob-breadcrumb-pointed">
              <li className="active"><a>系统通知</a></li>
            </ol>
          </div>
          <div className="qb-list-g qb-list-g--red">
            <div className="qb-list-g__table">
              <div className="rob-row clearfix">
                <div className="rob-col-lg-24 column">
                  <div className="rob-table-responsive">
                    <table className="rob-table rob-table-striped rob-table-hover qb-list-g__style">
                      <tbody>
                        {items ? items.map((item, index) => (
                          <tr key={index}>
                            <td className="text-left" onClick={() => this.lookFunc(item.id)}>
                              <input
                                type="checkbox"
                                id={index}
                                className="rob-checkbox-filled-in"
                                onChange={() => this.checkedFunc(index)}
                                checked={items[index].isCheck}
                              />
                              {item.readStatus === '0' ? <span className="qb-news-g qb-news-g__absol2" /> : <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>}
                              <a >{item.noticeName}</a>
                            </td>
                            <td className="text-right" style={{ width: '100px' }}>
                              {formatDay(item.createTime)}
                            </td>
                          </tr>))
                          : <div className="qb-nodate-g__box"><span className="qb-nodate-g bg_icon" /><p>无数据</p></div>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="qb-list-g__pagination clearfix">
              <div className="rob-row clearfix">
                <div className="rob-col-lg-24 column">
                  <Pagination {...this.state.PaginationConf} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

NoticePage.propTypes = {
  data: PropTypes.object,
  getData: PropTypes.func,
  AllCheckFunc: PropTypes.func,
  checkedFunc: PropTypes.func,
  handleOpen: PropTypes.func,
  compareLength: PropTypes.func,
  lookFunc: PropTypes.func,
  handleClose: PropTypes.func,
  getCheckState: PropTypes.func,
  delData: PropTypes.func
}
NoticePage.defaultProps = {
  data: {
    noticeData: {
      items: []
    }
  },
  getData: () => { },
  AllCheckFunc: () => { },
  checkedFunc: () => { },
  handleOpen: () => { },
  compareLength: () => { },
  lookFunc: () => { },
  handleClose: () => { },
  getCheckState: () => { },
  delData: () => { }
}
export default connect(state => ({
  data: state.OIOT_noticeQuery
}), dispatch => ({
  getData: bindActionCreators(action.OIOT_getData, dispatch),
  delData: bindActionCreators(action.OIOT_delData, dispatch)
}))(NoticePage)