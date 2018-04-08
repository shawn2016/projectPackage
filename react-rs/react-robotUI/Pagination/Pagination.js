import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Pagination extends Component {
  static propTypes = {
    style: PropTypes.object,
    type: PropTypes.string,
    pageSize: PropTypes.number, /* 每页显示多少行 */
    currentPage: PropTypes.number, /* 默认选中页 */
    dataCount: PropTypes.number,  /* 数据总条数 */
    maxSize: PropTypes.number,  /* 最多显示按钮数 */
    forbidJump: PropTypes.bool, /* 是否隐藏跳页操作相关按钮 */
    hidePreAndNext: PropTypes.bool, /* 是否隐藏上一页下一页按钮 */
    previousLabel: PropTypes.string,  /* 上一页按钮显示文字 */
    nextLabel: PropTypes.string,  /* 下一页显示文字 */
    onChange: PropTypes.func   /* 触发跳页操作时调用的处理函数 */
  }
  static defaultProps = {
    style: {},
    type: 'default',
    pageSize: 10,
    currentPage: 1,
    dataCount: 0,
    forbidJump: false,
    hidePreAndNext: false,
    maxSize: 5,
    previousLabel: '<',
    nextLabel: '>',
    onChange: null
  }
  constructor(props) {
    super(props)
    this.state = {
      currentPage: props.currentPage,
      targetPage: ''
    }
    let _indexList = this._getBtnIndexList()
    this.state.btnIndexList = _indexList.btnInsexlist
    this.state.pagesCount = _indexList.pagesCount
  }
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    let _indexList = this._getBtnIndexList(nextProps)
    this.setState({
      btnIndexList: _indexList.btnInsexlist,
      pagesCount: _indexList.pagesCount,
      targetPage: '',
      currentPage: nextProps.currentPage
    })
  }
  render() {
    let _btns = []
    for (let i = 0; i < this.state.btnIndexList.length; i++) {
      if (typeof this.state.btnIndexList[i] === 'number') {
        _btns.push(
          <li className={this.state.currentPage === this.state.btnIndexList[i] ? 'active' : ''} key={`page${i}`} onClick={() => { this._handleJumpPage(this.state.btnIndexList[i]) }}>
            <a href="javascript:;">{this.state.btnIndexList[i]}</a>
          </li>
        )
      } else {
        _btns.push(
          <li key={`page${i}`}>
            <span>{this.state.btnIndexList[i]}</span>
          </li>
        )
      }
    }
    return (
      <div>
        {
          /* 总数是否大于每页显示条数，否则隐藏分页组件 */
          this.props.dataCount > this.props.pageSize ? (
            <div>
              <ul className="rob-pagination-jump">
                {
                  /**
                   * 是否隐藏上页下页操作按钮
                   */
                  this.props.hidePreAndNext ? null : (
                    <li
                      className={this.state.currentPage === 1 ? 'disabled' : ''}
                      onClick={() => {
                        this._goPrePage()
                      }}
                    >
                      <a href="javascript:;">{this.props.previousLabel || '<'}</a>
                    </li>
                  )
                }

                {_btns}
                {
                  /**
                   * 是否隐藏上页下页操作按钮
                   */
                  this.props.hidePreAndNext ? null : (
                    <li
                      className={this.state.currentPage === this.state.pagesCount ? 'disabled' : ''}
                      onClick={() => {
                        this._goNextPage()
                      }}
                    >
                      <a href="javascript:;">{this.props.nextLabel || '>'}</a>
                    </li>
                  )
                }

                {
                  /**
                   * 是否隐藏跳页操作按钮
                   */
                  this.props.forbidJump ? null : (
                    <li className="dis">
                      共{this.state.btnIndexList[this.state.btnIndexList.length - 1]}页,到第<input
                        type="tel"
                        value={this.state.targetPage}
                        onChange={(e) => {
                          this.setState({
                            targetPage: /^\d+$/.test(e.target.value) ? e.target.value - 0 : ''
                          })
                        }}
                      /><div style={{ lineHeight: '31px', paddingRight: '15px', display: 'inline' }}>页</div>
                    </li>
                  )
                }

                {
                  this.props.forbidJump ? null : (
                    <li className="dis">
                      <a
                        href="javascript:;"
                        onClick={() => {
                          if (!/^\d+$/.test(this.state.targetPage)) {
                            return
                          }
                          if (this.state.targetPage < 1) {
                            this.state.targetPage = 1
                          }
                          this.state.targetPage > this.state.pagesCount ? this._handleJumpPage(this.state.pagesCount) : this._handleJumpPage(this.state.targetPage)
                          this.setState({
                            targetPage: ''
                          })
                        }}
                      >跳转</a>
                    </li>
                  )
                }
              </ul>
              {
                this.props.forbidJump ? null : (
                  <div className="rob-pagination-show">
                    共
              {this.state.btnIndexList[this.state.btnIndexList.length - 1]}
                    页,到第<input
                      type="tel"
                      value={this.state.targetPage}
                      onChange={(e) => {
                        this.setState({
                          targetPage: /^\d+$/.test(e.target.value) ? e.target.value - 0 : ''
                        })
                      }}
                    />
                    <div style={{ lineHeight: '31px', paddingRight: '15px', display: 'inline' }}>页</div>
                    <a
                      href="javascript:;"
                      onClick={() => {
                        if (!/^\d+$/.test(this.state.targetPage)) {
                          return
                        }
                        this.state.targetPage > this.state.pagesCount ? this._handleJumpPage(this.state.pagesCount) : this._handleJumpPage(this.state.targetPage)
                        this.setState({
                          targetPage: ''
                        })
                      }}
                    >
                      跳转
          </a>
                  </div>
                )
              }
            </div>
          ) : null

        }
      </div>


    )
  }


  _getBtnIndexList = (newProps) => {
    let _props = newProps || this.props
    let _pagesCount = Math.ceil(_props.dataCount / _props.pageSize), _maxSize = _props.maxSize, _btnInsexlist = []
    if (_pagesCount <= _maxSize + 1) {
      for (let i = 1; i <= _pagesCount; i++) {
        _btnInsexlist.push(i)
      }
      return {
        btnInsexlist: _btnInsexlist,
        pagesCount: _pagesCount
      }
    }
    /* test */
    if (this.state.currentPage > _pagesCount - (_maxSize - 2)) {
      let _btns = [1, '...']
      for (let i = (_pagesCount - (_maxSize - 2)); i <= _pagesCount; i++) {
        _btns.push(i)
      }
      this.setState({
        btnIndexList: _btns
      })
      return {
        btnInsexlist: _btns,
        pagesCount: _pagesCount
      }
    }
    if (this.state.currentPage > (_maxSize - 2)) {
      let _pre = Math.ceil((_maxSize - 3) / 2)
      let _btns = [1, '...']
      for (let i = _pre; i > 0; i--) {
        _btns.push(this.state.currentPage - i)
      }
      _btns.push(this.state.currentPage)

      if ((_pagesCount - this.state.currentPage) <= (_maxSize - 3)) {
        for (let i = this.state.currentPage + 1; i <= _pagesCount; i++) {
          _btns.push(i)
        }
      } else {
        for (let i = 1; i <= _pre; i++) {
          _btns.push(this.state.currentPage + i)
        }
        _btns.push('...')
        _btns.push(_pagesCount)
      }

      this.setState({
        btnIndexList: _btns
      })
      return {
        btnInsexlist: _btns,
        pagesCount: _pagesCount
      }
    }


    /* test */
    for (let i = 1; i <= _maxSize - 1; i++) {
      _btnInsexlist.push(i)
    }
    _btnInsexlist.push('...')
    _btnInsexlist.push(_pagesCount)
    return {
      btnInsexlist: _btnInsexlist,
      pagesCount: _pagesCount
    }
  }
  _handleJumpPage = (pageIndex, flag) => {
    if (pageIndex === this.state.currentPage) {
      return
    }
    this.setState({
      currentPage: pageIndex
    }, () => {
      if (flag === undefined) {
        this.props.onChange(pageIndex)
      }
    })
    // this.setState({ currentPage: pageIndex }, () => this.props.onChange(pageIndex))
    if (this.state.pagesCount <= this.props.maxSize) {
      return
    }
    if (pageIndex < (this.props.maxSize - 1)) {
      let _indexList = this._getBtnIndexList()
      this.setState({
        btnIndexList: _indexList.btnInsexlist
      })
      return
    }
    if (pageIndex > this.state.pagesCount - (this.props.maxSize - 2)) {
      let _btns = [1, '...']
      for (let i = (this.state.pagesCount - (this.props.maxSize - 2)); i <= this.state.pagesCount; i++) {
        _btns.push(i)
      }
      this.setState({
        btnIndexList: _btns
      })
      return
    }
    if (pageIndex > (this.props.maxSize - 2)) {
      let _pre = Math.ceil((this.props.maxSize - 3) / 2)
      let _btns = [1, '...']
      for (let i = _pre; i > 0; i--) {
        _btns.push(pageIndex - i)
      }
      _btns.push(pageIndex)

      if ((this.state.pagesCount - pageIndex) <= (this.props.maxSize - 3)) {
        for (let i = pageIndex + 1; i <= this.state.pagesCount; i++) {
          _btns.push(i)
        }
      } else {
        for (let i = 1; i <= _pre; i++) {
          _btns.push(pageIndex + i)
        }
        _btns.push('...')
        _btns.push(this.state.pagesCount)
      }

      this.setState({
        btnIndexList: _btns
      })
    }
  }
  _goPrePage = () => {
    this.state.currentPage === 1 ? null : this._handleJumpPage(this.state.currentPage - 1)
  }
  _goNextPage = () => {
    this.state.currentPage === this.state.pagesCount ? null : this._handleJumpPage(this.state.currentPage + 1)
  }
  setCurrentPage = (pageIndex) => {
    this._handleJumpPage(pageIndex, true)
  }
}

export default Pagination