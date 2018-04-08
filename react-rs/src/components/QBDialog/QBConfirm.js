import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class QBConfirm extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    type: PropTypes.string,
    open: PropTypes.bool,
    btns: PropTypes.array,
    close: PropTypes.func,
    nextStep: PropTypes.string,
    timeout: PropTypes.number,
    alertContent: PropTypes.string
  }
  static defaultProps = {
    content: null,
    type: '',
    open: false,
    btns: [],
    close: () => {},
    nextStep: '',
    timeout: 3,
    alertContent: ''
  }
  componentWillReceiveProps(props) {
    if (props.nextStep === '3') {
      setTimeout(() => {
        props.close()
      }, `${props.timeout * 1000}`)
    }
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    const { content, type, open, btns, alertContent, nextStep } = this.props
    return (
      <div>
        {open ?
          <div>
            <div className="rob-alert-cover" data-dismiss="rob-alert" />
            {nextStep === '1' ? <div className="rob-alert rob-alert-dismissible">
              <button type="button" className="rob-alert-close" data-dismiss="rob-alert" aria-label="Close">
                <span aria-hidden="true" onClick={() => this.props.close(false)}>×</span>
              </button>
              <div className="rob-alert-content">
                <div className="">
                  <div>{content}</div>
                </div>
              </div>
              <div className="rob-alert-button-color">
                {btns.map((btn, i) => <button type="button" key={i} className={`rob-btn ${btn.className}`} onClick={btn.action}>{btn.label}</button>)}
              </div>
            </div> :
            nextStep === '2' ? <div className="rob-alert rob-alert-dismissible">
              <div className="rob-alert-content">
                <span className="ioc_info icon-f02" />
                <div className="rob-alert-content-title" />
                加载中111...
              </div>
            </div> :
            nextStep === '3' ? <div className="rob-alert rob-alert-dismissible">
              <div className="rob-alert-content">
                <i className={`${type === 'success' ? 'icon-f1' : type === 'fail' ? '' : type === 'warn' ? '' : ''}`} />
                <span className={`ioc_info ${type === 'success' ? 'icon-f1' : type === 'fail' ? '' : type === 'warn' ? '' : ''}`} />
                <div className="rob-alert-content-title" />
                {alertContent}
              </div>
            </div> : null}
          </div> : null}
      </div>
    )
  }
}