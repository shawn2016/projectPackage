import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class QBAlert extends Component {
  static propTypes = {
    content: PropTypes.string,
    type: PropTypes.string,
    open: PropTypes.bool,
    timeout: PropTypes.number,
    reqCab: PropTypes.func
  }
  static defaultProps = {
    content: '',
    type: '',
    open: false,
    timeout: 3,
    reqCab: () => {}
  }
  constructor(prop) {
    super(prop)
    this.state = {
      htmlOpen: false
    }
  }
  componentWillReceiveProps(props) {
    if (props.open) {
      this.setState({ htmlOpen: true })
      this.autoClose = setTimeout(() => {
        this.setState({ htmlOpen: false })
        this.props.reqCab()
      }, `${props.timeout * 100000}`)
    }
  }
  componentDidMount() {}
  componentWillUnmount() {
    this.autoClose ? clearTimeout(this.autoClose) : null
  }
  render() {
    const {
      content,
      type
    } = this.props
    const { htmlOpen } = this.state
    return (
      <div>
        {htmlOpen ?
          <div>
            <div className="rob-alert-cover" data-dismiss="rob-alert" />
            <div className="rob-alert rob-alert-dismissible">
              <div className="rob-alert-content">
                <i className={`${type === 'success' ? 'bg_icon qb-icon-active' : type === 'fail' ? 'bg_icon qb-icon-fail' : ''}`} />
                <div className="">
                  <div>{content}</div>
                </div>
              </div>
            </div>
          </div> : null}
      </div>
    )
  }
}